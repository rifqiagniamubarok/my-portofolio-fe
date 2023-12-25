import { Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineImageNotSupported } from 'react-icons/md';

const ImageCustom = ({ ...others }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFail, setIsFail] = useState(false);
  const handleLoading = (e) => {
    setIsLoading(false);
  };

  const handleFail = (e) => {
    setIsFail(true);
  };

  return (
    <>
      {isFail && (
        <div className="w-full h-full bg-gray-400 flex justify-center items-center">
          <MdOutlineImageNotSupported />
        </div>
      )}
      {isLoading && <Skeleton className="w-full h-full" />}
      {!isFail && <Image onLoad={handleLoading} onError={handleFail} {...others} />}
    </>
  );
};

export default ImageCustom;
