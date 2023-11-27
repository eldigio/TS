import { DetailedHTMLProps, ImgHTMLAttributes, ReactNode } from "react";
import { useImage } from "react-image";

const ImageWithFallback = ({
  url,
  fallback,
  imgProps,
}: {
  url: string;
  fallback: ReactNode;
  imgProps?: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
}) => {
  const { src, isLoading } = useImage({
    srcList: url,
    useSuspense: false,
  });
  return isLoading ? fallback : <img src={src} alt="photo" {...imgProps} />;
};

export default ImageWithFallback;
