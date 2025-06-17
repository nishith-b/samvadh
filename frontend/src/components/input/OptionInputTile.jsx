import React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const OptionInputTile = ({ isSelected, label, onSelect }) => {
  const getColors = () => {
    if (isSelected) return "text-white bg-sky-500 border-sky-400";
    return "text-black bg-slate-200/80 border-slate-200";
  };

  return (
    <button
      className={`w-full flex items-center gap-2 px-3 py-2 mb-3 border rounded-md transition-colors duration-200 ${getColors()}`}
      onClick={onSelect}
    >
      {isSelected ? (
        <MdRadioButtonChecked className="text-lg text-white" />
      ) : (
        <MdRadioButtonUnchecked className="text-lg text-slate-500" />
      )}
      <span className="text-[13px] font-medium">{label}</span>
    </button>
  );
};

export default OptionInputTile;
