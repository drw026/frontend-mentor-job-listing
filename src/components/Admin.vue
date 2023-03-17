<template>
  <page>
    <router-view></router-view>
  </page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Page from '../common/Page.vue';
import AddJobForm from './AddJobForm.vue'; 

export default defineComponent({
  components: { Page, AddJobForm }
}); 
</script>
