import { colors } from '../constants/colors.constant';
import { Horse } from '../interfaces/horse.interface';
import { generateHorseFullName } from './generateHorseFullName.helper';
import { getRandomNumber } from './getRandomNumber.helper';

export const generateHorse = (): Horse => {
  return {
    fullName: generateHorseFullName(),
    color: colors[getRandomNumber(colors.length) - 1],
  };
};
