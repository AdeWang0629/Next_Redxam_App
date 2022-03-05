import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import CardKYC from '@components/dashboard/CardKYC';

import kycImage from '@public/images/kyc/kyc.svg';

export default {
  title: 'dashboard/CardKYC',
  component: CardKYC
} as Meta;

const Template: Story<ComponentProps<typeof CardKYC>> = args => (
  <div className="bg-black min-h-screen">
    <CardKYC {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  cardImage: kycImage,
  cardText:
    'To continue adding a bank account to redxam you will need to complete your KYC verification. Which will be completed using sumsub.',
  buttonText: 'Start KYC Verification '
};
