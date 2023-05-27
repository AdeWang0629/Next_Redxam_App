import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
function TreeLink({ trees, treeName }) {
  const [animation, setanimation] = useState(true);
  const [hoverDate, setHoverDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const priceArray = [];
  const costArray = [];
  const tree = trees[treeName];

  //   console.log(trees);
  //   if (trees != null) {
  //   let treeName;
  //   let tree;
  const balsaPriceData = [];

  if (trees.hasOwnProperty(treeName)) {
    // console.log(treeName);
    if (tree.chart !== undefined) {
      tree.chart.forEach((data) => {
        const formattedDate = new Date(data.date.seconds * 1000)
          .toISOString()
          .slice(0, 10);

        const newData = {
          x: formattedDate,
          y: data.price,
          z: data.cost,
        };

        balsaPriceData.push(newData);
      });

      balsaPriceData.sort((a, b) => new Date(a.x) - new Date(b.x));

      for (let i = 0; i < balsaPriceData.length; i++) {
        priceArray.push({ x: balsaPriceData[i].x, y: balsaPriceData[i].y });
        costArray.push({ x: balsaPriceData[i].x, y: balsaPriceData[i].z });
      }
      priceArray.sort((a, b) => new Date(a.x) - new Date(b.x));
      costArray.sort((a, b) => new Date(a.x) - new Date(b.x));
    }
  }
  // console.log(costArray);

  //   console.log(treeName);

  useEffect(() => {
    const correspondingPrice = priceArray.find((p) => p.x === hoverDate);
    const correspondingCost = costArray.find((p) => p.x === hoverDate);
    if (correspondingCost) {
      setPrice(correspondingCost.y);
    }
    if (correspondingCost && correspondingPrice) {
      const percentageChange =
        ((correspondingPrice.y - correspondingCost.y) / correspondingCost.y) *
        100;
      const formattedPercentageChange = percentageChange.toFixed(2) + "%";
      setPercentage(formattedPercentageChange);
    }
    const timeoutId = setTimeout(() => {
      const percentageprofit =
        ((tree.chart[tree.chart.length - 1].price -
          tree.chart[tree.chart.length - 1].cost) /
          tree.chart[tree.chart.length - 1].cost) *
        100;
      setPercentage(percentageprofit.toFixed(2) + "%");
      setPrice(tree.chart[tree.chart.length - 1].cost.toLocaleString());
      setanimation(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [hoverDate]);

  const data = {
    datasets: [
      {
        fill: "start",
        data: costArray,
        backgroundColor: "#ff00003d",
        borderColor: "#f70000",
        pointRadius: 0,
      },
      {
        fill: "-1",
        data: priceArray,
        backgroundColor: "#0080004f",
        borderColor: "#00fa43",
        pointRadius: 0,
      },
    ],
  };
  const option = {
    responsive: true,
    hover: {
      intersect: false,
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },

      y: {
        display: false,

        stacked: true,
        ticks: {
          min: -10,
        },
      },
    },
    animation: animation,
    elements: {
      line: {
        tension: 0.3,
      },
      point: {
        radius: 0,
        hoverRadius: 0,
        hoverBorderWidth: 0,
      },
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
          afterFooter: function (e) {
            if (hoverDate !== e[0].raw.x) {
              setanimation(false);
              setHoverDate(e[0].raw.x);
            }
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
  //   }

  return (
    <Link
      key={treeName}
      className="tree_link"
      to={`/Investments/Agriculture/${treeName}`}
    >
      <div className="tree_left">
        <div className="tree_name">{treeName}</div>
        <div className="tree_price">${price}</div>
      </div>
      <div className="sidebar_chart">
        <Line data={data} options={option} />
      </div>

      <div className="tree_right">
        <div className="tree_profit_percentage">{percentage}</div>
        <div className="tree_eta">{tree.eta}</div>
      </div>
    </Link>
  );
}

export default TreeLink;
