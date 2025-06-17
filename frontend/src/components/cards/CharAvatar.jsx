import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => {
  const defaultWidth = width || "w-12";
  const defaultHeight = height || "h-12";

  return (
    <div
      className={`${defaultWidth} ${defaultHeight} ${style || ""} 
      flex items-center justify-center 
      rounded-full text-gray-900 font-medium bg-gray-100
      aspect-square`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
