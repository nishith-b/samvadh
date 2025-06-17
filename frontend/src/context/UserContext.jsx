import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  //Function to clear user data (eg: on logout)
  const clearUser = () => {
    setUser(null);
  };

  //update user stats
  const updateUserStats = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //Update totalPollsVotes count locally
  const onUserVoted = () => {
    console.log(user);
    const totalPollsVoted = user.totalPollsVoted || 0;
    updateUserStats("totalPollsVoted", totalPollsVoted + 1);
  };

  //Update totalPollscreated count locally
  const onPollCreatedOrDelete = (type = "create") => {
    const totalPollsCreated = user.totalPollsCreated || 0;
    updateUserStats(
      "totalPollsCreated",
      type == "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
    );
  };

  //Add or Remove poll id from bookmarkedPolls
  const toggleBookmarkId = (id) => {
    const bookmarks = user.bookmarkedPolls || [];

    const index = bookmarks.indexOf(id);

    if (index === -1) {
      //Add the ID if its not the array

      setUser((prev) => ({
        ...prev,
        bookmarkedPolls: [...bookmarks, id],
        totalPollsBookmarked: prev.totalPollsBookmarked + 1,
      }));
    } else {
      //Remove the ID if it's already in the array
      setUser((prev) => ({
        ...prev,
        bookmarkedPolls: bookmarks.filter((item) => item !== id),
        totalPollsBookmarked: prev.totalPollsBookmarked - 1,
      }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        onPollCreatedOrDelete,
        updateUserStats,
        onUserVoted,
        toggleBookmarkId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
