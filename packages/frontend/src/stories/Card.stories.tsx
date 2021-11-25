import React, { ComponentProps } from "react";

import { Story, Meta } from "@storybook/react";

import Card from "@components/global/Card";

import kycImage from "@public/images/kyc/kyc.svg";

export default {
  title: "Global/Card",
  component: Card,
} as Meta;

const Template: Story = (args) => (
  <div className="bg-black min-h-screen">
    <Card {...args} />
  </div>
);

export const CardKYC = Template.bind({});

CardKYC.args = {
  cardImage: kycImage,
  cardText:
    "To continue adding a bank account to redxam you will need to complete your KYC verification. Which will be completed using sumsub.",
  buttonText: "Start KYC Verification ",
};
