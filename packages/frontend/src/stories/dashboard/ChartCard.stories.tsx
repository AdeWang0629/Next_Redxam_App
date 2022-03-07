import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Chart from '@components/dashboard/ChartCard';

export default {
  title: 'Dashboard/ChartCard',
  component: Chart
} as Meta;

const Template: Story<ComponentProps<typeof Chart>> = (args) => (
  <div className="h-[fit-content] bg-blue-400">
    <Chart
      {...args}
      data={new Array(100).fill(0).map((_, i) => ({
        time: new Date().getTime() + 60000 * 60 * 24 * i,
        value: 100 * i - 3 * i * (Math.random() > 0.5 ? 1 : -1)
      }))}
    />
  </div>
);

export const Default = Template.bind({});
