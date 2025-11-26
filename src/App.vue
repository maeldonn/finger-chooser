<script setup lang="ts">
import { ref, computed } from 'vue';
import LandingPage from '~/components/LandingPage.vue';
import FingerGame from '~/components/FingerGame.vue';

const hasTouch =
  typeof window !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);

const isTouchDevice = ref(hasTouch);
const forced = ref(false);

const shouldShowGame = computed(() => isTouchDevice.value || forced.value);
const handleForceStart = () => (forced.value = true);
</script>

<template>
  <div>
    <FingerGame v-if="shouldShowGame" />
    <LandingPage v-else @force-start="handleForceStart" />
  </div>
</template>
