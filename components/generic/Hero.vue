<template>
  <section
    class="relative h-screen flex items-center overflow-hidden"
    style="min-height: 600px"
  >
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div class="absolute inset-0 bg-black/30"></div>
    </div>
    <div class="relative z-10 container mx-auto px-14">
      <div class="flex items-center justify-between max-w-6xl mx-auto">
        <div class="max-w-2xl">
          <p class="text-white mb-4 tracking-wider uppercase text-sm">
            AMAZING CAR SERVICING CENTER
          </p>
          <h1 class="text-white font-bold leading-tight mb-6 text-5xl">
            Fix Your Personal<br />Car Problem
          </h1>
          <p class="text-white/90 mb-8 max-w-lg">
            Take payments online with a scalable platform that grows with your
            perfect business.
          </p>
        </div>
        <div class="flex flex-col space-y-4 ml-8">
          <button
            @click="goToSlide(0)"
            :class="[
              'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:cursor-pointer font-semibold',
              currentSlide === 0
                ? 'bg-[#ff4500] border-[#ff4500] text-white'
                : 'bg-white/20 border-white/40 text-white hover:bg-white/30',
            ]"
          >
            1
          </button>
          <button
            @click="goToSlide(1)"
            :class="[
              'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:cursor-pointer font-semibold',
              currentSlide === 1
                ? 'bg-[#ff4500] border-[#ff4500] text-white'
                : 'bg-white/20 border-white/40 text-white hover:bg-white/30',
            ]"
          >
            2
          </button>
          <button
            @click="goToSlide(2)"
            :class="[
              'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:cursor-pointer font-semibold',
              currentSlide === 2
                ? 'bg-[#ff4500] border-[#ff4500] text-white'
                : 'bg-white/20 border-white/40 text-white hover:bg-white/30',
            ]"
          >
            3
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  bgImage: {
    type: String,
    default: "/imgs/bg-hero.jpg",
  },
});

const currentSlide = ref(0);

const goToSlide = (index) => {
  currentSlide.value = index;
  console.log("Go to slide:", index);
};
</script>
