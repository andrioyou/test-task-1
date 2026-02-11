import { mount } from '@vue/test-utils';
import Round from './round.vue';

describe('Round', () => {
  it('renders properly', () => {
    const wrapper = mount(Round, {});
    expect(wrapper.text()).toContain('Welcome to Round');
  });
});
