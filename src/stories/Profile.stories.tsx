import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ProfilePage } from '../pages/ProfilePage';

export default {
  title: 'Profile',
  component: ProfilePage,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/profile/:painterId',
      routeParams: { painterId: '1' },
      routeState: { fromPage: '/' },
    }
  }
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Primary = Template.bind({});
