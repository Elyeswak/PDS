<template>
  <section class="relative py-16">
    <!-- Top / Bottom split background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="h-1/2 w-full bg-gray-50"></div>
      <div class="h-1/2 w-full bg-white"></div>
    </div>

    <div class="relative container mx-auto px-6 lg:px-8 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left content (text, tabs, progress, CTA) -->
        <div class="z-20">
          <!-- Section Label -->
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

          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight"
          >
            We Are Qualified In Every Car Departments
          </h2>

          <div class="flex flex-wrap gap-4 mb-8">
            <button @click="activeTab = 'about'" :class="tabClass('about')">
              ABOUT US
            </button>
            <button @click="activeTab = 'mission'" :class="tabClass('mission')">
              OUR MISSION
            </button>
            <button @click="activeTab = 'vision'" :class="tabClass('vision')">
              OUR VISION
            </button>
          </div>

          <div class="mb-8">
            <p class="text-gray-600 leading-relaxed text-base">
              Nostra habitasse inceptos placerat vivamus vestibulum blandit odio
              dignissim aliquet nunc taciti, cubilia aenean lobortis class
              sollicitudin conubia urna acter elementum mauris porttitor mus
              commodo tortor leo litora etiam orci varius nibh.
            </p>
          </div>

          <div class="space-y-8 mb-8">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-gray-900 text-lg"
                  >Engine Solution</span
                >
                <span class="font-bold text-gray-900 text-lg">90%</span>
              </div>
              <div
                class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden"
              >
                <div
                  class="bg-[#ff4500] h-full rounded-full"
                  style="width: 90%"
                ></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-gray-900 text-lg"
                  >Engine Diagnostics</span
                >
                <span class="font-bold text-gray-900 text-lg">85%</span>
              </div>
              <div
                class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden"
              >
                <div
                  class="bg-[#ff4500] h-full rounded-full"
                  style="width: 85%"
                ></div>
              </div>
            </div>
          </div>

          <div>
            <button
              class="bg-[#ff4500] text-white font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-[#cc3700] transition-colors"
            >
              GET A QUOTE
            </button>
          </div>
        </div>

        <!-- Right visual area (images + badge) -->
        <div
          class="relative h-[480px] lg:h-[560px] flex items-start justify-end"
        >
          <!-- A wrapper to control positioning -->
          <div class="relative w-full max-w-[520px] h-full">
            <!-- Big image - positioned near the top-right -->
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=1200&fit=crop"
              alt="Team working"
              class="absolute right-0 top-0 w-[340px] md:w-[420px] lg:w-[480px] h-[340px] md:h-[420px] lg:h-[480px] object-cover shadow-lg z-10"
            />

            <!-- Small image - anchored bottom-left, overlapping the split -->
            <div
              class="absolute left-0 bottom-0 w-[180px] md:w-[220px] lg:w-[260px] h-[180px] md:h-[220px] lg:h-[260px] overflow-hidden shadow-lg z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1200&fit=crop"
                alt="Mechanic at work"
                class="w-full h-full object-cover"
              />

              <!-- Orange banner over the small image -->
              <div
                class="absolute left-0 top-0 transform bg-[#ff4500] text-white px-4 py-3 md:py-4 shadow-lg z-30"
              >
                <div class="flex items-center gap-2">
                  <div class="flex items-baseline">
                    <span class="text-2xl font-medium leading-none">20</span>
                    <span class="text-base md:text-xl font-medium ml-1">+</span>
                  </div>
                  <div>
                    <p
                      class="text-sm md:text-base font-medium uppercase tracking-wider whitespace-nowrap drop-shadow-lg"
                    >
                      Years Of Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- optional subtle spacer for layout on small screens -->
            <div
              class="hidden lg:block"
              aria-hidden="true"
              style="height: 1px"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
const activeTab = ref("about");

const tabClass = (tab) =>
  [
    "px-8 py-3 font-bold text-sm uppercase tracking-wider transition-all",
    activeTab.value === tab
      ? "bg-[#ff4500] text-white"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ].join(" ");
</script>
