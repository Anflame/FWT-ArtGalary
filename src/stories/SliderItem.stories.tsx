import { ComponentStory, ComponentMeta } from '@storybook/react';
import SliderItem from '../components/SliderItem';
import { slides } from '../constants';

export default {
  title: 'SliderItem',
  component: SliderItem,
} as ComponentMeta<typeof SliderItem>;

const Template: ComponentStory<typeof SliderItem> = (args) => <SliderItem {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  slides: slides
};
