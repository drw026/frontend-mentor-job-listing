<template>
  <div class="shadow-lg bg-white rounded-md flex p-5 cursor-pointer flex-col md:flex-row gap-2 md:gap-7 hover:border-solid hover:border-l-4 hover:border-turqoise">
    <div class="relative">
      <img v-if="job.logo" class="absolute w-[44px] h-[44px] top-[-44px] md:w-[88px] md:h-[88px] md:relative md:top-0" :alt="job.logo" :src="logoSrc" />
      <div v-else class="w-[44px] h-[44px] md:h-[88px] md:w-[88px]"></div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <span class="text-turqoise font-bold mr-3">{{job.company}}</span>
        <span v-if="job.new" class="text-sm bg-turqoise text-white rounded-full px-3 py-1 uppercase font-bold">New!</span>
        <span v-if="job.featured" class="text-sm bg-turqoise-dark text-white rounded-full px-3 py-1 uppercase font-bold">Featured</span>
      </div>
      <h2 class="text-turqoise-dark font-bold text-lg">{{job.position}}</h2>
      <ul class="flex list-disc list-outside gap-8 text-gray-600">
        <li class="list-none">{{job.postedAt}}</li>
        <li class="pl-2">{{job.contract}}</li>
        <li class="pl-2">{{job.location}}</li>
      </ul>
    </div>
    <div v-if="isLanguages" class="flex flex-wrap gap-4 md:justify-end flex-1 items-center md:flex-wrap border-t-[1px] border-gray-400 md:border-none mt-2 pt-4 md:mt-0 md:pt-0">
      <Skills v-if="job.role" @click="addRoleFilter(job.role)">{{job.role}}</Skills>
      <Skills v-if="job.level" @click="addLevelFilter(job.level)">{{job.level}}</Skills>
      <Skills v-for="language in job.languages" @click="addLanguageFilter(language)" :key="job.language">
        {{language}}
      </Skills>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import Language from '../Language.vue';

  export default defineComponent({
    components: {
      Skills: Language
    },
    props: ['job'],
    inject: ['addLanguageFilter', 'addRoleFilter', 'addLevelFilter'],
    computed: {
      logoSrc() {
        return `./images/${this.job.logo}`
      },
      isLanguages() {
        return this.job.languages.length > 0 && this.job.role && this.job.level
      }
    }
  })
</script>
