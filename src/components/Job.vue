<template>
  <div class="shadow-lg">
    <div></div>
    <div>
      <div class="flex gap-2">
        <span>{{job.company}}</span>
        <span v-if="job.new">NEW</span>
        <span v-if="job.featured">Featured</span>
      </div>
      <h2>{{job.position}}</h2>
      <div>
<span>{{job.postedAt}}</span>
        <span>{{job.contract}}</span>
        <span>{{job.location}}</span>
      </div>
    </div>
    <ul v-if="job.languages.length > 0">
      <li v-for="language in job.languages">
        {{language}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  
  export default defineComponent({
    props: ['job']
  })
</script>
