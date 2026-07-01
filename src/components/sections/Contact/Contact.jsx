import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaTelegramPlane, FaEnvelope } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

import { useLanguage } from '../../../context/LanguageContext';
import { SITE, isEmailJsConfigured } from '../../../data/config';
import Reveal from '../../ui/Reveal/Reveal';
import Button from '../../ui/Button/Button';
import ShineBorder from '../../ui/ShineBorder/ShineBorder';
import styles from './Contact.module.scss';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const formRef = useRef(null);
  const configured = isEmailJsConfigured();

  const [values, setValues] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.from_name.trim()) next.from_name = c.errName;
    if (!emailRe.test(values.from_email.trim())) next.from_email = c.errEmail;
    if (!values.message.trim()) next.message = c.errMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!configured) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    emailjs
      .sendForm(SITE.emailjs.serviceId, SITE.emailjs.templateId, formRef.current, {
        publicKey: SITE.emailjs.publicKey,
      })
      .then(() => {
        setStatus('success');
        setValues({ from_name: '', from_email: '', message: '' });
      })
      .catch(() => setStatus('error'));
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className={styles.grid}>
          <Reveal className={styles.info}>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className={styles.title}>{c.title}</h2>
            <p className={styles.subtitle}>{c.subtitle}</p>

            <div className={styles.direct}>
              <p className={styles.directLabel}>
                {configured ? c.orDirect : c.notConfigured}
              </p>
              <div className={styles.directLinks}>
                <a className={styles.directLink} href={`mailto:${SITE.links.email}`}>
                  <FaEnvelope aria-hidden="true" /> {SITE.links.email}
                </a>
                <a
                  className={styles.directLink}
                  href={SITE.links.telegram}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaTelegramPlane aria-hidden="true" /> @H1xlBit
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className={styles.formWrap} delay={0.1}>
            <ShineBorder>
            <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="cf-name" className={styles.label}>
                  {c.name}
                </label>
                <input
                  id="cf-name"
                  name="from_name"
                  className={styles.input}
                  value={values.from_name}
                  onChange={onChange}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.from_name)}
                  aria-describedby={errors.from_name ? 'cf-name-err' : undefined}
                />
                {errors.from_name && (
                  <span id="cf-name-err" className={styles.error}>
                    {errors.from_name}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="cf-email" className={styles.label}>
                  {c.email}
                </label>
                <input
                  id="cf-email"
                  type="email"
                  name="from_email"
                  className={styles.input}
                  value={values.from_email}
                  onChange={onChange}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.from_email)}
                  aria-describedby={errors.from_email ? 'cf-email-err' : undefined}
                />
                {errors.from_email && (
                  <span id="cf-email-err" className={styles.error}>
                    {errors.from_email}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="cf-msg" className={styles.label}>
                  {c.message}
                </label>
                <textarea
                  id="cf-msg"
                  name="message"
                  rows={5}
                  className={styles.textarea}
                  value={values.message}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'cf-msg-err' : undefined}
                />
                {errors.message && (
                  <span id="cf-msg-err" className={styles.error}>
                    {errors.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={status === 'sending'}
                iconRight={<FiSend aria-hidden="true" />}
              >
                {status === 'sending' ? c.sending : c.send}
              </Button>

              <div aria-live="polite" className={styles.status}>
                {status === 'success' && (
                  <span className={styles.success}>{c.success}</span>
                )}
                {status === 'error' && (
                  <span className={styles.errorMsg}>{c.error}</span>
                )}
              </div>
            </form>
            </ShineBorder>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
