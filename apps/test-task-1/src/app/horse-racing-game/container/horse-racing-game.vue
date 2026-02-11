<script setup lang="ts">
  import { computed, ComputedRef } from 'vue';
  import { Horse } from '../interfaces/horse.interface';
  import Headline from '../components/headline.vue';
  import List from '../components/list.vue';
  import Race from '../components/race.vue';
  import Round from '../components/round.vue';
  import { HorseRacingGameStore } from '../store/index'
  import { Round as IRound } from '../interfaces/round.interface';
  import { HorseWithRoundResults } from '../interfaces/horse-with-round-results.interface';

  const horseRacingGameStore = HorseRacingGameStore();

  const horses: ComputedRef<Horse[]> = computed(() => horseRacingGameStore.horses);
  const rounds: ComputedRef<IRound[]> = computed(() => horseRacingGameStore.rounds);
  const currentRoundIndex: ComputedRef<number> = computed(() => horseRacingGameStore.currentRoundIndex);
  const gameWasStarted: ComputedRef<boolean> = computed(() => horseRacingGameStore.gameWasStarted);

  function generateProgram(): void {
    horseRacingGameStore.generateProgram();
  }

  function start(): void {
    horseRacingGameStore.start();
  }

  function finishRound(horses: HorseWithRoundResults[]): void {
    horseRacingGameStore.finishRound(horses);
  }

  function reset(): void {
    horseRacingGameStore.reset();
  }
</script>

<template>
  <div class="horse-racing-game">
    <div class="container">
      <Headline
        :generate-is-disabled="!!horses.length"
        :start-is-disabled="!horses.length || gameWasStarted"
        :reset-is-disabled="!horses.length"
        @generate="generateProgram"
        @start="start"
        @reset="reset"
      />
      
      <div v-if="!horses.length" class="horse-racing-game__empty">
        <h3>Generate a new game!</h3>
      </div>
      <div v-else class="row">
        <div class="col-4">
          <List :horses="horses" />
        </div>
        <div class="col-4">
          <Race v-if="rounds && rounds[currentRoundIndex]" :key="rounds[currentRoundIndex].name" :round="rounds[currentRoundIndex]" :current-round-index="currentRoundIndex" @round-is-finished="finishRound" />
        </div>
        <div class="col-4">
          <div class="row">
            <div class="col-6">
              <Round v-for="(round, index) in rounds" :key="index" :round="round" :round-index="index" />
            </div>
            <div class="col-6">
              <Round v-for="(round, index) in rounds" :key="index" :round="round" :round-index="index" :is-results="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horse-racing-game {
  margin-bottom: 30px;
}
</style>
