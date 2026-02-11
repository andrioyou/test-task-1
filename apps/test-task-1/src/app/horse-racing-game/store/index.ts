import { defineStore } from 'pinia';
import { Horse } from '../interfaces/horse.interface';
import { generateHorses as generateHorsesList } from '../helpers/generateHorses.helper';
import { Round } from '../interfaces/round.interface';
import { getRandomUnique } from '../helpers/getRandomUnique.helper';
import { HorseWithRoundResults } from '../interfaces/horse-with-round-results.interface';
import { rounds } from '../constants/rounds.constant';

interface HorseRacingGameState {
  horses: Horse[];
  rounds: Round[];
  currentRoundIndex: number;
  gameWasStarted: boolean;
}

export const HorseRacingGameStore = defineStore('horseRacingGameStore', {
  state: (): HorseRacingGameState => ({
    horses: [],
    rounds: [],
    currentRoundIndex: -1,
    gameWasStarted: false,
  }),
  actions: {
    generateProgram(): void {
      this.reset();
      this.generateHorses();
      this.generateRounds();
    },
    generateHorses(): void {
      this.horses = generateHorsesList();
    },
    generateRounds(): void {
      this.rounds = [];

      const numberOfHorsesPerRound = 10;

      rounds.forEach((distance) => {
        const horsesForRound = getRandomUnique(this.horses, numberOfHorsesPerRound);
        const round: Round = {
          name: `${distance} meters`,
          distance,
          horses: horsesForRound,
          horseResults: [],
        };
        this.rounds.push(round);
      });
    },
    start(): void {
      this.gameWasStarted = true;
      this.startNextRound();
    },
    startNextRound(): void {
      if (this.currentRoundIndex + 1 >= this.rounds.length) {
        return;
      } else {
        this.currentRoundIndex++;
      }
    },
    finishRound(horses: HorseWithRoundResults[]): void {
      this.rounds[this.currentRoundIndex].horseResults = horses;
      this.startNextRound();
    },
    reset(): void {
      this.horses = [];
      this.rounds = [];
      this.currentRoundIndex = -1;
      this.gameWasStarted = false;
    },
  },
});
