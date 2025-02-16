import React from "react";

import Header from "../partials/headers/Header";
import HeroHome from "../partials/HeroHome";
import FeaturesBlocks from "../partials/FeaturesBlocks";
import Footer from "../partials/footer/Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-100 dark:bg-uci ">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <HeroHome />
        <FeaturesBlocks />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;
