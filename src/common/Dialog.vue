<template>
  <teleport to="body">
    <div
      v-if="show"
      @click="tryClose"
      class="fixed inset-0 z-10 h-[100vh] w-full bg-turqoise-dark/75"
    ></div>
    <transition name="dialog">
      <dialog
        open
        v-if="show"
        class="fixed top-[20vh] left-[10%] z-[100] m-0 w-[80%] overflow-hidden rounded-md bg-white p-0 shadow-lg"
      >
        <header class="bg-turqoise px-4 py-3 text-white">
          <slot name="header">
            <h2 class="text-lg font-bold">{{ title }}</h2>
          </slot>
        </header>
        <section class="px-4 py-3">
          <slot></slot>
        </section>
        <menu v-if="!fixed" class="m-0 flex justify-end px-4 py-3 gap-2">
          <slot name="actions">
            <button
              class="rounded bg-turqoise-light px-3 py-2 font-bold text-turqoise hover:bg-turqoise hover:text-white"
              @click="tryClose"
            >
              Close
            </button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['show', 'title', 'fixed', 'confirm'],
  emits: ['close', 'confirm'],
  methods: {
    tryClose() {
      if (this.fixed) return;
      this.$emit('close');
    },
  },
});
</script>
