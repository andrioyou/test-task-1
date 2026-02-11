<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { Round } from '../interfaces/round.interface';
import { Horse } from '../interfaces/horse.interface';
import { HorseWithRoundResults } from '../interfaces/horse-with-round-results.interface';

const props = defineProps<{
  round: Round,
  roundIndex: number,
  isResults?: boolean,
}>()

const horseList: ComputedRef<Horse[] | HorseWithRoundResults[]> = computed(() => (props.isResults ?  props.round?.horseResults : props.round?.horses) || []);
</script>

<template>
  <table v-if="horseList.length" class="list__table">
    <caption>Round {{ roundIndex + 1 }} - {{ round.name }}</caption>
    <thead>
      <tr>
        <th scope="col">Pos</th>
        <th scope="col">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(horse, index) in horseList" :key="horse.fullName">
        <td>{{ index + 1 }}</td>
        <td>{{ horse.fullName }}<span v-if="'time' in horse">{{ ' - ' + horse.time }}</span> </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
