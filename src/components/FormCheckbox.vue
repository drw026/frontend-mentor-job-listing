<template>
  <label for="id" class="mt-4 block">
    <input
      id="id"
      type="checkbox"
      :value="datamodel"
      class="rounded border-gray-300 text-turqoise focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-opacity-50 focus:ring-offset-0"
      @change="updateValue"
    />
    <span class="ml-2">{{ label }}</span>
  </label>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps(['id','label', 'datamodel']);
const emit = defineEmits(['update:datamodel']);

const updateValue = (event) => {
  emit('update:datamodel', event.target.checked);
};
</script>
