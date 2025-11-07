<template>
  <section class="w-full py-12 flex flex-col gap-12">
    <div class="container mx-auto px-4 flex flex-col items-center gap-6">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-[30px] h-0.5 bg-[#eb3300]" />
          <div class="w-5 h-0.5 bg-[#eb3300]" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <div
            class="font-bold text-[#eb3300] text-sm text-center tracking-[0] leading-3.5 whitespace-nowrap"
          >
            OUR WORK PROCESS
          </div>
          <h2
            class="font-bold text-neutral-950 text-5xl text-center tracking-[0] leading-[58.9px] whitespace-nowrap"
          >
            How We Works
          </h2>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-5 h-0.5 bg-[#eb3300]" />
          <div class="w-[30px] h-0.5 bg-[#eb3300]" />
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start"
      >
        <div
          v-for="(step, index) in processSteps"
          :key="index"
          :class="[
            'flex flex-col items-center relative',
            step.offsetTop ? 'lg:mt-[60px]' : '',
          ]"
        >
          <div
            class="bg-white rounded-[65px] shadow-[0px_0px_77px_10px_#aaaaaa21] border-0 w-[130px] h-[130px] flex items-center justify-center"
          >
            <div class="p-0 flex items-center justify-center w-full h-full">
              <div class="w-[53px] h-[55px]" />
            </div>
          </div>
          <h3
            class="font-bold text-neutral-950 text-2xl text-center tracking-[0] leading-[30.7px] whitespace-nowrap mt-[25px]"
          >
            {{ step.title }}
          </h3>
          <p
            class="font-normal text-[#4b4b4b] text-base text-center tracking-[0] leading-7 mt-[19px] max-w-[260px]"
          >
            <template
              v-for="(line, i) in step.description.split('\n')"
              :key="i"
            >
              {{ line }}
              <br v-if="i < step.description.split('\n').length - 1" />
            </template>
          </p>
          <img
            v-if="step.showArrow"
            class="hidden lg:block absolute top-[30px] -right-12 w-24 h-9"
            alt="Arrow"
            :src="index === 1 ? '/imgs/image-2.svg' : '/imgs/image.svg'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const processSteps = [
  {
    title: "Identify Issues",
    description:
      "xtensible for web iterate process\nbefore meta services impact with\nolisticly enable client.",
    offsetTop: false,
    showArrow: true,
  },
  {
    title: "Prepare Solution",
    description:
      "Vulnerable for web iterate process\nbefore meta services impact with\nolisticly enable geting.",
    offsetTop: true,
    showArrow: true,
  },
  {
    title: "Working On This",
    description:
      "Of setting for web iterate process\nbefore meta services impact with\nolisticly enable power.",
    offsetTop: false,
    showArrow: true,
  },
  {
    title: "Deliver On Hand",
    description:
      "Getting on for web iterate process\nbefore meta services impact with\nolisticly enable silent.",
    offsetTop: true,
    showArrow: false,
  },
];
</script>
