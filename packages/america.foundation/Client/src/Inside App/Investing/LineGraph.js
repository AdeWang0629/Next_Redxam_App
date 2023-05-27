import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Interaction } from "chart.js";
import Chart from "chart.js/auto";
// import { CrosshairPlugin, Interpolate } from "chartjs-plugin-crosshair";
import "./LineGraph.css";
import { Tooltip } from "chart.js";
import AnimatingNumber from "../Components/animating-number";
import lottie from "lottie-web";

// Tooltip.positioners.myCustomPositioner = function (elements, eventPosition) {
//   // A reference to the tooltip model
//   const tooltip = this;

//   /* ... */

//   return {
//     x: 0,
//     y: 0,
//     // You may also include xAlign and yAlign to override those tooltip options.
//   };
// };

// Chart.register(CrosshairPlugin);
// Interaction.modes.interpolate = Interpolate;

function LineGraph({ onTimelineButtonClick, cost, price, noinvestmnets }) {
  const [hoverDate, setHoverDate] = useState(null);
  const [counter, setCounter] = useState(0);
  const [profit, setProfit] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [timerFinished, setTimerFinished] = useState(false);
  const [activeButton, setActiveButton] = useState("3m");

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === "1w") {
      onTimelineButtonClick("1W");
    } else if (button === "3m") {
      onTimelineButtonClick("3M");
    } else if (button === "1y") {
      onTimelineButtonClick("1Y");
    } else if (button === "all") {
      onTimelineButtonClick("ALL");
    }
  };

  useEffect(() => {
    if (counter === 0 && price && price.length > 0) {
      setCounter(price[price.length - 1].y);
      setHoverDate(price[price.length - 1].x);
      const percentageChange =
        ((price[price.length - 1].y - cost[cost.length - 1].y) /
          cost[cost.length - 1].y) *
        100;
      const formattedPercentageChange = percentageChange.toFixed(2) + "%";
      setPercentage(formattedPercentageChange);

      let result = price[price.length - 1].y - cost[cost.length - 1].y;

      if (result.toString().length > 3) {
        result = result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      } else {
        result = result.toFixed(2);
      }
      setProfit(result);
    }
  }, [price, cost]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerFinished(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [setTimerFinished]);

  useLayoutEffect(() => {
    if (timerFinished && cost && price && counter) {
      const correspondingPrice = price.find((p) => p.x === hoverDate);
      const correspondingCost = cost.find((p) => p.x === hoverDate);
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
  }, [hoverDate, cost, price, counter]);

  // Test
  const data = {
    datasets: [
      {
        fill: {
          target: "start",
          above: "#a10010",
        },
        data: cost,
        backgroundColor: "#f70000",
        borderColor: "#f70000",
        pointBorderColor: "black",
      },
      {
        fill: {
          target: 0,
          above: "green",
        },
        data: price,
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
          console.log("hi");
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
          afterFooter: function (e) {
            if (hoverDate !== e[0].raw.x) {
              setHoverDate(e[0].raw.x);
            }
            if (counter !== e[0].raw.y) {
              setCounter(e[0].raw.y);
            }
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
    maintainAspectRatio: false,
  };

  // useEffect(() => {
  //   const afterFooterHandler = (e) => {
  //     if (e[0].raw.x !== hoverDate) {
  //     setHoverDate(e[0].raw.x)}
  //   };

  //   Chart.defaults.plugins.tooltip.callbacks.afterFooter = afterFooterHandler;

  //   return () => {
  //     Chart.defaults.plugins.tooltip.callbacks.afterFooter = null;
  //   };
  // }, [hoverDate]);

  // LOTTIE ANIMATION
  const [isHovered, setIsHovered] = useState(false);

  const chart_animation = useRef(null);

  useEffect(() => {
    if (noinvestmnets == true) {
      const instance = lottie.loadAnimation({
        container: chart_animation.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../Components/Lottie/chart_animation.json"),
      });
      instance.addEventListener("complete", () => {
        instance.destroy();
        lottie.loadAnimation({
          container: chart_animation.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("../Components/Lottie/chart_wait.json"),
        });
      });
    }
  }, [isHovered]);

  const handleHover = () => {
    if (noinvestmnets == true) {
      setIsHovered(true);
    }
  };

  const handleLeave = () => {
    // setIsHovered(false);
  };
  // console.log(cost);

  return (
    <div>
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
                style={{ color: profit === "0.00" ? "white" : "#00ff44" }}
              >
                {profit}
              </h5>
            </div>
            <h5
              className={`percentage ${
                percentage !== "0.00%" ? "animate-slide-in" : ""
              }`}
              style={{ color: percentage === "0.00%" ? "white" : "#00ff44" }}
            >
              {percentage}
            </h5>
          </div>
        </div>
      </div>
      <div
        className="linegraph"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {isHovered ? (
          <div className="chart_lottie" ref={chart_animation}></div>
        ) : (
          <Line data={data} options={options} />
        )}
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
      <div className="newsfeed__buying__section">
        <h2> Investing Power</h2>
        <h2> $4.11</h2>
      </div>
      <div className="newsfeed__market__section">
        <div className="newsfeed__market__box">
          <p> Markets Closed</p>
          <h1> Happy Thanksgiving</h1>
        </div>
      </div>
    </div>
  );
}

export default LineGraph;
