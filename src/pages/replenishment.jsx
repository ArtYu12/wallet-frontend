import React from "react";
import toast from "react-hot-toast";
import Back from "../components/back";

function Replenishment({user}) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`Copied`);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <div className="main__page">
      <Back />
      <div className="header__block">Replenishment TON</div>
      <div className="withdraw__inputs">
        <label className="withdraw__input">
          <div className="withdraw__input__title">Address</div>
          <input
            type="text"
            className="withdraw__input__field"
            value={"0QD5AOe2-26MJ107y7IQGfziH3XR6IJHtXUyQ6hWqLIeOu73"}
            readOnly
            onClick={() => copyToClipboard("0QD5AOe2-26MJ107y7IQGfziH3XR6IJHtXUyQ6hWqLIeOu73")}
          />
        </label>
        <label className="withdraw__input">
          <div className="withdraw__input__title">Comment</div>
          <input
            type="text"
            className="withdraw__input__field"
            readOnly
            value={user._id}
            onClick={() => copyToClipboard(user._id)}
          />
        </label>
      </div>
    </div>
  );
}

export default Replenishment;
