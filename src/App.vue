<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JobList from './components/JobList.vue';

export default defineComponent({
  components: {
    JobList
  }
})
</script>
