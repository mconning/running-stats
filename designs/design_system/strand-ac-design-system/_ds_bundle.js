/* @ds-bundle: {"format":4,"namespace":"StrandAthleticsClubDesignSystem_f49d47","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"0ef054736609","components/core/Button.jsx":"df7804e63bfc","components/core/Card.jsx":"b93a7ce354af","components/forms/Checkbox.jsx":"e8215cb4060f","components/forms/Input.jsx":"18fb2eb44134","components/forms/Select.jsx":"86c09f0bccc6","components/navigation/Tabs.jsx":"95a9426cb03a","ui_kits/club-website/App.jsx":"d960666a2466","ui_kits/club-website/EventsSection.jsx":"69c16f9a22ff","ui_kits/club-website/Footer.jsx":"299aaf19ae06","ui_kits/club-website/Header.jsx":"1bdd0655375d","ui_kits/club-website/Hero.jsx":"8a6f269c913d","ui_kits/club-website/RegisterModal.jsx":"7e99fd61d999","ui_kits/time-trial-admin/LoginGate.jsx":"bd1717f67fd4","ui_kits/time-trial-admin/RaceResults.jsx":"f4f2a2eedfbf","ui_kits/time-trial-admin/TimeTrialAdmin.jsx":"a55ce661d4bf","ui_kits/time-trial-admin/TimeTrialApp.jsx":"0018df43f56b","ui_kits/time-trial-admin/mockData.js":"baa541c6eeee"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StrandAthleticsClubDesignSystem_f49d47 = window.StrandAthleticsClubDesignSystem_f49d47 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  tone = 'navy',
  children
}) {
  const tones = {
    navy: {
      background: 'var(--navy-900)',
      color: '#fff'
    },
    teal: {
      background: 'var(--teal-500)',
      color: '#fff'
    },
    sun: {
      background: 'var(--sun-400)',
      color: 'var(--ink-900)'
    },
    coral: {
      background: 'var(--coral-500)',
      color: '#fff'
    },
    outline: {
      background: 'transparent',
      color: 'var(--navy-900)',
      border: '1.5px solid var(--navy-900)'
    }
  };
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 12,
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      ...tones[tone]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
  style: styleOverride
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 14
    },
    md: {
      padding: '12px 22px',
      fontSize: 16
    },
    lg: {
      padding: '16px 30px',
      fontSize: 18
    }
  };
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    borderRadius: 'var(--radius-pill)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color .15s ease, color .15s ease, transform .08s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: 'var(--navy-900)',
      color: '#fff'
    },
    accent: {
      background: 'var(--teal-500)',
      color: '#fff'
    },
    secondary: {
      background: '#fff',
      color: 'var(--navy-900)',
      borderColor: 'var(--navy-900)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--navy-900)',
      borderColor: 'transparent'
    }
  };
  const hover = {
    primary: 'var(--navy-700)',
    accent: 'var(--teal-300)',
    secondary: 'var(--grey-050)',
    ghost: 'var(--grey-050)'
  };
  const [isHover, setHover] = React.useState(false);
  const style = {
    ...base,
    ...variants[variant],
    ...styleOverride
  };
  if (isHover && !disabled) style.background = hover[variant];
  return React.createElement('button', {
    style,
    disabled,
    onClick,
    type,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  padded = true,
  hover = false,
  children
}) {
  const [isHover, setHover] = React.useState(false);
  const style = {
    background: 'var(--color-surface-raised)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    boxShadow: isHover && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    padding: padded ? 'var(--space-5)' : 0,
    transition: 'box-shadow .15s ease, transform .15s ease',
    transform: isHover && hover ? 'translateY(-2px)' : 'none'
  };
  return React.createElement('div', {
    style,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked = false,
  onChange
}) {
  const [isChecked, setChecked] = React.useState(checked);
  const toggle = () => {
    const v = !isChecked;
    setChecked(v);
    onChange && onChange(v);
  };
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--ink-900)'
    },
    onClick: toggle
  }, React.createElement('span', {
    style: {
      width: 22,
      height: 22,
      borderRadius: 'var(--radius-sm)',
      border: '2px solid var(--navy-900)',
      background: isChecked ? 'var(--navy-900)' : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color .12s ease'
    }
  }, isChecked && React.createElement('span', {
    style: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 900,
      lineHeight: 1
    }
  }, '✓')), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  type = 'text',
  error,
  value,
  defaultValue,
  onChange,
  name
}) {
  const [focused, setFocused] = React.useState(false);
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      width: '100%'
    }
  }, label && React.createElement('span', {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, label), React.createElement('input', {
    type,
    placeholder,
    name,
    value,
    defaultValue,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      font: 'inherit',
      fontSize: 16,
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      border: `1.5px solid ${error ? 'var(--coral-500)' : focused ? 'var(--teal-500)' : 'var(--grey-200)'}`,
      outline: 'none',
      boxShadow: focused ? '0 0 0 3px var(--teal-100)' : 'none',
      transition: 'box-shadow .15s ease, border-color .15s ease'
    }
  }), error && React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--coral-500)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  name
}) {
  const [focused, setFocused] = React.useState(false);
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      width: '100%'
    }
  }, label && React.createElement('span', {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, label), React.createElement('select', {
    value,
    onChange,
    name,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      font: 'inherit',
      fontSize: 16,
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      border: `1.5px solid ${focused ? 'var(--teal-500)' : 'var(--grey-200)'}`,
      outline: 'none',
      background: '#fff',
      boxShadow: focused ? '0 0 0 3px var(--teal-100)' : 'none'
    }
  }, options.map((o, i) => React.createElement('option', {
    key: i,
    value: o
  }, o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  defaultIndex = 0
}) {
  const [active, setActive] = React.useState(defaultIndex);
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '2px solid var(--grey-100)',
      fontFamily: 'var(--font-display)'
    }
  }, tabs.map((t, i) => React.createElement('button', {
    key: i,
    onClick: () => setActive(i),
    style: {
      padding: '10px 18px',
      fontWeight: 700,
      fontSize: 15,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: active === i ? 'var(--navy-900)' : 'var(--grey-600)',
      borderBottom: active === i ? '3px solid var(--teal-500)' : '3px solid transparent',
      marginBottom: -2,
      transition: 'color .15s ease'
    }
  }, t)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/club-website/App.jsx
try { (() => {
function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    onRegister: () => setModalOpen(true)
  }), /*#__PURE__*/React.createElement(Hero, {
    onRegister: () => setModalOpen(true)
  }), /*#__PURE__*/React.createElement(EventsSection, {
    onRegister: () => setModalOpen(true)
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(RegisterModal, {
    open: modalOpen,
    onClose: () => setModalOpen(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/club-website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/club-website/EventsSection.jsx
try { (() => {
const EVENTS = [{
  title: 'Strand Beach Fun Run',
  date: 'Sat 12 Oct · 07:00',
  tag: '5KM',
  tone: 'teal',
  desc: 'A relaxed coastal fun run for all ages — walkers welcome.'
}, {
  title: 'Club Time Trial',
  date: 'Tue 15 Oct · 18:00',
  tag: 'Members',
  tone: 'navy',
  desc: 'Monthly timed 3KM at the track. Bring your club card.'
}, {
  title: 'Little Strollers Dash',
  date: 'Sat 19 Oct · 08:30',
  tag: 'Kids',
  tone: 'sun',
  desc: 'A short, silly, medal-at-the-end race for our youngest members.'
}, {
  title: 'Strand Half Marathon',
  date: 'Sun 3 Nov · 06:00',
  tag: '21KM',
  tone: 'coral',
  desc: 'Our biggest race of the year, finishing on the beachfront.'
}];
function EventsSection({
  onRegister
}) {
  const [filter, setFilter] = React.useState('Upcoming');
  const {
    Tabs,
    Badge,
    Card,
    Button
  } = StrandAthleticsClubDesignSystem_f49d47;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '56px 40px',
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 24,
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 32,
      color: 'var(--navy-900)',
      margin: 0
    }
  }, "Upcoming Events"), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Upcoming', 'Past Events', 'Club Records']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
      gap: 20
    }
  }, EVENTS.map(ev => /*#__PURE__*/React.createElement(Card, {
    key: ev.title,
    hover: true
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: ev.tone
  }, ev.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--navy-900)',
      fontSize: 20,
      margin: '12px 0 4px'
    }
  }, ev.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 10px',
      fontSize: 14,
      color: 'var(--grey-600)',
      fontWeight: 600
    }
  }, ev.date), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 18px',
      fontSize: 15,
      color: 'var(--ink-900)',
      lineHeight: 1.5
    }
  }, ev.desc), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onRegister
  }, "Register")))));
}
window.EventsSection = EventsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/club-website/EventsSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/club-website/Footer.jsx
try { (() => {
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--grey-050)',
      borderTop: '1px solid var(--grey-100)',
      padding: '32px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/strand-ac-balwin-logo-horizontal.png",
    alt: "Strand AC, proudly supported by Balwin Properties",
    style: {
      height: 32
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--grey-600)'
    }
  }, "\xA9 ", new Date().getFullYear(), " Strand Athletics Club \xB7 Strand, Western Cape"));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/club-website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/club-website/Header.jsx
