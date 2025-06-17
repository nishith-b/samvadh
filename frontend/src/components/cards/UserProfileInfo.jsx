import React from "react";
import CharAvatar from "./CharAvatar";
import moment from "moment";

const UserProfileInfo = ({ imgUrl, fullName, username, createdAt }) => {
  return (
    <div className="flex items-center gap-4">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="profile-image"
          className="w-12 h-12 border-none rounded-full "
        />
      ) : (
        <CharAvatar fullName={fullName} style="text-[13px]" />
      )}
      <div>
        <p className="text-sm font-medium leading-4 text-black">
          {fullName} <span className="mx-1 text-sm text-slate-500">.</span>
          <span className="text-[10px] text-sm text-slate-500 ">
            {""}
            {createdAt && moment(createdAt).fromNow()}
          </span>
        </p>
        <span className="text-[11.5px] text-slate-500 leading-4">
          @{username}
        </span>
      </div>
    </div>
  );
};

export default UserProfileInfo;
