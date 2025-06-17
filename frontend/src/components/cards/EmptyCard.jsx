import React from "react";

const EmptyCards = ({ imgSrc, message, btnText, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 mt-6 rounded-lg bg-gray-100/50">
      <img src={imgSrc} alt="No notes" className="w-36 md:w-48" />
      <p className="w-2/3 text-xs md:text-[14px] text-slate-900 text-center py-6">
        {message}
      </p>
      {btnText && (
        <button className="px-6 py-2 btn-small mt-7" onClick={onClick}>
          {btnText}
        </button>
      )}
    </div>
  );
};

export default EmptyCards;
