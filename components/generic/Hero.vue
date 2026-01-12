<template>
  <section
    class="relative h-screen flex items-center overflow-hidden min-h-150"
  >
    <!-- Background -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div class="absolute inset-0 bg-black/30"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-6 md:px-12 lg:px-14">
      <div class="flex items-center justify-between max-w-6xl mx-auto">
        <!-- LEFT TEXT -->
        <div class="max-w-2xl">
          <transition name="fade-slow" mode="out-in">
            <div :key="currentSlide">
              <p class="text-white mb-4 tracking-wider uppercase text-sm">
                {{ slides[currentSlide].tag }}
              </p>
              <h1 class="text-white font-bold leading-tight mb-6 text-5xl whitespace-pre-line">
                {{ slides[currentSlide].title }}
              </h1>
              <p class="text-white/90 mb-8 max-w-lg">
                {{ slides[currentSlide].description }}
              </p>
            </div>
          </transition>
        </div>

        <!-- SLIDE BUTTONS -->
        <div class="flex flex-col space-y-4 ml-8">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 hover:cursor-pointer font-semibold',
              currentSlide === index
                ? 'bg-[#ff4500] border-[#ff4500] text-white scale-110 shadow-lg shadow-[#ff4500]/50'
                : 'bg-white/20 border-white/40 text-white hover:bg-white/30 hover:scale-105',
            ]"
          >
            {{ index + 1 }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  bgImage: {
    type: String,
    default: "/imgs/bg-hero.jpg",
  },
});

const slides = [
  {
    tag: "AMAZING CAR SERVICING CENTER",
    title: "Fix Your Personal\nCar Problem",
    description:
      "Take payments online with a scalable platform that grows with your perfect business.",
  },
  {
    tag: "FAST & RELIABLE CAR MAINTENANCE",
    title: "Professional Auto\nRepair Services",
    description:
      "Our specialists diagnose and solve issues quickly using modern technology and tools.",
  },
  {
    tag: "PREMIUM SUPPORT FOR ALL VEHICLES",
    title: "Keep Your Car\nRunning Smoothly",
    description:
      "We ensure every part of your vehicle works perfectly for safe and enjoyable driving.",
  },
];

const currentSlide = ref(0);
let autoSlideInterval = null;

const goToSlide = (index) => {
  currentSlide.value = index;
  // Reset the auto-slide timer when user manually changes slide
  resetAutoSlide();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 10000); // Change slide every 10 seconds
};

const resetAutoSlide = () => {
  // Clear existing interval
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  // Start a new interval
  startAutoSlide();
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
});
</script>

<style scoped>
/* Medium-fast fade transition - works for both auto and manual clicks */
.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-slow-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slow-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slow-enter-to,
.fade-slow-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
