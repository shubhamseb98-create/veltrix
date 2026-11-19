import './globals.css';

export const metadata = {
  title: 'VELTRIX — Titanium Smartwatch',
  description: 'Pure 3D interactive scroll-driven horology showcase built with Next.js, Tailwind CSS and JavaScript.',
  icons: {
    icon: [
      { url: '/favicon.svg?v=3', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png?v=3' },
      { url: '/favicon.ico?v=3', sizes: 'any' },
      { url: '/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png?v=3" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png?v=3" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon.png?v=3" type="image/png" />
        <link rel="alternate icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
        <link rel="preload" href="/frames/frame_0001.webp?v=bluebg_v1" as="image" type="image/webp" />
      </head>
      <body className="bg-black text-slate-100 antialiased selection:bg-[#001d3d] selection:text-white">
        {children}
      </body>
    </html>
  );
}
