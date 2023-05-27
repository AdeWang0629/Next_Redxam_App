import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import BalanceCard from '@components/dashboard/BalanceCard';

export default {
  title: 'Dashboard/BalanceCard',
  component: BalanceCard
} as Meta;

const Template: Story<ComponentProps<typeof BalanceCard>> = args => (
  <BalanceCard />
);

export const Default = Template.bind({});
