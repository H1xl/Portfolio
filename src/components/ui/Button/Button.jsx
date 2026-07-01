import styles from './Button.module.scss';

// Полиморфная кнопка: as="button" | "a" | Link (react-router).
export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  className = '',
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[variant],
    size !== 'md' && styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const typeProp = Tag === 'button' ? { type: rest.type || 'button' } : {};

  return (
    <Tag className={classes} {...typeProp} {...rest}>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children && <span>{children}</span>}
      {iconRight && (
        <span className={styles.icon} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Tag>
  );
}
