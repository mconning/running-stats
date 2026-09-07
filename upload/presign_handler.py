"""
Lambda behind API Gateway: issues a pre-signed S3 PUT URL for the upload page.
Gated by a shared password since only Mariette uploads for now.
"""

import hmac
import json
import os
import re
import time
import uuid

import boto3
from botocore.client import Config

# Pin the S3 client to its own region explicitly. Without this, a presigned
# URL can end up pointing at the legacy global s3.amazonaws.com endpoint,
# which 307-redirects requests to non-us-east-1 buckets -- and a browser
# can't follow that redirect on a signed PUT (the redirect response itself
# carries no CORS headers), surfacing as a confusing "CORS" error in devtools.
s3 = boto3.client(
    "s3",
    region_name=os.environ["AWS_REGION"],
    config=Config(signature_version="s3v4", s3={"addressing_style": "virtual"}),
)
secrets_client = boto3.client("secretsmanager")

UPLOAD_PREFIX = "uploads"
URL_EXPIRY_SECONDS = 300
_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

# The upload page is opened either from file:// (local testing) or the S3
# website bucket, and calls this Lambda cross-origin -- without these headers
# the browser blocks the response before JS ever sees it ("Failed to fetch").
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
}


def _get_shared_password() -> str:
    response = secrets_client.get_secret_value(SecretId=os.environ["SECRETS_ID"])
    return json.loads(response["SecretString"])["upload_page_password"]


def handler(event, context):
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    password = body.get("password", "")
    filename = body.get("filename", "photo.jpg")
    race_date = body.get("race_date", "")

    if not hmac.compare_digest(password, _get_shared_password()):
        return {
            "statusCode": 403,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "Invalid password"}),
        }

    # The pipeline Lambda reads the race date straight from this key rather
    # than trusting Mobii's "latest race" (which can lag behind the actual
    # event) or the photo's own filename (which the uploading device rarely
    # names usefully) - so a valid date here is required, not optional.
    if not _DATE_RE.match(race_date):
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "race_date must be YYYY-MM-DD"}),
        }

    key = f"{UPLOAD_PREFIX}/{race_date}-{int(time.time())}-{uuid.uuid4().hex[:8]}-{filename}"

    upload_url = s3.generate_presigned_url(
        "put_object",
        Params={"Bucket": os.environ["BUCKET_NAME"], "Key": key},
        ExpiresIn=URL_EXPIRY_SECONDS,
    )

    return {
        "statusCode": 200,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps({"upload_url": upload_url, "key": key}),
    }
