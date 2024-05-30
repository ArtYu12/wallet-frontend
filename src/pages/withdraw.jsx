import React, { useState } from "react";
import appAPI from "../api/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Back from "../components/back";

function Withdraw({ user, getUser }) {
  const nav = useNavigate();
  const [addressTo, setAddress] = useState("");
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {
      setAmount(value);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || amount === 0 || !addressTo)
      return toast.error("Enter correct data");
    if (user.balanceTon - amount < 0)
      return toast.error("You do not have this amount");
    setLoading(true);
    const res = await appAPI.postWithdraw({ amount, addressTo });
    if (res.success === true) {
      toast.success("Successfully");
      await getUser();
      setLoading(false);
      return nav("/");
    } else {
      setLoading(false);
      toast.error(res.error);
    }
  };

  return (
    <div className="main__page">
      <Back />
      <div className="header__block">Withdraw</div>
      <div className="withdraw__inputs">
        <label className="withdraw__input">
          <div className="withdraw__input__title">Address</div>
          <input
            type="text"
            className="withdraw__input__field"
            value={addressTo}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label className="withdraw__input">
          <div className="withdraw__input__title">Amount</div>
          <input
            type="text"
            className="withdraw__input__field"
            value={amount}
            onChange={handleAmountChange}
          />
        </label>
      </div>
      {!loading ? (
        <div className="button__block" onClick={() => handleWithdraw()}>
          Send
        </div>
      ) : (
        <div className="button__block">Loading</div>
      )}
    </div>
  );
}

export default Withdraw;
