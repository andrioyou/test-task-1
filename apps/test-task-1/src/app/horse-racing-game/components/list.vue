<script setup lang="ts">
import { Horse } from '../interfaces/horse.interface';

defineProps<{
  horses: Horse[]
}>();
</script>

<template>
  <div class="list">
    <table class="list__table">
      <caption>Horse list</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.fullName">
          <th scope="row">{{ horse.fullName }}</th>
          <td>{{ horse.color.name }} <span class="list__color" :style="{ 'background-color': horse.color.hex }" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../styles/vars' as *;

.list {
  &__table {
    width: 100%;
  }

  &__color {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-left: 5px;
  }
}
</style>
