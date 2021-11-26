import React, { ComponentProps } from "react";

import { Story, Meta } from "@storybook/react";

import Card from "@components/dashboard/Card";

export default {
  title: "Dashboard/Card",
  component: Card,
} as Meta;

const Template: Story<ComponentProps<typeof Card>> = (children) => (
  <Card>{children}</Card>
);

export const Default = Template.bind({});
