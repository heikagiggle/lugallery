import Access from "./components/home/access";
import Banner from "./components/home/banner";
import CareersAndPartners from "./components/home/careers-partners";
import FeaturedCollections from "./components/home/featured";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedCollections />
      <Access />
      <CareersAndPartners />
    </>
  );
}
