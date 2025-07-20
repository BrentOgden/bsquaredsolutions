// src/components/HashScroll.jsx
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HashScroll() {
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      // strip the ‘#’ and find the element
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [hash, pathname]);

  return null;
}
