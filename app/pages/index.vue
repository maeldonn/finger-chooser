<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import LandingPage from '~/components/LandingPage.vue';
import FingerGame from '~/components/FingerGame.vue';

const isTouchDevice = ref(false);
const forced = ref(false);

onMounted(() => {
  const hasTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  isTouchDevice.value = hasTouch;
});

const shouldShowGame = computed(() => isTouchDevice.value || forced.value);
const handleForceStart = () => {
  forced.value = true;
};
</script>

<template>
  <FingerGame v-if="shouldShowGame" />
  <LandingPage v-else @force-start="handleForceStart" />
</template>
