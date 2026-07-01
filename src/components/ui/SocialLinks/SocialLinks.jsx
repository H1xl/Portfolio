import {
  FaGithub,
  FaTelegramPlane,
  FaEnvelope,
  FaLinkedinIn,
} from 'react-icons/fa';
import { SITE } from '../../../data/config';
import styles from './SocialLinks.module.scss';

const items = [
  { key: 'github', href: SITE.links.github, label: 'GitHub', Icon: FaGithub, external: true },
  {
    key: 'telegram',
    href: SITE.links.telegram,
    label: 'Telegram',
    Icon: FaTelegramPlane,
    external: true,
  },
  {
    key: 'linkedin',
    href: SITE.links.linkedin || '#',
    label: 'LinkedIn',
    Icon: FaLinkedinIn,
    external: true,
  },
  {
    key: 'email',
    href: `mailto:${SITE.links.email}`,
    label: 'Email',
    Icon: FaEnvelope,
    external: false,
  },
];

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`${styles.socials} ${className}`.trim()}>
      {items.map(({ key, href, label, Icon, external }) => (
        <a
          key={key}
          className={styles.link}
          href={href}
          aria-label={label}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
