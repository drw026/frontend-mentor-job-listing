<template>
  <label for="id" class="mt-4 block">
    <span class="text-lg font-bold">{{ label }}</span>
    <select
      :value="datamodel"
      @change="updateValue"
      id="id"
      class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option :value="option.toLowerCase()" v-for="option in options">
        {{ option }}
      </option>
    </select>
  </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:datamodel']);
const props = defineProps(['id', 'label', 'datamodel', 'placeholder', 'options']);

const updateValue = (event) => {
  emit('update:datamodel', event.target.value)
}
</script>
