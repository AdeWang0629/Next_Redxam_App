import React from "react";
import "./Agriculture.css";
import { Link } from "react-router-dom";

function Agriculture() {
  return (
    <div className="agriculture" style={{ paddingTop: "65px" }}>
      <div className="agriculture_header"></div>
      <div className="agriculture_container">
        <div className="agriculture_list">
          <div className="agriculture_list_container">
            <div className="agriculture_list_top">
              <h1 className="agriculture_title">Agriculture</h1>
              <div className="agriculture_description">
                Money in the bank. Explore companies that help manage your cash,
                from checking and savings to loan services.
              </div>
            </div>
            <div className="agriculture_list_bottom">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Price</th>
                    <th>Roi</th>
                    <th>Time Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5">
                      <Link
                        to="/FreeTrees"
                        style={{
                          display: "block",
                          textDecoration: "none",
                          color: "#fff",
                        }}
                      >
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td>Pinapple</td>
                              <td>$16,000</td>
                              <td>$30,000</td>
                              <td>20%</td>
                              <td>1 Year</td>
                            </tr>
                          </tbody>
                        </table>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <Link
                        to="/Investments/Agriculture/Balsa"
                        style={{
                          display: "block",
                          textDecoration: "none",
                          color: "#fff",
                        }}
                      >
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td>Balsa</td>
                              <td>$6,000</td>
                              <td>$18,000</td>
                              <td>20%</td>
                              <td>4 Year</td>
                            </tr>
                          </tbody>
                        </table>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    {" "}
                    <td colSpan="5">
                      <Link
                        to="/FreeTrees"
                        style={{
                          display: "block",
                          textDecoration: "none",
                          color: "#fff",
                        }}
                      >
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td>Melina</td>
                              <td>$6,000</td>
                              <td>$25,000</td>
                              <td>40%</td>
                              <td>6 Year</td>
                            </tr>
                          </tbody>
                        </table>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="agriculture_sidebar"></div>
      </div>
    </div>
  );
}

export default Agriculture;
