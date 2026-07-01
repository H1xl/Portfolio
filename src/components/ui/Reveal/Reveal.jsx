import { motion, useReducedMotion } from 'framer-motion';

// Появление контента при попадании в область просмотра.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  once = true,
  className,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
