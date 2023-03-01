<template>
  <div class="mx-auto container">
    <div class="flex gap-4 flex-col" v-if="jobs.length > 0">
      <Job v-for="job in jobs" :job="job" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Job from './components/Job.vue';

  export default defineComponent({
    data() {
      return {
        jobs: [],
        isLoading: false,
        error: false,
      }
    },
    components: {
      Job
    },
    methods: {
      loadJobs() {
        this.isLoading = true;
        fetch('https://fe-mentor-job-listing-937ef-default-rtdb.europe-west1.firebasedatabase.app/jobs.json')
          .then((response) => {
            if (!response.ok) throw new Error('Response not OK');
            return response.json();
          })
          .then((data) => {
            this.isLoading = false;
            this.jobs = data;
            console.log('?', data);
          })
          .catch((error) => {
            console.error(error)
          });
      }
    },
    mounted() {
      this.loadJobs();
    }
  });
</script>
