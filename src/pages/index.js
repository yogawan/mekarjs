import Head from "next/head";
import Navbar from "@/components/global/Navbar";
import Hero from "@/components/global/Hero";
import Carousel from "@/components/global/Carousel";
import Company from "@/components/global/Company";
import ChatBot from "@/components/global/ChatBot";
import Footer from "@/components/global/Footer";

const MekarCorePage = () => {
  return (
    <>
      <Head>
        <title>MekarJS</title>
      </Head>
      <div>
        <Navbar />
        <Carousel />
        <Hero />
        <Company />
        <ChatBot />
        <Footer />
      </div>
    </>
  );
}

export default MekarCorePage;