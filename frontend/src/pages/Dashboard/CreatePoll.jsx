import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import { POLL_TYPE } from "../../utils/data";
import OptionInput from "../../components/input/OptionInput";
import OptionImageSelector from "../../components/input/OptionImageSelector";

const CreatePoll = () => {
  useUserAuth();
  const { user } = useContext(UserContext);

  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    options: [],
    imageOptions: [],

    error: "",
  });

  const handleValueChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //Create New Poll
  const handleCreatePoll = async () => {
    const { question, options, error, type, imageOptions } = pollData;
    if (!question || !type) {
      console.log("CREATE", { question, type, options, error });
      handleValueChange("error", "Question & Type are required");
      return;
    }
    if (type === "single-choice" && options.length < 2) {
      handleValueChange("error", "Enter atleast two options");
      return;
    }

    if (type === "image-based" && imageOptions.length < 2) {
      handleValueChange("error", "Enter atleast two options");
      return;
    }

    handleValueChange("error", "");
    console.log("NO_ERR", { pollData });
  };

  return (
    <DashboardLayout activeMenu="Create-Poll">
      <div className="p-5 mx-auto my-5 rounded-lg bg-gray-100/80">
        <h2 className="text-lg font-medium text-black">Create Poll</h2>
        <div className="mt-3">
          <label className="font-medium text-5 text-slate-600">QUESTION</label>

          <textarea
            placeholder="What's in your mind?"
            className="w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2"
            rows={4}
            value={pollData.question}
            onChange={({ target }) =>
              handleValueChange("question", target.value)
            }
          />
        </div>
        <div className="mt-3">
          <label className="font-medium text-us text-slate-600">
            POLL TYPE
          </label>
          <div className="flex flex-wrap gap-4 mt-3">
            {POLL_TYPE.map((item) => (
              <div
                key={item.value}
                className={`option-chip ${
                  pollData.type === item.value
                    ? "text-white bg-primary border-primary"
                    : "border-sky-100 bg-sky-100 text-sky-700"
                }`}
                onClick={() => {
                  handleValueChange("type", item.value);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        {pollData.type === "single-choice" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              OPTIONS
            </label>
            <div className="mt-3">
              <OptionInput
                optionList={pollData.options}
                setOptionList={(value) => {
                  handleValueChange("options", value);
                }}
              />
            </div>
          </div>
        )}

        {pollData.type === "image-based" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              IMAGE OPTIONS
            </label>
            <div className="mt-3">
              <OptionImageSelector
                imageList={pollData.imageOptions}
                setImageList={(value) => {
                  handleValueChange("imageOptions", value);
                }}
              />
            </div>
          </div>
        )}
        {pollData.error && (
          <p className="mt-5 text-xs font-medium text-red-500">
            {pollData.error}
          </p>
        )}
        <button className="py-2 mt-6 btn-primary " onClick={handleCreatePoll}>
          CREATE
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;
