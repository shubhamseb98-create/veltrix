import './globals.css';

export const metadata = {
  title: 'VELTRIX // Titanium Smartwatch',
  description: 'Pure 3D interactive scroll-driven horology showcase built with Next.js, Tailwind CSS and JavaScript.',
  icons: {
    icon: [
      { url: '/favicon.png?v=2' },
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icon-192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=2', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="alternate icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="preload" href="/frames/frame_0001.webp" as="image" type="image/webp" />
      </head>
      <body className="bg-black text-slate-100 antialiased selection:bg-[#2C3480] selection:text-white">
        {children}
      </body>
    </html>
  );
}
