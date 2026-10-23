// Public navigation is coordinated once, above Routes, by RouteTransition.
// Keep page wrappers lightweight so page content never waits on a fake loader.
export default function PageTransition({ children }) {
  return children;
}