try { (() => {
function Header({
  onRegister
}) {
  const [tab, setTab] = React.useState('Home');
  const links = ['Home', 'Events', 'Club Records', 'About'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 40px',
      borderBottom: '1px solid var(--grey-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/strand-ac-logo-horizontal.png",
    alt: "Strand Athletics Club",
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setTab(l);
    },
    style: {
      textDecoration: 'none',
      color: tab === l ? 'var(--navy-900)' : 'var(--grey-600)'
    }
  }, l))), /*#__PURE__*/React.createElement(StrandAthleticsClubDesignSystem_f49d47.Button, {
    variant: "accent",
    size: "sm",
    onClick: onRegister
  }, "Join Us"));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/club-website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/club-website/Hero.jsx
try { (() => {
function Hero({
  onRegister
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--navy-900)',
      color: '#fff',
      padding: '70px 40px 90px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(StrandAthleticsClubDesignSystem_f49d47.Badge, {
    tone: "sun"
  }, "All Ages Welcome"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 56,
      lineHeight: 1.05,
      margin: '18px 0 16px'
    }
  }, "Every stride, together on the Strand."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      color: 'var(--teal-100)',
      lineHeight: 1.5,
      margin: '0 0 28px',
      maxWidth: 520
    }
  }, "From your first fun run to your next PB \u2014 Strand Athletics Club trains runners, walkers and families of every age, right along our coastline."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StrandAthleticsClubDesignSystem_f49d47.Button, {
    variant: "accent",
    size: "lg",
    onClick: onRegister
  }, "Become a Member"), /*#__PURE__*/React.createElement(StrandAthleticsClubDesignSystem_f49d47.Button, {
    variant: "secondary",
    size: "lg",
    style: {
      color: '#fff',
      borderColor: '#fff'
    }
  }, "See Upcoming Events"))), /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 120
    },
    viewBox: "0 0 1200 120",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
    fill: "var(--teal-500)",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0,90 C300,40 900,110 1200,70 L1200,120 L0,120 Z",
    fill: "var(--sun-400)",
    opacity: "0.9"
  })));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/club-website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/club-website/RegisterModal.jsx
