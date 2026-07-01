import styles from './Tag.module.scss';

export default function Tag({ children, className = '' }) {
  return <span className={`${styles.tag} ${className}`.trim()}>{children}</span>;
}
