import React, { ComponentProps } from "react";
import Image from "next/image";
import leafsBg from "@public/images/dashboard/leafs-bg.svg";

import { Story, Meta } from "@storybook/react";

import Card from "@components/dashboard/Card";

export default {
  title: "Dashboard/Card",
  component: Card,
} as Meta;

const Template: Story<ComponentProps<typeof Card>> = (args) => (
  <Card {...args}>{args.children}</Card>
);

export const Default = Template.bind({});
