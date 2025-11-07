<template>
  <section class="w-full bg-[#161921] py-20">
    <div class="container mx-auto px-4 max-w-[1920px]">
      <div class="flex justify-end">
        <div class="w-full max-w-[952.5px] pl-4">
          <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <div class="flex flex-col gap-1 items-end">
              <div class="w-12 h-0.5 bg-[#ff4500]"></div>
              <div class="w-8 h-0.5 bg-[#ff4500]"></div>
            </div>
            <span
              class="text-[#ff4500] font-bold text-sm uppercase tracking-wider"
            >
              ABOUT COMPANY
            </span>
          </div>
            <h2 class="font-bold text-white text-5xl tracking-[0] leading-[58.9px] mb-4">
              Why Choose Us?
            </h2>
          </div>
          <div class="flex flex-col gap-16">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="flex gap-[30px] items-start"
            >
              <div class="shrink-0 w-20 h-20 flex items-center justify-center bg-[#272a35] rounded-[40px]">
                <span class="font-bold text-[#eb3300] text-3xl tracking-[0] leading-[83px]">
                  {{ feature.number }}
                </span>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-white text-2xl tracking-[0] leading-[30.7px] mb-3">
                  {{ feature.title }}
                </h3>
                <p class="font-['Inter'] font-normal text-[#cdcdcd] text-base tracking-[0] leading-7 whitespace-pre-line">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    number: "01",
    title: "24/7 Work Process",
    description:
      "Intrinsicly fashion enterprise manuftured products after open\nsource e-service engage transparent channels.",
  },
  {
    number: "02",
    title: "Expert Team Memebers",
    description:
      "Intrinsicly fashion enterprise manuftured products after open\nsource e-service engage transparent channels.",
  },
  {
    number: "03",
    title: "Quality Time Delivery",
    description:
      "Intrinsicly fashion enterprise manuftured products after open\nsource e-service engage transparent channels.",
  },
];
</script>
