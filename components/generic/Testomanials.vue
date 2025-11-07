<template>
  <section class="relative w-full bg-neutral-100 py-[114px]">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center mb-[50px]">
        <div class="flex items-center gap-4 mb-6">
          <div class="flex items-center gap-2">
            <div class="w-5 h-0.5 bg-[#eb3300]" />
            <div class="w-[30px] h-0.5 bg-[#eb3300]" />
          </div>
          <div class="font-bold text-[#eb3300] text-sm tracking-[0] leading-[14px] whitespace-nowrap">
            OUR HAPPY CUSTOMERS
          </div>
          <div class="flex items-center gap-2">
            <div class="w-[30px] h-0.5 bg-[#eb3300]" />
            <div class="w-5 h-0.5 bg-[#eb3300]" />
          </div>
        </div>
        <h2 class="font-bold text-neutral-950 text-5xl text-center tracking-[0] leading-[58.9px] whitespace-nowrap">
          What Customer Says
        </h2>
      </div>
      <div class="flex justify-center gap-6 mb-[52px]">
        <div
          v-for="(testimonial, index) in visibleTestimonials"
          :key="index"
          class="w-full max-w-[613px] bg-white shadow-[0px_11px_30px_#00000005]"
        >
          <div class="p-[50px]">
            <div class="flex gap-[17px] mb-[49px]">
              <div class="w-[35px] h-[35px] flex-shrink-0 rounded-full bg-[#eb3300] flex items-center justify-center">
                <span class="mdi mdi-format-quote-close text-white text-xl"></span>
              </div>
              <div class="w-20 h-20 rounded-[40px] bg-gray-200 flex-shrink-0" />
              <div class="flex flex-col justify-center flex-1">
                <h3 class="font-bold text-neutral-950 text-2xl tracking-[0] leading-[30.7px] mb-0">
                  {{ testimonial.name }}
                </h3>
                <p class="font-normal text-[#4b4b4b] text-base tracking-[0] leading-[26px]">
                  {{ testimonial.title }}
                </p>
              </div>
            </div>
            <p class="font-normal text-[#4b4b4b] text-lg tracking-[0] leading-[31.5px]">
              {{ testimonial.quote }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center gap-[25px]">
        <button
          v-for="(dot, index) in paginationDots"
          :key="index"
          @click="setActivePage(index)"
          class="relative w-2 h-2 rounded-full transition-colors cursor-pointer border-0 p-0"
          :class="dot.active ? 'bg-[#eb3300]' : 'bg-[#d8d8d8]'"
        >
          <div
            v-if="dot.active"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] w-[30px] rounded-[15px] border-2 border-solid border-[#eb3300]"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const testimonials = [
  {
    name: "Ricardo Yosef",
    title: "CEO & Founder at Automive",
    quote:
      '"Parallel task user friendly convergence through supply are chains. Dynamically simplify reliable meta service visionary sources. unleash tactical thinking via granular intellectual capital architect dynamic information value"',
  },
  {
    name: "Santino Pedro",
    title: "Managing Director at Carco",
    quote:
      '"Parallel task user friendly convergence through supply are chains. Dynamically simplify reliable meta service visionary sources. unleash tactical thinking via granular intellectual capital architect dynamic information value"',
  },
  {
    name: "Maria Garcia",
    title: "Director at Tech Solutions",
    quote:
      '"Parallel task user friendly convergence through supply are chains. Dynamically simplify reliable meta service visionary sources. unleash tactical thinking via granular intellectual capital architect dynamic information value"',
  },
    {
    name: "Ricardo Yosef",
    title: "CEO & Founder at Automive",
    quote:
      '"Parallel task user friendly convergence through supply are chains. Dynamically simplify reliable meta service visionary sources. unleash tactical thinking via granular intellectual capital architect dynamic information value"',
  },
  {
    name: "Santino Pedro",
    title: "Managing Director at Carco",
    quote:
      '"Parallel task user friendly convergence through supply are chains. Dynamically simplify reliable meta service visionary sources. unleash tactical thinking via granular intellectual capital architect dynamic information value"',
  },
  {
    name: "Maria Garcia",
    title: "Director at Tech Solutions",
    quote:
      '"Parallel task user friendly convergence through supply are chains. Dynamically simplify reliable meta service visionary sources. unleash tactical thinking via granular intellectual capital architect dynamic information value"',
  },
];

const activePage = ref(0);

const paginationDots = computed(() => {
  return testimonials.map((_, index) => ({
    active: index === activePage.value
  }));
});

const visibleTestimonials = computed(() => {
  const startIndex = activePage.value * 2;
  return testimonials.slice(startIndex, startIndex + 2);
});

const setActivePage = (index) => {
  activePage.value = index;
};
</script>
