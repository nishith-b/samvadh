import moment from "moment";
import React from "react";
import CharAvatar from "../cards/CharAvatar";

const PollOptionVoteResult = ({ label, optionVotes, totalVotes }) => {
  //Calculate Progress Directly
  const progress =
    totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
  return (
    <div className="relative w-full h-6 mb-3 rounded-md bg-slate-200/80">
      <div
        className="h-6 rounded-md bg-sky-900/10"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-between text-gray-800 text-[12px] font-medium mx-4">
        {label}
        <span className="text-[11px] text-slate-500">{progress}%</span>
      </span>
    </div>
  );
};

const ImagePollResult = ({ key, imgUrl, optionVotes, totalVotes }) => {
  return (
    <div>
      <div className="flex items-center w-full gap-2 mb-4 overflow-hidden bg-gray-800 rounded-md">
        <img src={imgUrl} alt="" className="object-contain w-full h-36" />
      </div>
      <PollOptionVoteResult optionVotes={optionVotes} totalVotes={totalVotes} />
    </div>
  );
};

const OpenEndedPollResponse = ({
  profileImgUrl,
  userFullName,
  response,
  createdAt,
}) => {
  return (
    <div className="mb-8 ml-3">
      <div className="flex gap-3">
        {profileImgUrl ? (
          <img src={profileImgUrl} alt="" className="w-8 h-8 rounded-full" />
        ) : (
          <CharAvatar
            fullName={userFullName}
            style="w-8 h-8 text-[10px] bg-sky-800/40"
          />
        )}
        <p className="text-[13px] text-black">
          {userFullName}
          {""}
          <span className="mx-1 text-[10px] text-slate-500">.</span>
          <span className="text-[10px] text-slate-500">{createdAt}</span>
        </p>
      </div>
      <p className="text-xs text-slate-700 -mt-2 ml-[44px]">{response}</p>
    </div>
  );
};
const PollingResultContent = ({ type, options, voters, responses }) => {
  switch (type) {
    case "single-choice":
    case "yes/no":
    case "rating":
      return (
        <>
          {options.map((option, index) => (
            <PollOptionVoteResult
              key={option._id}
              label={`${option.optionText} ${type === "rating" ? "Star" : ""}`}
              optionVotes={option.votes}
              totalVotes={voters || 0}
            />
          ))}
        </>
      );
    case "image-based":
      return (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <ImagePollResult
              key={option._id}
              imgUrl={option.optionText || ""}
              optionVotes={option.votes}
              totalVotes={voters || 0}
            />
          ))}
        </div>
      );

    case "open-ended":
      return responses.map((response) => {
        return (
          <OpenEndedPollResponse
            key={response._id}
            profileImgUrl={response.voterId?.profileImageUrl}
            userFullName={response.voterId?.fullName}
            response={response.responseText || ""}
            createdAt={
              response.createdAt ? moment(response.createdAt).fromNow() : ""
            }
          />
        );
      });

    default:
      return null;
  }
};

export default PollingResultContent;
