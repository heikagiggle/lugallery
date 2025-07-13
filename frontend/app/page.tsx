import Access from "./components/home/access";
import Banner from "./components/home/banner";
import CareersAndPartners from "./components/home/careers-partners";
import FeaturedCollections from "./components/home/featured";
import Navigation from "./components/navigation";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Banner />
      <FeaturedCollections />
      <Access />
      <CareersAndPartners />
      <Footer />
    </>
  );
}
