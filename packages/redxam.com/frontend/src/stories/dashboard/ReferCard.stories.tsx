import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import ReferCard from '@components/dashboard/ReferCard';

export default {
  title: 'Dashboard/ReferCard',
  component: ReferCard
} as Meta;

const Template: Story<ComponentProps<typeof ReferCard>> = args => (
  <ReferCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  referralURL: ''
};
