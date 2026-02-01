import { Horse } from './horse.interface';
import { HorseWithRoundResults } from './horse-with-round-results.interface';

export interface Round {
  name: string;
  horses: Horse[];
  horseResults: HorseWithRoundResults[];
}
