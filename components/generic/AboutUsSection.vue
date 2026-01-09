<template>
  <section class="w-full bg-[#161921] py-16 lg:py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">


        <!-- Right Side - Image -->
        <div class="order-2">
          <div class="relative">
            <!-- Main Image -->
            <div class="relative rounded-none overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=900&fit=crop"
                alt="Professional mechanic at work"
                class="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#161921] via-transparent to-transparent opacity-60"></div>
            </div>

            <!-- Decorative Badge -->
            <div class="absolute bottom-6 left-6 bg-[#ff4500] text-white px-6 py-4 rounded-non shadow-2xl">
              <div class="flex items-center gap-3">
                <div class="flex items-baseline">
                  <span class="text-3xl lg:text-4xl font-bold">15</span>
                  <span class="text-xl lg:text-2xl font-bold ml-1">+</span>
                </div>
                <div>
                  <p class="text-sm lg:text-base font-bold uppercase tracking-wider whitespace-nowrap">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>

            <!-- Decorative Element -->
            <div class="hidden lg:block absolute -top-8 -right-8 w-32 h-32 bg-[#ff4500] rounded-full opacity-20 blur-3xl"></div>
            <div class="hidden lg:block absolute -bottom-8 -left-8 w-40 h-40 bg-[#ff4500] rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>
        
        <!-- Left Side - Content -->
        <div class="order-1">
          <div class="mb-8 lg:mb-12">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex flex-col gap-1 items-end">
                <div class="w-12 h-0.5 bg-[#ff4500]"></div>
                <div class="w-8 h-0.5 bg-[#ff4500]"></div>
              </div>
              <span class="text-[#ff4500] font-bold text-sm uppercase tracking-wider">
                ABOUT COMPANY
              </span>
            </div>
            <h2 class="font-bold text-white text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
              Why Choose Us?
            </h2>
          </div>
          
          <div class="flex flex-col gap-10 lg:gap-12">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="flex gap-5 lg:gap-8 items-start group"
            >
              <div class="shrink-0 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-[#272a35] rounded-full transition-all duration-300 group-hover:bg-[#ff4500] group-hover:scale-110">
                <span class="font-bold text-[#ff4500] group-hover:text-white text-2xl lg:text-3xl transition-colors duration-300">
                  {{ feature.number }}
                </span>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-white text-xl lg:text-2xl tracking-tight leading-tight mb-3 group-hover:text-[#ff4500] transition-colors duration-300">
                  {{ feature.title }}
                </h3>
                <p class="font-normal text-[#cdcdcd] text-sm lg:text-base leading-relaxed">
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
      "Intrinsicly fashion enterprise manufactured products after open source e-service engage transparent channels.",
  },
  {
    number: "02",
    title: "Expert Team Members",
    description:
      "Intrinsicly fashion enterprise manufactured products after open source e-service engage transparent channels.",
  },
  {
    number: "03",
    title: "Quality Time Delivery",
    description:
      "Intrinsicly fashion enterprise manufactured products after open source e-service engage transparent channels.",
  },
];
</script>
