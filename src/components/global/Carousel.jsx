import React from "react";
import ProtectedImageAtom from "../utilities/ProtectedImage";

const companyLogos = [
  "/gallery/01.png",
  "/gallery/02.png",
  "/gallery/03.png",
  "/gallery/04.png",
];

const Carousel = () => {
  return (
    <div className="mt-20 mb-5 relative w-full overflow-hidden bg-background py-4">
      <div className="flex w-max animate-scrolll gap-3 xl:gap-8">
        {[...companyLogos, ...companyLogos,  ...companyLogos,  ...companyLogos,  ...companyLogos,  ...companyLogos,  ...companyLogos].map((src, index) => (
          <ProtectedImageAtom key={index} src={src} alt="company" className="w-80" />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
