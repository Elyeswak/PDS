<template>
  <section class="w-full bg-[#161921] py-[120px] px-8 md:px-16 lg:px-[215px]">
    <div class="flex flex-col lg:flex-row items-start justify-between mb-[120px] gap-6">
      <div class="flex flex-col gap-[25px]">
        <div class="flex items-center gap-2.5">
          <div class="w-5 h-0.5 bg-[#eb3300]" />
          <div class="font-bold text-[#eb3300] text-sm tracking-[0] leading-[14px] whitespace-nowrap">
            OUR PRICE PLAN
          </div>
          <div class="w-[30px] h-0.5 bg-[#eb3300]" />
        </div>
        <h2 class="font-bold text-white whitespace-nowrap">
          Mechanic Services Cost
        </h2>
      </div>
      <button class="bg-[#eb3300] hover:bg-[#eb3300]/90 h-[60px] px-9 font-bold cursor-pointer text-white text-base text-center tracking-[0] leading-[26px]">
        SEE ALL PLANS
      </button>
    </div>

    <div class="flex flex-col lg:flex-row gap-[30px]">
      <div class="flex-1 bg-white border-0">
        <div class="p-[50px]">
          <div class="flex flex-col gap-[30px]">
            <div
              v-for="(tier, index) in pricingTiers"
              :key="index"
              :class="[
                'flex flex-col gap-[43px]',
                index < pricingTiers.length - 1 ? 'pb-[30px] border-b border-[#ececec]' : ''
              ]"
            >
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-neutral-950">
                  {{ tier.title }}
                </h3>
                <div class="font-bold text-[#eb3300]">
                  {{ tier.price }}
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div
                  v-for="(service, serviceIndex) in tier.services"
                  :key="serviceIndex"
                  class="flex items-center gap-[7px] bg-[#f3f1f2] h-[34px] px-[15px]"
                >
                  <span class="mdi mdi-check-circle text-[#eb3300] text-base"></span>
                  <span class="font-medium text-[#4b4b4b] text-base tracking-[0] leading-[26px] whitespace-nowrap">
                    {{ service }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-[425px] bg-[#f3f1f2] border-0 flex flex-col">
        <div class="p-0 flex flex-col flex-1">
          <div class="bg-neutral-950 px-10 pt-10 pb-[40px] border-b border-[#ffffff0d]">
            <h3 class="font-bold text-white mb-[9px]">
              Premium Package
            </h3>
            <p class="font-normal text-white text-base tracking-[0] leading-7">
              Pricing plan for startup company
            </p>
          </div>

          <div class="bg-neutral-950 px-10 py-[26px] flex items-center justify-between">
            <div class="flex items-baseline gap-0">
              <span class="font-bold text-white">
                $599.00
              </span>
              <span class="font-normal text-white text-base tracking-[0] leading-[26px]">
                /Yearly
              </span>
            </div>
            <span class="mdi mdi-crown text-[#eb3300] text-4xl"></span>
          </div>

          <div class="px-10 pt-10 flex flex-col gap-2.5 flex-1">
            <div
              v-for="(service, index) in premiumServices"
              :key="index"
              class="flex items-center gap-3"
            >
              <span class="mdi mdi-check-circle text-neutral-950 text-base"></span>
              <span class="font-medium text-neutral-950 text-base tracking-[0] leading-[26px] whitespace-nowrap">
                {{ service }}
              </span>
            </div>
          </div>

          <div class="px-10 pb-10 pt-10">
            <button class="w-[204px] h-[60px] bg-neutral-950 hover:bg-neutral-950/90 font-bold cursor-pointer text-white text-base text-center tracking-[0] leading-[26px]">
              PURCHASE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PricingTier {
  title: string;
  price: string;
  services: string[];
}

const pricingTiers: PricingTier[] = [
  {
    title: "Body Servicing",
    price: "$599.99",
    services: [
      "Rims & Tire Change",
      "Rims & Tire Change",
      "Rims & Tire Change",
      "Rims & Tire Change",
    ],
  },
  {
    title: "Engine Management",
    price: "$399.99",
    services: [
      "Rims & Tire Change",
      "Rims & Tire Change",
      "Rims & Tire Change",
      "Rims & Tire Change",
    ],
  },
  {
    title: "Wheel Servicing",
    price: "$299.99",
    services: [
      "Rims & Tire Change",
      "Rims & Tire Change",
      "Rims & Tire Change",
      "Rims & Tire Change",
    ],
  },
];

const premiumServices: string[] = [
  "Rims & Tire Change",
  "Interior Cleaning",
  "Wipe all Surfaces",
  "Leather Clean & Dry",
  "Light Carpet Clean",
];
</script>