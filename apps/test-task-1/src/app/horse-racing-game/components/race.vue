<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Round } from '../interfaces/round.interface';
import { HorseWithRoundResults } from '../interfaces/horse-with-round-results.interface';
import horseImage from '../../../assets/horse.png'
import { getRandomNumber } from '../helpers/getRandomNumber.helper';

const horsesForRace = ref<HorseWithRoundResults[]>([]);
const raceIsStarted = ref(false);
const startTimeoutID = ref(0);
const raceEndTimeoutID = ref(0);

const props = defineProps<{
  round: Round,
  currentRoundIndex: number,
}>();

const emit = defineEmits<{
  (e: 'roundIsFinished', horses: HorseWithRoundResults[]): void
}>();

function startHorseRace(): void {
  let maxTimeinSeconds = 0;
  const horseResults = props.round.horses.map(horse => {
    
    // Time is from 3 to 8 seconds if round distance is 1000 meters
    const distanceMultiplier = props.round.distance / 1000;
    const minRaceTime = 3;
    const maxRaceDuration = 5;
    const randomRaceTime = ((getRandomNumber(maxRaceDuration * 100) / 100 + minRaceTime) * 100) * distanceMultiplier * 10;
    const timeInSeconds = Math.round(randomRaceTime / 10) / 100;

    if (timeInSeconds > maxTimeinSeconds) maxTimeinSeconds = timeInSeconds;
    const horseWithRoundResults: HorseWithRoundResults = {
      ...horse,
      time:timeInSeconds
    };
    return horseWithRoundResults;
  });
  horsesForRace.value = horseResults;

  startTimeoutID.value = setTimeout(() => {
    raceIsStarted.value = true;
  }, 100);
  
  raceEndTimeoutID.value = setTimeout(() => {
    const sortedHorses = [...horsesForRace.value];
    sortedHorses.sort((a, b) => a.time - b.time);
    emit('roundIsFinished', sortedHorses);
  }, maxTimeinSeconds * 1000);
}

onMounted(() => {
  startHorseRace();
});

onBeforeUnmount(() => {
  clearTimeout(startTimeoutID.value);
  clearTimeout(raceEndTimeoutID.value);
});
</script>

<template>
  <div class="race">
    <h6 class="race__title">Round {{ currentRoundIndex + 1 }} - {{ round.name }}</h6>
    <div class="race__field">
      <div v-for="horse in horsesForRace" :key="horse.fullName" class="race__item">
        <p class="race__name">{{ horse.fullName }}</p>
        <div class="race__line" :style="{ 'background-color': horse.color.hex }">
          <div class="race__line-holder">
            <div class="race__horse-icon" :style="{ 'background-image': 'url(' + horseImage + ')', 'left': raceIsStarted ? '100%' : '0%', 'transition-duration': horse.time + 's' }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../styles/vars' as *;

.race {
  &__title {
    font-weight: 700;
  }

  &__field {
    border: 1px solid $c-dark;
  }

  &__name {
    margin: 0;
    font-size: 13px;
    font-weight: bold;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__line {
    height: 30px;
    padding-right: 40px;
  }

  &__line-holder {
    position: relative;
    height: 30px;
  }

  &__horse-icon {
    position: absolute;
    top: 3px;
    left: 0%;
    width: 40px;
    height: 25px;
    background-size: cover;
    background-position: center;
    transition: all 1s linear;
  }
}
</style>
