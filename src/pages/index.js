import Head from "next/head";
import Navbar from "@/components/global/Navbar";
import Hero from "@/components/global/Hero";
import Carousel from "@/components/global/Carousel";
import Company from "@/components/global/Company";
import ChatBot from "@/components/global/ChatBot";
import Footer from "@/components/global/Footer";
import ProtectedImage from "@/components/utilities/ProtectedImage";

const HomePage = () => {
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
        {/* <div className="flex justify-center mb-10">
          <ProtectedImage
            src="/thumb.png"
            className="w-full"
            alt="Dashboard"
            />
        </div> */}
        
        <Footer />
      </div>
    </>
  );
}

export default HomePage;