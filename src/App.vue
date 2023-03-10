<template>
  <div class="bg-turqoise-light mt-[150px] pb-9">
    <div class="mx-auto container p-6 flex gap-12 md:gap-10 flex-col h-auto">
      <Filters/>
      <div class="flex gap-12 md:gap-6 flex-col" v-if="jobs.length > 0">
        <Job v-for="job in filteredJobs" :job="job"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Job from './components/Job.vue';
import Filters from './components/Filters.vue';

export default defineComponent({
  data() {
    return {
      jobs: [],
      isLoading: false,
      error: false,
      selectedLanguageFilters: [],
      selectedRoleFilters: [],
      selectedLevelFilters: []
    }
  },
  components: {
    Job,
    Filters
  },
  computed: {
    filteredJobs() {
      const that = this;
      if (this.selectedLanguageFilters.length === 0 && this.selectedLevelFilters.length === 0 && this.selectedRoleFilters.length === 0) return this.jobs;

      return this.jobs.filter(function (job) {
        return job.languages.some(function (language: string) {
              return that.selectedLanguageFilters.includes(language)
            }) ||
            (that.selectedRoleFilters.includes(job.role) ||
                that.selectedLevelFilters.includes(job.level))
      });
    }
  },
  methods: {
    addLanguageFilter(filter: string) {
      if (this.selectedLanguageFilters.includes(filter)) return;
      this.selectedLanguageFilters.push(filter);
    },
    removeLanguageFilter(filter?: string) {
      if (!filter) return this.selectedLanguageFilters.splice(0);
      this.selectedLanguageFilters.splice(this.selectedLanguageFilters.indexOf(filter), 1);
    },
    addRoleFilter(filter: string) {
      if (this.selectedRoleFilters.includes(filter)) return;
      this.selectedRoleFilters.push(filter);
    },
    removeRoleFilter(filter?: string) {
      if (!filter) return this.selectedRoleFilters.splice(0);
      this.selectedRoleFilters.splice(this.selectedRoleFilters.indexOf(filter), 1);
    },
    addLevelFilter(filter: string) {
      if (this.selectedLevelFilters.includes(filter)) return;
      this.selectedLevelFilters.push(filter);
    },
    removeLevelFilter(filter?: string) {
      if (!filter) return this.selectedLevelFilters.splice(0);
      this.selectedLevelFilters.splice(this.selectedLevelFilters.indexOf(filter), 1);
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
      selectedLanguageFilters: this.selectedLanguageFilters,
      addLanguageFilter: this.addLanguageFilter,
      removeLanguageFilter: this.removeLanguageFilter,
      selectedRoleFilters: this.selectedRoleFilters,
      addRoleFilter: this.addRoleFilter,
      removeRoleFilter: this.removeRoleFilter,
      selectedLevelFilters: this.selectedLevelFilters,
      addLevelFilter: this.addLevelFilter,
      removeLevelFilter: this.removeLevelFilter
    }
  }
});
</script>
