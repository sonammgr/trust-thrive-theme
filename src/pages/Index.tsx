import Header from "@/components/Header";
import TrustBadges from "@/components/TrustBadges";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import { products, reviews } from "@/data/products";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TrustBadges />
      <Header />
      <main className="flex-1">
        <HeroSection heroImage={heroImage} />
        <FeaturedProducts products={products} />
        <CustomerReviews reviews={reviews} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
