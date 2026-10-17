/** Read the shared CSS tokens so CSS, Motion, and Lenis use the same timing. */
export function getMotionTiming() {
  const styles = getComputedStyle(document.documentElement);
  const ease = styles
    .getPropertyValue("--ease-editorial")
    .trim()
    .slice("cubic-bezier(".length, -1)
    .split(",")
    .map(Number) as [number, number, number, number];

  const duration = styles.getPropertyValue("--motion-duration").trim();

  return {
    duration: parseFloat(duration) / (duration.endsWith("ms") ? 1000 : 1),
    ease,
  };
}
