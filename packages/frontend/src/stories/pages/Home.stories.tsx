import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Home from '@pages/home';

export default {
  title: 'Pages/dashboard/Home',
  component: Home
} as Meta;

const Template: Story<ComponentProps<typeof Home>> = () => <Home />;

export const Default = Template.bind({});
