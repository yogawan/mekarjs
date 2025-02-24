import Head from "next/head";
import NavbarOrganism from "@/components/organisms/NavbarOrganism";
import HeroOrganism from "@/components/organisms/HeroOrganism";
import { Icon } from "@iconify/react";
import ProtectedImageAtom from "@/components/atoms/ProtectedImageAtom";
import FooterOrganism from "@/components/organisms/FooterOrganism";
import CompanyOrganism from "@/components/organisms/CompanyOrganism";

export default function Home() {
  return (
    <>
      <Head>
        <title>MekarJS</title>
      </Head>
      <div>
        <NavbarOrganism></NavbarOrganism>
        <HeroOrganism></HeroOrganism>
        <CompanyOrganism></CompanyOrganism>
        <p className="mb-3 text-black text-center text-3xl font-medium">~ Cabang Kami</p>
        <div className="mb-5 flex flex-wrap justify-center">

          <div className="w-[340px] h-[340px] m-3 p-10 border border-black/15 rounded-3xl">

            {/* Logo */}
            <div className="flex justify-center mb-5">
              <ProtectedImageAtom 
                src="/favicon/F1.png" 
                alt="hero_image" 
                className="w-16 animate-spin360" 
              />
            </div>

            {/* Cabang */}
            <div className="flex justify-between items-center">
              <Icon icon="mdi:location" width="24" height="24" className="text-black mt-3"/>
              <p className="w-[80%] mb-5 mt-10 leading-none text-black text-xl font-medium">Mekar Jaya Stone Crusher Cabang 1</p>
            </div>

            {/* Button */}
            <div className="flex justify-between p-5 border border-black/15 text-black w-full rounded-full">
              <a href="https://maps.app.goo.gl/dHvLqaSS1iWpCG986" className="text-xl text-black font-light">Lihat di Maps</a>
              <Icon icon="lucide:arrow-up-right" width="24" height="24" />
            </div>

          </div>

          <div className="w-[340px] h-[340px] m-3 p-10 border border-black/15 rounded-3xl">

            {/* Logo */}
            <div className="flex justify-center mb-5">
              <ProtectedImageAtom 
                src="/favicon/F1.png" 
                alt="hero_image" 
                className="w-16 animate-spin360" 
              />
            </div>

            {/* Cabang */}
            <div className="flex justify-between items-center">
              <Icon icon="mdi:location" width="24" height="24" className="text-black mt-3"/>
              <p className="w-[80%] mb-5 mt-10 leading-none text-black text-xl font-medium">Mekar Jaya Stone Crusher Cabang 2</p>
            </div>

            {/* Button */}
            <div className="flex justify-between p-5 border border-black/15 text-black w-full rounded-full">
              <a href="https://maps.app.goo.gl/bmGK3rAyWBb4j1LY6" className="text-xl text-black font-light">Lihat di Maps</a>
              <Icon icon="lucide:arrow-up-right" width="24" height="24" />
            </div>
            
          </div>

          <div className="w-[340px] h-[340px] m-3 p-10 border border-black/15 rounded-3xl">

            {/* Logo */}
            <div className="flex justify-center mb-5">
              <ProtectedImageAtom 
                src="/favicon/F1.png" 
                alt="hero_image" 
                className="w-16 animate-spin360" 
              />
            </div>

            {/* Cabang */}
            <div className="flex justify-between items-center">
              <Icon icon="mdi:location" width="24" height="24" className="text-black mt-3"/>
              <p className="w-[80%] mb-5 mt-10 leading-none text-black text-xl font-medium">Mekar Jaya Stone Crusher Cabang 3</p>
            </div>

            {/* Button */}
            <div className="flex justify-between p-5 border border-black/15 text-black w-full rounded-full">
              <a href="https://maps.app.goo.gl/Eebon24dMnsKvCfK9" className="text-xl text-black font-light">Lihat di Maps</a>
              <Icon icon="lucide:arrow-up-right" width="24" height="24" />
            </div>
            
          </div>
        </div>
        <FooterOrganism></FooterOrganism>
      </div>
    </>
  );
}
