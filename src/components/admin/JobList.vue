<template>
  <div
    class="container mx-auto rounded-md bg-white p-6 shadow-lg shadow-turqoise/30"
  >
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
    <div class="flex justify-between border-b pb-6">
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
      <div v-if="jobs.length > 0 && !isLoading" class="flex flex-col">
        <Job v-for="job in jobsSorted" :job="job" :key="job.id" />
      </div>
      <LoadingSpinner v-else-if="isLoading" class="mt-6" />
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { deleteCookie } from '../../common/helpers';
import getJobs from '../../common/mixins/loadJobs';
import LoadingSpinner from '../LoadingSpinner.vue';
import Job from './Job.vue';

export default defineComponent({
  mixins: [getJobs],
  data() {
    return {
      jobId: '',
    };
  },
  components: {
    LoadingSpinner,
    Job,
  },
  computed: {
    jobsSorted() {
      return this.jobs.sort(function (a, b) {
        return a.postedAt > b.postedAt ? -1 : a.postedAt < b.postedAt ? 1 : 0;
      });
    },
  },
  methods: {
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
  provide() {
    return { confirmRemoval: this.confirmRemoval };
  },
});
</script>
