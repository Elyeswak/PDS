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

          <!-- Animated Progress Bars -->
          <div ref="progressSection" class="space-y-8 mb-12">
            <div class="min-h-[60px]">
              <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-900 text-lg">Engine Solution</span>
                <span class="font-bold text-[#ff4500] text-lg">{{ animatedEngineValue }}%</span>
              </div>
              <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-[#ff4500] h-full rounded-full transition-all duration-[2500ms] ease-out"
                  :style="{ width: `${animatedEngineValue}%` }"
                ></div>
              </div>
            </div>

            <div class="min-h-[60px]">
              <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-900 text-lg">Engine Diagnostics</span>
                <span class="font-bold text-[#ff4500] text-lg">{{ animatedDiagnosticsValue }}%</span>
              </div>
              <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-[#ff4500] h-full rounded-full transition-all duration-[2500ms] ease-out"
                  :style="{ width: `${animatedDiagnosticsValue}%` }"
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
        <div class="relative h-[480px] lg:h-[560px] flex items-start justify-end">
          <!-- A wrapper to control positioning -->
          <div class="relative w-full max-w-[520px] h-full">
            <!-- Big image - positioned near the top-right -->
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=1200&fit=crop"
              alt="Team working"
              class="absolute right-0 top-0 w-[340px] md:w-[420px] lg:w-[480px] h-[340px] md:h-[420px] lg:h-[480px] object-cover shadow-lg z-10"
            />

            <div
              class="absolute left-0 bottom-0 w-[230px] md:w-[220px] lg:w-[260px] h-[220px] md:h-[220px] lg:h-[260px] overflow-hidden shadow-lg z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1200&fit=crop"
                alt="Mechanic at work"
                class="w-full h-full object-cover"
              />

              <div
                class="absolute left-0 top-0 transform bg-[#ff4500] text-white px-4 py-3 md:py-4 shadow-lg z-30"
              >
                <div class="flex items-center gap-2">
                  <div class="flex items-baseline">
                    <span class="text-2xl font-medium leading-none">{{ animatedYearsValue }}</span>
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
import { ref, onMounted, onUnmounted } from "vue";

const activeTab = ref("about");
const progressSection = ref(null);

// Animation values
const animatedEngineValue = ref(0);
const animatedDiagnosticsValue = ref(0);
const animatedYearsValue = ref(0);

// Target values
const engineTarget = 90;
const diagnosticsTarget = 85;
const yearsTarget = 20;

// Animation state
let hasAnimated = false;
let observer = null;

const tabClass = (tab) =>
  [
    "px-8 py-3 font-bold text-sm uppercase tracking-wider transition-all",
    activeTab.value === tab
      ? "bg-[#ff4500] text-white"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ].join(" ");

// Easing function for smooth animation
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

// Animate a single value
const animateValue = (start, end, duration, callback) => {
  const startTime = performance.now();
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const current = Math.round(start + (end - start) * easedProgress);
    
    callback(current);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

// Start all animations
const startAnimations = () => {
  if (hasAnimated) return;
  hasAnimated = true;

  // Animate Engine Solution (starts immediately, 2.5s duration - slower)
  setTimeout(() => {
    animateValue(0, engineTarget, 2500, (val) => {
      animatedEngineValue.value = val;
    });
  }, 100);

  // Animate Engine Diagnostics (starts after 300ms delay, 2.5s duration)
  setTimeout(() => {
    animateValue(0, diagnosticsTarget, 2500, (val) => {
      animatedDiagnosticsValue.value = val;
    });
  }, 400);

  // Animate Years badge (starts after 500ms, 2s duration)
  setTimeout(() => {
    animateValue(0, yearsTarget, 2000, (val) => {
      animatedYearsValue.value = val;
    });
  }, 600);
};

onMounted(() => {
  // Use Intersection Observer to trigger animation when section is visible
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimations();
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the section is visible
    }
  );

  if (progressSection.value) {
    observer.observe(progressSection.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
/* Optional: Add a pulse effect to the percentage when it reaches target */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
