import ProtectedImageAtom from "../atoms/ProtectedImageAtom";
import { Icon } from "@iconify/react";

const HeroOrganism = () => {
    return (
        <div className="mb-5 text-center">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <ProtectedImageAtom 
              src="/favicon/F2.png" 
              alt="hero_image" 
              className="w-32 animate-spin360" 
            />
          </div>

          <div className="flex justify-center">
            <div className="flex items-center rounded-full text-black p-3 border border-black/15 w-fit">
                <p className="mr-3 text-xs">PT. Mekar Jaya Sejahtera</p>
                <Icon icon="ion:business" width="24" height="24" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-5 font-medium text-black tracking-4p leading-75 mt-5 text-[36px] xs:text-5xl xs:leading-75 sm:text-7xl sm:leading-75 md:text-8xl md:leading-75 lg:text-8xl lg:leading-75 xl:text-8xl xl:leading-75">
            Menyediakan Material <br />Konstruksi Dengan <br />Kualitas Terbaik
          </h1>

          {/* Sub Headline */}
          <p className="mb-3 text-center text-black/50 text-xl">~ Kami adalah <u>Stone Crusher</u> Terbaik di <u>Kabupaten Klaten</u></p>

          <div className="mb-2 flex justify-center">
            <div className="flex item-center">
              <Icon icon="mdi:location" width="16" height="16" className="mr-1 text-black" />
              <a className="text-black text-xs" href="https://maps.app.goo.gl/dHvLqaSS1iWpCG986">MekarJS Cabang 1</a>
            </div>
            <div className="border border-black/15 ml-3 mr-2"></div>
            <div className="flex item-center">
              <Icon icon="mdi:location" width="16" height="16" className="mr-1 text-black" />
              <a className="text-black text-xs" href="https://maps.app.goo.gl/bmGK3rAyWBb4j1LY6">Cabang 2</a>
            </div>
            <div className="border border-black/15 ml-3 mr-2"></div>
            <div className="flex item-center">
              <Icon icon="mdi:location" width="16" height="16" className="mr-1 text-black" />
              <a className="text-black text-xs" href="https://maps.app.goo.gl/Eebon24dMnsKvCfK9">Cabang 3</a>
            </div>
          </div>

          {/* Button Call to Action */}
          <div className="flex flex-wrap justify-center">
            <div className="flex justify-between p-5 bg-primary text-black w-full sm:w-fit rounded-full m-2">
              <a href="" className="text-xl text-black font-light">Produk Kami</a>
              <Icon icon="lucide:arrow-up-right" width="24" height="24" />
            </div>
            <div className="flex justify-between p-5 border border-black/15 text-black w-full sm:w-fit rounded-full m-2">
              <a href="" className="text-xl text-black font-light">Tanya AI</a>
              <Icon icon="lucide:arrow-up-right" width="24" height="24" />
            </div>
          </div>

        </div>
    )
}

export default HeroOrganism;