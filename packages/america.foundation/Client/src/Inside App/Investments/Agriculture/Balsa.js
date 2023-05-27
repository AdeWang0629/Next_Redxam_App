import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Interaction } from "chart.js";
import Chart from "chart.js/auto";
// import { CrosshairPlugin, Interpolate } from "chartjs-plugin-crosshair";
import { Tooltip } from "chart.js";
import AnimatingNumber from "../../Components/animating-number";
import { NumericFormat } from "react-number-format";
import { useAuth } from "../../../AuthContext";
import { httpsCallable } from "firebase/functions";
import lottie from "lottie-web";

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
import { functions, auth, db } from "../../../firebase";
import "./Balsa.css";
import _, { set } from "lodash";

Tooltip.positioners.myCustomPositioner = function (elements, eventPosition) {
  // A reference to the tooltip model
  const tooltip = this;

  /* ... */

  return {
    x: 0,
    y: 0,
    // You may also include xAlign and yAlign to override those tooltip options.
  };
};

// Chart.register(CrosshairPlugin);
// Interaction.modes.interpolate = Interpolate;

function Balsa() {
  const { currentUser } = useAuth();
  const uid = currentUser.uid;
  const [newbalsaPriceData, setNewBalsaPriceData] = useState([]);
  const [balsaPriceData, setBalsaPriceData] = useState([]);
  const [timeButton, setTimeButton] = useState([]);
  const balsaDataPrice = [];
  const [newDataPrice, setNewDataPrice] = useState([]);
  const [newDataCost, setNewDataCost] = useState([]);
  const [activeButton, setActiveButton] = useState("all");
  const [hoverDate, setHoverDate] = useState(null);
  const [counter, setCounter] = useState(0);
  const [profit, setProfit] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [modified, setModified] = useState(false);
  const [actionButton, setActionButton] = useState("buy");
  const [isToOpen, setIsToOpen] = useState(false);
  const [selectedTo, setSelectedTo] = useState("Hectares");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [hectares, setHectares] = useState("");
  const [hectares_trees, setHectares_Trees] = useState("");
  const [usd, setUsd] = useState("");
  const [usd2, setUsd2] = useState("");
  const [areturn, setAreturn] = useState("");
  const [rprofit, setRProfit] = useState("");
  const [currentbalance, setCurrentbalance] = useState(null);
  const [newcurrentbalance, setNewCurrentbalance] = useState();
  const [balsa_orders, setBalsa_orders] = useState([]);
  const [newbalsa_orders, setNewBalsa_orders] = useState([]);
  const [upcomingbalance, setUpcomingbalance] = useState();
  const [esthc, setEsthc] = useState("Est. Cost");
  const [esthcn, setEsthcn] = useState("0.00");
  const [mininvest, setMininvest] = useState("");
  const [mininvestalert, setMininvestalert] = useState(false);
  const Tick_or_X = useRef(null);

  const handleReview = (e) => {
    e.preventDefault();
    // console.log(amount);
    // console.log(actionButton);
    // console.log(balsaPriceData.pph);

    if (selectedTo === "Hectares") {
      setHectares(amount);
      setHectares_Trees("Hectares");
      const usdh =
        amount.replace(/,/g, "") *
        balsaPriceData.chart[balsaPriceData.chart.length - 1].cost;
      setUsd(usdh.toLocaleString());
      setUsd2(
        usdh.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );

      const correspondingNum =
        (balsaPriceData.chart[balsaPriceData.chart.length - 1].price * usdh) /
        balsaPriceData.chart[balsaPriceData.chart.length - 1].cost;
      const fixedNum = correspondingNum.toFixed(2);
      setAreturn(new Intl.NumberFormat("en-US").format(fixedNum));
      setRProfit(new Intl.NumberFormat("en-US").format(fixedNum - usdh));
      setUpcomingbalance(currentbalance - usdh);
    }
    if (selectedTo === "Dollars") {
      const number =
        amount.replace(/,/g, "") /
        balsaPriceData.chart[balsaPriceData.chart.length - 1].cost;
      const formattedNumber = number.toLocaleString("en-US", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      if (number < 1) {
        const number2 = number * balsaPriceData.pph;
        const formattedNumber2 = number2.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        setUsd(amount);
        setUsd2(amount);
        setHectares(formattedNumber2);
        setHectares_Trees("Trees");
        const correspondingNum =
          (balsaPriceData.chart[balsaPriceData.chart.length - 1].price *
            amount.replace(/,/g, "")) /
          balsaPriceData.chart[balsaPriceData.chart.length - 1].cost;
        const fixedNum = correspondingNum.toFixed(2);
        setAreturn(new Intl.NumberFormat("en-US").format(fixedNum));
        setRProfit(
          new Intl.NumberFormat("en-US").format(
            fixedNum - amount.replace(/,/g, "")
          )
        );
        setUpcomingbalance(currentbalance - amount.replace(/,/g, ""));
      } else {
        setHectares_Trees("Hectares");
        setHectares(formattedNumber);
        setUsd(amount);
        setUsd2(amount);
        const correspondingNum =
          (balsaPriceData.chart[balsaPriceData.chart.length - 1].price *
            amount.replace(/,/g, "")) /
          balsaPriceData.chart[balsaPriceData.chart.length - 1].cost;
        const fixedNum = correspondingNum.toFixed(2);
        setAreturn(new Intl.NumberFormat("en-US").format(fixedNum));
        setRProfit(
          new Intl.NumberFormat("en-US").format(
            fixedNum - amount.replace(/,/g, "")
          )
        );
        setUpcomingbalance(currentbalance - amount.replace(/,/g, ""));
      }
    }

    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  }
  function closeReviewModal() {
    setReviewModal(false);
  }
  const submitinvestment = async () => {
    setShowModal(false);
    setReviewModal(true);
    const costInvestment = usd2.replace(/,/g, "");

    try {
      const investmentPurchaseCallable = httpsCallable(
        functions,
        "investment_purchase"
      );
      investmentPurchaseCallable({ costInvestment: costInvestment }).then(
        (result) => {
          const data = result.data;
          const output = data.message;

          if (output.includes("Success")) {
            console.log(output);
            lottie.loadAnimation({
              container: Tick_or_X.current,
              renderer: "svg",
              loop: false,
              autoplay: true,
              animationData: require("../../Components/Lottie/tick.json"),
            });
          } else if (output.includes("Missing")) {
            console.log(output);
            lottie.loadAnimation({
              container: Tick_or_X.current,
              renderer: "svg",
              loop: false,
              autoplay: true,
              animationData: require("../../Components/Lottie/x.json"),
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
    if (selectedTo === "Hectares") {
      const formattedNumbertt = (
        event.target.value.replace(/,/g, "") *
        balsaPriceData.chart[balsaPriceData.chart.length - 1].cost
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setEsthcn(`$${formattedNumbertt}`);
      setMininvestalert(false);
    }
    if (selectedTo === "Dollars") {
      const formattedNumbertt =
        event.target.value.replace(/,/g, "") /
        balsaPriceData.chart[balsaPriceData.chart.length - 1].cost;
      // console.log(formattedNumbertt);
      if (formattedNumbertt < 1) {
        setEsthc("Est. Trees");
        // console.log(event.target.value.replace(/,/g, ""));
        const number3 =
          event.target.value.replace(/,/g, "") /
          (balsaPriceData.chart[balsaPriceData.chart.length - 1].cost /
            balsaPriceData.pph);
        const formattedNumber3 = number3.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        setEsthcn(formattedNumber3);
        if (formattedNumber3 < 1) {
          setMininvest(
            `Minimum is 1 tree or $${
              balsaPriceData.chart[balsaPriceData.chart.length - 1].cost /
              balsaPriceData.pph
            }`
          );
          setMininvestalert(true);
        } else {
          setMininvestalert(false);
        }
      } else {
        setEsthcn(
          formattedNumbertt.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        setEsthc("Est. Hectares");
        setMininvestalert(false);
      }
    }
  };

  function handleKeyDown(event) {
    if (event.keyCode === 69 || event.keyCode === 189) {
      event.preventDefault();
    }
  }

  const handleDropdownToClick = () => {
    setIsToOpen(!isToOpen);
  };

  const handleItemToClick = (value) => {
    setIsToOpen(false);
    if (value === "Hectares") {
      setSelectedTo(value);
      setEsthc("Est. Cost");
      const formattedNumbertt = (
        amount.replace(/,/g, "") *
        balsaPriceData.chart[balsaPriceData.chart.length - 1].cost
      ).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setEsthcn(`$${formattedNumbertt}`);
      setMininvestalert(false);
    }
    if (value === "Dollars") {
      setSelectedTo(value);
      const formattedNumbertt =
        amount.replace(/,/g, "") /
        balsaPriceData.chart[balsaPriceData.chart.length - 1].cost;
      if (formattedNumbertt < 1) {
        setEsthc("Est. Trees");
        const number3 =
          amount.replace(/,/g, "") /
          (balsaPriceData.chart[balsaPriceData.chart.length - 1].cost /
            balsaPriceData.pph);
        const formattedNumber3 = number3.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        setEsthcn(formattedNumber3);
        if (formattedNumber3 < 1) {
          setMininvest(
            `Minimum is 1 tree or $${
              balsaPriceData.chart[balsaPriceData.chart.length - 1].cost /
              balsaPriceData.pph
            }`
          );
          setMininvestalert(true);
        } else {
          setMininvestalert(false);
        }
      } else {
        setEsthcn(
          formattedNumbertt.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        setEsthc("Est. Hectares");
        setMininvestalert(false);
      }
    }
  };

  const handleActionButtonClick = (button) => {
    setActionButton(button);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === "1w") {
      setTimeButton("1W");
    } else if (button === "3m") {
      setTimeButton("3M");
    } else if (button === "1y") {
      setTimeButton("1Y");
    } else if (button === "all") {
      setTimeButton("ALL");
    }
  };
  onSnapshot(doc(db, "users", uid), orderBy("date", "desc"), (doc) => {
    const current2 = doc.data().current_balance;
    if (JSON.stringify(currentbalance) !== JSON.stringify(current2)) {
      setCurrentbalance(current2);
    }

    if (doc.exists() && doc.data().investments?.balsa != null) {
      const balsa_orders1 = doc.data().investments.balsa;
      if (JSON.stringify(balsa_orders) !== JSON.stringify(balsa_orders1)) {
        setBalsa_orders(balsa_orders1);
      }
    }
  });

  onSnapshot(doc(db, "investments", "Agriculture"), (doc) => {
    const balsaInvestment = doc.data().trees.balsa;
    if (JSON.stringify(balsaPriceData) !== JSON.stringify(balsaInvestment)) {
      setBalsaPriceData(balsaInvestment);
    }
  });

  useEffect(() => {
    if (balsaPriceData.length === 0) {
      return;
    }

    const secondsnapshot = () => {
      balsaPriceData.chart.forEach((data) => {
        const formattedDate = new Date(data.date.seconds * 1000)
          .toISOString()
          .slice(0, 10);

        const newData = {
          x: formattedDate,
          y: data.price,
          z: data.cost,
        };

        balsaDataPrice.push(newData); // Add the new object to the array
      });

      balsaDataPrice.sort((a, b) => new Date(a.x) - new Date(b.x));
      // TODAY'S DATE
      /**
       *
       * @param {Date} dateObject
       */
      function formatDate(dateObject) {
        const parts = {
          date: dateObject.getDate().toString().padStart(2, "0"),
          month: (dateObject.getMonth() + 1).toString().padStart(2, "0"),
          year: dateObject.getFullYear().toString(),
        };
        return `${parts.year}-${parts.month}-${parts.date}`;
      }

      const todayDate = new Date();
      const todayDateFormatted = formatDate(todayDate);
      balsaDataPrice.push({ x: todayDateFormatted, y: 0 });
      // GENERATE DATES
      // console.log(balsaDataPrice);
      let startDate = balsaDataPrice[0].x;
      let endDate = balsaDataPrice[balsaDataPrice.length - 1].x;

      const newData = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        const newItem = {
          x: currentDate,
          y: 0,
          z: 0,
        };
        balsaDataPrice.forEach((item) => {
          const itemDate = item.x;
          if (
            parseInt(itemDate.split("-")[0]) ===
              parseInt(currentDate.split("-")[0]) &&
            parseInt(itemDate.split("-")[1]) ===
              parseInt(currentDate.split("-")[1])
          ) {
            newItem.y = item.y;
            newItem.z = item.z;
          }
        });

        newData.push(newItem);
        let year = parseInt(currentDate.slice(0, 4));
        let month = parseInt(currentDate.slice(5, 7));
        let day = parseInt(currentDate.slice(8, 10));

        month++; // Increment the month by 1

        // Check if the new month is greater than 12
        if (month > 12) {
          month = 1;
          year++;
        }
        if (day < 10) {
          day = "0" + day;
        }
        // Construct a new date string with the updated month and year
        if (month < 10) {
          currentDate = `${year}-0${month}-${day}`;
        } else {
          currentDate = `${year}-${month}-${day}`;
        }
      }

      // FILL Y VALUES
      let yrunningTotal = 0;
      let zrunningTotal = 0;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].y !== 0) {
          yrunningTotal = newData[i].y;
          zrunningTotal = newData[i].z;
        } else {
          newData[i].y = yrunningTotal;
          newData[i].z = zrunningTotal;
        }
      }

      if (timeButton === "ALL") {
        const priceArray = [];
        const costArray = [];

        for (let i = 0; i < newData.length; i++) {
          priceArray.push({ x: newData[i].x, y: newData[i].y });
          costArray.push({ x: newData[i].x, y: newData[i].z });
        }
        setNewDataPrice(priceArray);
        setNewDataCost(costArray);
      } else if (timeButton === "1Y") {
        if (newData.length > 13) {
          newData.splice(0, newData.length - 13);
        }
        // GENERATE DATES
        startDate = newData[0].x;
        endDate = newData[newData.length - 1].x;

        const newDatav = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
          const newItem = {
            x: currentDate,
            y: 0,
            z: 0,
          };
          newData.forEach((item) => {
            const itemDate = item.x;
            if (
              parseInt(itemDate.split("-")[0]) ===
                parseInt(currentDate.split("-")[0]) &&
              parseInt(itemDate.split("-")[1]) ===
                parseInt(currentDate.split("-")[1])
            ) {
              newItem.y = item.y;
              newItem.z = item.z;
            }
          });

          newDatav.push(newItem);
          let year = parseInt(currentDate.slice(0, 4));
          let month = parseInt(currentDate.slice(5, 7));
          let day = parseInt(currentDate.slice(8, 10));

          day += 15; // Increment the day by 15

          const daysInMonth = new Date(year, month, 0).getDate();
          if (day > daysInMonth) {
            day = 1;
            month++;
          }
          // Check if the new month is greater than 12
          if (month > 12) {
            day = 1;
            month = 1;
            year++;
          }
          if (day < 10) {
            day = "0" + day;
          }
          // Construct a new date string with the updated month and year
          if (month < 10) {
            currentDate = `${year}-0${month}-${day}`;
          } else {
            currentDate = `${year}-${month}-${day}`;
          }
        }
        const priceArrayv = [];
        const costArrayv = [];

        for (let i = 0; i < newDatav.length; i++) {
          priceArrayv.push({ x: newDatav[i].x, y: newDatav[i].y });
          costArrayv.push({ x: newDatav[i].x, y: newDatav[i].z });
        }

        setNewDataPrice(priceArrayv);
        setNewDataCost(costArrayv);
      } else if (timeButton === "3M") {
        if (newData.length > 3) {
          newData.splice(0, newData.length - 3);
        }
        // GENERATE DATES
        startDate = newData[0].x;
        endDate = newData[newData.length - 1].x;

        const newDatav = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
          const newItem = {
            x: currentDate,
            y: 0,
            z: 0,
          };
          newData.forEach((item) => {
            const itemDate = item.x;
            if (
              parseInt(itemDate.split("-")[0]) ===
                parseInt(currentDate.split("-")[0]) &&
              parseInt(itemDate.split("-")[1]) ===
                parseInt(currentDate.split("-")[1])
            ) {
              newItem.y = item.y;
              newItem.z = item.z;
            }
          });

          newDatav.push(newItem);
          let year = parseInt(currentDate.slice(0, 4));
          let month = parseInt(currentDate.slice(5, 7));
          let day = parseInt(currentDate.slice(8, 10));

          day += 3; // Increment the day by 3

          const daysInMonth = new Date(year, month, 0).getDate();
          if (day > daysInMonth) {
            day = 1;
            month++;
          }
          // Check if the new month is greater than 12
          if (month > 12) {
            day = 1;
            month = 1;
            year++;
          }
          if (day < 10) {
            day = "0" + day;
          }
          // Construct a new date string with the updated month and year
          if (month < 10) {
            currentDate = `${year}-0${month}-${day}`;
          } else {
            currentDate = `${year}-${month}-${day}`;
          }
        }
        const priceArrayv = [];
        const costArrayv = [];

        for (let i = 0; i < newDatav.length; i++) {
          priceArrayv.push({ x: newDatav[i].x, y: newDatav[i].y });
          costArrayv.push({ x: newDatav[i].x, y: newDatav[i].z });
        }
        setNewDataPrice(priceArrayv);
        setNewDataCost(costArrayv);
      } else if (timeButton === "1W") {
        if (newData.length > 2) {
          newData.splice(0, newData.length - 2);
        }
        // GENERATE DATES
        startDate = newData[0].x;
        endDate = newData[newData.length - 1].x;

        const newDatav = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
          const newItem = {
            x: currentDate,
            y: 0,
            z: 0,
          };
          newData.forEach((item) => {
            const itemDate = item.x;
            if (
              parseInt(itemDate.split("-")[0]) ===
                parseInt(currentDate.split("-")[0]) &&
              parseInt(itemDate.split("-")[1]) ===
                parseInt(currentDate.split("-")[1])
            ) {
              newItem.y = item.y;
              newItem.z = item.z;
            }
          });

          newDatav.push(newItem);
          let year = parseInt(currentDate.slice(0, 4));
          let month = parseInt(currentDate.slice(5, 7));
          let day = parseInt(currentDate.slice(8, 10));

          day += 1; // Increment the day by 1

          const daysInMonth = new Date(year, month, 0).getDate();
          if (day > daysInMonth) {
            day = 1;
            month++;
          }
          // Check if the new month is greater than 12
          if (month > 12) {
            day = 1;
            month = 1;
            year++;
          }
          if (day < 10) {
            day = "0" + day;
          }
          // Construct a new date string with the updated month and year
          if (month < 10) {
            currentDate = `${year}-0${month}-${day}`;
          } else {
            currentDate = `${year}-${month}-${day}`;
          }
        }
        let last7DaysData = newDatav.slice(-8);

        const priceArrayv = [];
        const costArrayv = [];

        for (let i = 0; i < last7DaysData.length; i++) {
          priceArrayv.push({ x: last7DaysData[i].x, y: last7DaysData[i].y });
          costArrayv.push({ x: last7DaysData[i].x, y: last7DaysData[i].z });
        }
        setNewDataPrice(priceArrayv);
        setNewDataCost(costArrayv);
      } else {
        const priceArray = [];
        const costArray = [];

        for (let i = 0; i < newData.length; i++) {
          priceArray.push({ x: newData[i].x, y: newData[i].y });
          costArray.push({ x: newData[i].x, y: newData[i].z });
        }
        setNewDataPrice(priceArray);
        setNewDataCost(costArray);
      }
    };
    const runSnapshots = async () => {
      await secondsnapshot();
    };

    runSnapshots();
  }, [balsaPriceData, timeButton]);
  useEffect(() => {
    if (
      counter === 0 &&
      modified === false &&
      newDataPrice &&
      newDataPrice.length > 0
    ) {
      setCounter(balsaPriceData.chart[balsaPriceData.chart.length - 1].price);
      setHoverDate(newDataPrice[newDataPrice.length - 1].x);
      const percentageChange =
        ((newDataPrice[newDataPrice.length - 1].y -
          newDataCost[newDataCost.length - 1].y) /
          newDataCost[newDataCost.length - 1].y) *
        100;
      const formattedPercentageChange = percentageChange.toFixed(2) + "%";
      setPercentage(formattedPercentageChange);

      let result =
        newDataPrice[newDataPrice.length - 1].y -
        newDataCost[newDataCost.length - 1].y;

      if (result.toString().length > 3) {
        result = result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      } else {
        result = result.toFixed(2);
      }
      setProfit(result);
    }
  }, [newDataPrice, newDataCost]);

  useLayoutEffect(() => {
    if (newDataCost && newDataPrice && counter && modified) {
      const correspondingPrice = newDataPrice.find((p) => p.x === hoverDate);
      const correspondingCost = newDataCost.find((p) => p.x === hoverDate);
      if (correspondingCost && correspondingPrice) {
        const percentageChange =
          ((counter - correspondingCost.y) / correspondingCost.y) * 100;
        const formattedPercentageChange = percentageChange.toFixed(2) + "%";
        let result = counter - correspondingCost.y;
        if (result.toString().length > 3) {
          result = result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
        } else {
          result = result.toFixed(2);
        }
        setProfit(result);
        setPercentage(formattedPercentageChange);
      }
    }
  }, [hoverDate, newDataCost, newDataPrice, counter]);

  const data = {
    datasets: [
      {
        fill: {
          target: "start",
          above: "#a10010",
        },
        data: newDataCost,
        backgroundColor: "#f70000",
        borderColor: "#f70000",
        pointBorderColor: "black",
      },
      {
        fill: {
          target: 0,
          above: "green",
        },
        data: newDataPrice,
        backgroundColor: "#00fa43",
        borderColor: "#00fa43",

        pointBorderColor: "black",
      },
    ],
  };

  const options = {
    spanGaps: true,
    normalized: true,
    animation: false,

    layout: {
      autoPadding: true,
    },
    plugins: {
      tooltip: {
        enabled: true,
        custom: function (tooltipModel) {
          tooltipModel[0].opacity = 0;
        },
        mode: "nearest",
        opacity: 0,
        intersect: false,
        position: "myCustomPositioner",
        caretSize: false,
        backgroundColor: "rgba(255,255,255,0.0)",
        titleColor: "#00000000",
        bodyColor: "#00000000",
        borderColor: "#00000000",
        displayColors: false,
        callbacks: {
          afterFooter: function (e, tooltipModel) {
            setHoverDate(e[0].raw.x);
            setCounter(e[0].raw.y);
            setModified(true);
          },
        },
      },

      crosshair: {
        line: {
          color: "#d9d9d9",
          width: 1,
        },
        zoom: {
          enabled: false,
        },
      },
      legend: false,
      filler: {
        propagate: true,
      },
    },
    animation: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        grace: "10%",
      },
      ticks: {
        display: false,
      },
    },

    elements: {
      line: {
        tension: 0.3,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
        hoverBorderWidth: 2,
      },
    },
    hover: {
      intersect: false,
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="balsa" style={{ paddingTop: "65px" }}>
      {reviewModal ? (
        <div className="review_modal" onClick={closeReviewModal}>
          <div
            className="rm_container"
            ref={Tick_or_X}
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>
      ) : null}
      {showModal ? (
        <div className="review_modal" onClick={closeModal}>
          <div className="rm_container" onClick={(e) => e.stopPropagation()}>
            <div className="rm_title">Review Investment</div>
            <div className="rm_body">
              <div className="rm_tile">
                <div className="rmt_itemt">
                  <div className="rmti_text">Hec/USD Cost</div>
                  <div className="rmti_text">{hectares_trees}</div>
                  <div className="rmti_text">USD Total cost</div>
                </div>
                <div className="rmt_items"></div>
                <div className="rmt_itemn">
                  <div className="rmti_number">
                    $
                    {balsaPriceData.chart[
                      balsaPriceData.chart.length - 1
                    ].cost.toLocaleString("en-US")}
                  </div>
                  <div className="rmti_number">{hectares}</div>
                  <div className="rmti_number">${usd}</div>
                </div>
              </div>
              <div className="rm_tile2">
                <div className="rmt_itemt">
                  <div className="rmti_text2">Hec/USD Price</div>
                  <div className="rmti_text2">Profit</div>
                  <div className="rmti_text2">ETA</div>
                  <div className="rmti_text2">Aproximate Total return</div>
                </div>
                <div className="rmt_items"></div>
                <div className="rmt_itemn">
                  <div className="rmti_number2">
                    $
                    {balsaPriceData.chart[
                      balsaPriceData.chart.length - 1
                    ].price.toLocaleString("en-US")}
                  </div>
                  <div className="rmti_number2">${rprofit}</div>
                  <div className="rmti_number2">{balsaPriceData.eta}</div>
                  <div className="rmti_number2">${areturn}</div>
                </div>
              </div>
              <div className="rm_tile">
                <div className="rmt_itemt">
                  <div className="rmti_text">Curent balance</div>
                  <div className="rmti_text">Investment</div>
                  <div className="rmti_text">Remaining balance</div>
                </div>
                <div className="rmt_items"></div>
                <div className="rmt_itemn">
                  <div className="rmti_number">
                    $
                    {currentbalance
                      ? new Intl.NumberFormat("en-US").format(currentbalance)
                      : "0.00"}
                  </div>
                  <div className="rmti_number">${usd2}</div>
                  <div className="rmti_number">
                    $
                    {new Intl.NumberFormat("en-US").format(
                      upcomingbalance.toFixed(2)
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="rm_CO2">CO2 Captured</div>
            <div className="rms_button_container">
              <button className="rms_button" onClick={submitinvestment}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="newsfeed">
        <div className="newsfeed_container">
          <div className="newsfeed_chartSection">
            <div className="newsfeed_chart">
              <Line data={data} options={options} />
            </div>
            <div className="timeline__container">
              <div className="timeline__buttons__container">
                <div
                  className={`timeline__button ${
                    activeButton === "1w" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("1w")}
                >
                  1W
                </div>
                <div
                  className={`timeline__button ${
                    activeButton === "3m" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("3m")}
                >
                  3M
                </div>
                <div
                  className={`timeline__button ${
                    activeButton === "1y" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("1y")}
                >
                  1Y
                </div>
                <div
                  className={`timeline__button ${
                    activeButton === "all" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("all")}
                >
                  ALL
                </div>
              </div>
            </div>
            <div className="main_ticker">
              <div className="main_ticker_container">
                <div className="ticker_dollarsign">$</div>
                <AnimatingNumber value={counter} />
              </div>
              <div className="mini_ticker_container">
                <div className="mini_ticker">
                  <h5 className="date">{hoverDate} </h5>

                  <div className="profit_container">
                    <div className="profit_dollarsign">Profit in $</div>
                    <h5
                      className={`profit ${
                        profit !== "0.00" ? "animate-slide-in" : ""
                      }`}
                      style={{
                        color: profit === "0.00" ? "white" : "#00ff44",
                      }}
                    >
                      {profit}
                    </h5>
                  </div>
                  <h5
                    className={`percentage ${
                      percentage !== "0.00%" ? "animate-slide-in" : ""
                    }`}
                    style={{
                      color: percentage === "0.00%" ? "white" : "#00ff44",
                    }}
                  >
                    {percentage}
                  </h5>
                </div>
              </div>
            </div>
            <div className="Loremipsum">Lorem ipsum</div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <div className="sidebar_container">
          <div className="sidebar_header">
            <div
              className={`buy ${actionButton === "buy" ? "active" : ""}`}
              onClick={() => handleActionButtonClick("buy")}
            >
              Buy Balsa
            </div>
            <div
              className={`sell ${actionButton === "sell" ? "active" : ""}`}
              onClick={() => handleActionButtonClick("sell")}
            >
              Sell Balsa
            </div>
          </div>

          <div className="balsa_row">
            <div className="buyin_container">
              <div className="buyin">Buy In</div>
              <div className="buyin_number">
                <div className="dropdown-container">
                  <div
                    className={`dropdown-select ${isToOpen ? "active" : ""}`}
                    onClick={handleDropdownToClick}
                  >
                    {selectedTo}
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        d="M4.5 6 8 2l3.5 4h-7Zm7 4L8 14l-3.5-4h7Z"
                        fill="#fff"
                      />
                    </svg>
                    {isToOpen && (
                      <div className="dropdown-list">
                        <div
                          className="dropdown-item"
                          onClick={() => handleItemToClick("Hectares")}
                        >
                          Hectares
                        </div>

                        <div
                          className="dropdown-item"
                          onClick={() => handleItemToClick("Dollars")}
                        >
                          Dollars
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="amount_container">
              <div className="amount">Amount</div>
              <NumericFormat
                thousandSeparator={true}
                decimalSeparator={"."}
                decimalScale={2}
                fixedDecimalScale={true}
                className="amount_number"
                placeholder="0.00"
                onKeyDown={handleKeyDown}
                value={amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="esthectares_container">
              <div className="esthectares">{esthc}</div>
              <div className="esthectares_number">{esthcn}</div>
            </div>
            {mininvestalert ? (
              <div className="mininvest"> {mininvest} </div>
            ) : null}
            <div className="review_container">
              <button
                onClick={handleReview}
                disabled={!amount || amount === "0.00"}
                className="review_button"
              >
                Review
              </button>
            </div>
          </div>
          <div className="investing_power">
            <div className="investing_power_amount">
              <div className="investing_power_number">
                ${new Intl.NumberFormat("en-US").format(currentbalance)}
              </div>
            </div>
            <div className="investing_power_text">
              Investing power available
            </div>
          </div>
          <div className="stats__header stats-lists">
            <p>Lists</p>
          </div>
          <div className="list_investments">
            <div className="list_investments_container">Lorem ipsum</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balsa;
