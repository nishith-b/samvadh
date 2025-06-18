import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api-services";
import PollCard from "../../components/pollCards/PollCard";
import BOOKMARK_ICON from "../../assets/images/bookmark-icon.png";
import EmptyCard from "../../components/cards/EmptyCard";
import { UserContext } from "../../context/UserContext";

const Bookmarks = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [bookmarkedPolls, setBookmarkedPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.GET_BOOKMARKED);
      const fetchedPolls = response.data?.bookmarkedPolls || [];

      if (fetchedPolls.length > 0) {
        setBookmarkedPolls((prevPolls) => {
          const newPolls = fetchedPolls.filter(
            (poll) => !prevPolls.some((p) => p._id === poll._id)
          );
          return [...prevPolls, ...newPolls];
        });
      }
    } catch (error) {
      console.error("Something went wrong. Please try again!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPolls();
  }, []);

  const filteredPolls = bookmarkedPolls.filter((poll) =>
    user?.bookmarkedPolls?.includes(poll._id)
  );

  return (
    <DashboardLayout activeMenu="Bookmarks">
      <div className="mx-auto my-5">
        <h2 className="text-xl font-medium text-black">Bookmarks</h2>

        {!loading && filteredPolls.length === 0 && (
          <EmptyCard
            imgSrc={BOOKMARK_ICON}
            message="You Don't Have Any Bookmarks. Start Exploring ..."
            onClick={() => navigate("/dashboard")}
            btnText="Explore"
          />
        )}

        {filteredPolls.map((poll) => (
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

export default Bookmarks;
