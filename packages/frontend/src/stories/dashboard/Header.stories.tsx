import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Header from '@components/dashboard/Header';

export default {
  title: 'Dashboard/Header',
  component: Header
} as Meta;

const Template: Story<ComponentProps<typeof Header>> = () => <Header />;

export const Default = Template.bind({});
