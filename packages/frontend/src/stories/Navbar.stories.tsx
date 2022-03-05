import React, { ComponentProps } from "react";

import { Story, Meta } from "@storybook/react";

import Navbar from "@components/global/Navbar";

export default {
  title: "Global/Navbar",
  component: Navbar,
} as Meta;

const Template: Story<ComponentProps<typeof Navbar>> = (args) => (
  <div className="bg-black min-h-screen">
    <Navbar {...args} />
  </div>
);

export const Default = Template.bind({});
export const WithTransparentBackground = Template.bind({});
WithTransparentBackground.args = {
  transparentBackground: true,
};
