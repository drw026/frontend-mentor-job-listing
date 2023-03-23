<template>
  <div
    class="container mx-auto max-w-[500px] rounded-md bg-white p-6 shadow-lg shadow-turqoise/30"
  >
    <Transition
      mode="out-in"
      enter-from-class="opacity-0 translate-y-[-30px]"
      leave-to-class="opacity-0"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-to-class="opacity-1 translate-y-0"
      leave-from-class="opacity-1 translate-y-0"
    >
      <div v-if="isSucces">
        <h1 class="mb-6 text-3xl font-bold text-turqoise-dark">Success!</h1>
        <p>Job was successfuly added.</p>
        <div class="mt-6 flex gap-3">
          <router-link to="/admin" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              role="link"
              class="rounded py-2 text-turqoise hover:underline"
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
      <LoadingSpinner v-else-if="!isSucces && isLoading" />
      <div v-else>
        <div class="mb-6 flex justify-between">
          <h1 class="text-3xl font-bold text-turqoise-dark">Add a Job</h1>
          <router-link to="/admin" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              role="link"
              class="rounded py-2 text-turqoise hover:underline"
            >
              Return to overview
            </button>
          </router-link>
        </div>
        <form @submit.prevent="" autocomplete="off">
          <label for="position">
            <span class="text-lg font-bold">Position</span>
            <input
              type="text"
              id="position"
              v-model.trim="position"
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
          <label for="languages" class="mt-4 block">
            <span class="text-lg font-bold">Languages</span>
            <span class="text-xs"> (separate with a comma)</span>
            <textarea
              id="languages"
              ref="languagesInput"
              v-show="showLanguagesEditor || languages.length === 0"
              class="mt-1 block w-full rounded-md border-gray-300 focus:border-turqoise focus:ring focus:ring-turqoise-light focus:ring-offset-0"
              @blur="(event) => convertLanguage(event.target.value)"
            ></textarea>
            <div
              v-show="!showLanguagesEditor && languages.length > 0"
              class="mt-1 w-full"
            >
              <ul class="flex gap-2 flex-wrap">
                <li v-for="language in languages">
                  <Language @click="editLanguage">{{ language }}</Language>
                </li>
                <li>
                  <button
                    @click="editLanguage"
                    class="rounded-md bg-turqoise px-3 py-1 font-bold capitalize text-white hover:bg-turqoise-light hover:text-turqoise"
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

          <div class="mt-4 flex justify-end gap-3">
            <button
              @click="submitJob"
              class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Language from '../Language.vue';
import LoadingSpinner from '../LoadingSpinner.vue';
import { timer, sleep } from '../../common/helpers';

export default defineComponent({
  data() {
    return {
      isSucces: false,
      position: '',
      company: '',
      contract: '',
      location: '',
      role: '',
      level: '',
      new: false,
      featured: false,
      languages: [],
      showLanguagesEditor: false,
      isLoading: false,
    };
  },
  components: {
    Language,
    LoadingSpinner,
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
      this.position = '';
      this.company = '';
      this.contract = '';
      this.location = '';
      this.role = '';
      this.level = '';
      this.new = false;
      this.featured = false;
      this.languages = [];
    },
    convertLanguage(input: string) {
      const languages = input.split(',');
      this.showLanguagesEditor = false;
      this.languages = languages
        .map((language) => language.trim())
        .filter((language) => language);
    },
    editLanguage() {
      this.showLanguagesEditor = !this.showLanguagesEditor;
      this.$nextTick(() => this.$refs.languagesInput.focus());
    },
    async submitJob() {
      const fetchTime = timer();
      fetchTime.start();
      this.isLoading = true;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_FIREBASE_URL}/jobs.json`,
          {
            method: 'POST',
            body: JSON.stringify({
              company: this.company,
              contract: this.contract,
              featured: this.featured,
              languages: this.languages,
              level: this.level,
              location: this.location,
              logo: '',
              new: this.new,
              position: this.position,
              postedAt: '1d ago',
              role: this.role,
            }),
          },
        );

        const stopTime = fetchTime.stop();

        if (!response.ok) throw new Error('Response not ok');
        if (stopTime < 1000) await sleep(1000 - stopTime);

        this.isLoading = false;
        this.isSucces = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
