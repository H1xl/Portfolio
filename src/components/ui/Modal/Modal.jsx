import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import styles from './Modal.module.scss';

const FOCUSABLE =
  'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

// Доступное модальное окно: фокус-ловушка, закрытие по Esc и клику по фону,
// блокировка прокрутки, возврат фокуса.
export default function Modal({
  isOpen,
  onClose,
  children,
  labelledBy,
  describedBy,
  closeLabel = 'Close',
}) {
  const panelRef = useRef(null);
  const lastFocused = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;
    lastFocused.current = document.activeElement;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      const focusable = panelRef.current?.querySelectorAll(FOCUSABLE);
      const target = focusable && focusable.length ? focusable[0] : panelRef.current;
      target?.focus();
    }, 20);

    return () => {
      body.style.overflow = prevOverflow;
      clearTimeout(timer);
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes || !nodes.length) return;
      const list = Array.from(nodes).filter(
        (n) => !n.disabled && n.offsetParent !== null
      );
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          <motion.div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label={closeLabel}
            >
              <FiX aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
