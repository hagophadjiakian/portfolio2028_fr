import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppShell from './AppShell';

export { ROUTE_META, PROFILE, pageTitle } from './data/site';

// Used only at build time by scripts/prerender.mjs to produce static HTML
// for every page, so search engines and link previews can read the content.
export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  );
}
