const Poll = require("../models/poll");
const User = require("../models/user");

//Create New Poll
exports.createPoll = async (req, res) => {
  const { question, type, options, creatorId } = req.body;

  if (!question || !type || !creatorId) {
    return res
      .status(400)
      .json({ message: "Question, type, and creatorId are required" });
  }

  try {
    let processedOptions = [];

    switch (type) {
      case "single-choice":
        if (!options || options.length < 2) {
          return res.status(400).json({
            message: "Single-choice poll must have at least two options",
          });
        }
        processedOptions = options.map((option) => ({
          optionText: option,
        }));
        break;

      case "open-ended":
        processedOptions = [];
        break;

      case "rating":
        processedOptions = [1, 2, 3, 4, 5].map((value) => ({
          optionText: value.toString(),
        }));
        break;

      case "yes/no":
        processedOptions = ["Yes", "No"].map((option) => ({
          optionText: option,
        }));
        break;

      case "image-based":
        if (!options || options.length < 2) {
          return res.status(400).json({
            message: "Image-based poll must have atleast image URLs",
          });
        }
        processedOptions = options.map((url) => ({ optionText: url }));
        break;

      default:
        return res.status(400).json({ message: "Invalid poll type" });
    }

    const newPoll = await Poll.create({
      question,
      type,
      options: processedOptions,
      creator: creatorId,
    });

    return res
      .status(201)
      .json({ message: "Poll created successfully", poll: newPoll });
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating a poll",
      error: error.message,
    });
  }
};

//Get All Polls
exports.getAllPolls = async (req, res) => {
  const { type, creatorId, page = 1, limit = 10 } = req.query;
  const filter = {};
  const userId = req.user._id;

  if (type) filter.type = type;
  if (creatorId) filter.creator = creatorId;

  try {
    //Calculate Pagination Parameter
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    //Fetch Polls with pagination
    const polls = await Poll.find(filter)
      .populate("creator", "fullName username email profileImageUrl")
      .populate({
        path: "responses.voterId",
        select: "username profileImageUrl fullName",
      })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    //Add 'userHasVoted' flag for each poll
    const updatePolls = polls.map((poll) => {
      const userHasVoted = poll.voters.some((voterId) =>
        voterId.equals(userId)
      );
      return {
        ...poll.toObject(),
        userHasVoted,
      };
    });
    //Get total count of polls for pagination metadata
    const totalPolls = await Poll.countDocuments(filter);

    const stats = await Poll.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    //Ensure all types are included in stats, even those with zero counts

    const allTypes = [
      {
        type: "single-choice",
        label: "Single Choice",
      },
      {
        type: "yes/no",
        label: "Yes/No",
      },
      {
        type: "rating",
        label: "Rating",
      },
      {
        type: "image-based",
        label: "Image Based",
      },
      {
        type: "open-ended",
        label: "Open Ended",
      },
    ];
    const statsWithDefaults = allTypes
      .map((pollType) => {
        const stat = stats.find((item) => item.type === pollType.type);
        return {
          label: pollType.label,
          type: pollType.type,
          count: stat ? stat.count : 0,
        };
      })
      .sort((a, b) => b.count - a.count);
    res.status(200).json({
      polls: updatePolls,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalPolls / pageSize),
      totalPolls,
      stats: statsWithDefaults,
    });
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({
      message: "Error fetching polls",
      error: error.message,
    });
  }
};

//Get Voted Polls
exports.getVotedPolls = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error Registering user",
      error: error.message,
    });
  }
};

//Get Poll By Id
exports.getPollById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error Registering user",
      error: error.message,
    });
  }
};

//Vote on a Poll
exports.voteOnPoll = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error Registering user",
      error: error.message,
    });
  }
};

//Close the Poll
exports.closePoll = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error Registering user",
      error: error.message,
    });
  }
};

//Bookmark the Poll
exports.bookmarkPoll = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error Registering user",
      error: error.message,
    });
  }
};

//Get all Bookmarked Polls
exports.getBookmarkedPolls = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error Registering user",
      error: error.message,
    });
  }
};

//Delete a Poll
exports.deletePoll = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error Registering user",
      error: error.message,
    });
  }
};
