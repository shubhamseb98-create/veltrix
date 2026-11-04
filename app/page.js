import WebsiteLoader from '@/components/WebsiteLoader';
import Navbar from '@/components/Navbar';
import WatchScrollCanvas from '@/components/WatchScrollCanvas';
import ColorScrollerSection from '@/components/ColorScrollerSection';
import ProductsSection from '@/components/ProductsSection';
import WatchFacesSection from '@/components/WatchFacesSection';
import HealthFeaturesSection from '@/components/HealthFeaturesSection';
import InteractiveSpecsSection from '@/components/InteractiveSpecsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <WebsiteLoader />
      <Navbar />
      <WatchScrollCanvas />
      <ColorScrollerSection />
      <ProductsSection />
      <WatchFacesSection />
      <HealthFeaturesSection />
      <InteractiveSpecsSection />
      <Footer />
    </main>
  );
}