try { (() => {
function RegisterModal({
  open,
  onClose
}) {
  const {
    Input,
    Select,
    Checkbox,
    Button
  } = StrandAthleticsClubDesignSystem_f49d47;
  const [submitted, setSubmitted] = React.useState(false);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(20,59,97,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-lg)',
      padding: 36,
      width: 420,
      boxShadow: 'var(--shadow-lg)'
    }
  }, !submitted ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--navy-900)',
      margin: '0 0 4px'
    }
  }, "Join Strand AC"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 22px',
      color: 'var(--grey-600)',
      fontSize: 14
    }
  }, "Runners, walkers and families of all ages welcome."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    placeholder: "Jane Adams"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "jane@example.com"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Age category",
    options: ['Under 12', '13–17', '18–39', '40–59', '60+']
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I agree to the club's code of conduct"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSubmitted(true)
  }, "Submit"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onClose
  }, "Cancel"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--navy-900)',
      margin: '0 0 8px'
    }
  }, "Welcome to the club!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px',
      color: 'var(--ink-900)',
      lineHeight: 1.5
    }
  }, "We can't wait to see you at the next training session. Check your email for details."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onClose
  }, "Done"))));
}
window.RegisterModal = RegisterModal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/club-website/RegisterModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/time-trial-admin/LoginGate.jsx
try { (() => {
function LoginGate({
  onUnlock
}) {
  const {
    Input,
    Button
  } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const submit = e => {
    e.preventDefault();
    if (password === 'strandac2026') {
      setError('');
      onUnlock();
    } else setError('Incorrect password. Try the club shared password.');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--grey-050)'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      padding: 40,
      width: 360,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/strand-ac-logo-horizontal.png",
    alt: "Strand Athletics Club",
    style: {
      height: 32,
      width: 'auto',
      alignSelf: 'flex-start',
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--navy-900)',
      margin: 0
    }
  }, "Time Trial Admin"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: 'var(--grey-600)'
    }
  }, "Enter the club shared password to manage time trial results."), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: password,
    onChange: e => setPassword(e.target.value)
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--coral-500)'
    }
  }, error), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    type: "submit"
  }, "Log In"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--grey-400)'
    }
  }, "Prototype only \u2014 password is \"strandac2026\".")));
}
window.LoginGate = LoginGate;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/time-trial-admin/LoginGate.jsx", error: String((e && e.message) || e) }); }

