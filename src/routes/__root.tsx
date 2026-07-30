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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-obsidian">
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
          <main className="min-h-screen bg-white pt-16 pb-16 md:pb-0">
            <Outlet />
          </main>
          <Footer />

          {/* Floating mobile CTA */}
          <div className="mobile-cta">
            <div className="mx-auto flex max-w-lg items-center gap-3">
              <Link to="/roi" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-xs font-medium text-gray-600 transition-colors hover:border-teal hover:text-teal">
                Calculate ROI
              </Link>
              <Link to="/demo" className="flex-1 rounded-lg bg-teal px-3 py-2 text-center text-xs font-bold text-obsidian transition-all hover:shadow-lg hover:shadow-teal/30">
                Try Live Demo
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
              // Scroll progress bar
              document.addEventListener('scroll', function() {
                var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var scrolled = (winScroll / height) * 100;
                var el = document.getElementById('scroll-progress');
                if (el) el.style.width = scrolled + '%';
              });
            `,
          }}
        />
      </body>
    </html>
  );
}