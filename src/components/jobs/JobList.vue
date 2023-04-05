<template>
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
</template>

<script lang="ts" setup>
import { ref, computed, provide } from 'vue';
import type { Ref } from 'vue' 
import Job from './Job.vue';
import Filters from './Filters.vue';
import LoadingSpinner from '../LoadingSpinner.vue';
import useJobs from '../../common/composables/useJobs';

const selectedLanguageFilters: Ref<string[]> = ref([]);
const selectedLevelFilters: Ref<string[]> = ref([]);
const selectedRoleFilters: Ref<string[]> = ref([]);

const { jobs, isLoading } = useJobs();

const filteredJobs = computed(() => {
  return jobs.value
    .filter((job) => {
      const showRole =
        selectedRoleFilters.value.length === 0 ||
        selectedRoleFilters.value.includes(job.role);
      const showLevel =
        selectedLevelFilters.value.length === 0 ||
        selectedLevelFilters.value.includes(job.level);
      const showLanguages =
        selectedLanguageFilters.value.length === 0 ||
        job.languages.some((language: string) =>
          selectedLanguageFilters.value.includes(language),
        );
      return showRole && showLevel && showLanguages;
    })
    .sort(function (a, b) {
      return a.postedAt > b.postedAt ? -1 : a.postedAt < b.postedAt ? 1 : 0;
    });
});

const addLanguageFilter = (filter: string) => {
  if (selectedLanguageFilters.value.includes(filter)) return;
  selectedLanguageFilters.value.push(filter);
};

const removeLanguageFilter = (filter?: string) => {
  if (!filter) return selectedLanguageFilters.value.splice(0);
  selectedLanguageFilters.value.splice(
    selectedLanguageFilters.value.indexOf(filter),
    1,
  );
};

const addRoleFilter = (filter: string) => {
  if (selectedRoleFilters.value.includes(filter)) return;
  selectedRoleFilters.value.push(filter);
};

const removeRoleFilter = (filter?: string) => {
  if (!filter) return selectedRoleFilters.value.splice(0);
  selectedRoleFilters.value.splice(
    selectedRoleFilters.value.indexOf(filter),
    1,
  );
};

const addLevelFilter = (filter: string) => {
  if (selectedLevelFilters.value.includes(filter)) return;
  selectedLevelFilters.value.push(filter);
};

const removeLevelFilter = (filter?: string) => {
  if (!filter) return selectedLevelFilters.value.splice(0);
  selectedLevelFilters.value.splice(
    selectedLevelFilters.value.indexOf(filter),
    1,
  );
};

provide('selectedLanguageFilters', selectedLanguageFilters.value);
provide('addLanguageFilter', addLanguageFilter);
provide('removeLanguageFilter', removeLanguageFilter);
provide('selectedRoleFilters', selectedRoleFilters.value);
provide('addRoleFilter', addRoleFilter);
provide('removeRoleFilter', removeRoleFilter);
provide('selectedLevelFilters', selectedLevelFilters.value);
provide('addLevelFilter', addLevelFilter);
provide('removeLevelFilter', removeLevelFilter);
</script>