// ui_kits/time-trial-admin/RaceResults.jsx
try { (() => {
function RaceResults() {
  const {
    Button,
    Select,
    Badge
  } = window.StrandAthleticsClubDesignSystem_f49d47;
  const CLUB = 'Strand Athletics Club';
  const [raceFilter, setRaceFilter] = React.useState('All Races');
  const tableRef = React.useRef(null);
  const [downloading, setDownloading] = React.useState(false);
  const all = window.MockData.EXTERNAL_RESULTS;
  const races = ['All Races', ...Array.from(new Set(all.map(r => r.race)))];
  const clubResults = all.filter(r => r.club === CLUB && (raceFilter === 'All Races' || r.race === raceFilter)).sort((a, b) => a.position - b.position);
  const downloadPng = () => {
    setDownloading(true);
    if (window.html2canvas) {
      window.html2canvas(tableRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'strand-ac-results.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setDownloading(false);
      });
    } else {
      setDownloading(false);
    }
  };
  const downloadPdf = () => window.print();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      padding: '32px 24px 64px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 28,
      color: 'var(--navy-900)',
      margin: '0 0 4px'
    }
  }, "Club Race Results"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--grey-600)',
      fontSize: 14
    }
  }, "Pulled from Finish Line Insights, filtered to Strand Athletics Club finishers.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Race",
    options: races,
    value: raceFilter,
    onChange: e => setRaceFilter(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    onClick: downloadPng,
    disabled: downloading
  }, "Download PNG"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    onClick: downloadPdf
  }, "Download PDF"))), /*#__PURE__*/React.createElement("div", {
    ref: tableRef,
    style: {
      background: '#fff',
      border: '1px solid var(--grey-100)',
      borderRadius: 'var(--radius-lg)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/strand-ac-logo-round.png",
    alt: "Strand Athletics Club",
    style: {
      height: 36
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--navy-900)',
      fontSize: 16
    }
  }, raceFilter === 'All Races' ? 'All Races' : raceFilter, " \u2014 Club Results")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: 'left',
      color: 'var(--grey-600)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-eyebrow)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Pos"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Category"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Distance"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Time"), raceFilter === 'All Races' && /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Race"))), /*#__PURE__*/React.createElement("tbody", null, clubResults.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.bib + r.race
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)',
      fontWeight: 700,
      color: 'var(--navy-900)'
    }
  }, r.position), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)'
    }
  }, r.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)',
      color: 'var(--grey-600)'
    }
  }, r.category), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "teal"
  }, r.distance)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700
    }
  }, r.time), raceFilter === 'All Races' && /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)',
      color: 'var(--grey-600)'
    }
  }, r.race))), clubResults.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "6",
    style: {
      padding: '20px 10px',
      color: 'var(--grey-600)',
      textAlign: 'center'
    }
  }, "No Strand AC finishers found for this race."))))));
}
window.RaceResults = RaceResults;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/time-trial-admin/RaceResults.jsx", error: String((e && e.message) || e) }); }

