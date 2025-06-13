const Poll = require("../models/poll");
const User = require("../models/user");

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
