import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api-services";
import PollCard from "../../components/pollCards/PollCard";
import CREATE_ICON from "../../assets/images/my-poll-icon.png";
import EmptyCard from "../../components/cards/EmptyCard";

const VotedPolls = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [votedPolls, setVotedPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.VOTED_POLLS);
      if (response.data?.polls?.length > 0) {
        setVotedPolls((prevPolls) => {
          const newPolls = response.data.polls.filter(
            (poll) => !prevPolls.some((p) => p._id === poll._id)
          );
          return [...prevPolls, ...newPolls];
        });
      }
    } catch (error) {
      console.log("Something went wrong.Please try again!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPolls();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Voted Polls">
      <div className="mx-auto my-5">
        <h2 className="text-xl font-medium text-black">Voted Polls</h2>

        {votedPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={CREATE_ICON}
            message="You Have Not Voted On Any Polls Yet. Start Exploring ..."
            onClick={() => navigate("/dashboard")}
            btnText="Explore"
          />
        )}

        {votedPolls.map((poll) => (
          <PollCard
            key={`dashboard_${poll._id}`}
            pollId={poll._id}
            question={poll.question}
            type={poll.type}
            options={poll.options}
            voters={poll.voters.length || 0}
            responses={poll.responses || []}
            creatorProfileImg={poll.creator.profileImageUrl || null}
            creatorName={poll.creator.fullName}
            creatorUsername={poll.creator.username}
            userHasVoted={poll.userHasVoted || false}
            isPollClosed={poll.closed || false}
            isMyPoll={poll.isMyPoll || false}
            createdAt={poll.createdAt || false}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default VotedPolls;
