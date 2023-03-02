<template>
  <div class="mx-auto container p-6 flex gap-12 md:gap-10 flex-col">
    <Filters />
    <div class="flex gap-12 md:gap-6 flex-col" v-if="jobs.length > 0">
      <Job v-for="job in filteredJobs" :job="job" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Job from './components/Job.vue'; 
  import Filters from './components/Filters.vue';

  export default defineComponent({
    data() {
      return {
        jobs: [],
        isLoading: false,
        error: false,
        selectedFilters: []
      }
    },
    components: {
      Job,
      Filters
    },
    computed: {
      filteredJobs() {
        const that = this;
        if (this.selectedFilters.length === 0) return this.jobs;
        return this.jobs.filter(function (job) {
          return job.languages.some(function (language: string) { return that.selectedFilters.includes(language)})
        });
      }
    },
    methods: {
      addFilter(filter: string) {
        if (this.selectedFilters.includes(filter)) return;
        this.selectedFilters.push(filter);
      },
      removeFilter(filter?: string) {
        if (!filter) return this.selectedFilters.splice(0);
        this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1);
      },
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
            console.error(error)
          });
      }
    },
    mounted() {
      this.loadJobs();
    },
    provide() {
      return {
        selectedFilters: this.selectedFilters,
        addFilter: this.addFilter,
        removeFilter: this.removeFilter,
      }
    }
  });
</script>
