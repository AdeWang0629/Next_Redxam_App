import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import countries from "countries-list";
import emojione from "emojione";
import Emoji from "react-emoji-render";
import PhoneInput from "react-phone-number-input";
import "./SignUp.css";
import InputMask from "react-input-mask";
import getUserCountry from "js-user-country";
import Tree1 from "./SignUp/Tree1";
import Tree2 from "./SignUp/Tree2";
import Tree3 from "./SignUp/Tree3";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [usertype, setUsertype] = useState("");
  const [tax_id_type, setTax_id_type] = useState("");
  const [tax_id_type2, setTax_id_type2] = useState("");
  const [tax_id_data_value, setTax_id_data_value] = useState("");
  const [tax_id_data_value2, setTax_id_data_value2] = useState("");
  const [address_line1, setAddress_line1] = useState("");
  const [address_line2, setAddress_line2] = useState("");
  const [address_city, setAddress_city] = useState("");
  const [address_state, setAddress_state] = useState("");
  const [address_country, setAddress_country] = useState("");
  const [address_postal_code, setAddress_postal_code] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [inputPlaceholder2, setInputPlaceholder2] = useState("");
  const [taxidmask, setTaxidmask] = useState("");
  const [taxidmask2, setTaxidmask2] = useState("");
  const [second_tax_input, setSecond_tax_input] = useState(false);

  const navigate = useNavigate();

  const handleOnChangePhone = (value) => {
    setPhonenumber(value);
  };

  const handleOnChangeTaxId = (value) => {
    setTax_id_data_value(value);
  };
  const handleOnChangeTaxId2 = (value) => {
    setTax_id_data_value2(value);
  };
  function handleSelect(value, props) {
    setUsertype(value);
    if (props?.onSelect) {
      props.onSelect(value);
    }
  }
  useEffect(() => {
    if (address_country === "BR") {
      if (usertype === "Individual") {
        setTax_id_type("br_cpf");
        setInputPlaceholder("Enter your CPF");
        setTaxidmask("999.999.999-99");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("br_cnpj");
        setInputPlaceholder("Enter your CNPJ");
        setTaxidmask("99.999.999/9999-99");
        setSecond_tax_input(false);
      }
    } else if (address_country === "US") {
      if (usertype === "Individual") {
        setTax_id_type("us_ssn");
        setInputPlaceholder("Enter your SSN");
        setTaxidmask("999-99-9999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("us_ein");
        setInputPlaceholder("Enter your EIN");
        setTaxidmask("99-9999999");
        setSecond_tax_input(false);
      }
    } else if (address_country === "AU") {
      if (usertype === "Individual") {
        setTax_id_type("au_tfn");
        setInputPlaceholder("Enter your TFN");
        setTaxidmask("999999999");
        setSecond_tax_input(true);
        setTax_id_type2("au_arn");
        setInputPlaceholder2("Enter your ATO ARN");
      } else if (usertype === "Business") {
        setTax_id_type("au_abn");
        setInputPlaceholder("Enter your ABN");
        setTaxidmask("99999999999");
        setSecond_tax_input(true);
        setTax_id_type2("au_arn");
        setInputPlaceholder2("Enter your ATO ARN");
        setTaxidmask2("999999999999");
      }
    } else if (address_country === "AT") {
      if (usertype === "Individual") {
        setTax_id_type("at_sv-num");
        setInputPlaceholder("Enter your SV-Num");
        setTaxidmask("99 999999 a 999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("ATU99999999");
        setSecond_tax_input(false);
      }
    } else if (address_country === "BE") {
      if (usertype === "Individual") {
        setTax_id_type("be_nrn");
        setInputPlaceholder("Enter your NRN");
        setTaxidmask("999.99.99-999.99");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("BE9999999999");
        setSecond_tax_input(true);
        setTax_id_type2("be_bce");
        setInputPlaceholder2("Enter your BE BCE");
        setTaxidmask2("9999,999,999");
      }
    } else if (address_country === "BG") {
      if (usertype === "Individual") {
        setTax_id_type("bg_eik");
        setInputPlaceholder("Enter your ЕГН");
        setTaxidmask("9999999999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("BG9999999999");
        setSecond_tax_input(true);
        setTax_id_type2("bg_uic");
        setInputPlaceholder2("Enter your BG ЕИК");
        setTaxidmask2("999999999");
      }
    } else if (address_country === "CA") {
      if (usertype === "Individual") {
        setTax_id_type("ca_sin");
        setInputPlaceholder("Enter your SIN");
        setTaxidmask("999-999-999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("ca_bn");
        setInputPlaceholder("Enter your BN");
        setTaxidmask("999999999");
        setSecond_tax_input(false);
      }
    } else if (address_country === "CL") {
      if (usertype === "Individual") {
        setTax_id_type("cl_tin");
        setInputPlaceholder("Enter your RUN");
        setTaxidmask("99.999.999-*");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("cl_tin");
        setInputPlaceholder("Enter your RUT");
        setTaxidmask("99.999.999-*");
        setSecond_tax_input(false);
      }
    } else if (address_country === "HR") {
      if (usertype === "Individual") {
        setTax_id_type("hr_oib");
        setInputPlaceholder("Enter your OIB");
        setTaxidmask("99999999999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("HR99999999999");
        setSecond_tax_input(true);
        setTax_id_type2("hr_mb");
        setInputPlaceholder2("Enter your MB");
        setTaxidmask2("9999999999");
      }
    } else if (address_country === "CY") {
      if (usertype === "Individual") {
        setTax_id_type("cy_sin");
        setInputPlaceholder("Enter your SIN");
        setTaxidmask("99999999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("CY99999999*");
        setSecond_tax_input(true);
        setTax_id_type2("cy_tin");
        setInputPlaceholder2("Enter your CY TIN");
        setTaxidmask2("999999999");
      }
    } else if (address_country === "CZ") {
      if (usertype === "Individual") {
        setTax_id_type("cz_rc");
        setInputPlaceholder("Enter your RC");
        setTaxidmask("999999/9999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("CZ9999999999");
        setSecond_tax_input(true);
        setTax_id_type2("cz_ico");
        setInputPlaceholder2("Enter your IČO");
        setTaxidmask2("99999999");
      }
    } else if (address_country === "DK") {
      if (usertype === "Individual") {
        setTax_id_type("dk_cpr");
        setInputPlaceholder("Enter your CPR");
        setTaxidmask("999999-9999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("DK99999999");
        setSecond_tax_input(true);
        setTax_id_type2("dk_cvr");
        setInputPlaceholder2("Enter your CVR");
        setTaxidmask2("99999999");
      }
    } else if (address_country === "EG") {
      if (usertype === "Individual") {
        setTax_id_type2("eg_nid");
        setInputPlaceholder2("Enter your رقم البطاقة القومية");
        setTaxidmask2("99999999999999");
        setSecond_tax_input(true);
        setTax_id_type("eg_tin");
        setInputPlaceholder("Enter your الرقم الضريبي");
        setTaxidmask("999-999-999");
      } else if (usertype === "Business") {
        setTax_id_type("eg_tin");
        setInputPlaceholder("Enter your الرقم الضريبي");
        setTaxidmask("999-999-999");
        setSecond_tax_input(false);
      }
    } else if (address_country === "EE") {
      if (usertype === "Individual") {
        setTax_id_type("ee_pic");
        setInputPlaceholder("Enter your PIC");
        setTaxidmask("99999999999");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("EE999999999");
        setSecond_tax_input(true);
        setTax_id_type2("ee_brc");
        setInputPlaceholder2("Enter your BRC");
        setTaxidmask2("99999999");
      }
    } else if (address_country === "FI") {
      if (usertype === "Individual") {
        setTax_id_type("fi_pic");
        setInputPlaceholder("Enter your HT");
        setTaxidmask("999999-999*");
        setSecond_tax_input(false);
      } else if (usertype === "Business") {
        setTax_id_type("eu_vat");
        setInputPlaceholder("Enter your EU VAT");
        setTaxidmask("FI99999999");
        setSecond_tax_input(true);
        setTax_id_type2("fi_bid");
        setInputPlaceholder2("Enter your Y-TUNNUS");
        setTaxidmask2("9999999-9");
      }
    } else {
      setInputPlaceholder("Enter your Tax Id");
      setTax_id_type("unknown");
      setTaxidmask("");
      setSecond_tax_input(false);
      setTax_id_type2("");
      setInputPlaceholder2("");
    }
  }, [usertype, address_country]);
  const pensiveFaceEmoji = emojione.shortnameToUnicode(":pensive:");

  useEffect(() => {
    setAddress_country(getUserCountry().id);
  }, []);

  const handleCountrySelectChange = (event) => {
    setAddress_country(event.target.value);
  };

  const countryOptions = Object.entries(countries.countries)
    .sort(([, a], [, b]) => (a.name > b.name ? 1 : -1))
    .map(([code, country]) => {
      const flag = emojione.unicodeToImage(country.emoji);
      return (
        <option key={code} value={code} selected={"PE"}>
          {country.emoji} {country.name}
        </option>
      );
    });

  const usIndex = countryOptions.findIndex(
    (option) => option.props.value === "US"
  );
  const brIndex = countryOptions.findIndex(
    (option) => option.props.value === "BR"
  );
  const usOption = countryOptions[usIndex];
  const brOption = countryOptions[brIndex];
  countryOptions.splice(usIndex, 1);
  countryOptions.splice(brIndex, 1);
  countryOptions.unshift(brOption);
  countryOptions.unshift(usOption);

  const signUp = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        usertype: usertype,
        tax_id_type: tax_id_type,
        tax_id_data_value: tax_id_data_value,
        address_line1: address_line1,
        address_line2: address_line2,
        address_city: address_city,
        address_state: address_state,
        address_postal_code: address_postal_code,
        address_country: address_country,
      };
      // if (!response.ok) {
      //   throw new Error("Failed to sign up user");
      // }

      // const response = await fetch("http://localhost:8000/signup.stripe", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(userData),
      // });

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          uid: userCredential.user.uid,
          current_email: userCredential.user.email,
          firstname: firstname,
          lastname: lastname,
          phonenumber: phonenumber,
          usertype: usertype,
          tax_id_type: tax_id_type,
          tax_id_data_value: tax_id_data_value,
          tax_id_type2: tax_id_type2,
          tax_id_data_value2: tax_id_data_value2,
          address_line1: address_line1,
          address_line2: address_line2,
          address_city: address_city,
          address_state: address_state,
          address_postal_code: address_postal_code,
          address_country: address_country,
        },
        { merge: true }
      );
    } finally {
      navigate("/Investing");
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="signup_image_space"></div>
      <div className="signup_image">
        <div className="signup_image_text">
          <div className="signup_image_title">Create your login</div>
          <div className="signup_image_description">
            We'll need your name, email address, and a unique password. You'll
            use this login to access America Foundation next time.
          </div>
        </div>
        <div className="signup_image1">
          <Tree1 />
        </div>
        <div className="signup_image2">
          <Tree2 />
        </div>
        <div className="signup_image3">
          <Tree3 />
        </div>
      </div>
      <div className="signup_page_container">
        <div className="signup_ahaa_container">
          <div className="signup_ahaa_container_space"></div>

          <Link className="signup_ahaa" to="/LogIn">
            <div className="signup_ahaa_text">Already have an account ?</div>
            <svg className="signup_ahaa_svg" viewBox="0 0 60 50">
              <path
                className="ahaa1"
                d="m29.16,46.95c-8.99,0-17.99.03-26.98-.06-.7,0-1.69-.65-2.01-1.27-.31-.6-.18-1.7.18-2.34,1.32-2.33,2.8-4.57,4.25-6.83,1.75-2.73,3.53-5.44,5.29-8.17,4.28-6.64,8.55-13.28,12.82-19.92,1.47-2.29,2.92-4.58,4.4-6.86,1.48-2.27,3.53-1.95,5.28.76,2.01,3.1,4.08,6.17,6.08,9.28,1.8,2.81,3.54,5.66,5.31,8.48.87,1.38,1.76,2.75,2.65,4.12,1.28,1.98,2.55,3.96,3.83,5.94,1.33,2.06,2.67,4.11,4,6.17,1.54,2.41,3.14,4.78,4.54,7.27.34.61.25,1.79-.13,2.39-.36.57-1.38.72-2.11,1.04-.1.04-.24-.02-.36-.02-9.01,0-18.02,0-27.03,0h0Zm26.41-5.13c-.09-.21-.23-.83-.56-1.33-7.5-11.57-15.02-23.13-22.54-34.69-1.43-2.2-4.46-2.22-5.89-.02-7.55,11.6-15.1,23.21-22.64,34.82-.81,1.25-.66,2.48.26,3.6.92,1.12,2.2,1.06,3.51,1.05,14.9-.02,29.81-.02,44.71-.02,1.83,0,3.14-1.26,3.15-3.42Z"
              />
              <path
                className="ahaa2"
                d="m55.57,41.82c0,2.16-1.32,3.42-3.15,3.42-14.9,0-29.81,0-44.71.02-1.31,0-2.59.07-3.51-1.05-.92-1.12-1.07-2.35-.26-3.6,7.54-11.61,15.09-23.22,22.64-34.82,1.43-2.2,4.46-2.18,5.89.02,7.52,11.56,15.04,23.12,22.54,34.69.33.5.47,1.12.56,1.33Zm-26.07,2h0c7.67-.01,15.35.02,23.02-.08.55,0,1.59-1.07,1.54-1.53-.11-.89-.8-1.73-1.32-2.55-1.71-2.68-3.44-5.35-5.17-8.02-5.29-8.14-10.58-16.29-15.89-24.42-1.51-2.32-2.83-2.3-4.34.02-3.58,5.52-7.15,11.05-10.74,16.56-3.82,5.87-7.67,11.73-11.46,17.63-.25.39-.26,1.15-.05,1.58.19.39.83.78,1.28.78,7.71.05,15.42.03,23.12.03Z"
              />
              <path
                className="ahaa3"
                d="m29.5,43.82c-7.71,0-15.42.01-23.12-.03-.44,0-1.09-.39-1.28-.78-.21-.43-.21-1.19.05-1.58,3.79-5.9,7.64-11.75,11.46-17.63,3.59-5.51,7.16-11.04,10.74-16.56,1.51-2.32,2.82-2.34,4.34-.02,5.31,8.13,10.6,16.28,15.89,24.42,1.73,2.67,3.46,5.33,5.17,8.02.52.82,1.21,1.66,1.32,2.55.06.47-.98,1.53-1.54,1.53-7.67.1-15.35.07-23.02.07h0Zm-.13-32.08c-.79.55-2.07.96-2.27,1.68-.47,1.62-.51,3.39-.53,5.1-.02,1.55.19,3.1.31,4.65.2,2.57.39,5.15.63,7.71.11,1.15.77,1.85,1.98,1.84,1.21,0,1.8-.77,1.91-1.86.28-2.65.54-5.3.72-7.95.17-2.56.25-5.12.33-7.68.07-2.03-.98-3.16-3.07-3.49Zm.02,27.61c2.2.01,3.18-1.03,3.19-3.37,0-1.07-1.36-2.26-2.59-2.26-2.4,0-3.47.77-3.48,2.5-.01,2.12.91,3.12,2.89,3.13Z"
              />
              <path
                className="ahaa4"
                d="m29.37,11.74c2.1.33,3.14,1.47,3.07,3.49-.09,2.56-.16,5.12-.33,7.68-.18,2.65-.44,5.3-.72,7.95-.12,1.09-.7,1.86-1.91,1.86-1.21,0-1.87-.69-1.98-1.84-.24-2.57-.43-5.14-.63-7.71-.12-1.55-.33-3.1-.31-4.65.03-1.71.06-3.48.53-5.1.21-.72,1.48-1.13,2.27-1.68Z"
              />
              <path
                className="ahaa5"
                d="m29.39,39.35c-1.98-.01-2.9-1.01-2.89-3.13,0-1.73,1.09-2.51,3.48-2.5,1.24,0,2.6,1.19,2.59,2.26,0,2.34-.99,3.38-3.19,3.37Z"
              />
            </svg>
          </Link>
        </div>
        <div className="signup_page_holder">
          <div className="signup_page_holder2">
            <form className="signup_page" onSubmit={signUp}>
              <div className="signup_names">
                <div className="signup_names_container">
                  <input
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>

                <div className="signup_names_text">
                  Enter your first and last name as they appear on your
                  government ID.
                </div>
              </div>
              <div className="phonenumber_container">
                <PhoneInput
                  placeholder="Phone Number"
                  value={phonenumber}
                  onChange={handleOnChangePhone}
                  defaultCountry={getUserCountry().id}
                  required
                />
                <div className="phonenumber_text">
                  Your personal phone number, to keep your account safe.
                </div>
              </div>
              <div className="signup_login">
                <input
                  className="signup_email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="passwords">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="signup_taxes">
                <div className="signup_taxes_title">
                  Taxes <Emoji text={pensiveFaceEmoji} />
                </div>

                <div className="signup_taxes_description">
                  At America Foundation we want to make you the most money as
                  posible but inevitably your profits are going to get taxed, so
                  please select the country you are registered in and will pay
                  taxes to.
                </div>
              </div>
              <div className="usertype_select_container">
                <div className="usertype_select">
                  <select
                    className="signup_country_dropdown"
                    value={address_country}
                    onChange={handleCountrySelectChange}
                    required
                  >
                    <option value="">-- Select a country --</option>
                    {countryOptions}
                  </select>
                  <div class="usertype_buttons_container">
                    <div className="usertype_buttons">
                      <button
                        onClick={() => handleSelect("Individual")}
                        className={
                          usertype === "Individual"
                            ? "signup_individual_button_active"
                            : "signup_individual_button"
                        }
                      >
                        Individual
                      </button>
                      <button
                        onClick={() => handleSelect("Business")}
                        className={
                          usertype === "Business"
                            ? "signup_business_button_active"
                            : "signup_business_button"
                        }
                      >
                        Business
                      </button>
                    </div>
                    <div className="usertype_select_text">
                      select if you want file your taxes as a Individual or as a
                      Business
                    </div>
                  </div>
                </div>
              </div>
              <div className="signup_tax_details">
                {usertype === "Business" && address_country !== "" && (
                  <input
                    className={
                      second_tax_input
                        ? "signup_business_name3"
                        : "signup_business_name2"
                    }
                    type="text"
                    placeholder="Business Legal Name"
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                )}
                {usertype !== "" && address_country !== "" && (
                  <InputMask
                    mask={taxidmask}
                    maskChar=" "
                    className={
                      !second_tax_input && usertype === "Business"
                        ? "signup_first_tax_input_bussines2"
                        : !second_tax_input && usertype === "Individual"
                        ? "signup_first_tax_input_individual"
                        : second_tax_input && usertype === "Business"
                        ? "signup_first_tax_input_bussines3"
                        : second_tax_input && usertype === "Individual"
                        ? "signup_first_tax_input_individual2"
                        : ""
                    }
                    placeholder={inputPlaceholder}
                    onChange={(e) => handleOnChangeTaxId(e.target.value)}
                  />
                )}
                {second_tax_input && (
                  <InputMask
                    mask={taxidmask2}
                    maskChar=" "
                    className={
                      !second_tax_input && usertype === "Business"
                        ? "signup_first_tax_input_bussines2"
                        : !second_tax_input && usertype === "Individual"
                        ? "signup_first_tax_input_individual"
                        : second_tax_input && usertype === "Business"
                        ? "signup_first_tax_input_bussines3"
                        : second_tax_input && usertype === "Individual"
                        ? "signup_first_tax_input_individual2"
                        : ""
                    }
                    placeholder={inputPlaceholder2}
                    onChange={(e) => handleOnChangeTaxId(e.target.value)}
                  />
                )}
              </div>
              <input
                className="signup_street"
                type="text"
                placeholder="Steet Address"
                onChange={(e) => setAddress_line1(e.target.value)}
                required
              />
              <input
                className="signup_street"
                type="text"
                placeholder="Apt., ste.,bldg."
                onChange={(e) => setAddress_line2(e.target.value)}
              />
              <div className="signup_zipcode_container">
                <input
                  className="signup_zipcode"
                  type="text"
                  placeholder="City / Town"
                  onChange={(e) => setAddress_city(e.target.value)}
                  required
                />
                <input
                  className="signup_zipcode"
                  type="text"
                  placeholder="State / Province"
                  onChange={(e) => setAddress_state(e.target.value)}
                  required
                />
                <input
                  className="signup_zipcode"
                  type="text"
                  placeholder="ZIP code"
                  onChange={(e) => setAddress_postal_code(e.target.value)}
                  required
                />
              </div>
              <p>
                By creating a login, you agree to the America Foundation User
                Account Agreement and Privacy Policy .
              </p>
              <div className="signup_clbutton">
                <button type="submit">Create Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
