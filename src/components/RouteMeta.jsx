import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_META, PROFILE, pageTitle } from '../data/site';

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// Keeps the tab title, description and canonical URL in sync with the page.
const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname];
    if (!meta) return;
    const title = pageTitle(meta.title);
    const url = `${PROFILE.siteUrl}${pathname === '/' ? '/' : pathname}`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [pathname]);

  return null;
};

export default RouteMeta;
