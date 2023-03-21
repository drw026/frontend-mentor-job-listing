<template>
  <div class="container mx-auto rounded-md bg-white p-6 shadow-lg">
    <base-dialog :show="!!jobId" title="Remove job">
      Are you sure you want to delete this job ?
      <template v-slot:actions>
        <button
          @click="cancelRemoval"
          class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
        >
          Cancel
        </button>
        <button
          @click="removeJob(jobId)"
          class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
        >
          Confirm
        </button>
      </template>
    </base-dialog>
    <div class="mb-6 flex justify-between border-b pb-6">
      <div class="flex justify-end gap-6">
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
      <button
        class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
        @click="logout"
      >
        Logout
      </button>
    </div>
    <Transition
      mode="out-in"
      enter-from-class="opacity-0 translate-y-[-30px]"
      leave-to-class="opacity-0"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-to-class="opacity-1 translate-y-0"
      leave-from-class="opacity-1 translate-y-0"
    >
      <ul v-if="jobs.length > 0 && !isLoading" class="flex flex-col gap-8">
        <li
          v-for="job in jobs"
          class="flex flex-col justify-between gap-2 md:flex-row"
        >
          <div class="flex flex-col">
            <h2 class="text-lg font-bold text-turqoise-dark">
              {{ job.position }}
            </h2>
            <ul class="flex list-outside list-disc gap-8 text-gray-600">
              <li class="list-none">{{ job.postedAt }}</li>
              <li class="capitalize">{{ job.contract }}</li>
              <li>{{ job.location }}</li>
              <li>@{{ job.company }}</li>
            </ul>
          </div>
          <div class="md:self-center">
            <button
              @click="confirmRemoval(job.id)"
              class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
            >
              Remove
            </button>
          </div>
        </li>
      </ul>
      <LoadingSpinner v-else-if="isLoading" />
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { timer, sleep, deleteCookie } from '../common/helpers';
import LoadingSpinner from './LoadingSpinner.vue';

export default defineComponent({
  data() {
    return {
      isLoading: false,
      jobs: [],
      jobId: '',
    };
  },
  components: {
    LoadingSpinner,
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
        this.jobs = Object.keys(data).map((id) => ({ ...data[id], id }));
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
    confirmRemoval(id: string) {
      this.jobId = id;
    },
    async removeJob(id: string) {
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/jobs/${id}.json`,
        { method: 'DELETE' },
      );
      this.jobs = this.jobs.filter((job) => job.id !== id);
      this.jobId = '';
    },
    cancelRemoval() {
      this.jobId = '';
    },
    logout() {
      deleteCookie('accessToken');
      this.$router.push('/login');
    },
  },
  created() {
    this.loadJobs();
  },
});
</script>
