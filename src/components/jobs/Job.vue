<template>
  <div
    class="relative flex cursor-pointer flex-col gap-2 rounded-md bg-white p-5 pt-9 shadow-lg shadow-turqoise/30 before:hover:absolute before:hover:top-0 before:hover:left-0 before:hover:h-full before:hover:w-[5px] before:hover:rounded-l-md before:hover:bg-turqoise before:hover:content-[''] md:flex-row md:gap-7 md:p-10 md:pt-10"
  >
    <img
      v-if="job.logo"
      class="absolute top-[-22px] h-[44px] w-[44px] md:relative md:top-0 md:h-[88px] md:w-[88px]"
      :alt="job.logo"
      :src="logoSrc"
    />
    <div v-else class="h-[44px] w-[44px] md:h-[88px] md:w-[88px]"></div>
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <span class="mr-3 font-bold text-turqoise">{{ job.company }}</span>
        <span
          v-if="job.new"
          class="rounded-full bg-turqoise px-3 py-1 text-sm font-bold uppercase text-white"
          >New!</span
        >
        <span
          v-if="job.featured"
          class="rounded-full bg-turqoise-dark px-3 py-1 text-sm font-bold uppercase text-white"
          >Featured</span
        >
      </div>
      <h2 class="font-spartan text-lg font-bold text-turqoise-dark md:text-2xl">
        {{ job.position }}
      </h2>
      <ul class="flex list-outside list-disc gap-8 text-zinc-500">
        <li class="list-none">{{ relativePostedAt }}</li>
        <li class="pl-1 capitalize">{{ job.contract }}</li>
        <li class="pl-1">{{ job.location }}</li>
      </ul>
    </div>
    <div
      v-if="isLanguages"
      class="mt-2 flex flex-1 flex-wrap items-center gap-4 border-t-[1px] border-gray-400 pt-4 md:mt-0 md:flex-wrap md:justify-end md:border-none md:pt-0"
    >
      <Language v-if="job.role" @click="addRoleFilter(job.role)">{{
        job.role
      }}</Language>
      <Language v-if="job.level" @click="addLevelFilter(job.level)">{{
        job.level
      }}</Language>
      <Language
        v-for="language in job.languages"
        @click="addLanguageFilter(language)"
        :key="job.language"
      >
        {{ language }}
      </Language>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, inject, computed, toRefs } from 'vue';
import { relativeDate } from '../../common/helpers';
import Language from '../Language.vue';

const props = defineProps(['job']);
const { job } = toRefs(props)
const addLanguageFilter = inject('addLanguageFilter');
const addLevelFilter = inject('addLevelFilter');
const addRoleFilter = inject('addRoleFilter');

const logoSrc = computed(() => {
  return `./images/${job.value.logo}`;
});

const isLanguages = computed(() => {
  return job.value.languages.length > 0 && job.value.role && job.value.level;
});

const relativePostedAt = computed(() => {
  return relativeDate(job.value.postedAt);
});
</script>
