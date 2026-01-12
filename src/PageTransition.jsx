import React, { useEffect, useState } from "react";
import PageLoader from "./PageLoader";

function PageTransition({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // matches fade duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader isVisible={loading} />

      <div
        className={`
          transition-opacity duration-500 ease-in-out
          ${loading ? "opacity-0" : "opacity-100"}
        `}
      >
        {children}
      </div>
    </>
  );
}

export default PageTransition;