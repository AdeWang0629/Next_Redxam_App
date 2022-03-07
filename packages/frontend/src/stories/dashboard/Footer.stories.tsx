import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Footer from '@components/dashboard/Footer';

export default {
  title: 'Dashboard/Footer',
  component: Footer
} as Meta;

const Template: Story<ComponentProps<typeof Footer>> = args => (
  <Footer {...args} />
);

export const Default = Template.bind({});
