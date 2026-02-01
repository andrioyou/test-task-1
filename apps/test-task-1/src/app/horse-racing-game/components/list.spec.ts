import { mount } from '@vue/test-utils';
import List from './list.vue';

describe('List', () => {
  it('renders properly', () => {
    const wrapper = mount(List, {});
    expect(wrapper.text()).toContain('Welcome to List');
  });
});
