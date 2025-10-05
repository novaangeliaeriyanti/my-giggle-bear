"use client";
import { videoSection } from "@/data/homepage";

const VideoSection = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col gap-3 container mx-auto p-2">
        <div className="flex flex-col lg:flex-row items-center gap-2 bg-blue-sky rounded-3xl bg-primary-50 bg-[url(/images/icons/grid-line.png)] bg-cover bg-center overflow-visible px-8 py-10">
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
                className="w-full h-full object-cover rounded-3xl"
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
