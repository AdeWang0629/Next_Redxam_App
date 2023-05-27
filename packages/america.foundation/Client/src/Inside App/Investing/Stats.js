import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import "./Stats.css";
import TreeLink from "./Stats/TreeLink";

function Stats({ agriculture_doc }) {
  let trees;
  if (agriculture_doc !== false) {
    trees = agriculture_doc.trees;

    // console.log(trees);
  }

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p> Agricultural Funds</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            <div className="tree_row">
              {agriculture_doc
                ? Object.keys(trees).map((treeName) => (
                    <TreeLink
                      key={treeName}
                      treeName={treeName}
                      trees={trees}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="stats__header stats-lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows"></div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