// ui_kits/time-trial-admin/TimeTrialAdmin.jsx
try { (() => {
const STATUS_TONE = {
  draft: 'outline',
  extracting: 'sun',
  processing: 'sun',
  published: 'teal',
  extraction_failed: 'coral',
  processing_failed: 'coral'
};
function StatusBadge({
  status
}) {
  const {
    Badge
  } = window.StrandAthleticsClubDesignSystem_f49d47;
  return /*#__PURE__*/React.createElement(Badge, {
    tone: STATUS_TONE[status] || 'outline'
  }, status.replace(/_/g, ' '));
}
function timeToSeconds(t) {
  if (!t) return Infinity;
  const parts = t.split(':').map(Number);
  if (parts.some(isNaN)) return Infinity;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0];
}
function sortEntries(entries) {
  const genderRank = g => g === 'M' ? 0 : g === 'F' ? 1 : 2;
  return [...entries].sort((a, b) => {
    const d = genderRank(a.gender) - genderRank(b.gender);
    return d !== 0 ? d : timeToSeconds(a.time) - timeToSeconds(b.time);
  });
}
function EntryRow({
  entry,
  onSave,
  onRemove
}) {
  const {
    Badge,
    Button
  } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [draft, setDraft] = React.useState(entry);
  React.useEffect(() => setDraft(entry), [entry.entry_id]);
  const cellStyle = {
    padding: '8px 8px',
    borderTop: '1px solid var(--grey-100)'
  };
  const inputStyle = {
    font: 'inherit',
    fontSize: 14,
    padding: '6px 8px',
    borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--grey-200)',
    width: '100%',
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("tr", {
    style: {
      background: entry.flag_reason ? '#FFF8E5' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: cellStyle
  }, /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    value: draft.name,
    onChange: e => setDraft({
      ...draft,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement("td", {
    style: cellStyle
  }, /*#__PURE__*/React.createElement("select", {
    style: inputStyle,
    value: draft.gender,
    onChange: e => setDraft({
      ...draft,
      gender: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "M"
  }, "M"), /*#__PURE__*/React.createElement("option", {
    value: "F"
  }, "F"))), /*#__PURE__*/React.createElement("td", {
    style: cellStyle
  }, /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    value: draft.time,
    onChange: e => setDraft({
      ...draft,
      time: e.target.value
    }),
    placeholder: "H:MM:SS"
  })), /*#__PURE__*/React.createElement("td", {
    style: cellStyle
  }, /*#__PURE__*/React.createElement("select", {
    style: inputStyle,
    value: draft.distance,
    onChange: e => setDraft({
      ...draft,
      distance: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "5KM"
  }, "5KM"), /*#__PURE__*/React.createElement("option", {
    value: "10KM"
  }, "10KM"))), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cellStyle,
      color: 'var(--grey-600)'
    }
  }, entry.source), /*#__PURE__*/React.createElement("td", {
    style: cellStyle
  }, entry.flag_reason ? /*#__PURE__*/React.createElement(Badge, {
    tone: "coral"
  }, entry.flag_reason.replace(/_/g, ' ')) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--grey-400)'
    }
  }, "\u2014")), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cellStyle,
      textAlign: 'right',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => onSave({
      ...draft,
      flag_reason: null
    })
  }, "Save"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => onRemove(entry.entry_id)
  }, "Remove")));
}
function TimeTrialAdmin() {
  const {
    Button,
    Input,
    Select
  } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [races, setRaces] = React.useState(window.MockData.INITIAL_RACES);
  const [activeDate, setActiveDate] = React.useState(null);
  const [newDate, setNewDate] = React.useState('');
  const [entries, setEntries] = React.useState([]);
  const [photoName, setPhotoName] = React.useState(null);
  const [form, setForm] = React.useState({
    name: '',
    gender: 'M',
    time: '',
    distance: '5KM'
  });
  const active = races.find(r => r.race_date === activeDate);
  const anyFlagged = entries.some(e => e.flag_reason);
  const processDisabled = !active || entries.length === 0 || anyFlagged || active.status === 'extracting' || active.status === 'processing';
  const setActiveStatus = status => setRaces(rs => rs.map(r => r.race_date === activeDate ? {
    ...r,
    status
  } : r));
  const createRace = () => {
    if (!newDate) return;
    setRaces([{
      race_date: newDate,
      series_name: 'Winter Series',
      status: 'draft'
    }, ...races]);
    setActiveDate(newDate);
    setEntries([]);
    setPhotoName(null);
    setNewDate('');
  };
  const openRace = date => {
    setActiveDate(date);
    setEntries([]);
    setPhotoName(null);
  };
  const onPhoto = e => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoName(file.name);
    setActiveStatus('extracting');
    setTimeout(() => {
      setEntries(window.MockData.CANNED_EXTRACTION.map(en => ({
        ...en,
        entry_id: en.entry_id + '-' + Date.now()
      })));
      setActiveStatus('draft');
    }, 1200);
  };
  const addEntry = () => {
    if (!form.name || !form.time) return;
    setEntries([...entries, {
      entry_id: 'm' + Date.now(),
      ...form,
      source: 'Manual',
      flag_reason: null
    }]);
    setForm({
      name: '',
      gender: 'M',
      time: '',
      distance: '5KM'
    });
  };
  const saveEntry = updated => setEntries(entries.map(e => e.entry_id === updated.entry_id ? updated : e));
  const removeEntry = id => setEntries(entries.filter(e => e.entry_id !== id));
  const startProcessing = () => {
    setActiveStatus('processing');
    setTimeout(() => setActiveStatus('published'), 1500);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      padding: '32px 24px 64px',
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 28,
      color: 'var(--navy-900)',
      margin: '0 0 4px'
    }
  }, "Review Time Trial Results"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--grey-600)',
      fontSize: 14
    }
  }, "Upload a finish-line photo, review the Mobii-extracted times, then publish.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--grey-100)',
      borderRadius: 'var(--radius-lg)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 16,
      color: 'var(--navy-900)',
      marginBottom: 16
    }
  }, "Races"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 220
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "New race date",
    type: "date",
    value: newDate,
    onChange: e => setNewDate(e.target.value)
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    onClick: createRace
  }, "Create race (no photo)")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: 'left',
      color: 'var(--grey-600)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-eyebrow)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Date"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Series"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 10px',
      borderBottom: '2px solid var(--grey-100)'
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, races.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.race_date,
    style: {
      background: r.race_date === activeDate ? 'var(--grey-050)' : 'transparent',
      cursor: 'pointer'
    },
    onClick: () => openRace(r.race_date)
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)',
      color: 'var(--ink-900)'
    }
  }, r.race_date), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)',
      color: 'var(--ink-900)'
    }
  }, r.series_name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)'
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: r.status
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 10px',
      borderBottom: '1px solid var(--grey-100)',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: e => {
      e.stopPropagation();
      openRace(r.race_date);
    }
  }, "Open"))))))), active && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--grey-100)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 20,
      color: 'var(--navy-900)',
      margin: 0
    }
  }, active.race_date, " \u2014 ", active.series_name), /*#__PURE__*/React.createElement(StatusBadge, {
    status: active.status
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink-900)',
      marginBottom: 6
    }
  }, "Finish-line photo"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      border: '1.5px dashed var(--grey-200)',
      borderRadius: 'var(--radius-md)',
      padding: 16,
      cursor: 'pointer',
      background: 'var(--grey-050)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: onPhoto,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Choose photo"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--grey-600)'
    }
  }, photoName || 'No photo uploaded yet')), active.status === 'extracting' && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--teal-500)',
      fontWeight: 600,
      marginTop: 8
    }
  }, "Extracting times from photo\u2026")), entries.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink-900)',
      marginBottom: 8
    }
  }, "Entries ", anyFlagged && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--coral-500)',
      fontWeight: 700
    }
  }, "\u2014 resolve flags before processing")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: 'left',
      color: 'var(--grey-600)',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-eyebrow)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '6px 8px'
    }
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '6px 8px'
    }
  }, "Gender"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '6px 8px'
    }
  }, "Time"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '6px 8px'
    }
  }, "Distance"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '6px 8px'
    }
  }, "Source"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '6px 8px'
    }
  }, "Flag"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, sortEntries(entries).map(en => /*#__PURE__*/React.createElement(EntryRow, {
    key: en.entry_id,
    entry: en,
    onSave: saveEntry,
    onRemove: removeEntry
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink-900)',
      marginBottom: 8
    }
  }, "Add entry"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-end',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    list: "rosterNames",
    style: {
      font: 'inherit',
      fontSize: 16,
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--grey-200)'
    },
    placeholder: "Runner name",
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    })
  }), /*#__PURE__*/React.createElement("datalist", {
    id: "rosterNames"
  }, window.MockData.ROSTER.map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 100
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Gender",
    options: ['M', 'F'],
    value: form.gender,
    onChange: e => setForm({
      ...form,
      gender: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 110
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Time",
    placeholder: "H:MM:SS",
    value: form.time,
    onChange: e => setForm({
      ...form,
      time: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Distance",
    options: ['5KM', '10KM'],
    value: form.distance,
    onChange: e => setForm({
      ...form,
      distance: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    onClick: addEntry
  }, "Add"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      borderTop: '1px solid var(--grey-100)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    disabled: processDisabled,
    onClick: startProcessing
  }, "Start processing"), active.status === 'processing' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--teal-500)',
      fontWeight: 600
    }
  }, "Processing\u2026"), active.status === 'published' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--leaf-500)',
      fontWeight: 600
    }
  }, "Published \u2014 results are live."))));
}
window.TimeTrialAdmin = TimeTrialAdmin;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/time-trial-admin/TimeTrialAdmin.jsx", error: String((e && e.message) || e) }); }

