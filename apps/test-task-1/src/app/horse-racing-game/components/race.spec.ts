import { mount } from '@vue/test-utils';
import Race from './race.vue';

describe('Race', () => {
  it('renders properly', () => {
    const wrapper = mount(Race, {});
    expect(wrapper.text()).toContain('Welcome to Race');
  });
});
