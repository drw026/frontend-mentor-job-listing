<template>
  <Transition
    mode="out-in"
    enter-from-class="opacity-0 translate-y-[-30px]"
    leave-to-class="opacity-0 translate-y-[-30px]"
    enter-active-class="transition-all duration-200 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-to-class="opacity-1 translate-y-0"
    leave-from-class="opacity-1 translate-y-0"
  >
    <div
      v-if="isFilters"
      class="-mt-24 flex justify-between gap-6 rounded-md bg-white p-5 shadow-lg shadow-turqoise/30 md:mt-0 md:px-10 md:py-6"
    >
      <div class="flex flex-wrap gap-4">
        <SelectedFilter
          v-for="selectedRoleFilter in selectedRoleFilters"
          @click="removeRoleFilter(selectedRoleFilter)"
        >
          {{ selectedRoleFilter }}
        </SelectedFilter>
        <SelectedFilter
          v-for="selectedLevelFilter in selectedLevelFilters"
          @click="removeLevelFilter(selectedLevelFilter)"
        >
          {{ selectedLevelFilter }}
        </SelectedFilter>
        <SelectedFilter
          v-for="selectedLanguageFilter in selectedLanguageFilters"
          @click="removeLanguageFilter(selectedLanguageFilter)"
        >
          {{ selectedLanguageFilter }}
        </SelectedFilter>
      </div>
      <div class="self-center">
        <button
          @click="resetAllFilters()"
          class="font-bold text-turqoise hover:underline"
        >
          Clear
        </button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue';
import SelectedFilter from './SelectedFilter.vue';

const selectedLanguageFilters = inject('selectedLanguageFilters');
const removeLanguageFilter = inject('removeLanguageFilter');
const selectedRoleFilters = inject('selectedRoleFilters');
const removeRoleFilter = inject('removeRoleFilter');
const selectedLevelFilters = inject('selectedLevelFilters');
const removeLevelFilter = inject('removeLevelFilter');

const isFilters = computed(() => {
  return (
    selectedLanguageFilters.length > 0 ||
    selectedRoleFilters.length > 0 ||
    selectedLevelFilters.length > 0
  );
});

const resetAllFilters = () => {
  removeLanguageFilter();
  removeRoleFilter();
  removeLevelFilter();
};
</script>
