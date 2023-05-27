import React, { useState, useEffect } from "react";
import "./Newsfeed.css";
import LineGraph from "./LineGraph";
import _ from "lodash";
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
import moment from "moment";

function Newsfeed(props) {
  const [newbalsaInvestmentData, setNewBalsaInvestmentData] = useState([]);
  const [balsaInvestmentData, setBalsaInvestmentData] = useState([]);
  const [balsaPriceData, setBalsaPriceData] = useState([]);
  const { currentUser } = useAuth();
  const uid = currentUser.uid;
  const balsaDataCost = [];
  const balsaDataPrice = [];
  let startDate = null;
  let endDate = null;
  let startDatex = null;
  let endDatex = null;
  const [newDataCost, setNewDataCost] = useState([]);
  let newDataCos2 = [];
  const [newDataPrice, setNewDataPrice] = useState([]);
  const hectarePurchases = [];
  const [timeButton, setTimeButton] = useState([]);
  const [balsaPPH, setbalsaPPH] = useState([]);
  const [balsaETA, setbalsaETA] = useState([]);
  const [noinvestmnets, setnoinvestmnets] = useState(false);
  const [agriculture_doc, setagriculture_doc] = useState(false);

  const handleTimelineButtonClick = (timelinePeriod) => {
    if (timelinePeriod === "ALL") {
      setTimeButton("ALL");
    } else if (timelinePeriod === "1Y") {
      setTimeButton("1Y");
    } else if (timelinePeriod === "3M") {
      setTimeButton("3M");
    } else if (timelinePeriod === "1W") {
      setTimeButton("1W");
    }
  };

  onSnapshot(doc(db, "users", uid), orderBy("date", "desc"), (doc) => {
    if (doc.exists() && doc.data().investments?.balsa?.orders != null) {
      const balsaInvestment = doc.data().investments.balsa.orders;
      if (
        JSON.stringify(newbalsaInvestmentData) !==
        JSON.stringify(balsaInvestment)
      ) {
        setNewBalsaInvestmentData(balsaInvestment);
      }
      if (noinvestmnets !== false) {
        setnoinvestmnets(false);
      }
    } else {
      if (noinvestmnets !== true) {
        setnoinvestmnets(true);
      }
    }
  });

  onSnapshot(doc(db, "investments", "Agriculture"), (doc) => {
    const agriculture = doc.data();
    const balsaInvestment = doc.data().trees.balsa.chart;
    const PPH = doc.data().trees.balsa.pph;
    const ETA = doc.data().trees.balsa.eta;
    if (JSON.stringify(balsaETA) !== JSON.stringify(ETA)) {
      setbalsaETA(ETA);
    }
    if (JSON.stringify(balsaPPH) !== JSON.stringify(PPH)) {
      setbalsaPPH(PPH);
    }
    if (JSON.stringify(balsaPriceData) !== JSON.stringify(balsaInvestment)) {
      setBalsaPriceData(balsaInvestment);
    }
    if (JSON.stringify(agriculture) !== JSON.stringify(agriculture_doc)) {
      setagriculture_doc(agriculture);
    }
  });

  handleTimelineButtonClick();

  useEffect(() => {
    setBalsaInvestmentData(newbalsaInvestmentData);

    const firstsnapshot = () => {
      balsaInvestmentData.forEach((data) => {
        const formattedDate = moment
          .unix(data.date.seconds)
          .format("YYYY-MM-DD");
        const newData = {
          x: formattedDate,
          y: data.cost,
        };
        const hectareData = {
          x: formattedDate,
          y: data.hectares,
        };
        hectarePurchases.push(hectareData);
        balsaDataCost.push(newData); // Add the new object to the array
      });

      // TODAY'S DATE
      const todayDateFormatted = moment().format("YYYY-MM-DD");
      balsaDataCost.push({ x: todayDateFormatted, y: 0 });
      // TODAY'S DATE ENDS

      balsaDataCost.sort((a, b) => new Date(a.x) - new Date(b.x));
      hectarePurchases.sort((a, b) => new Date(a.x) - new Date(b.x));

      // GENERATE DATES
      if (timeButton === "ALL") {
        const updatedItemList = balsaDataCost.reduce((acc, item) => {
          const newItem5 = { x: item.x, y: item.y };
          const matchingItem = acc.find(
            (i) => i.x.substring(0, 7) === item.x.substring(0, 7)
          );

          if (matchingItem) {
            newItem5.y += matchingItem.y;
            acc.splice(acc.indexOf(matchingItem), 1);
          }

          acc.push(newItem5);
          return acc;
        }, []);

        const year = updatedItemList[0].x.slice(0, 4);
        const month = parseInt(updatedItemList[0].x.slice(5, 7), 10);
        const day = updatedItemList[0].x.slice(8, 10);

        const newMonth = month - 2;
        const newMonthStr =
          newMonth < 10 ? `0${newMonth}` : newMonth.toString();

        const newDate88 = `${year}-${newMonthStr}-${day}`;

        updatedItemList.push({
          x: newDate88,
          y: 0,
        });

        balsaInvestmentData.sort((a, b) => new Date(a.x) - new Date(b.x));
        updatedItemList.sort((a, b) => new Date(a.x) - new Date(b.x));
        console.log(updatedItemList);
        console.log(balsaDataCost);

        startDate = updatedItemList[0].x;
        endDate = updatedItemList[updatedItemList.length - 1].x;

        const newData = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
          const newItem = {
            x: currentDate,
            y: 0,
          };

          updatedItemList.forEach((item) => {
            const itemDate = item.x;

            if (
              parseInt(itemDate.split("-")[0]) ===
                parseInt(currentDate.split("-")[0]) &&
              parseInt(itemDate.split("-")[1]) ===
                parseInt(currentDate.split("-")[1])
            ) {
              newItem.y = item.y;
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
        let runningTotal = 0;

        for (let i = 0; i < newData.length; i++) {
          if (newData[i].y !== 0) {
            runningTotal += newData[i].y;
          }
          newData[i].y = runningTotal;
        }
        setNewDataCost(newData);
        newDataCos2 = newData;
      } else if (timeButton === "1Y") {
        const output = Object.values(balsaDataCost);
        output.sort((a, b) => new Date(a.x) - new Date(b.x));

        const cumulativeSum = (arr) =>
          arr.reduce((acc, curr) => {
            const last = acc[acc.length - 1] || { x: "", y: 0 };
            acc.push({
              x: curr.x,
              y: curr.y + last.y,
            });
            return acc;
          }, []);

        const result = cumulativeSum(output);

        const lastFourDigits = result[result.length - 1].x.slice(0, 4);
        const lastFourDigitsMinusOne = lastFourDigits - 1;
        const lastFourDigitsMinusOneAsString =
          lastFourDigitsMinusOne.toString();
        const lastSixAndSevenDigits = result[result.length - 1].x.slice(5, 7);

        const newArray = [];

        for (let i = 0; i < result.length; i++) {
          const currentItem = result[i];
          const currentItemSixAndSevenDigits = currentItem.x.slice(5, 7);
          if (
            currentItem.x.slice(0, 4) === lastFourDigits ||
            (currentItem.x.slice(0, 4) === lastFourDigitsMinusOneAsString &&
              currentItemSixAndSevenDigits >= lastSixAndSevenDigits)
          ) {
            newArray.push(currentItem);
          }
        }

        newArray.push({
          x: `${lastFourDigitsMinusOne}-${lastSixAndSevenDigits}-01`,
          y: newArray[0].y,
        });

        newArray.sort((a, b) => new Date(a.x) - new Date(b.x));

        const completeData = [];

        let currentDate = moment(newArray[0].x);

        for (let i = 0; i < newArray.length; i++) {
          const currentData = newArray[i];

          completeData.push(currentData);

          if (i < newArray.length - 1) {
            const nextDate = moment(newArray[i + 1].x);
            const daysBetween = nextDate.diff(currentDate, "days");

            if (daysBetween > 15) {
              for (let j = 1; j < daysBetween / 15; j++) {
                const newDate = moment(currentDate)
                  .add(15 * j, "days")
                  .format("YYYY-MM-DD");
                completeData.push({ x: newDate, y: currentData.y });
              }
            }

            currentDate = nextDate;
          }
        }

        setNewDataCost(completeData);
        newDataCos2 = completeData;
      } else if (timeButton === "3M") {
        const output = Object.values(balsaDataCost);
        output.sort((a, b) => new Date(a.x) - new Date(b.x));

        const cumulativeSum = (arr) =>
          arr.reduce((acc, curr) => {
            const last = acc[acc.length - 1] || { x: "", y: 0 };
            acc.push({
              x: curr.x,
              y: curr.y + last.y,
            });
            return acc;
          }, []);

        const result = cumulativeSum(output);

        const lastFourDigits = result[result.length - 1].x.slice(0, 4);
        const lastSixAndSevenDigits = result[result.length - 1].x.slice(5, 7);
        const lastFourDigitsMinusOne = lastSixAndSevenDigits - 2;

        const newArray = [];

        for (let i = 0; i < result.length; i++) {
          const currentItem = result[i];
          const currentItemSixAndSevenDigits = currentItem.x.slice(5, 7);
          if (
            currentItem.x.slice(0, 4) == lastFourDigits &&
            currentItemSixAndSevenDigits >= lastFourDigitsMinusOne
          ) {
            newArray.push(currentItem);
          }
        }

        newArray.push({
          x: `${lastFourDigits}-${lastFourDigitsMinusOne}-01`,
          y: newArray[0].y,
        });

        newArray.sort((a, b) => new Date(a.x) - new Date(b.x));

        const completeData = [];

        let currentDate = moment(newArray[0].x);

        for (let i = 0; i < newArray.length; i++) {
          const currentData = newArray[i];

          completeData.push(currentData);

          if (i < newArray.length - 1) {
            const nextDate = moment(newArray[i + 1].x);
            const daysBetween = nextDate.diff(currentDate, "days");

            if (daysBetween > 1) {
              for (let j = 1; j < daysBetween / 1; j++) {
                const newDate = moment(currentDate)
                  .add(j, "days")
                  .format("YYYY-MM-DD");
                completeData.push({ x: newDate, y: currentData.y });
              }
            }

            currentDate = nextDate;
          }
        }

        setNewDataCost(completeData);
        newDataCos2 = completeData;
      } else if (timeButton === "1W") {
        const balsaDataCost1W = [];
        balsaInvestmentData.forEach((data) => {
          // const formattedDate = new Date(
          //   data.date.seconds * 1000
          // ).toISOString();
          const formattedDate = moment
            .unix(data.date.seconds)
            .format("YYYY-MM-DD HH:mm:ss");
          const newData = {
            x: formattedDate,
            y: data.cost,
          };

          balsaDataCost1W.push(newData); // Add the new object to the array
        });

        // // TODAY'S DATE
        const currentDate3 = moment().format("YYYY-MM-DD HH:mm:ss");
        const newData1w3 = {
          x: currentDate3,
          y: 0,
        };
        balsaDataCost1W.push(newData1w3);
        // // TODAY'S DATE ENDS

        const cumulativeSum = (arr) =>
          arr.reduce((acc, curr) => {
            const last = acc[acc.length - 1] || { x: "", y: 0 };
            acc.push({
              x: curr.x,
              y: curr.y + last.y,
            });
            return acc;
          }, []);

        const result = cumulativeSum(balsaDataCost1W);
        const currentDate4 = moment(); // Get the current date and time
        const oneWeekAgo = moment(currentDate4)
          .subtract(1, "week")
          .format("YYYY-MM-DD HH:mm:ss");
        console.log(oneWeekAgo);

        const lastFourDigits = result[result.length - 1].x.slice(0, 4);
        const lastSixAndSevenDigits = result[result.length - 1].x.slice(5, 7);
        const lastnineAndtenDigits = result[result.length - 1].x.slice(8, 10);
        const lastFourDigitsMinusOne = lastnineAndtenDigits - 7;
        const newArray = [];

        newArray.push({
          x: `${lastFourDigits}-${lastSixAndSevenDigits}-${lastFourDigitsMinusOne}`,
          y: result[result.length - 2].y,
        });

        for (let i = 0; i < result.length; i++) {
          const currentItem = result[i];
          const currentItemSixAndSevenDigits = currentItem.x.slice(5, 7);
          if (
            currentItem.x.slice(0, 4) == lastFourDigits &&
            currentItemSixAndSevenDigits == lastSixAndSevenDigits &&
            lastnineAndtenDigits >= lastFourDigitsMinusOne
          ) {
            newArray.push(currentItem);
          }
        }

        newArray.sort((a, b) => new Date(a.x) - new Date(b.x));
        // const stableArray = (stableArray === newArray) ? stableArray : newArray;
        // console.log(newArray);

        const completeData = [];

        let currentDate = moment(newArray[0].x);

        for (let i = 0; i < newArray.length; i++) {
          const currentData = newArray[i];

          completeData.push(currentData);

          if (i < newArray.length - 1) {
            const nextDate = moment(newArray[i + 1].x);
            const hoursBetween = nextDate.diff(currentDate, "hours");

            if (hoursBetween > 1) {
              for (let j = 1; j < hoursBetween / 1; j++) {
                const newDate = moment(currentDate)
                  .add(j, "hours")
                  .format("YYYY-MM-DD HH:mm:ss");
                completeData.push({ x: newDate, y: currentData.y });
              }
            }

            currentDate = nextDate;
          }
        }

        setNewDataCost(completeData);

        newDataCos2 = completeData;
      } else {
        // const updatedItemList = balsaDataCost.reduce((acc, item) => {
        //   const newItem5 = { x: item.x, y: item.y };
        //   const matchingItem = acc.find(
        //     (i) => i.x.substring(0, 7) === item.x.substring(0, 7)
        //   );

        //   if (matchingItem) {
        //     newItem5.y += matchingItem.y;
        //     acc.splice(acc.indexOf(matchingItem), 1);
        //   }

        //   acc.push(newItem5);
        //   return acc;
        // }, []);
        // updatedItemList.sort((a, b) => new Date(a.x) - new Date(b.x));
        // // console.log(updatedItemList);

        // startDate = updatedItemList[0].x;
        // endDate = updatedItemList[updatedItemList.length - 1].x;

        // const newData = [];
        // let currentDate = startDate;
        // while (currentDate <= endDate) {
        //   const newItem = {
        //     x: currentDate,
        //     y: 0,
        //   };

        //   updatedItemList.forEach((item) => {
        //     const itemDate = item.x;

        //     if (
        //       parseInt(itemDate.split("-")[0]) ===
        //         parseInt(currentDate.split("-")[0]) &&
        //       parseInt(itemDate.split("-")[1]) ===
        //         parseInt(currentDate.split("-")[1])
        //     ) {
        //       newItem.y = item.y;
        //     }
        //   });

        //   newData.push(newItem);
        //   let year = parseInt(currentDate.slice(0, 4));
        //   let month = parseInt(currentDate.slice(5, 7));
        //   let day = parseInt(currentDate.slice(8, 10));

        //   month++; // Increment the month by 1

        //   // Check if the new month is greater than 12
        //   if (month > 12) {
        //     month = 1;
        //     year++;
        //   }
        //   if (day < 10) {
        //     day = "0" + day;
        //   }
        //   // Construct a new date string with the updated month and year
        //   if (month < 10) {
        //     currentDate = `${year}-0${month}-${day}`;
        //   } else {
        //     currentDate = `${year}-${month}-${day}`;
        //   }
        // }
        // let runningTotal = 0;

        // for (let i = 0; i < newData.length; i++) {
        //   if (newData[i].y !== 0) {
        //     runningTotal += newData[i].y;
        //   }
        //   newData[i].y = runningTotal;
        // }

        // setNewDataCost(newData);
        // newDataCos2 = newData;

        const output = Object.values(balsaDataCost);
        output.sort((a, b) => new Date(a.x) - new Date(b.x));

        const cumulativeSum = (arr) =>
          arr.reduce((acc, curr) => {
            const last = acc[acc.length - 1] || { x: "", y: 0 };
            acc.push({
              x: curr.x,
              y: curr.y + last.y,
            });
            return acc;
          }, []);

        const result = cumulativeSum(output);

        const lastFourDigits = result[result.length - 1].x.slice(0, 4);
        const lastSixAndSevenDigits = result[result.length - 1].x.slice(5, 7);
        const lastFourDigitsMinusOne = lastSixAndSevenDigits - 2;

        const newArray = [];

        for (let i = 0; i < result.length; i++) {
          const currentItem = result[i];
          const currentItemSixAndSevenDigits = currentItem.x.slice(5, 7);
          if (
            currentItem.x.slice(0, 4) == lastFourDigits &&
            currentItemSixAndSevenDigits >= lastFourDigitsMinusOne
          ) {
            newArray.push(currentItem);
          }
        }

        newArray.push({
          x: `${lastFourDigits}-${lastFourDigitsMinusOne}-01`,
          y: newArray[0].y,
        });

        newArray.sort((a, b) => new Date(a.x) - new Date(b.x));

        const completeData = [];

        let currentDate = moment(newArray[0].x);

        for (let i = 0; i < newArray.length; i++) {
          const currentData = newArray[i];

          completeData.push(currentData);

          if (i < newArray.length - 1) {
            const nextDate = moment(newArray[i + 1].x);
            const daysBetween = nextDate.diff(currentDate, "days");

            if (daysBetween > 1) {
              for (let j = 1; j < daysBetween / 1; j++) {
                const newDate = moment(currentDate)
                  .add(j, "days")
                  .format("YYYY-MM-DD");
                completeData.push({ x: newDate, y: currentData.y });
              }
            }

            currentDate = nextDate;
          }
        }

        setNewDataCost(completeData);
        newDataCos2 = completeData;
      }
    };

    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot
    // secondsnapshot

    const secondsnapshot = () => {
      balsaPriceData.forEach((data) => {
        const formattedDate = new Date(data.date.seconds * 1000)
          .toISOString()
          .slice(0, 10);

        const newData = {
          x: formattedDate,
          y: data.price,
        };

        balsaDataPrice.push(newData); // Add the new object to the array
      });

      balsaDataPrice.sort((a, b) => new Date(a.x) - new Date(b.x));
      // console.log(balsaDataPrice);
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
      startDate = balsaDataPrice[0].x;
      endDate = balsaDataPrice[balsaDataPrice.length - 1].x;

      const newData = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        const newItem = {
          x: currentDate,
          y: 0,
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
      let runningTotal = 0;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].y !== 0) {
          runningTotal = newData[i].y;
        } else {
          newData[i].y = runningTotal;
        }
      }

      // FILL Y HECTARE VALUES
      hectarePurchases.sort((a, b) => new Date(a.x) - new Date(b.x));
      // ADD HECTARE PURCHASES

      let previousY = 0;
      for (let i = 0; i < hectarePurchases.length; i++) {
        hectarePurchases[i].y += previousY;
        previousY = hectarePurchases[i].y;
      }
      hectarePurchases.push({
        x: todayDateFormatted,
        y: hectarePurchases[hectarePurchases.length - 1].y,
      });
      const newDatax = [];

      startDatex = hectarePurchases[0].x;
      endDatex = hectarePurchases[hectarePurchases.length - 1].x;

      let currentDatex = startDatex;
      while (currentDatex <= endDatex) {
        const newItem = {
          x: currentDatex,
          y: 0,
        };
        hectarePurchases.forEach((item) => {
          const itemDate = item.x;
          if (
            parseInt(itemDate.split("-")[0]) ===
              parseInt(currentDatex.split("-")[0]) &&
            parseInt(itemDate.split("-")[1]) ===
              parseInt(currentDatex.split("-")[1])
          ) {
            newItem.y = item.y;
          }
        });

        newDatax.push(newItem);
        let year = parseInt(currentDatex.slice(0, 4));
        let month = parseInt(currentDatex.slice(5, 7));
        let day = parseInt(currentDatex.slice(8, 10));

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
          currentDatex = `${year}-0${month}-${day}`;
        } else {
          currentDatex = `${year}-${month}-${day}`;
        }
      }

      // FILL Y VALUES
      let runningTotalx = 0;
      for (let i = 0; i < newDatax.length; i++) {
        if (newDatax[i].y !== 0) {
          runningTotalx = newDatax[i].y;
        } else {
          newDatax[i].y = runningTotalx;
        }
      }

      // FILTER DATES
      const filteredArray1 = newData.filter((item1) => {
        return newDataCos2.some((item2) => {
          return item1.x.slice(0, 7) === item2.x.slice(0, 7);
        });
      });
      // console.log(filteredArray1);

      // Define a helper function to check if the first 8 characters of two strings match
      function first8CharsMatch(str1, str2) {
        return str1.slice(0, 8) === str2.slice(0, 8);
      }

      // Initialize an empty array to store the result
      let resultArray = [];

      // Loop through the items in newDatax
      for (let i = 0; i < newDatax.length; i++) {
        let newDataxItem = newDatax[i];
        let newDataxItemX = newDataxItem.x;

        // Loop through the items in filteredArray1
        for (let j = 0; j < filteredArray1.length; j++) {
          let filteredArray1Item = filteredArray1[j];
          let filteredArray1ItemX = filteredArray1Item.x;

          // Check if the first 8 characters of the x values match
          if (first8CharsMatch(newDataxItemX, filteredArray1ItemX)) {
            // If they do, create a new object with the x value from newDatax and the product of the y values
            let newY = newDataxItem.y * filteredArray1Item.y;
            let newObject = { x: newDataxItemX, y: newY };

            // Add the new object to the result array
            resultArray.push(newObject);
          }
        }
      }

      if (timeButton === "ALL") {
        setNewDataPrice(resultArray);
      } else if (timeButton === "1Y") {
        // GENERATE DATES
        startDate = resultArray[0].x;
        endDate = resultArray[resultArray.length - 1].x;

        const newDatav = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
          const newItem = {
            x: currentDate,
            y: 0,
          };
          resultArray.forEach((item) => {
            const itemDate = item.x;
            if (
              parseInt(itemDate.split("-")[0]) ===
                parseInt(currentDate.split("-")[0]) &&
              parseInt(itemDate.split("-")[1]) ===
                parseInt(currentDate.split("-")[1])
            ) {
              newItem.y = item.y;
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
        setNewDataPrice(newDatav);
      } else if (timeButton === "3M") {
        // GENERATE DATES
        startDate = resultArray[0].x;
        endDate = resultArray[resultArray.length - 1].x;

        const newDatav = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
          const newItem = {
            x: currentDate,
            y: 0,
          };
          resultArray.forEach((item) => {
            const itemDate = item.x;
            if (
              parseInt(itemDate.split("-")[0]) ===
                parseInt(currentDate.split("-")[0]) &&
              parseInt(itemDate.split("-")[1]) ===
                parseInt(currentDate.split("-")[1])
            ) {
              newItem.y = item.y;
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
        setNewDataPrice(newDatav);
      } else if (timeButton === "1W") {
        // GENERATE DATES
        startDate = resultArray[0].x;
        endDate = resultArray[resultArray.length - 1].x;

        const newDatav = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
          const newItem = {
            x: currentDate,
            y: 0,
          };
          resultArray.forEach((item) => {
            const itemDate = item.x;
            if (
              parseInt(itemDate.split("-")[0]) ===
                parseInt(currentDate.split("-")[0]) &&
              parseInt(itemDate.split("-")[1]) ===
                parseInt(currentDate.split("-")[1])
            ) {
              newItem.y = item.y;
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
        let last7DaysData = newDatav.slice(-7);

        setNewDataPrice(last7DaysData);
      } else {
        setNewDataPrice(resultArray);
      }
    };
    const runSnapshots = async () => {
      if (balsaInvestmentData.length === 0) {
      } else {
        await firstsnapshot();
        // await secondsnapshot();
      }
    };

    runSnapshots();
  }, [balsaInvestmentData, balsaPriceData, timeButton]);
  // console.log(newDataPrice);

  return {
    agriculture_doc,
    render: (
      <div className="newsfeed">
        <div className="newsfeed_container">
          <div className="newsfeed_chartSection">
            <div className="newsfeed_chart">
              <LineGraph
                onTimelineButtonClick={handleTimelineButtonClick}
                noinvestmnets={noinvestmnets}
                cost={newDataCost}
                price={newDataPrice}
              />
            </div>
          </div>
        </div>
      </div>
    ),
  };
}

export default Newsfeed;
