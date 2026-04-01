import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ShopByCategory from "@/components/home/ShopByCategory";
import EditorialBreak from "@/components/home/EditorialBreak";
import HeritageSection from "@/components/home/HeritageSection";
import BestsellersSection from "@/components/home/BestsellersSection";
import ValuePropositions from "@/components/home/ValuePropositions";
import FitFinderCTA from "@/components/home/FitFinderCTA";
import ReviewsSection from "@/components/home/ReviewsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";

export default function Home() {
  return (
    <div className="relative z-[2]">
      <HeroSection />
      <TrustBar />
      <ShopByCategory />
      <EditorialBreak
        image="/images/805838_813838_535_16175.jpg"
        alt="Swing collection editorial"
      />
      <HeritageSection />
      <BestsellersSection />
      <EditorialBreak
        image="/images/205225_280225_722_22719.jpg"
        alt="Lovely Lotus collection"
      />
      <ValuePropositions />
      <FitFinderCTA />
      <ReviewsSection />
      <NewsletterSection />
      <NewArrivalsSection />
    </div>
  );
}
