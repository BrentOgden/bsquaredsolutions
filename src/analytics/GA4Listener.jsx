import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-YCJXYXPZY3";

export default function GA4Listener() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    if (import.meta.env && import.meta.env.DEV) return; // skip in dev if you want

    const page_path = location.pathname + location.search + location.hash;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path,
      send_to: GA_ID,
    });
  }, [location]);

  return null;
}
