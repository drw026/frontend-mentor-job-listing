<template>
  <label :for="id" class="mt-4 block">
    <span class="text-lg font-bold">{{ label }}</span>
    <input
      type="text"
      id="id"
      :value="datamodel"
      @input="updateValue"
      class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
    />
  </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:datamodel'])
const props = defineProps(['id', 'label', 'datamodel']);

const updateValue = (event) => {
  emit(`update:datamodel`, event.target.value.trim())
}
</script>
