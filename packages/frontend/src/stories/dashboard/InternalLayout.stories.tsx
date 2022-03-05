import React, { ComponentProps } from "react";

import { Story, Meta } from "@storybook/react";

import InternalLayout from "@components/dashboard/InternalLayout";

export default {
  title: "Dashboard/InternalLayout",
  component: InternalLayout,
} as Meta;

const Template: Story<ComponentProps<typeof InternalLayout>> = () => (
  <InternalLayout />
);

export const Default = Template.bind({});
