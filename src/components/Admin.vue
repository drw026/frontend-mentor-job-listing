<template>
  <page>
    <router-view></router-view>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddJobForm from './admin/AddJobForm.vue'; 

export default defineComponent({
  components: { AddJobForm }
}); 
</script>
