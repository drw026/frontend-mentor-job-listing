<template>
  <div>
    <h1 class="mb-6 text-3xl font-bold text-turqoise-dark">{{ head }}</h1>
    <slot></slot>
    <div class="mt-6 flex gap-3">
      <router-link to="/admin" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          role="link"
          class="rounded py-2 text-turqoise hover:underline"
        >
          Return to overview
        </button>
      </router-link>
      <button
        @click="addAnotherJob"
        role="link"
        class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
      >
        {{ addJobLabel }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['head', 'addJobLabel']
})

</script>
