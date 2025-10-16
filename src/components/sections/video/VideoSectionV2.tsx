"use client";
import Title from "@/components/ui/Title";
import { videoSection } from "@/data/homepage";

const VideoSectionV2 = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col gap-3 container mx-auto p-2">
        <div className="relative flex flex-col lg:flex-row gap-4 card-rounded bg-center overflow-visible py-10">
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
          <div className="flex-1 flex flex-col gap-2">
            <Title text={videoSection?.title} splitIndex={2} />
            <span className="text-body mb-2">{videoSection.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSectionV2;
