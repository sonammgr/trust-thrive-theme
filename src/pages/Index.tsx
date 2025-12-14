import Header from "@/components/Header";
import TrustBadges from "@/components/TrustBadges";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const reviews = [
  {
    id: "1",
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely love my purchase! The quality is amazing for this price point. Shipped fast too!",
    date: "December 10, 2024",
    verified: true,
  },
  {
    id: "2",
    name: "James K.",
    rating: 5,
    text: "This has been a game changer. Quiet operation and the build quality is superb. Highly recommend!",
    date: "December 8, 2024",
    verified: true,
  },
  {
    id: "3",
    name: "Emily R.",
    rating: 4,
    text: "Great product that keeps me organized throughout the day. Love the design! Would buy again.",
    date: "December 5, 2024",
    verified: true,
  },
  {
    id: "4",
    name: "Michael T.",
    rating: 5,
    text: "Best purchase I've made. Quality exceeds expectations. Battery life is incredible for the price.",
    date: "December 3, 2024",
    verified: true,
  },
  {
    id: "5",
    name: "Lisa P.",
    rating: 5,
    text: "This actually works! Easy to use and feels premium. Seeing results after just 2 weeks of use!",
    date: "November 28, 2024",
    verified: true,
  },
  {
    id: "6",
    name: "David W.",
    rating: 4,
    text: "The product is helping me daily. Easy to use and feels premium. Very satisfied customer here!",
    date: "November 25, 2024",
    verified: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TrustBadges />
      <Header />
      <main className="flex-1">
        <HeroSection heroImage={heroImage} />
        <FeaturedProducts />
        <CustomerReviews reviews={reviews} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
