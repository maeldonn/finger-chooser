<script setup lang="ts">
import type { Finger } from '~/types/finger';

const props = defineProps<{
  finger: Finger;
  isWinner: boolean;
  isLoser: boolean;
}>();

const size = 100;
const offset = size / 2;

const wrapperStyle = computed(() => ({
  left: `${props.finger.x}px`,
  top: `${props.finger.y}px`,
  transform: `translate(-${offset}px, -${offset}px) scale(${props.isWinner ? 1.5 : 1})`,
  width: `${size}px`,
  height: `${size}px`,
  opacity: props.isLoser ? 0.2 : 1,
}));

const glowIntensity = computed(() => (props.isWinner ? '0 0 40px 10px' : '0 0 15px 2px'));
</script>

<template>
  <div
    class="absolute pointer-events-none transition-all duration-500 ease-out flex items-center justify-center"
    :style="wrapperStyle"
  >
    <div
      class="absolute inset-0 rounded-full border-[6px] finger-ring"
      :class="{ winner: props.isWinner }"
      :style="{
        borderColor: props.finger.color,
        boxShadow: `${glowIntensity} ${props.finger.color}`,
        color: props.finger.color,
      }"
    />
    <div
      class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm finger-core"
      :class="{ winner: props.isWinner }"
      :style="{
        backgroundColor: props.isWinner ? props.finger.color : 'transparent',
      }"
    />
  </div>
</template>
