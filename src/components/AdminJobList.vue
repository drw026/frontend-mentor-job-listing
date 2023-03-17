<template>
  <div class="container mx-auto rounded-md bg-white p-6">
    <div class="mb-6 pb-6 flex justify-between border-b">
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
    <ul v-if="jobs.length > 0" class="flex flex-col gap-8">
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
            class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
          >
            Remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      isLoading: false,
      jobs: [],
    };
  },
  methods: {
    loadJobs() {
      this.isLoading = true;
      fetch(`${import.meta.env.VITE_FIREBASE_URL}/jobs.json`)
        .then((response) => {
          if (!response.ok) throw new Error('Response not OK');
          return response.json();
        })
        .then((data) => {
          this.isLoading = false;
          this.jobs = data;
          console.log('data:', data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.loadJobs();
  },
});
</script>
