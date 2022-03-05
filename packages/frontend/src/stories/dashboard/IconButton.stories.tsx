import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import IconButton from '@components/dashboard/IconButton';

export default {
  title: 'Global/IconButton',
  component: IconButton
} as Meta;

const Template: Story = args => (
  <div className="bg-black min-h-screen">
    <IconButton {...args} />
  </div>
);

export const Default = Template.bind({});
