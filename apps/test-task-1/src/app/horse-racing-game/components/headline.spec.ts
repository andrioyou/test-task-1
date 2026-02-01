import { mount } from '@vue/test-utils';
import Headline from './headline.vue';

describe('Headline', () => {
  it('renders properly', () => {
    const wrapper = mount(Headline, {});
    expect(wrapper.text()).toContain('Welcome to Headline');
  });
});
