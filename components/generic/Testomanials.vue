<template>
  <section class="relative w-full bg-neutral-100 py-20">
    <div class="container mx-auto px-4">
      
      <!-- Header -->
      <div class="flex flex-col items-center mb-12">
        <div class="flex items-center gap-4 mb-6">
          <div class="flex items-center gap-2">
            <div class="w-5 h-[0.125rem] bg-[#eb3300]" />
            <div class="w-[2rem] h-[0.125rem] bg-[#eb3300]" />
          </div>

          <div class="font-bold text-[#eb3300] text-sm leading-4 whitespace-nowrap">
            OUR HAPPY CUSTOMERS
          </div>

          <div class="flex items-center gap-2">
            <div class="w-[2rem] h-[0.125rem] bg-[#eb3300]" />
            <div class="w-5 h-[0.125rem] bg-[#eb3300]" />
          </div>
        </div>

        <h2 class="font-bold text-neutral-950 text-5xl text-center leading-[3.7rem] whitespace-nowrap">
          What Customer Says
        </h2>
      </div>

      <!-- Testimonials -->
      <div class="flex sm:flex-row flex-col justify-center gap-6 mb-14">
        <div
          v-for="(testimonial, index) in visibleTestimonials"
          :key="index"
          class="w-full max-w-[38.3rem] bg-white shadow-[0_0.7rem_1.9rem_#00000005]"
        >
          <div class="p-12">
            <div class="flex gap-4 mb-12">
              <div class="w-9 h-9 shrink-0 rounded-full bg-[#eb3300] flex items-center justify-center">
                <span class="mdi mdi-format-quote-close text-white text-xl"></span>
              </div>

              <div class="w-20 h-20 rounded-[2.5rem] bg-gray-200 shrink-0" />

              <div class="flex flex-col justify-center flex-1">
                <h3 class="font-bold text-neutral-950 text-2xl leading-8">
                  {{ testimonial.name }}
                </h3>
                <p class="font-normal text-[#4b4b4b] text-base leading-6">
                  {{ testimonial.title }}
                </p>
              </div>
            </div>

            <p class="font-normal text-[#4b4b4b] text-lg leading-8">
              {{ testimonial.quote }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-6">
        <button
          v-for="(dot, index) in paginationDots"
          :key="index"
          @click="setActivePage(index)"
          class="relative w-2 h-2 rounded-full transition-colors cursor-pointer border-0 p-0"
          :class="dot.active ? 'bg-[#eb3300]' : 'bg-[#d8d8d8]'"
        >
          <div
            v-if="dot.active"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.875rem] w-[1.875rem] rounded-full border-2 border-solid border-[#eb3300]"
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
