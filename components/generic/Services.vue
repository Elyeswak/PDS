<template>
  <section class="py-16 lg:py-24">
    <div class="container mx-auto px-6 lg:px-8 max-w-7xl">
      <!-- Section Header -->
      <div class="text-center mb-8">
<div class="flex items-center justify-center gap-3 mb-4">
  <div class="flex flex-col gap-1 items-end">
    <div class="w-12 h-0.5 bg-[#ff4500]"></div>
    <div class="w-8 h-0.5 bg-[#ff4500]"></div>
  </div>
  <span class="text-[#ff4500] font-bold text-sm uppercase tracking-wider">
    OUR BEST SERVICE
  </span>
  <div class="flex flex-col gap-1 items-start">
    <div class="w-12 h-0.5 bg-[#ff4500]"></div>
    <div class="w-8 h-0.5 bg-[#ff4500]"></div>
  </div>
</div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Quality Servicing Opportunity
        </h2>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Service Card 1 -->
        <div class="bg-gray-50 rounded-lg overflow-hidden group">
          <div class="relative overflow-hidden h-64 lg:h-72">
            <img
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
              alt="Engine Cleaning"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div class="p-8 lg:p-10">
            <span class="text-[#ff4500] font-bold text-sm uppercase tracking-wider">
              SERVICE 01
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mt-3 mb-8">
              Engine Cleaning
            </h3>
            <NuxtLink
              to="/services/engine-cleaning"
              class="inline-block bg-white text-[#ff4500] font-semibold text-sm uppercase tracking-wider hover:bg-[#ff4500] hover:text-white transition-all px-8 py-3 rounded border border-gray-200 hover:border-[#ff4500]"
            >
              VIEW SERVICE
            </NuxtLink>
          </div>
        </div>

        <!-- Service Card 2 -->
        <div class="bg-gray-50 rounded-lg overflow-hidden group">
          <div class="relative overflow-hidden h-64 lg:h-72">
            <img
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop"
              alt="Engine Diagnostics"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div class="p-8 lg:p-10 bg-[#f8f8f8]">
            <span class="text-[#ff4500] font-bold text-sm uppercase tracking-wider">
              SERVICE 02
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mt-3 mb-8">
              Engine Diagnostics
            </h3>
            <NuxtLink
              to="/services/engine-cleaning"
              class="inline-block bg-white text-[#ff4500] font-semibold text-sm uppercase tracking-wider hover:bg-[#ff4500] hover:text-white transition-all px-8 py-3 rounded border border-gray-200 hover:border-[#ff4500]"
            >
              VIEW SERVICE
            </NuxtLink>
          </div>
        </div>

        <!-- Service Card 3 -->
        <div class="bg-gray-50 rounded-lg overflow-hidden group">
          <div class="relative overflow-hidden h-64 lg:h-72">
            <img
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop"
              alt="Electrical System"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div class="p-8 lg:p-10 bg-[#f8f8f8]">
            <span class="text-[#ff4500] font-bold text-sm uppercase tracking-wider">
              SERVICE 03
            </span>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mt-3 mb-8">
              Electrical System
            </h3>
            <NuxtLink
              to="/services/engine-cleaning"
              class="inline-block bg-white text-[#ff4500] font-semibold text-sm uppercase tracking-wider hover:bg-[#ff4500] hover:text-white transition-all px-8 py-3 rounded border border-gray-200 hover:border-[#ff4500]"
            >
              VIEW SERVICE
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
/* Additional custom styles if needed */
</style>