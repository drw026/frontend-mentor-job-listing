<template>
  <div
    class="group mx-[-1.5rem] flex flex-col justify-between gap-2 px-6 py-5 hover:bg-turqoise-light md:flex-row"
  >
    <div class="flex flex-col">
      <h2 class="text-lg font-bold text-turqoise-dark">
        {{ job.position }}
      </h2>
      <ul class="flex list-outside list-disc gap-8 text-gray-600">
        <li class="list-none">{{ relativePostedAt}}</li>
        <li class="capitalize">{{ job.contract }}</li>
        <li>{{ job.location }}</li>
        <li>@{{ job.company }}</li>
      </ul>
    </div>
    <div class="md:self-center">
      <button
        @click="confirmRemoval(job.id)"
        class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:text-white group-hover:bg-turqoise group-hover:text-white"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { relativeDate } from '../../common/helpers';

export default defineComponent({
  props: ['job'],
  inject: ['confirmRemoval'],
  computed: {
    relativePostedAt() {
      return relativeDate(this.job.postedAt);
    },
  },
});
</script>
