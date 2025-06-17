import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getPollBookmarked } from "../../utils/helper";
import UserProfileInfo from "../cards/UserProfileInfo";
import PollActions from "./PollActions";
import PollContent from "./PollContent";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api-services";
import { toast } from "react-hot-toast";
import PollingResultContent from "./PollingResultContent";

const PollCard = ({
  pollId,
  question,
  type,
  options,
  voters,
  responses,
  creatorProfileImg,
  creatorName,
  creatorUsername,
  userHasVoted,
  isMyPoll,
  isPollClosed,
  createdAt,
}) => {
  const { user, onUserVoted, toggleBookmarkId, onPollCreatedOrDelete } =
    useContext(UserContext);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [userResponse, setUserResponse] = useState("");

  const [isVoteComplete, setIsVoteComplete] = useState(userHasVoted);

  const [pollResult, setPollResult] = useState({ options, voters, responses });

  const isPollBookmarked = getPollBookmarked(
    pollId,
    user.bookmarkedPolls || []
  );

  const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);
  const [pollClosed, setPollClosed] = useState(isPollClosed || false);
  const [pollDeleted, setPollDeleted] = useState(false);

  //Handle user input based on the poll type
  const handleInput = (value) => {
    if (type === "rating") setRating(value);
    else if (type === "open-ended") setUserResponse(value);
    else setSelectedOptionIndex(value);
  };
  //Generates post data based on the poll type
  const getPostData = useCallback(() => {
    if (type === "open-ended") {
      return { responseText: userResponse, voterId: user._id };
    }
    if (type === "rating") {
      return { optionIndex: rating - 1, voterId: user._id };
    }
    return { optionIndex: selectedOptionIndex, voterId: user._id };
  }, [type, userResponse, rating, selectedOptionIndex, user]);

  //Get Poll Details by ID
  const getPollDetail = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POLLS.GET_BY_ID(pollId)
      );

      if (response.data) {
        const pollDetails = response.data;
        setPollResult({
          options: pollDetails.options || [],
          voters: pollDetails.voters.length || 0,
          responses: pollDetails.responses || [],
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Error submitting vote");
    }
  };

  //Handle  the submission of votes
  const handleVoteSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.POLLS.VOTE(pollId),
        getPostData()
      );

      getPollDetail();
      setIsVoteComplete(true);
      onUserVoted();
      toast.success("Vote Submitted Successfully");
    } catch (error) {
      console.error(error.response?.data?.message || "Error Submitting Vote");
    }
  };

  //Toggle the bookmark status of the poll
  const toggleBookmark = async () => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.POLLS.BOOKMARK(pollId)
      );

      toggleBookmarkId(pollId);
      setPollBookmarked((prev) => !prev);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.message || "Error Bookmarking Poll");
    }
  };

  //Close Poll
  const closePoll = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.POLLS.CLOSE(pollId));
      if (response.data) {
        setPollClosed(true);
        toast.success(response.data?.message || "Poll Closed Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log("Something went wrong! Please try again", error);
    }
  };

  //Delete Poll
  const deletePoll = async () => {
    try {
      const response = await axiosInstance.delete(API_PATHS.POLLS.DELETE(pollId));
      if (response.data) {
        setPollDeleted(true);
        onPollCreatedOrDelete();
        toast.success(response.data?.message || "Poll Deleted Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log("Something went wrong! Please try again", error);
    }
  };

  return (
    <div className="p-5 mx-auto my-5 border rounded-lg bg-slate-100/50 border-slate-100">
      <div className="flex items-start justify-between ">
        <UserProfileInfo
          imgUrl={creatorProfileImg}
          fullName={creatorName}
          username={creatorUsername}
          createdAt={createdAt}
        />

        <PollActions
          pollId={pollId}
          isVoteComplete={isVoteComplete}
          inputCaptured={!!(userResponse || selectedOptionIndex >= 0 || rating)}
          onVoteSubmit={handleVoteSubmit}
          isBookmarked={pollBookmarked}
          toggleBookmark={toggleBookmark}
          isMyPoll={isMyPoll}
          pollClosed={pollClosed}
          onDelete={deletePoll}
          onClosePoll={closePoll}
        />
      </div>
      <div className="mt-3 ml-14">
        <p className="text-[15px] text-black leading-8">{question}</p>
        <div className="mt-4">
          {isVoteComplete || isPollClosed ? (
            <PollingResultContent
              type={type}
              options={pollResult.options || []}
              voters={pollResult.voters}
              responses={pollResult.responses || []}
            />
          ) : (
            <PollContent
              type={type}
              options={options}
              selectedOptionIndex={selectedOptionIndex}
              onOptionSelect={handleInput}
              rating={rating}
              onRatingChange={handleInput}
              userResponse={userResponse}
              onResponseChange={handleInput}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PollCard;
