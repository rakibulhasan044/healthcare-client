"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

// ─── Shared variants ─────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ─── Utility props ────────────────────────────────────────────────────────────

interface AnimateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// ─── FadeUp wrapper ───────────────────────────────────────────────────────────

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: AnimateProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeIn wrapper ───────────────────────────────────────────────────────────

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimateProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeLeft wrapper ─────────────────────────────────────────────────────────

export function FadeLeft({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: AnimateProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeLeft}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeRight wrapper ────────────────────────────────────────────────────────

export function FadeRight({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: AnimateProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeRight}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// ─── ScaleIn wrapper ──────────────────────────────────────────────────────────

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimateProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer — animates children one-by-one ─────────────────────────

export function StaggerContainer({
  children,
  className,
  delay = 0,
  once = true,
}: AnimateProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem — child of StaggerContainer ─────────────────────────────────

export function StaggerItem({
  children,
  className,
  duration = 0.55,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ duration, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// ─── HoverCard — subtle lift on hover ────────────────────────────────────────

export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// ─── PageTransition — wraps page content ─────────────────────────────────────

export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
