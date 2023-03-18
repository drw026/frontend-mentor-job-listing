<template>
  <div class="container mx-auto rounded-md bg-white p-6">
    <div class="mb-6 flex justify-between border-b pb-6">
      <h1 class="text-3xl font-bold text-turqoise-dark">Manage Jobs</h1>
      <router-link to="/admin/add-job" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          role="link"
          class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
        >
          Add Job
        </button>
      </router-link>
    </div>
    <ul v-if="jobs.length > 0 && !isLoading" class="flex flex-col gap-8">
      <li v-for="job in jobs" class="flex justify-between">
        <div class="flex flex-col">
          <h2 class="text-lg font-bold text-turqoise-dark">
            {{ job.position }}
          </h2>
          <ul class="flex list-outside list-disc gap-8 text-gray-600">
            <li class="list-none">{{ job.postedAt }}</li>
            <li>{{ job.contract }}</li>
            <li>{{ job.location }}</li>
            <li>@{{ job.company }}</li>
          </ul>
        </div>
        <div class="self-center">
          <button
            @click="removeJob(job.id)"
            class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
          >
            Remove
          </button>
        </div>
      </li>
    </ul>
    <span v-else-if="isLoading">Loading...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { timer, sleep } from '../common/helpers';

export default defineComponent({
  data() {
    return {
      isLoading: false,
      jobs: [],
    };
  },
  methods: {
    async loadJobs() {
      const fetchTime = timer();
      fetchTime.start();
      this.isLoading = true;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_FIREBASE_URL}/jobs.json`,
        );
        const data = await response.json();
        const stopTime = fetchTime.stop();

        if (!response.ok) throw new Error('Response not OK');
        if (stopTime < 500) await sleep(500 - stopTime);

        this.isLoading = false;
        this.jobs = Object.keys(data).map(id => ({ ...data[id], id }));
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
    async removeJob(id: string) {
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/jobs/${id}.json`,
        { method: 'DELETE' },
      );
      this.jobs = this.jobs.filter((job) => job.id !== id);
    },
  },
  created() {
    this.loadJobs();
  },
});
</script>
