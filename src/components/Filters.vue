<template>
  <div v-if="isFilters" class="p-6 md:p-10 shadow-lg bg-white rounded-md flex justify-between gap-6">
    <div class="flex gap-4 flex-wrap">
      <SelectedFilter
        v-for="selectedRoleFilter in selectedRoleFilters"
        @click="removeRoleFilter(selectedRoleFilter)">
          {{selectedRoleFilter}}
      </SelectedFilter>
      <SelectedFilter
        v-for="selectedLevelFilter in selectedLevelFilters"
        @click="removeLevelFilter(selectedLevelFilter)">
          {{selectedLevelFilter}}
      </SelectedFilter>
      <SelectedFilter
        v-for="selectedLanguageFilter in selectedLanguageFilters"
        @click="removeLanguageFilter(selectedLanguageFilter)">
          {{selectedLanguageFilter}}
      </SelectedFilter>
    </div>
    <div><button @click="resetAllFilters()" class="text-turqoise hover:underline font-bold">Clear</button></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SelectedFilter from './SelectedFilter.vue';

  export default defineComponent({
    components: { SelectedFilter },
    inject: ['selectedLanguageFilters', 'removeLanguageFilter', 'selectedRoleFilters', 'removeRoleFilter', 'selectedLevelFilters', 'removeLevelFilter'],
    methods: {
      resetAllFilters() {
        this.removeLanguageFilter();
        this.removeRoleFilter();
        this.removeLevelFilter();
      }
    },
    computed: {
      isFilters() {
        return this.selectedLanguageFilters.length > 0 || this.selectedRoleFilters.length > 0 || this.selectedLevelFilters.length > 0;
      }
    }
  })
</script>
