<template>
  <page>
    <div
      class="container mx-auto max-w-[500px] rounded-md bg-white p-6 shadow-lg shadow-turqoise/30"
    >
      <h1 class="mb-6 text-3xl font-bold text-turqoise-dark">
        Login Admin portal
      </h1>
      <div class="flex justify-between">
        <button
          class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
          @click="googleSignIn"
        >
          Login with Google
        </button>
        <router-link to="/" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            role="link"
            class="rounded py-2 text-turqoise hover:underline"
          >
            Return to Job list
          </button>
        </router-link>
      </div>
    </div>
  </page>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { auth } from '../common/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setCookie } from '../common/helpers';

const router = useRouter();
const route = useRoute();

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const response = await signInWithPopup(auth, provider);

    if (response.user.uid !== import.meta.env.VITE_ADMIN_USER_ID)
      return alert('You are not authorized to enter!');

    setCookie('accessToken', response.user.accessToken);
    router.replace('/' + (route.query.redirect || 'admin'));
  } catch (error) {
    console.error(error);
  }
};
</script>
