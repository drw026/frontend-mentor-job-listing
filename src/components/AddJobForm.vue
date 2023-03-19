<template>
  <div class="container mx-auto max-w-[500px] rounded-md bg-white p-6 shadow-lg">
    <div v-if="isSucces">
      <h1 class="mb-6 text-3xl font-bold text-turqoise-dark">Success!</h1>
      <p>Job was successfuly added.</p>
      <div class="mt-6 flex gap-2">
        <router-link to="/admin" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            role="link"
            class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
          >
            Return to overview
          </button>
        </router-link>
        <button
          @click="addAnotherJob"
          role="link"
          class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
        >
          Add another Job
        </button>
      </div>
    </div>
    <div v-else>
      <h1 class="mb-6 text-3xl font-bold text-turqoise-dark">Add a Job</h1>
      <form @submit.prevent="" autocomplete="off">
        <label for="jobtitle">
          <span class="text-lg font-bold">Job title</span>
          <input
            type="text"
            id="jobtitle"
            v-model.trim="jobtitle"
            class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
          />
        </label>
        <label for="company" class="mt-4 block">
          <span class="text-lg font-bold">Company</span>
          <input
            type="text"
            id="company"
            v-model.trim="company"
            class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
          />
        </label>
        <label for="contract" class="mt-4 block">
          <span class="text-lg font-bold">Contract</span>
          <select
            v-model="contract"
            id="contract"
            class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
          >
            <option disabled value="">Select a contract</option>
            <option
              :value="contract.toLowerCase()"
              v-for="contract in contracts"
            >
              {{ contract }}
            </option>
          </select>
        </label>
        <label for="location" class="mt-4 block">
          <span class="text-lg font-bold">Location</span>
          <input
            type="text"
            id="location"
            v-model.trim="location"
            class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
          />
        </label>
        <label for="role" class="mt-4 block">
          <span class="text-lg font-bold">Role</span>
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
        <label for="level" class="mt-4 block">
          <span class="text-lg font-bold">Level</span>
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
        <label for="language" class="mt-4 block">
          <span class="text-lg font-bold">Skills</span>
          <span class="text-xs"> (separate with a comma)</span>
          <textarea
            ref="skillsInput"
            v-show="showSkillsEditor || skills.length === 0"
            class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
            @blur="(event) => convertSkills(event.target.value)"
          ></textarea>
          <div
            v-show="!showSkillsEditor && skills.length > 0"
            class="mt-1 w-full"
          >
            <ul class="flex gap-2">
              <li v-for="skill in skills">
                <Skills @click="editSkills">{{ skill }}</Skills>
              </li>
              <li>
                <button
                  @click="editSkills"
                  class="rounded bg-turqoise px-2 py-1 text-sm font-bold text-white"
                >
                  +
                </button>
              </li>
            </ul>
          </div>
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

        <div class="mt-4 flex justify-end gap-2">
          <router-link to="/admin" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              role="link"
              class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
            >
              Return to overview
            </button>
          </router-link>
          <button
            @click="submitJob"
            class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Skills from './Skills.vue';

export default defineComponent({
  data() {
    return {
      isSucces: false,
      jobtitle: '',
      company: '',
      contract: '',
      location: '',
      role: '',
      level: '',
      new: false,
      featured: false,
      skills: [],
      showSkillsEditor: false,
    };
  },
  components: {
    Skills,
  },
  computed: {
    roles() {
      return ['Frontend', 'Fullstack', 'Backend'];
    },
    levels() {
      return ['Senior', 'Junior', 'Midweight'];
    },
    contracts() {
      return ['Full Time', 'Part Time', 'Contract'];
    },
  },
  methods: {
    addAnotherJob() {
      this.isSucces = false;
      this.jobtitle = '';
      this.company = '';
      this.contract = '';
      this.location = '';
      this.role = '';
      this.level = '';
      this.new = false;
      this.featured = false;
      this.skills = [];
    },
    convertSkills(input: string) {
      const skills = input.split(',');
      this.showSkillsEditor = false;
      this.skills = skills
        .map((skill) => skill.trim())
        .filter((skill) => skill);
    },
    editSkills() {
      this.showSkillsEditor = !this.showSkillsEditor;
      this.$nextTick(() => this.$refs.skillsInput.focus());
    },
    async submitJob() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_FIREBASE_URL}/jobs.json`,
          {
            method: 'POST',
            body: JSON.stringify({
              company: this.company,
              contract: this.contract,
              featured: this.featured,
              languages: this.skills,
              level: this.level,
              location: this.location,
              logo: '',
              new: this.new,
              position: this.jobtitle,
              postedAt: '1d ago',
              role: this.role,
            }),
          },
        );

        if (!response.ok) throw new Error('Response not ok');
        this.isSucces = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
