import { Icon } from "@iconify/react";
import ProtectedImageAtom from "@/components/atoms/ProtectedImageAtom";

const branches = [
  {
    name: "Mekar Jaya Stone Crusher Cabang 1",
    mapLink: "https://maps.app.goo.gl/dHvLqaSS1iWpCG986",
  },
  {
    name: "Mekar Jaya Stone Crusher Cabang 2",
    mapLink: "https://maps.app.goo.gl/bmGK3rAyWBb4j1LY6",
  },
  {
    name: "Mekar Jaya Stone Crusher Cabang 3",
    mapLink: "https://maps.app.goo.gl/Eebon24dMnsKvCfK9",
  },
];

const BranchCard = ({ name, mapLink }) => (
  <div className="w-[340px] h-[340px] m-3 p-10 border border-black/15 rounded-3xl shrink-0">
    {/* Logo */}
    <div className="flex justify-center mb-5">
      {/* <ProtectedImageAtom
        src="/favicon/F1.png"
        alt="hero_image"
        className="w-16 animate-spin360"
      /> */}
      <Icon icon="fa6-solid:map-location" width="64" height="64" className="text-primary"/>
    </div>

    {/* Cabang */}
    <div className="flex justify-between items-center">
      <Icon icon="mdi:location" width="24" height="24" className="text-black mt-3" />
      <p className="w-[80%] mb-5 mt-10 leading-none text-black text-xl font-medium">
        {name}
      </p>
    </div>

    {/* Button */}
    <div className="flex justify-between p-5 border border-black/15 text-black w-full rounded-full">
      <a href={mapLink} className="text-xl text-black font-light">
        Lihat di Maps
      </a>
      <Icon icon="lucide:arrow-up-right" width="24" height="24" />
    </div>
  </div>
);

const LocationCardOrganism = () => {
  return (
    <div className="mt-5">
      <p className="mb-3 text-black text-center text-3xl font-medium">~ Cabang Kami</p>
      <div className="mb-5 flex flex-wrap justify-center">
        {branches.map((branch, index) => (
          <BranchCard key={index} name={branch.name} mapLink={branch.mapLink} />
        ))}
      </div>
    </div>
  );
};

export default LocationCardOrganism;