import { firstNames, lastNames } from '../constants/horse-names.constant';
import { getRandomNumber } from './getRandomNumber.helper';

export const generateHorseFullName = (): string => {
  const randomFirstName = firstNames[getRandomNumber(firstNames.length) - 1];
  const randomLastName = lastNames[getRandomNumber(lastNames.length) - 1];
  return `${randomFirstName} ${randomLastName}`;
};
