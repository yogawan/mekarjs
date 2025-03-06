import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";

const FooterOrganism = () => {
  const [footers, setFooters] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterContent = async () => {
      setStatus("loading");
      try {
        const response = await axios.get("/api/dummy/footer");
        setFooters(Array.isArray(response.data.footer) ? response.data.footer : []);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchFooterContent();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <Icon icon="line-md:loading-twotone-loop" width="24" height="24" className="text-black" />
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <footer className="bg-primary text-black pt-20 pb-5 mt-5 rounded-t-3xl">
      <div className="w-full">
        <div className="flex flex-wrap justify-center xl:justify-center xl:pl-[128px] xl:pr-[128px]">
          {/* Logo */}
          <div className="w-[128px] xl:w-[256px] m-5">
            <ul>
              <ProtectedImageAtom src="/favicon/F2B.png" alt="image" className="w-32 animate-spin360" />
            </ul>
          </div>

          {/* Content */}
          {footers.map((section, index) => (
            <div key={index} className="w-full xl:w-[256px] p-7">
              <h1 className="text-3xl font-light tracking-4p xl:tracking-4p text-black mb-4 leading-none">
                {section.title}
              </h1>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="flex justify-between items-center pb-3 mb-3 border-b border-black/15 xl:border-none text-black/50 hover:text-black transition-colors">
                    <a href={link.href}>{link.label}</a>
                    <Icon icon="ri:arrow-right-up-line" width="18" height="18" className="ml-3 text-black" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-black/15 pt-4 text-center text-sm">
          <p className="text-black/50">
            &copy; {new Date().getFullYear()} Yogawan Office Familly. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterOrganism;
