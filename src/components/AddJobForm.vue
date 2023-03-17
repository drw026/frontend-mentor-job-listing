<template>
  <div class="container mx-auto max-w-[500px] rounded-md bg-white p-6">
    <form @submit.prevent="">
      <label for="jobtitle">
        <span class="font-bold">Job title</span>
        <input
          type="text"
          id="jobtitle"
          v-model="jobtitle"
          class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
        />
      </label>
      <label for="company" class="mt-2 block">
        <span class="font-bold">Company</span>
        <input
          type="text"
          id="company"
          v-model="company"
          class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
        />
      </label>
      <label for="contract" class="mt-2 block">
        <span class="font-bold">Contract</span>
        <input
          type="text"
          id="contract"
          v-model="contract"
          class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
        />
      </label>
      <label for="location" class="mt-2 block">
        <span class="font-bold">Location</span>
        <input
          type="text"
          id="location"
          v-model="location"
          class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
        />
      </label>
      <label for="role" class="mt-2 block">
        <span class="font-bold">Role</span>
        <select
          id="role"
          v-model="role"
          class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
        >
          <option disabled value="">Select a role</option>
          <option :value="role.toLowerCase()" v-for="role in roles">
            {{ role }}
          </option>
        </select>
      </label>
      <label for="level" class="mt-2 block">
        Level
        <select
          id="level"
          v-model="level"
          class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
        >
          <option disabled value="">Select a level</option>
          <option :value="level.toLowerCase()" v-for="level in levels">
            {{ level }}
          </option>
        </select>
      </label>
      <label for="new" class="mt-4 block">
        <input
          id="new"
          type="checkbox"
          class="rounded border-gray-300 text-turqoise focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-opacity-50 focus:ring-offset-0"
          v-model="new"
        />
        <span class="ml-2">"New" label</span>
      </label>
      <label for="featured" class="mt-2 block">
        <input
          id="featured"
          type="checkbox"
          class="rounded border-gray-300 text-turqoise focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-opacity-50 focus:ring-offset-0"
          v-model="featured"
        />
        <span class="ml-2">"Featured" label</span>
      </label>

      <div class="mt-6 flex justify-end">
        <button
          class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
        >
          Add Job
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      jobtitle: '',
      company: '',
      contract: '',
      location: '',
      role: '',
      level: '',
      new: false,
      featured: false,
    };
  },
  computed: {
    roles() {
      return ['Frontend', 'Fullstack', 'Backend'];
    },
    levels() {
      return ['Senior', 'Junior', 'Midweight'];
    },
  },
});
</script>
