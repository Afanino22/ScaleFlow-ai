import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  Link,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ScaleFlow AI — Your AI Receptionist That Never Sleeps" },
      {
        name: "description",
        content:
          "ScaleFlow AI builds AI Digital Employees for service-based businesses worldwide. 24/7 lead qualification, automated booking, and workflow automation for Dental, Legal, Real Estate & Automotive — from Birmingham to Boston.",
      },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScaleFlow AI" },
      { property: "og:title", content: "ScaleFlow AI — Your AI Receptionist That Never Sleeps" },
      {
        property: "og:description",
        content:
          "Answer enquiries 24/7, capture every lead, automate appointment booking, and reduce admin with intelligent AI receptionists built for service businesses.",
      },
      { property: "og:image", content: "https://scaleflow.ctonew.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://scaleflow.ctonew.app" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ScaleFlow AI — Your AI Receptionist That Never Sleeps" },
      {
        name: "twitter:description",
        content:
          "Answer enquiries 24/7, capture every lead, automate appointment booking, and reduce admin with intelligent AI receptionists built for service businesses.",
      },
      { name: "twitter:image", content: "https://scaleflow.ctonew.app/og-image.png" },
      // Verification / canonical
      { name: "robots", content: "index, follow" },
      { rel: "canonical", href: "https://scaleflow.ctonew.app" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
    scripts: [
      {
        src: "https://scripts.simpleanalyticscdn.com/latest.js",
        async: true,
        defer: true,
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0A0A0F]">
      <h1 className="text-6xl font-bold text-teal">404</h1>
      <p className="text-gray-400">This page doesn't exist.</p>
      <a href="/" className="btn-primary mt-4">
        Go Home
      </a>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
      return (
        <RootDocument>
          {/* Scroll Progress Bar */}
          <div className="scroll-progress" style={{ width: "0%" }} id="scroll-progress" />
          <Header />
          <main className="page-transition min-h-screen bg-[#0A0A0F] pt-16 pb-16 md:pb-0">
            <Outlet />
          </main>
          <Footer />

          {/* Floating mobile CTA */}
          <div className="mobile-cta">
            <div className="mx-auto flex max-w-lg items-center gap-3">
              <Link to="/roi" className="flex-1 rounded-lg border border-white/20 px-3 py-2 text-center text-xs font-medium text-gray-300 transition-colors hover:border-teal hover:text-teal">
                Calculate ROI
              </Link>
              <Link to="/demo" className="flex-1 rounded-lg bg-teal px-3 py-2 text-center text-xs font-bold text-obsidian transition-all hover:shadow-lg hover:shadow-teal/30">
                Book Demo
              </Link>
            </div>
          </div>
        </RootDocument>
      );
    }

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <noscript>
          <img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerPolicy="no-referrer-when-downgrade" />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ScaleFlow AI",
              url: "https://scaleflow.ctonew.app",
              description: "ScaleFlow AI builds AI Digital Employees for service-based businesses — 24/7 lead qualification, automated booking, and workflow automation.",
              email: "contact@scaleflowai.co.uk",
              telephone: "+44 7405 916374",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Birmingham",
                addressCountry: "UK",
              },
              sameAs: [],
            }),
          }}
        />
        <Scripts />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, t) {
                var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                v.onload = function() {
                  window.voiceflow.chat.load({
                    verify: { projectID: '6a58de413c23a62ca0e75559' },
                    url: 'https://general-runtime.voiceflow.com',
                    voice: {
                      url: "https://runtime-api.voiceflow.com"
                    }
                  });
                }
                v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
              })(document, 'script');

              // Scroll progress bar + parallax
              var glowEls = d.querySelectorAll('.ai-hero-glow, .parallax-slow, .parallax-fast');
              d.addEventListener('scroll', function() {
                var winScroll = d.body.scrollTop || d.documentElement.scrollTop;
                var height = d.documentElement.scrollHeight - d.documentElement.clientHeight;
                var scrolled = (winScroll / height) * 100;
                var el = d.getElementById('scroll-progress');
                if (el) el.style.width = scrolled + '%';

                // Parallax: shift background glow elements
                for (var i = 0; i < glowEls.length; i++) {
                  var speed = glowEls[i].classList.contains('parallax-fast') ? 0.15 : 0.05;
                  glowEls[i].style.transform = 'translateY(' + (winScroll * speed) + 'px)';
                }
              });

              // Intersection Observer for scroll reveal
              if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function(entries) {
                  entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('revealed');
                      observer.unobserve(entry.target);
                    }
                  });
                }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

                var revealEls = d.querySelectorAll('.reveal');
                for (var i = 0; i < revealEls.length; i++) {
                  observer.observe(revealEls[i]);
                }
              } else {
                // Fallback: show all immediately
                var fallbackEls = d.querySelectorAll('.reveal');
                for (var i = 0; i < fallbackEls.length; i++) {
                  fallbackEls[i].classList.add('revealed');
                }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}