import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import CardWithImage from '@components/dashboard/CardWithImage';

import kycImage from '@public/images/kyc/kyc.svg';

export default {
  title: 'dashboard/CardWithImage',
  component: CardWithImage
} as Meta;

const Template: Story<ComponentProps<typeof CardWithImage>> = args => (
  <div className="bg-black min-h-screen">
    <CardWithImage {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  cardImage: kycImage,
  cardText:
    'To continue adding a bank account to redxam you will need to complete your KYC verification. Which will be completed using sumsub.',
  buttonText: 'Start KYC Verification '
};
