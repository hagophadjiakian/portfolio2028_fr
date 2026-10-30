import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import { yearsSinceInjury, yearsInTech } from '../data/site';

const motivationalQuotes = [
  'The body achieves what the mind believes.',
  'Every step forward is a victory.',
  "Resilience is not just surviving, it's thriving.",
];

const fullText = 'SCI Survivor • Engineer • Developer • Dreamer';

// The entrance animations on this page are plain CSS (animate-fade-up etc.),
// so the prerendered hero is visible and animates at first paint instead of
// waiting for JavaScript to load.
const Home = () => {
  const [typed, setTyped] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Typing effect. The not-yet-typed part is kept in place but invisible, so
  // the line never changes size and nothing below it moves while it types.
  useEffect(() => {
    if (typed >= fullText.length) return undefined;
    const timeout = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 400 : 80);
    return () => clearTimeout(timeout);
  }, [typed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: `${yearsSinceInjury()}+`, label: 'Years Fighting' },
    { value: `${yearsInTech()}+`, label: 'Years in Tech' },
    { value: '∞', label: 'Determination' },
  ];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-20 md:pt-28">
      <Hero3D />

      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary opacity-90" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Survivor Badge */}
        <div className="inline-block survivor-badge mb-5 animate-fade-up">
          <span className="text-coral font-medium flex items-center gap-2 text-sm md:text-base">
            <span className="text-hope" aria-hidden="true">✦</span>
            SCI Survivor Since 2013
            <span className="text-hope" aria-hidden="true">✦</span>
          </span>
        </div>

        {/* Profile photo (pre-cropped to the part shown in the frame) */}
        <div className="mb-5 animate-fade-up [animation-delay:100ms]">
          <div className="mx-auto w-32 h-44 sm:w-36 sm:h-48 lg:w-40 lg:h-56 [@media(max-height:820px)]:w-28 [@media(max-height:820px)]:h-36 rounded-3xl bg-gradient-to-br from-coral to-sky p-1 shadow-lg">
            <img
              src="/assets/images/survivor-hero.webp"
              alt="Portrait of Hagop Hadjiakian"
              className="w-full h-full rounded-[1.25rem] object-cover object-top bg-secondary"
              width="423"
              height="592"
              loading="eager"
            />
          </div>
        </div>

        <p className="text-sky text-lg mb-2 font-serif animate-fade-up [animation-delay:200ms]">Hello, I'm</p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl [@media(min-width:640px)_and_(max-height:820px)]:text-6xl font-bold leading-tight mb-4 animate-pop-in">
          <span className="gradient-text">Hagop</span>{' '}
          <br />
          <span className="text-white">Hadjiakian</span>
        </h1>

        <p className="text-lg md:text-xl text-muted mb-4 animate-fade-up [animation-delay:300ms]">
          {/* Screen readers get the full line at once instead of the typing effect */}
          <span className="sr-only">{fullText}</span>
          <span className="font-mono" aria-hidden="true">
            {fullText.slice(0, typed)}
            <span className="animate-pulse text-coral">|</span>
            <span className="typing-rest invisible">{fullText.slice(typed)}</span>
          </span>
        </p>

        {/* Rotating quote: all quotes share one grid cell, so the block keeps the
            height of the longest quote and the buttons below never jump. */}
        <div className="grid max-w-2xl mx-auto mb-6 animate-fade-up [animation-delay:400ms]">
          {motivationalQuotes.map((quote, i) => (
            <p
              key={quote}
              aria-hidden={i !== quoteIndex || undefined}
              className={`col-start-1 row-start-1 motivational-quote text-lg md:text-xl text-sky-light transition-opacity duration-700 ${
                i === quoteIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              "{quote}"
            </p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-up [animation-delay:500ms]">
          <Link to="/about" className="btn-primary inline-block">
            My Journey
          </Link>
          <Link to="/projects" className="btn-secondary inline-block">
            View Projects
          </Link>
        </div>

        {/* Stats */}
        <dl className="mt-10 flex flex-wrap justify-center gap-8 animate-fade-up [animation-delay:600ms]">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center flex flex-col-reverse">
              <dt className="text-muted text-sm mt-1">{stat.label}</dt>
              <dd className="text-3xl md:text-4xl font-bold gradient-text" suppressHydrationWarning>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral/10 rounded-full filter blur-3xl animate-pulse-slow motion-reduce:animate-none pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky/10 rounded-full filter blur-3xl animate-pulse-slow motion-reduce:animate-none pointer-events-none"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-hope/5 rounded-full filter blur-3xl animate-pulse-slow motion-reduce:animate-none pointer-events-none"
        style={{ animationDelay: '2s' }}
      />
    </section>
  );
};

export default Home;
