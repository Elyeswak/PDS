<template>
  <section class="py-16 bg-white text-center">
    <!-- Section Title -->
    <div class="mb-10">
      <p class="text-[#ff4500] font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
        <span class="h-px w-6 bg-[#ff4500]"></span>
        Expert Technician
        <span class="h-px w-6 bg-[#ff4500]"></span>
      </p>
      <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Meet Our Experts</h2>
    </div>

    <!-- Experts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- Expert Card 1 -->
      <div class="bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
        <div class="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1200&fit=crop"
            alt="Expert 1"
            class="w-full h-[360px] object-cover"
          />
        </div>

        <!-- Info Box -->
        <div class="bg-white flex-1 flex flex-col justify-between py-6 px-6 -mt-6 mx-6 shadow-md relative z-10">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Andrew Adrian</h3>
            <p class="text-[#ff4500] font-medium mt-1">Engine Expert</p>
          </div>
        </div>
      </div>

      <!-- Expert Card 2 -->
      <div class="bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
        <div class="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1200&fit=crop"
            alt="Expert 2"
            class="w-full h-[360px] object-cover"
          />
        </div>

        <div class="bg-white flex-1 flex flex-col justify-between py-6 px-6 -mt-6 mx-6 shadow-md relative z-10">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Kevin Martin</h3>
            <p class="text-[#ff4500] font-medium mt-1">Engine Expert</p>
          </div>
        </div>
      </div>

      <!-- Expert Card 3 -->
      <div class="bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
        <div class="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1200&fit=crop"
            alt="Expert 3"
            class="w-full h-[360px] object-cover"
          />
        </div>

        <div class="bg-white flex-1 flex flex-col justify-between py-6 px-6 -mt-6 mx-6 shadow-md relative z-10">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Aiden Samuel</h3>
            <p class="text-[#ff4500] font-medium mt-1">Engine Expert</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
