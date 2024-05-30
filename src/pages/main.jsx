import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appAPI from "../api/service";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { format } from "date-fns";

function Main({ user }) {
  const nav = useNavigate();

  const [course, setCourse] = useState(3.2);
  const [transactions,setTransactions] = useState(null);

  /*useEffect(() => {
    async function getCourse() {
      const res = await appAPI.getCourse();
      if (res.success === true) {
        setCourse(res.ton_to_usd);
      } else {
        toast.error(res?.error);
      }
    }
    getCourse();
  }, []);*/


  useEffect(() => {
    setTransactions(user.transactions.reduce((acc, tr) => {
      const date = format(new Date(tr.createdAt), "dd.MM.yyyy");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].unshift(tr);
      return acc;
    }, {}))
  }, [user.transactions])

  if (course === null || transactions === null) return <Loader />;

  console.log(transactions)
  return (
    <div className="main__page">
      <div className="header__block">Wallet</div>
      <div className="balance__block">
        <div>Your balance</div>
        <div>{(user.balanceTon.toFixed(3) * course).toFixed(3)} $</div>
        <div className="balance__block__tokens">
          <div className="balance__block__token">
            <div className="balance__block__token__title">
              <div>{user.balanceTon.toFixed(3)}</div>
              <div>TON</div>
            </div>
            <div className="balance__block__token__value">
              ~ {(user.balanceTon.toFixed(3) * course).toFixed(3)} $
            </div>
          </div>
        </div>
      </div>
      <div className="button__block" onClick={() => nav("/withdraw")}>
        Withdraw
      </div>
      <div className="currency__block">
        <div>Choose token for replenishment</div>
        <div className="currency__block__tokens">
          <div
            className="currency__block__token"
            onClick={() => nav("/replenishment")}
          >
            <img src="/ton.svg" className="currency__block__token__img" />
            <div>TON</div>
          </div>
        </div>
      </div>
      <div className="transactions__block">
        <div>Your transactions</div>
        {transactions ? (
          <div className="currency__block__tokens">
            {Object.keys(transactions).reverse().map((date) => (
              <div key={date} className="currency__blocks">
                <div className="transaction__date">{date}</div>
                {transactions[date].map((tr) => (
                  <div
                    className="transactions__block__tr"
                    onClick={() =>
                      window.open(
                        `https://testnet.tonscan.org/address/${tr.addressTo}`
                      )
                    }
                    key={tr.id}
                  >
                    <div>{tr.type}</div>
                    <div>
                      Amount: {tr.amount} {tr.currency.toUpperCase()}
                    </div>
                    <div className="addressTo">
                      To:{" "}
                      {tr.addressTo.slice(0, 6) +
                        "..." +
                        tr.addressTo.slice(-6)}
                    </div>
                    <div>Status: {tr.completed ? "Done" : "Loading..."}</div>
                    <div>Time: {format(new Date(tr.createdAt), "kk:mm")}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="not__found">Transactions are not found :(</div>
        )}
      </div>
    </div>
  );
}

export default Main;
