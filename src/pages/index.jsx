import Head from "next/head";
import NavbarOrganism from "@/components/organisms/NavbarOrganism";
import HeroOrganism from "@/components/organisms/HeroOrganism";
import FooterOrganism from "@/components/organisms/FooterOrganism";
import CompanyOrganism from "@/components/organisms/CompanyOrganism";
import CSOrganism from "@/components/organisms/CSOrganism";
// import LocationCardOrganism from "@/components/organisms/LocationCardOrganism";
import GalleryOrganism from "@/components/organisms/GalleryOrganism";

export default function Home() {
  return (
    <>
      <Head>
        <title>MekarJS</title>
      </Head>
      <div>
        <NavbarOrganism></NavbarOrganism>
        <GalleryOrganism></GalleryOrganism>
        <HeroOrganism></HeroOrganism>
        <CompanyOrganism></CompanyOrganism>
        {/* <LocationCardOrganism></LocationCardOrganism> */}
        <CSOrganism></CSOrganism>
        <FooterOrganism></FooterOrganism>
      </div>
    </>
  );
}
