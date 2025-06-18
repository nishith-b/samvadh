import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";
import UserDetailsCard from "../cards/UserDetailsCard";
import TrendingPolls from "./TrendingPolls";

const DashboardLayout = ({ children, activeMenu, stats, showStats }) => {
  const { user } = useContext(UserContext);
  // Optionally, you can display a loading UI if user is undefined
  if (user === undefined) {
    return null; // or a <Loader /> if you have one
  }

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="mx-5 grow">{children}</div>
          <div className="hidden mr-5 md:block">
            <UserDetailsCard
              profileImageUrl={user.profileImageUrl}
              fullName={user.fullName}
              username={user.username}
              totalPollsVoted={user.totalPollsVoted}
              totalPollsCreated={user.totalPollsCreated}
              totalPollsBookmarked={user.totalPollsBookmarked}
            />
            {showStats && stats?.length > 0 && <TrendingPolls stats={stats} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
