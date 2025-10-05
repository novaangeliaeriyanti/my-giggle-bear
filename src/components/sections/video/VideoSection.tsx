"use client";
import { videoSection } from "@/data/homepage";
import Image from "next/image";

const VideoSection = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col gap-3 container mx-auto p-2">
        <div className="relative flex flex-col lg:flex-row items-center gap-2 bg-blue-sky card-rounded bg-primary-50 bg-[url(/images/icons/grid-line.png)] bg-cover bg-center overflow-visible px-8 py-10">
          <div className="absolute left-4 -top-1 w-12 h-12 md:w-24 md:h-24 lg:w-32 lg:h-32">
            <Image
              src={videoSection.icon}
              alt="Voucher Icon"
              width={150}
              height={150}
              className="object-contain animate-float"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="text-heading-1 font-bold mb-1 mt-1.5 text-stroke-3 text-secondary logo">
              {videoSection.title}
            </h3>
            <p className="text-description mb-2">
              {videoSection.description}
            </p>
          </div>
          <div className="flex-1 aspect-video">
            <div className="aspect-video w-full relative">
              <video
                src={videoSection.videoSrc}
                controls
                muted
                loop
                playsInline
                poster={videoSection.poster}
                className="w-full h-full object-cover card-rounded"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
