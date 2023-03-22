<template>
  <page>
    <Filters />
    <Transition
      mode="out-in"
      enter-from-class="opacity-0 translate-y-[-30px]"
      leave-to-class="opacity-0"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-to-class="opacity-1 translate-y-0"
      leave-from-class="opacity-1 translate-y-0"
    >
      <div
        class="flex flex-col gap-12 md:gap-6"
        v-if="jobs.length > 0 && !isLoading"
      >
        <Job v-for="job in filteredJobs" :job="job" :key="job.id" />
      </div>
      <LoadingSpinner v-else-if="isLoading" class="mt-8" />
    </Transition>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Job from './Job.vue';
import Filters from './Filters.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import getJobs from '../common/mixins/loadJobs';

export default defineComponent({
  mixins: [getJobs],
  data() {
    return {
      error: false,
      selectedLanguageFilters: [],
      selectedRoleFilters: [],
      selectedLevelFilters: [],
    };
  },
  components: {
    Job,
    Filters,
    LoadingSpinner,
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter((job) => {
        const showRole =
          this.selectedRoleFilters.length === 0 ||
          this.selectedRoleFilters.includes(job.role);
        const showLevel =
          this.selectedLevelFilters.length === 0 ||
          this.selectedLevelFilters.includes(job.level);
        const showLanguages =
          this.selectedLanguageFilters.length === 0 ||
          job.languages.some((language: string) =>
            this.selectedLanguageFilters.includes(language),
          );
        return showRole && showLevel && showLanguages;
      });
    },
  },
  methods: {
    addLanguageFilter(filter: string) {
      if (this.selectedLanguageFilters.includes(filter)) return;
      this.selectedLanguageFilters.push(filter);
    },
    removeLanguageFilter(filter?: string) {
      if (!filter) return this.selectedLanguageFilters.splice(0);
      this.selectedLanguageFilters.splice(
        this.selectedLanguageFilters.indexOf(filter),
        1,
      );
    },
    addRoleFilter(filter: string) {
      if (this.selectedRoleFilters.includes(filter)) return;
      this.selectedRoleFilters.push(filter);
    },
    removeRoleFilter(filter?: string) {
      if (!filter) return this.selectedRoleFilters.splice(0);
      this.selectedRoleFilters.splice(
        this.selectedRoleFilters.indexOf(filter),
        1,
      );
    },
    addLevelFilter(filter: string) {
      if (this.selectedLevelFilters.includes(filter)) return;
      this.selectedLevelFilters.push(filter);
    },
    removeLevelFilter(filter?: string) {
      if (!filter) return this.selectedLevelFilters.splice(0);
      this.selectedLevelFilters.splice(
        this.selectedLevelFilters.indexOf(filter),
        1,
      );
    },
  },
  created() {
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
      removeLevelFilter: this.removeLevelFilter,
    };
  },
});
</script>
