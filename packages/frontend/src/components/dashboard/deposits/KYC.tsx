import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import { UserContext } from "@providers/User";
import SumsubWebSdk from "@sumsub/websdk-react";
import api from "@utils/api";
import StartKYC from "./StartKYC";
import ContinueKYC from "./ContinueKYC";
import KYCModel from "@components/models/KYCModel";
import FailedKYC from "./FailedKYC";
import PendingKYC from "./PendingKYC";
import CompletedKYC from "./CompletedKYC";

const config = (applicantEmail: string, applicantPhone: string) => ({
  lang: "en",
  email: applicantEmail,
  phone: applicantPhone,
  i18n: {
    document: {
      subTitles: { IDENTITY: "Upload a document that proves your identity" },
    },
  },
  uiConf: {
    customCssStr:
      ":root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}",
  },
  onError: (error: string) => {
    console.error("WebSDK onError", error);
  },
});

const eventHandler = (payload: any) => {
  console.log("oncomplete");
  console.log(payload);
};

const KYCView: NextPage = () => {
  const { user, loading } = useContext(UserContext);
  const [showKYC, setShowKYC] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isApplicant, setIsApplicant] = useState(false);
  const [applicantData, setApplicantData] = useState<null | {
    deleted: boolean;
    review: {
      reviewStatus:
        | "init"
        | "pending"
        | "prechecked"
        | "queued"
        | "completed"
        | "onHold";
      reviewResult: { reviewAnswer: string };
    };
  }>(null);

  useEffect(() => {
    (async () => {
      const { data: applicant } = await api.getApplicantData();
      const { data: accessToken } = await api.getSumsubAccessToken();

      if (applicant.status === 200) {
        setIsApplicant(true);
        setApplicantData(applicant);
      }

      setAccessToken(accessToken.token);
    })();
  }, []);

  if (!accessToken || !user || loading) return null;

  if (showKYC)
    return (
      <KYCModel isOpened={showKYC} setOpened={setShowKYC}>
        <SumsubWebSdk
          accessToken={accessToken}
          expirationHandler={async () => {
            const { data } = await api.getSumsubAccessToken();
            return Promise.resolve(data.token);
          }}
          config={config(user.email, user.phone)}
          options={{
            addViewportTag: false,
            adaptIframeHeight: true,
          }}
          onMessage={eventHandler}
          onError={eventHandler}
        />
      </KYCModel>
    );
  else if (!showKYC && !isApplicant)
    return <StartKYC setShowKYC={setShowKYC} />;
  else if (!showKYC && applicantData && applicantData.deleted)
    return <FailedKYC setShowKYC={setShowKYC} />;
  else if (
    !showKYC &&
    applicantData &&
    applicantData.review.reviewStatus === "pending"
  )
    return <PendingKYC setShowKYC={setShowKYC} />;
  else if (!showKYC && applicantData && !applicantData.review.reviewResult)
    return <ContinueKYC setShowKYC={setShowKYC} />;
  else if (
    !showKYC &&
    applicantData &&
    applicantData.review.reviewResult.reviewAnswer === "GREEN"
  )
    return <CompletedKYC setShowKYC={setShowKYC} />;
  else if (
    !showKYC &&
    applicantData &&
    applicantData.review.reviewResult.reviewAnswer === "RED"
  ) {
    return <FailedKYC setShowKYC={setShowKYC} />;
  } else return null;
};

export default KYCView;
