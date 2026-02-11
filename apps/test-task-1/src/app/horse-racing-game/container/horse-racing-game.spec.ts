import { mount } from '@vue/test-utils';
import HorseRacingGame from './horse-racing-game.vue';

describe('HorseRacingGame', () => {
  it('renders properly', () => {
    const wrapper = mount(HorseRacingGame, {});
    expect(wrapper.text()).toContain('Welcome to HorseRacingGame');
  });
});
