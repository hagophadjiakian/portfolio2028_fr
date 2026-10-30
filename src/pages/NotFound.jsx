import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="min-h-[70vh] flex items-center justify-center px-4 pt-24 text-center">
    <div>
      <p className="text-coral font-mono mb-2">404</p>
      <h1 className="text-4xl font-bold mb-4 gradient-text">Page not found</h1>
      <p className="text-muted mb-8">This page doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary inline-block">
        Back to home
      </Link>
    </div>
  </section>
);

export default NotFound;
