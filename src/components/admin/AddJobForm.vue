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
      <Message
        v-if="isSuccess"
        head="Success!"
        addJobLabel="Add another Job"
        @add-another-job="resetJobForm"
      >
        <p>Job was succesfully added.</p>
      </Message>
      <LoadingSpinner v-else-if="!isSuccess && isLoading" />
      <Message
        v-else-if="!isSuccess && !isLoading && !!error"
        head="Failed!"
        addJobLabel="Retry"
        @add-another-job="resetJobForm"
        >{{ error }}</Message
      >
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
          <FormInput
            id="position"
            label="Position"
            v-model:datamodel="position"
          />
          <FormInput id="company" label="Company" v-model:datamodel="company" />
          <label for="logo" class="mt-4 block">
            <span class="text-lg font-bold">Logo</span>
            <span class="text-xs">
              (excepted file types: .svg, .png, .jpg)</span
            >
            <input
              class="mt-1 block w-full rounded-md border-[1px] border-solid border-gray-300 bg-clip-padding px-3 py-2 file:-mx-3 file:-my-2 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-turqoise-light file:px-3 file:py-2 file:font-bold file:text-turqoise file:[margin-inline-end:0.75rem] hover:file:bg-turqoise hover:file:text-white focus:border-turqoise focus:outline focus:outline-offset-0 focus:outline-turqoise-light"
              type="file"
              id="logo"
              @input="addLogo"
              accept=".svg, .png, .jpg"
            />
          </label>
          <FormSelect
            id="contract"
            label="Contract"
            v-model:datamodel="contract"
            placeholder="Select a contract"
            :options="contracts"
          />
          <FormInput
            id="location"
            label="Location"
            v-model:datamodel="location"
          />
          <FormSelect
            id="role"
            label="Role"
            v-model:datamodel="role"
            placeholder="Select a role"
            :options="roles"
          />
          <FormSelect
            id="level"
            label="Level"
            v-model:datamodel="level"
            placeholder="Select a level"
            :options="levels"
          />
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
              <ul class="flex flex-wrap gap-2">
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
          <FormCheckbox id="newLabel" label="New label" v-model:datamodel="newLabel" />
          <FormCheckbox
            id="featuredLabel"
            label="Featured label"
            v-model:datamodel="featuredLabel"
          />
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

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import Language from '../Language.vue';
import LoadingSpinner from '../LoadingSpinner.vue';
import Message from './Message.vue';
import FormInput from '../FormInput.vue';
import FormSelect from '../FormSelect.vue';
import FormCheckbox from '../FormCheckbox.vue';
import useSubmitJob from '../../common/composables/useSubmitJob';

const {
  isLoading,
  isSuccess,
  error,
  submitJob,
  resetJobForm,
  company,
  contract,
  featuredLabel,
  level,
  newLabel,
  position,
  role,
  languages,
  logo,
  location
} = useSubmitJob();

const showLanguagesEditor = ref(false);
const languagesInput = ref(null);

const roles = computed(() => ['Frontend', 'Fullstack', 'Backend']);
const levels = computed(() => ['Senior', 'Junior', 'Midweight']);
const contracts = computed(() => ['Full Time', 'Part Time', 'Contract']);

const convertLanguage = (input: string) => {
  const languageList = input.split(',');
  showLanguagesEditor.value = false;
  languages.value = languageList
    .map((language) => language.trim())
    .filter((language) => language);
};

const editLanguage = async () => {
  showLanguagesEditor.value = !showLanguagesEditor.value;
  await nextTick();
  languagesInput.value.focus();
};

const addLogo = (event: Event) => {
  logo.value = (
    (event.target.files as HTMLInputElement)[0] || { name: '' }
  ).name;
};
</script>
