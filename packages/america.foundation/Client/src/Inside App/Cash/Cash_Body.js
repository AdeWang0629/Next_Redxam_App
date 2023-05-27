import React, { useState, useEffect } from "react";
import "./Cash_Body.css";
import {
  collection,
  doc,
  onSnapshot,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuth } from "../../AuthContext";
import _ from "lodash";

function Cash_Body() {
  const { currentUser } = useAuth();
  const uid = currentUser.uid;
  const [currentbalance, setCurrentbalance] = useState(null);
  const [newcurrentbalance, setNewCurrentbalance] = useState();
  const [history, setHistory] = useState([]);
  const [newhistory, setNewHistory] = useState([]);

  onSnapshot(doc(db, "users", uid), orderBy("date", "desc"), (doc) => {
    const current = doc.data().current_balance;
    setNewCurrentbalance(current);
  });
  onSnapshot(doc(db, "users", uid), orderBy("date", "desc"), (doc) => {
    const currenthistory = doc.data().transactionList;
    setNewHistory(currenthistory);
  });

  if (!_.isEqual(newcurrentbalance, currentbalance)) {
    setCurrentbalance(newcurrentbalance);
  }
  if (!_.isEqual(newhistory, history)) {
    newhistory.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    setHistory(newhistory);
  }

  return (
    <div className="cash_body">
      <div className="cash_body_container">
        <h1>
          Cash $
          {currentbalance
            ? new Intl.NumberFormat("en-US").format(currentbalance)
            : "0.00"}
        </h1>

        <div>
          {history
            ? history.map((item, index) => (
                <div className="history" key={index}>
                  <div className="history_item">
                    <div className="history_left">
                      <p>{item.name}</p>
                      <p>State: {item.state}</p>
                    </div>
                    <div className="history_right">
                      <div className="history_date">
                        <p>
                          {new Date(
                            item.timestamp.seconds * 1000
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="history_quantity_amount">
                        <div className="history_amount">
                          <p>
                            {item.amount >= 0
                              ? `+$${new Intl.NumberFormat("en-US").format(
                                  item.amount
                                )}`
                              : `-$${new Intl.NumberFormat("en-US").format(
                                  Math.abs(item.amount)
                                )}`}
                          </p>
                        </div>
                        <div className="history_quantity">
                          {<p>{item.hectares || item.trees}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Cash_Body;
