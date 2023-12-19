/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onFileChange }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUploadedImage(reader.result);
        onFileChange(file);
      };

      reader.readAsDataURL(file);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <div className="border-2 bg-slate-300 border-dashed border-slate-900 rounded-md cursor-pointer ">
      {!uploadedImage ? (
        <div {...getRootProps()} className="p-8">
          <input {...getInputProps()} />
          <p>Add Product Image</p>
        </div>
      ) : (
        <div className="relative">
          <img src={uploadedImage} alt="Uploaded" width="200" />
          <button
            onClick={() => {
              setUploadedImage(null);
              onFileChange(null);
            }}
            className="absolute top-0 right-0 cursor-pointer"
          >
            <RxCross2 className="text-3xl bg-white text-red-500 " />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
