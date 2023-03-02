<template>
  <div v-if="selectedFilters.length > 0" class="p-6 md:p-10 shadow-lg bg-white rounded-md flex justify-between gap-6">
    <div class="flex gap-4">
      <button 
        class="bg-turqoise-light text-turqoise rounded-sm text-sm font-bold pl-2 pr-9 py-1 after:content-['X'] after:bg-turqoise after:absolute after:text-white after:px-2 after:py-1 relative after:top-0 after:right-0"
        v-for="selectedFilter in filters" 
        @click="removeFilter(selectedFilter)">
          {{selectedFilter}}
      </button>
    </div>
    <div><button @click="removeFilter()">Clear</button></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    inject: ['selectedFilters', 'removeFilter'],
    data() {
      return {
        filters: this.selectedFilters
      }
    }
  })
</script>