// ui_kits/time-trial-admin/TimeTrialApp.jsx
try { (() => {
function TimeTrialApp() {
  const {
    Button
  } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [unlocked, setUnlocked] = React.useState(false);
  const [page, setPage] = React.useState('admin');
  if (!unlocked) return /*#__PURE__*/React.createElement(LoginGate, {
    onUnlock: () => setUnlocked(true)
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      borderBottom: '1px solid var(--grey-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/strand-ac-logo-horizontal.png",
    alt: "Strand Athletics Club",
    style: {
      height: 30,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: page === 'admin' ? 'primary' : 'ghost',
    size: "sm",
    onClick: () => setPage('admin')
  }, "Time Trial Admin"), /*#__PURE__*/React.createElement(Button, {
    variant: page === 'results' ? 'primary' : 'ghost',
    size: "sm",
    onClick: () => setPage('results')
  }, "Club Results")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setUnlocked(false)
  }, "Log Out")), page === 'admin' ? /*#__PURE__*/React.createElement(TimeTrialAdmin, null) : /*#__PURE__*/React.createElement(RaceResults, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(TimeTrialApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/time-trial-admin/TimeTrialApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/time-trial-admin/mockData.js
try { (() => {
window.MockData = {};
window.MockData.ROSTER = ['Ade Bester', 'Adel Smit', 'Adri Smith', 'Albert Kasselman', 'Aletta Pietersen', 'Aletta van Zyl', 'Alette Van Vuuren', 'Alex Rymill', 'Alten Nortje', 'Aluta Ngantweni', 'Andisiwe Sigaba', 'Andre Stubbe', 'Andries Dippenaar', 'Anesu Muusha', 'Anette Botha', 'Angelique Smit'];
window.MockData.INITIAL_RACES = [{
  race_date: '2026-08-11',
  series_name: 'Winter Series',
  status: 'published'
}, {
  race_date: '2026-08-18',
  series_name: 'Winter Series',
  status: 'published'
}, {
  race_date: '2026-08-25',
  series_name: 'Winter Series',
  status: 'draft'
}];
window.MockData.CANNED_EXTRACTION = [{
  entry_id: 'e1',
  name: 'Andre Stubbe',
  gender: 'M',
  time: '0:17:42',
  distance: '5KM',
  source: 'Mobii',
  flag_reason: null
}, {
  entry_id: 'e2',
  name: 'Adel Smit',
  gender: 'F',
  time: '0:19:05',
  distance: '5KM',
  source: 'Mobii',
  flag_reason: null
}, {
  entry_id: 'e3',
  name: 'Alten Nortje',
  gender: 'M',
  time: '0:38:51',
  distance: '10KM',
  source: 'Mobii',
  flag_reason: 'unmatched_name'
}, {
  entry_id: 'e4',
  name: 'Anette Botha',
  gender: 'F',
  time: '0:41:12',
  distance: '10KM',
  source: 'Mobii',
  flag_reason: null
}, {
  entry_id: 'e5',
  name: 'Alex Rymill',
  gender: 'M',
  time: '0:18:30',
  distance: '5KM',
  source: 'Mobii',
  flag_reason: 'low_confidence'
}];

// mock rows shaped like a national race-timing results feed (finishlineinsights.com)
window.MockData.EXTERNAL_RESULTS = [{
  race: 'Strand Beach Half Marathon',
  date: '2026-08-30',
  bib: '1042',
  name: 'Andre Stubbe',
  club: 'Strand Athletics Club',
  category: 'M40-49',
  distance: '21KM',
  time: '1:32:14',
  position: 4
}, {
  race: 'Strand Beach Half Marathon',
  date: '2026-08-30',
  bib: '2210',
  name: 'Adel Smit',
  club: 'Strand Athletics Club',
  category: 'F30-39',
  distance: '21KM',
  time: '1:48:02',
  position: 11
}, {
  race: 'Strand Beach Half Marathon',
  date: '2026-08-30',
  bib: '3355',
  name: 'Kyle Fortune',
  club: 'Helderberg Runners',
  category: 'M20-29',
  distance: '21KM',
  time: '1:29:47',
  position: 2
}, {
  race: 'Gordon\u2019s Bay 10K',
  date: '2026-08-16',
  bib: '118',
  name: 'Alten Nortje',
  club: 'Strand Athletics Club',
  category: 'M50-59',
  distance: '10KM',
  time: '44:18',
  position: 7
}, {
  race: 'Gordon\u2019s Bay 10K',
  date: '2026-08-16',
  bib: '204',
  name: 'Anette Botha',
  club: 'Strand Athletics Club',
  category: 'F18-29',
  distance: '10KM',
  time: '41:55',
  position: 3
}, {
  race: 'Gordon\u2019s Bay 10K',
  date: '2026-08-16',
  bib: '341',
  name: 'Zanele Khumalo',
  club: 'Bellville Road Runners',
  category: 'F30-39',
  distance: '10KM',
  time: '45:02',
  position: 9
}, {
  race: 'Cape Town Marathon',
  date: '2026-09-20',
  bib: '9021',
  name: 'Alex Rymill',
  club: 'Strand Athletics Club',
  category: 'M18-29',
  distance: '42KM',
  time: '3:12:44',
  position: 58
}, {
  race: 'Cape Town Marathon',
  date: '2026-09-20',
  bib: '9403',
  name: 'Andisiwe Sigaba',
  club: 'Strand Athletics Club',
  category: 'F40-49',
  distance: '42KM',
  time: '3:45:19',
  position: 112
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/time-trial-admin/mockData.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
