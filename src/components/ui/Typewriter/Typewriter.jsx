import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// Печатает текст по буквам при монтировании (и при смене текста, напр. языка).
export default function Typewriter({ text, speed = 95, startDelay = 300, className }) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : '');

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return undefined;
    }
    setOut('');
    let i = 0;
    let timer;
    const start = setTimeout(function tick() {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) {
        timer = setTimeout(tick, speed);
      }
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay, reduce]);

  return (
    <span className={className} aria-label={text}>
      {out}
    </span>
  );
}
