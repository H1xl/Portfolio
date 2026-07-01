import { useRef, useEffect, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiReactquery,
  SiSass,
  SiTailwindcss,
  SiFramer,
  SiVite,
  SiDocker,
  SiPostgresql,
} from 'react-icons/si';

import styles from './IconCloud.module.scss';

// Иконки для 3D-облака (color: null → цвет темы).
const ICONS = [
  { Icon: FaReact, color: '#3ac6e6' },
  { Icon: SiTypescript, color: '#3178c6' },
  { Icon: SiJavascript, color: '#e8b911' },
  { Icon: FaHtml5, color: '#e34f26' },
  { Icon: FaCss3Alt, color: '#1572b6' },
  { Icon: SiNextdotjs, color: null },
  { Icon: FaNodeJs, color: '#539e43' },
  { Icon: SiSass, color: '#cc6699' },
  { Icon: SiTailwindcss, color: '#06b6d4' },
  { Icon: SiRedux, color: '#764abc' },
  { Icon: SiReactquery, color: '#ff4154' },
  { Icon: SiFramer, color: '#0055ff' },
  { Icon: FaGitAlt, color: '#f05032' },
  { Icon: FaGithub, color: null },
  { Icon: SiVite, color: '#646cff' },
  { Icon: SiDocker, color: '#2496ed' },
  { Icon: SiPostgresql, color: '#4169e1' },
  { Icon: FaFigma, color: '#f24e1e' },
];

// Равномерное распределение точек по сфере (Фибоначчи).
function fibonacciSphere(n) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i += 1) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

export default function IconCloud() {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const base = useMemo(() => fibonacciSphere(ICONS.length), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let radius = container.clientWidth * 0.4;
    let yaw = 0.5;
    let pitch = -0.2;
    let velYaw = 0.0035;
    let velYawTarget = 0.0035;
    let pitchTarget = -0.2;
    let raf = null;
    let running = false;

    const onResize = () => {
      radius = container.clientWidth * 0.4;
    };

    const project = () => {
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      for (let i = 0; i < base.length; i += 1) {
        const [bx, by, bz] = base[i];
        const x1 = bx * cosY + bz * sinY;
        const z1 = -bx * sinY + bz * cosY;
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2; // 0..1 (даль → близь)
        const el = iconRefs.current[i];
        if (el) {
          const scale = 0.55 + depth * 0.6;
          el.style.transform = `translate(-50%, -50%) translate3d(${(x1 * radius).toFixed(1)}px, ${(y2 * radius).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
          el.style.opacity = (0.35 + depth * 0.65).toFixed(3);
          el.style.zIndex = String(Math.round(depth * 100));
        }
      }
    };

    const loop = () => {
      velYaw += (velYawTarget - velYaw) * 0.05;
      pitch += (pitchTarget - pitch) * 0.05;
      yaw += velYaw;
      project();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };

    window.addEventListener('resize', onResize);
    project(); // первичная раскладка

    if (reduce) {
      return () => window.removeEventListener('resize', onResize);
    }

    // Крутим только когда облако в зоне видимости — экономит main-thread.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(container);

    const onMove = (e) => {
      const r = container.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      velYawTarget = 0.0035 + dx * 0.02;
      pitchTarget = -0.2 + dy * 0.5;
    };
    const onLeave = () => {
      velYawTarget = 0.0035;
      pitchTarget = -0.2;
    };
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [base, reduce]);

  return (
    <div className={styles.cloud} ref={containerRef} aria-hidden="true">
      <span className={styles.glow} />
      {ICONS.map((item, i) => {
        const { Icon } = item;
        return (
          <span
            key={i}
            ref={(el) => {
              iconRefs.current[i] = el;
            }}
            className={styles.icon}
            style={item.color ? { '--ic': item.color } : undefined}
          >
            <Icon />
          </span>
        );
      })}
    </div>
  );
}
