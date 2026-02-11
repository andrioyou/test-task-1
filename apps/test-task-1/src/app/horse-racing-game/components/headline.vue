<script setup lang="ts">
defineProps<{
  generateIsDisabled: boolean,
  startIsDisabled: boolean,
  resetIsDisabled: boolean,
}>();

const emit = defineEmits<{
  (e: 'generate'): void
  (e: 'start'): void
  (e: 'reset'): void
}>();
</script>

<template>
  <div class="headline">
    <h1 class="headline__title">Horseracing</h1>
    <div class="headline__buttons">
      <button class="headline__button" :disabled="generateIsDisabled" @click="emit('generate')">Generate</button>
      <button class="headline__button" :disabled="startIsDisabled" @click="emit('start')">Start</button>
      <button class="headline__button" :disabled="resetIsDisabled" @click="emit('reset')">Reset</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../styles/vars' as *;

.headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $c-light;
  padding: 15px;
  margin-bottom: 30px;

  &__title {
    font-size: 24px;
    margin: 0;
  }

  &__buttons {
    display: flex;
  }

  &__button {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
