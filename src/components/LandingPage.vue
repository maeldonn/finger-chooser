<script setup lang="ts">
import { ref, onMounted } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { Link2, MousePointer2 } from 'lucide-vue-next';
import logo from '~/assets/icon/icon.svg?url';

const emit = defineEmits<{
  (e: 'force-start'): void;
}>();

const currentUrl = ref('https://maeldonn.github.io/finger-chooser/');
const isMounted = ref(false);

onMounted(() => {
  currentUrl.value = window.location.href;
  isMounted.value = true;
});

const handleForceStart = () => {
  emit('force-start');
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 text-center"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="flex flex-col items-center text-center gap-3">
        <img :src="logo" alt="Finger Chooser logo" class="mx-auto h-16 w-16" />
        <h1
          class="text-4xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Finger Chooser
        </h1>
        <p class="text-gray-400 mt-0">
          The ultimate tool for settling disputes, picking players, or paying bills.
        </p>
      </div>

      <div
        class="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 flex flex-col items-center space-y-6"
      >
        <div class="bg-white p-4 rounded-xl" v-if="isMounted">
          <QrcodeVue :value="currentUrl" :size="200" />
        </div>

        <div class="space-y-2">
          <h2 class="text-xl font-semibold flex items-center justify-center gap-2">
            <Link2 class="w-5 h-5" />
            Scan to Play
          </h2>
          <p class="text-sm text-gray-500">
            This game requires a multi-touch screen. Open this page on your phone.
          </p>
        </div>
      </div>

      <div class="pt-8">
        <button
          type="button"
          class="text-sm text-gray-600 hover:text-gray-400 underline transition-colors flex items-center justify-center gap-2 mx-auto"
          @click="handleForceStart"
        >
          <MousePointer2 class="w-4 h-4" />
          I have a touchscreen, let me play
        </button>
      </div>
    </div>
  </div>
</template>
