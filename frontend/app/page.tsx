"use client";
import Access from "./components/home/access";
import Banner from "./components/home/banner";
import CareersAndPartners from "./components/home/careers-partners";
import FeaturedCollections from "./components/home/featured";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import { FeedbackModal } from "./components/modal";
import { menu } from "./components/utils/data";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Get all user paths except login
    const allowedPaths = menu
      .filter((item) => item.path !== "/login")
      .map((item) => item.path);

    if (!allowedPaths.includes(window.location.pathname)) return;

    // Show modal after 5 minutes (300000ms)
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // the current code, the modal will only show once per page load after 5 minutes. It won’t repeat every 3 minutes automatically.

  return (
    <>
      <Navigation />
      <Banner />
      <FeaturedCollections />
      <Access />
      <CareersAndPartners />
      <Footer />
      {/* Render feedback modal if showModal is true */}
      {showModal && (
        <FeedbackModal open={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
