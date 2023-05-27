import React, { useState, createContext } from "react";
import "./App.css";
import Header from "./Inside App/Header/Header";
import { Route, Routes } from "react-router-dom";
import Cash from "./Inside App/Cash/Cash";
import FreeTrees from "./Inside App/Free Trees/FreeTrees";
import Account from "./Inside App/Account/Account";
import Investing from "./Inside App/Investing/Investing";
import Investments from "./Inside App/Investments/Investments";
import Agriculture from "./Inside App/Investments/Agriculture";
import Balsa from "./Inside App/Investments/Agriculture/Balsa";
import Funds from "./Inside App/Investments/Funds";
import Account_Investing from "./Inside App/Account/Account_Investing";
import Account_Cryto from "./Inside App/Account/Account_Cryto";
import Account_Transfers from "./Inside App/Account/Account_Transfers";
import Account_Recurring from "./Inside App/Account/Account_Recurring";
import Account_Statements from "./Inside App/Account/Account_Statements";
import Account_History from "./Inside App/Account/Account_History";
import Account_Settings from "./Inside App/Account/Account Settings/Account_Settings";
import Account_Help from "./Inside App/Account/Account_Help";
import Account_Settings_PersonalInfo from "./Inside App/Account/Account Settings/Account_Settings_PersonalInfo";
import Account_Settings_SecurityAndPrivacy from "./Inside App/Account/Account Settings/Account_Settings_SecurityAndPrivacy";
import Account_Settings_Beneficiaries from "./Inside App/Account/Account Settings/Account_Settings_Beneficiaries";
import Account_Settings_AppAppearance from "./Inside App/Account/Account Settings/Account_Settings_AppAppearance";
import LogIn from "./Outside App/LogIn";
import SignUp from "./Outside App/SignUp";
import Menu from "./Outside App/Landing/Menu";
import Landing from "./Outside App/Landing";
import Learn from "./Outside App/Learn";
import Support from "./Outside App/Support";
import ProtectedRoutes from "./Outside App/ProtectedRoutes";
import { AuthContextProvider } from "./AuthContext";
import ForgotPassword from "./Outside App/ForgotPassword";
export const ThemeContext = createContext("null");

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App">
        <div className="app_body">
          <AuthContextProvider>
            <Routes>
              <Route path="/LogIn" element={<LogIn />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route element={<Menu />}>
                <Route path="/en" element={<Landing title="Home" />} />
                <Route path="/learn" element={<Learn title="Learn" />} />
                <Route path="/support" element={<Support />} />
              </Route>

              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Header />}>
                  <Route path="/Investing" element={<Investing />} />
                  <Route path="/Investments" element={<Investments />} />
                  <Route
                    path="/Investments/Agriculture"
                    element={<Agriculture />}
                  />
                  <Route
                    path="/Investments/Agriculture/Balsa"
                    element={<Balsa />}
                  />
                  <Route path="/Investments/Funds" element={<Funds />} />
                  <Route path="/Cash" element={<Cash />} />
                  <Route path="/FreeTrees" element={<FreeTrees />} />
                  <Route path="/Account" element={<Account />}>
                    <Route
                      path="/Account/Investing"
                      element={<Account_Investing />}
                    />
                    <Route path="/Account/Cryto" element={<Account_Cryto />} />
                    <Route
                      path="/Account/Transfers"
                      element={<Account_Transfers />}
                    />
                    <Route
                      path="/Account/Recurring"
                      element={<Account_Recurring />}
                    />
                    <Route
                      path="/Account/Statements"
                      element={<Account_Statements />}
                    />
                    <Route
                      path="/Account/History"
                      element={<Account_History />}
                    />
                    <Route path="/Account/Help" element={<Account_Help />} />
                    <Route
                      path="/Account/Settings"
                      element={<Account_Settings />}
                    >
                      <Route
                        path="/Account/Settings/PersonalInfo"
                        element={<Account_Settings_PersonalInfo />}
                      />
                      <Route
                        path="/Account/Settings/SecurityAndPrivacy"
                        element={<Account_Settings_SecurityAndPrivacy />}
                      />
                      <Route
                        path="/Account/Settings/Beneficiaries"
                        element={<Account_Settings_Beneficiaries />}
                      />
                      <Route
                        path="/Account/Settings/AppAppearance"
                        element={
                          <Account_Settings_AppAppearance
                            setTheme={() => toggleTheme()}
                          />
                        }
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </AuthContextProvider>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
