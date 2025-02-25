import React from "react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";

const companyLogos = [
  "/company/01.png",
  "/company/02.png",
  "/company/03.png",
  "/company/04.png",
  "/company/05.png",
  "/company/06.png",
];

const CompanyLogos = () => {
  return (
    <div className="mb-10 relative w-full overflow-hidden bg-background py-4">
      <div className="flex w-max animate-scroll gap-16 xl:gap-32">
        {[...companyLogos, ...companyLogos,  ...companyLogos,  ...companyLogos,  ...companyLogos,  ...companyLogos,  ...companyLogos].map((src, index) => (
          <ProtectedImageAtom key={index} src={src} alt="company" className="h-16" />
        ))}
      </div>
    </div>
  );
};

export default CompanyLogos;
