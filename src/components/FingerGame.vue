<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import FingerCursor from '~/components/FingerCursor.vue';
import type { Finger, GameStatus } from '~/types/finger';
import { getUniqueFingerColor } from '~/utils/colors';

const COUNTDOWN_SECONDS = 3;

const pointers = ref<Map<number, Finger>>(new Map());
const status = ref<GameStatus>('waiting');
const countdown = ref<number | null>(null);
const winnerId = ref<number | null>(null);

const pointerCount = ref(0);
const fingerList = computed(() => Array.from(pointers.value.values()));
const pendingMoves = new Map<number, { x: number; y: number }>();
let scheduledMoveFrame: number | null = null;

const resetGame = () => {
  status.value = 'waiting';
  countdown.value = null;
  winnerId.value = null;
};

const updatePointers = (updater: (map: Map<number, Finger>) => void) => {
  const next = new Map(pointers.value);
  const previousSize = pointers.value.size;
  updater(next);
  pointers.value = next;
  if (next.size !== previousSize) {
    pointerCount.value = next.size;
  }
};

const removePointer = (id: number) => {
  updatePointers((map) => {
    map.delete(id);
  });
  pendingMoves.delete(id);
};

const handlePointerDown = (event: PointerEvent) => {
  event.preventDefault();
  if (status.value === 'finished') return;

  updatePointers((map) => {
    const usedColors = Array.from(map.values()).map((finger) => finger.color);
    const color = getUniqueFingerColor(usedColors, event.pointerId);
    map.set(event.pointerId, {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      color,
    });
  });
};

const handlePointerMove = (event: PointerEvent) => {
  event.preventDefault();
  if (!pointers.value.has(event.pointerId)) return;

  pendingMoves.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (scheduledMoveFrame === null) {
    scheduledMoveFrame = requestAnimationFrame(() => {
      scheduledMoveFrame = null;
      if (pendingMoves.size === 0) {
        return;
      }
      const next = new Map(pointers.value);
      pendingMoves.forEach((position, id) => {
        const finger = next.get(id);
        if (!finger) {
          return;
        }
        next.set(id, { ...finger, x: position.x, y: position.y });
      });
      pendingMoves.clear();
      pointers.value = next;
    });
  }
};

const handlePointerUp = (event: PointerEvent) => {
  event.preventDefault();
  removePointer(event.pointerId);
};

const handlePointerCancel = (event: PointerEvent) => {
  event.preventDefault();
  removePointer(event.pointerId);
};

watch(
  () => pointerCount.value,
  (newCount, oldCount) => {
    if (status.value === 'countdown' && newCount >= 2 && newCount !== oldCount) {
      countdown.value = COUNTDOWN_SECONDS;
    }
  }
);

watch(
  () => ({ status: status.value, count: pointerCount.value }),
  ({ status: currentStatus, count }) => {
    if (currentStatus === 'waiting' && count >= 2) {
      status.value = 'countdown';
      countdown.value = COUNTDOWN_SECONDS;
    } else if (currentStatus === 'countdown' && count < 2) {
      status.value = 'waiting';
      countdown.value = null;
    } else if (currentStatus === 'finished' && count === 0) {
      resetGame();
    }
  },
  { immediate: true }
);

watch(
  () => status.value,
  (newStatus, _oldStatus, onCleanup) => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (newStatus === 'countdown') {
      if (countdown.value === null) {
        countdown.value = COUNTDOWN_SECONDS;
      }

      intervalId = setInterval(() => {
        if (countdown.value === null) return;
        const next = countdown.value - 1;

        if (next <= 0) {
          const pointerIds = Array.from(pointers.value.keys());
          if (pointerIds.length === 0) {
            resetGame();
          } else {
            const randomIdx = Math.floor(Math.random() * pointerIds.length);
            winnerId.value = pointerIds[randomIdx];
            status.value = 'finished';
          }
          countdown.value = null;
        } else {
          countdown.value = next;
        }
      }, 1000);
    }

    onCleanup(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="fixed inset-0 bg-black touch-none select-none overflow-hidden flex items-center justify-center"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerCancel"
    @pointerleave="handlePointerUp"
    @contextmenu.prevent
  >
    <div class="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
      <p
        v-if="status === 'waiting' && fingerList.length === 0"
        class="text-gray-500 font-medium animate-pulse text-lg"
      >
        Place fingers on screen
      </p>

      <p
        v-else-if="status === 'waiting' && fingerList.length === 1"
        class="text-gray-500 font-medium animate-pulse text-lg"
      >
        Need at least one more...
      </p>

      <p
        v-else-if="status === 'countdown' && countdown !== null"
        class="text-gray-500 font-medium animate-pulse text-lg"
      >
        Ready in {{ countdown }}...
      </p>
    </div>

    <FingerCursor
      v-for="finger in fingerList"
      :key="finger.id"
      :finger="finger"
      :is-winner="status === 'finished' && winnerId === finger.id"
      :is-loser="status === 'finished' && winnerId !== null && winnerId !== finger.id"
    />
  </div>
</template>
