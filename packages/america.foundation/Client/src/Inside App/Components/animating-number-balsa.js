import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../../hooks/index-balsa";

function formatForDisplay(number = 0) {
  return parseFloat(Math.max(number, 0)).toFixed(2).split("").reverse();
}

function DecimalColumn() {
  return (
    <div>
      <span>.</span>
    </div>
  );
}
function ThousandColumn() {
  return (
    <div>
      <span>,</span>
    </div>
  );
}

function NumberColumn({ digit, delta }) {
  const [position, setPosition] = useState(0);
  const [animationClass, setAnimationClass] = useState(null);
  const previousDigit = usePrevious(digit);
  const columnContainer = useRef();

  const setColumnToNumber = (number) => {
    setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
  };

  useEffect(() => {
    if (previousDigit !== digit) {
      if (delta === "increase") {
        setAnimationClass("increase");
      } else if (delta === "decrease") {
        setAnimationClass("decrease");
      }
    }
  }, [digit, delta, previousDigit]);

  useEffect(() => setColumnToNumber(digit), [digit]);

  return (
    <div className="ticker-column-container" ref={columnContainer}>
      <motion.div
        animate={{ y: position }}
        className={`ticker-column ${animationClass}`}
        onAnimationComplete={() => setAnimationClass("")}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div key={num} className="ticker-digit">
            <span>{num}</span>
          </div>
        ))}
      </motion.div>
      <span className="number-placeholder">0</span>
    </div>
  );
}

export default function AnimatingNumber({ value }) {
  let numArray = formatForDisplay(value);
  const previousNumber = usePrevious(value);

  let delta = null;
  if (value > previousNumber) delta = "increase";
  if (value < previousNumber) delta = "decrease";

  if (numArray.length > 6) {
    for (let i = 6; i < numArray.length; i += 4) {
      numArray.splice(i, 0, ",");
    }
  }

  return (
    <motion.div layout className="ticker-view">
      {numArray.map((number, index) => {
        if (number === ".") {
          return <DecimalColumn key={index} />;
        } else if (number === ",") {
          return <ThousandColumn key={index} />;
        } else {
          return <NumberColumn key={index} digit={number} delta={delta} />;
        }
      })}
    </motion.div>
  );
}
