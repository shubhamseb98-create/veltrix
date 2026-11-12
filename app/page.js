import MotionProvider from '@/components/MotionProvider';
import WebsiteLoader from '@/components/WebsiteLoader';
import Navbar from '@/components/Navbar';
import WatchScrollCanvas from '@/components/WatchScrollCanvas';
import ColorScrollerSection from '@/components/ColorScrollerSection';
import ProductsSection from '@/components/ProductsSection';
import WatchFacesSection from '@/components/WatchFacesSection';
import InteractiveSpecsSection from '@/components/InteractiveSpecsSection';
import ClientVideosSection from '@/components/ClientVideosSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <MotionProvider>
      <main className="min-h-screen bg-black text-slate-100">
        <WebsiteLoader />
        <Navbar />
        <WatchScrollCanvas />
        <ColorScrollerSection />
        <ProductsSection />
        <WatchFacesSection />
        <InteractiveSpecsSection />
        <ClientVideosSection />
        <Footer />
      </main>
    </MotionProvider>
  );
}
