import React from "react";

const TrendingPolls = ({ stats }) => {
  return (
    <div className="sticky mt-6 overflow-hidden rounded-lg bg-slate-100/50 top-[80px] p-5">
      <h6 className="text-sm font-medium text-black">Trending Polls</h6>
      <div className="mt-4">
        {stats.map((item, index) => (
          <div
            key={item.label || index}
            className="flex items-center justify-between px-3 py-2 mb-1 rounded-lg cursor-pointer hover:bg-slate-300/30"
          >
            <p className="text-xs text-slate-900">{item.label}</p>
            <span className="text-xs rounded text-slate-600 py-[2px] px-4">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPolls;
