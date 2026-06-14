import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { 
    rel: "stylesheet", 
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&family=Rajdhani:wght@400;600&family=Space+Grotesk:wght@300;400;700&display=swap" 
  }
];

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}