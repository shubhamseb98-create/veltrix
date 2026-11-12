'use client';

import { MotionConfig } from 'motion/react';

/**
 * Provides global Motion configuration honoring OS reduced-motion preferences.
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

