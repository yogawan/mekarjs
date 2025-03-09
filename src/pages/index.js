import Head from "next/head";
import Navbar from "@/components/company/Navbar";
import Hero from "@/components/company/Hero";
import Carousel from "@/components/company/Carousel";
import Company from "@/components/company/Company";
import ChatBot from "@/components/company/ChatBot";
import Footer from "@/components/company/Footer";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>MekarJS</title>
      </Head>
      <div>
        <Navbar/>
        <Carousel/>
        <Hero/>
        <Company/>
        <ChatBot/>
        <Footer/>
      </div>
    </>
  );
}

export default HomePage;