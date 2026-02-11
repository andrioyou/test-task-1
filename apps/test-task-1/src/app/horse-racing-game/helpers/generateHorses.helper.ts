import { firstNames, lastNames } from '../constants/horse-names.constant';
import { colors } from '../constants/colors.constant';
import { Horse } from '../interfaces/horse.interface';
import { getRandomNumber } from './getRandomNumber.helper';

let uniqueFirstNames: string[] = [];
let uniqueLastNames: string[] = [];

const generateHorseFullName = (): string => {
  const uniqueFirstName = uniqueFirstNames.splice(getRandomNumber(uniqueFirstNames.length) - 1, 1)[0];
  const uniqueLastName = uniqueLastNames.splice(getRandomNumber(uniqueLastNames.length) - 1, 1)[0];
  return `${uniqueFirstName} ${uniqueLastName}`;
};

const generateHorse = (): Horse => {
  return {
    fullName: generateHorseFullName(),
    color: colors[getRandomNumber(colors.length) - 1],
  };
};

export const generateHorses = (numberOfHorses = 20): Horse[] => {
  uniqueFirstNames = [...firstNames];
  uniqueLastNames = [...lastNames];

  const horses = [];
  for (let index = 0; index < numberOfHorses; index++) {
    horses[index] = generateHorse();
  }
  return horses;
};
