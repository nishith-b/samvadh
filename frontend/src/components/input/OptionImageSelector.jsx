import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";
import { jsx } from "react/jsx-runtime";

const OptionImageSelector = ({ imageList, setImageList }) => {
  //function to handle adding an image

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file && imageList.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        //Add object with base64 and file to the array
        setImageList([...imageList, { base64: reader.result, file }]);
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };
  //Function to handle deleting an image
  const handleDeleteImage = (index) => {
    const updatedList = imageList.filter((_, idx) => idx !== index);
    setImageList(updatedList);
  };
  return (
    <div>
      {imageList?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {imageList.map((item, index) => (
            <div key={index} className="relative rounded-md bg-gray-600/10">
              <img
                src={item.base64}
                alt={`Selected_${index}`}
                className="object-contain w-full rounded-md h-36"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute p-2 text-red-500 bg-gray-100 rounded-full top-2 right-2"
              >
                <HiOutlineTrash className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      )}

      {imageList.length < 4 && (
        <div className="flex items-center gap-5">
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleAddImage}
            className="hidden"
            id="imageInput"
          />
          <label
            htmlFor="imageInput"
            className="py-1 cursor-pointer btn-small text-nowrap"
          >
            <HiMiniPlus className="text-lg" />
            Select Image
          </label>
        </div>
      )}
    </div>
  );
};

export default OptionImageSelector;
