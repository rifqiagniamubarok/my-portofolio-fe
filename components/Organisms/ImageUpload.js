import { useDropzone } from 'react-dropzone';
import { AiOutlineFileImage } from 'react-icons/ai';

function ImageUpload({ onImageUpload }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      onImageUpload(file);
    },
  });

  return (
    <div {...getRootProps()} className=" h-52 aspect-video bg-primary rounded-md flex flex-col justify-center items-center  text-6xl cursor-pointer text-white">
      <input {...getInputProps()} className="" />

      <AiOutlineFileImage />
      <p className="text-sm">Click or drag n drop here</p>
    </div>
  );
}

export default ImageUpload;
