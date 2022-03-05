import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import RecentActivity from '@components/dashboard/RecentActivity';

export default {
  title: 'Dashboard/RecentActivity',
  component: RecentActivity
} as Meta;

const Template: Story<ComponentProps<typeof RecentActivity>> = () => (
  <RecentActivity />
);

export const Default = Template.bind({});
