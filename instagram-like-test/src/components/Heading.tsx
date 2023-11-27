import { User, randUser } from "@ngneat/falso";
import ImageWithFallback from "../utils/ImageWithFallback";

const { username, img }: User = randUser();

const Heading = () => {
  return (
    <div className="flex items-center">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <ImageWithFallback url={img} fallback={<div className="skeleton w-52 h-52"></div>} />
          <div className="card w-40 h-40 bg-base-300"></div>
        </div>
      </div>
      <div className="flex flex-col ml-10">
        <span className="font-bold">{username}</span>
        <div className="flex flex-col text-sm text-gray-500">
          <span>Lorem, ipsum.</span>
          <span>Lorem, ipsum.</span>
          <span>Lorem, ipsum.</span>
        </div>
      </div>
    </div>
  );
};

export default Heading;
