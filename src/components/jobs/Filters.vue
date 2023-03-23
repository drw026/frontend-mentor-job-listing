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

<script lang="ts">
import { defineComponent } from 'vue';
import SelectedFilter from './SelectedFilter.vue';

export default defineComponent({
  components: { SelectedFilter },
  inject: [
    'selectedLanguageFilters',
    'removeLanguageFilter',
    'selectedRoleFilters',
    'removeRoleFilter',
    'selectedLevelFilters',
    'removeLevelFilter',
  ],
  methods: {
    resetAllFilters() {
      this.removeLanguageFilter();
      this.removeRoleFilter();
      this.removeLevelFilter();
    },
  },
  computed: {
    isFilters() {
      return (
        this.selectedLanguageFilters.length > 0 ||
        this.selectedRoleFilters.length > 0 ||
        this.selectedLevelFilters.length > 0
      );
    },
  },
});
</script>
