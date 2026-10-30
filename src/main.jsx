import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Self-hosted fonts (no request to Google Fonts, no render blocking)
import '@fontsource-variable/inter';
import '@fontsource/fira-code/400.css';
import '@fontsource/fira-code/500.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/400-italic.css';
import './index.css';

import AppShell from './AppShell';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </React.StrictMode>
);

const container = document.getElementById('root');

// Pages are prerendered at build time (scripts/prerender.mjs): hydrate them.
// In development the container is empty, so render normally.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
