import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAnimate, useReducedMotion } from "framer-motion";

const pages = {
  "/": ["01", "Home"],
  "/projects": ["02", "Projects"],
  "/about": ["03", "About"],
  "/certificates": ["04", "Certificates"],
  "/contact": ["05", "Contact"],
};

// Keep the previous route mounted until the curtain completely covers it.
export default function RouteTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const shownPath = useRef(location.pathname);
  const content = useRef(null);
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();
  const [number, title] = pages[location.pathname] || ["", "Jerry.dev"];

  useEffect(() => {
    if (shownPath.current === location.pathname) return;
    let cancelled = false;
    const animations = [];
    const run = (...args) => {
      const animation = animate(...args);
      animations.push(animation);
      return animation;
    };
    const contentElement = content.current;
    const overlayElement = scope.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    contentElement?.setAttribute("inert", "");
    const publicNavigation = pages[shownPath.current] && pages[location.pathname];

    async function transition() {
      try {
        if (publicNavigation) {
          overlayElement.style.visibility = "visible";
          if (reducedMotion) {
            await run(scope.current, { opacity: 1 }, { duration: 0.12 });
          } else {
            run(scope.current, { opacity: 1 }, { duration: 0 });
            run(".route-signal", { opacity: 0, y: 12 }, { duration: 0 });
            await run(".route-shutter", { scaleY: 1 }, {
              duration: 0.32, ease: [0.76, 0, 0.24, 1],
            });
            if (cancelled) return;
            run(".route-signal", { opacity: 1, y: 0 }, { duration: 0.18 });
            await run(".route-trace", { strokeDashoffset: [1, 0] }, {
              duration: 0.3, ease: "easeInOut",
            });
          }
        }
        if (cancelled) return;
        shownPath.current = location.pathname;
        setDisplayLocation(location);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        // Let React commit the destination before uncovering it.
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        if (cancelled) return;
        if (publicNavigation) {
          if (reducedMotion) {
            await run(scope.current, { opacity: 0 }, { duration: 0.12 });
          } else {
            run(".route-signal", { opacity: 0, y: -8 }, { duration: 0.16 });
            await run(".route-shutter", { scaleY: 0 }, {
              duration: 0.48, ease: [0.76, 0, 0.24, 1], delay: 0.04,
            });
          }
        }
        if (!cancelled) {
          overlayElement.style.visibility = "hidden";
          contentElement?.removeAttribute("inert");
          document.body.style.overflow = previousOverflow;
          const heading = contentElement?.querySelector("h1, h2");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
          }
        }
      } catch {
        if (!cancelled) {
          shownPath.current = location.pathname;
          setDisplayLocation(location);
          overlayElement.style.visibility = "hidden";
          contentElement?.removeAttribute("inert");
        }
      } finally {
        if (!cancelled) document.body.style.overflow = previousOverflow;
      }
    }
    transition();
    return () => {
      cancelled = true;
      animations.forEach(animation => animation.stop());
      overlayElement.style.visibility = "hidden";
      overlayElement.querySelectorAll(".route-shutter").forEach(panel => {
        panel.style.transform = "scaleY(0)";
      });
      contentElement?.removeAttribute("inert");
      document.body.style.overflow = previousOverflow;
    };
  }, [location, reducedMotion, animate, scope]);

  return (
    <>
      <div ref={content}>{children(displayLocation)}</div>
      <div ref={scope} className="route-transition" aria-hidden="true">
        <div className="route-shutter route-shutter-top" />
        <div className="route-shutter route-shutter-bottom" />
        <div className="route-signal">
          <div className="route-caption"><span>Jerry.dev</span><span>{number} / 05</span></div>
          <div className="route-title">{title}<span>.</span></div>
          <svg className="route-chart" viewBox="0 0 480 80" fill="none">
            <path className="route-trace-track" d="M0 64H90L120 42H190L225 54L280 18H340L370 30L415 8H480" />
            <path className="route-trace" pathLength="1" d="M0 64H90L120 42H190L225 54L280 18H340L370 30L415 8H480" />
          </svg>
          <div className="route-caption route-caption-bottom"><span>Ideas into interfaces</span><span>↗</span></div>
        </div>
      </div>
    </>
  );
}
