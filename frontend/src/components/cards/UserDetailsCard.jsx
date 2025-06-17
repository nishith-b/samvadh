import React from "react";
import CharAvatar from "./CharAvatar";
const StatsInfo = ({ label, value }) => {
  return (
    <div className="text-center">
      <p className="font-medium text-gray-950">{value}</p>
      <p className="text-xs text-slate-700/80 mt-[2px]">{label}</p>
    </div>
  );
};

const UserDetailsCard = ({
  profileImageUrl,
  fullName,
  username,
  totalPollsVoted,
  totalPollsCreated,
  totalPollsBookmarked,
}) => {
  return (
    <div className="mt-16 overflow-hidden rounded-lg bg-slate-100/50">
      <div className="relative flex justify-center w-full h-32 bg-cover bg-profile-bg--img bg-sky-500">
        <div className="absolute overflow-hidden border-2 rounded-full -bottom-10 border-primary">
          {profileImageUrl ? (
            <img
              src={profileImageUrl || ""}
              alt="Profile Image "
              className="w-20 h-20 rounded-full bg-slate-400"
            />
          ) : (
            <CharAvatar
              fullName={fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
        </div>
      </div>
      <div className="px-5 mt-12">
        <div className="pt-1 text-center">
          <h5 className="text-lg font-medium leading-6 text-gray-950">
            {fullName}
          </h5>
          <span className="text-[13px] font-medium text-slate-700/60">
            @{username}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 my-6">
          <StatsInfo label="Polls Created" value={totalPollsCreated || 0} />
          <StatsInfo label="Polls Voted" value={totalPollsVoted || 0} />
          <StatsInfo
            label="Polls Bookmarked"
            value={totalPollsBookmarked || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
