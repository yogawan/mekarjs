import { useRef } from "react";
import { Icon } from "@iconify/react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";

const images = [
  "/gallery/01.png",
  "/gallery/02.png",
  "/gallery/03.png",
  "/gallery/04.png",
  "/gallery/02.png",
  "/gallery/03.png",
];

const GalleryCard = ({ src }) => (
  <div className="w-[340px] h-fit m-3 overflow-hidden rounded-xl shrink-0 border border-gray-300">
    <ProtectedImageAtom src={src} alt="Gallery Image" className="w-full h-full object-cover" />
  </div>
);

const GalleryOrganism = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* <p className="mb-3 text-black text-center text-3xl font-medium">~ Gallery Kami</p> */}
      <div className="flex items-center">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md ml-2"
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" className="text-black" />
        </button>
        
        {/* Image List */}
        <div
          ref={scrollRef}
          className="mb-5 flex overflow-x-auto space-x-3 p-3 scrollbar-hide"
        >
          {images.map((src, index) => (
            <GalleryCard key={index} src={src} />
          ))}
        </div>
        
        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md mr-2"
        >
          <Icon icon="mdi:chevron-right" width="24" height="24" className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default GalleryOrganism;
