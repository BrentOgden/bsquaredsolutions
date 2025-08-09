// src/components/ScrollManager.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager({ behavior = 'auto' }) {
  const { pathname, search, hash } = useLocation();

  // Stop the browser from restoring a prior scroll position (back/forward/external)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => { window.history.scrollRestoration = prev; };
    }
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      if (!hash) return false;
      const selector = hash; // e.g. "#features"
      const id = hash.slice(1);
      const el = document.getElementById(id) || document.querySelector(selector);
      if (el) {
        // If you have a fixed navbar, add CSS on target: .scroll-offset { scroll-margin-top: 96px; }
        el.scrollIntoView({ behavior });
        return true;
      }
      return false;
    };

    // If there’s a hash, try immediately; if not found, retry until content mounts.
    if (hash) {
      if (scrollToHash()) return;
      let tries = 0;
      let rafId;
      const retry = () => {
        tries += 1;
        if (scrollToHash()) return;
        if (tries < 30) rafId = requestAnimationFrame(retry); // ~0.5s total
        else window.scrollTo({ top: 0, left: 0, behavior });  // fallback
      };
      rafId = requestAnimationFrame(retry);
      return () => cancelAnimationFrame(rafId);
    }

    // No hash: go to top on any route/search change
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, search, hash, behavior]);

  return null;
}
