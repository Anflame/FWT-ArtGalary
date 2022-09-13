import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { PainterProfile } from '../pages/PainterProfile';

export default {
  title: 'Profile',
  component: PainterProfile,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/profile/:painterId',
      routeParams: { painterId: '1' },
      routeState: { fromPage: '/' },
    }
  }
} as ComponentMeta<typeof PainterProfile>;

const Template: ComponentStory<typeof PainterProfile> = () => <PainterProfile />;

export const Primary = Template.bind({});
