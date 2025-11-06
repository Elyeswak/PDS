<template>
  <section class="relative py-20 lg:py-24 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&h=600&fit=crop"
        alt="Car Interior"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/70"></div>
    </div>
    <div class="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="text-white max-w-2xl">
          <!-- Label -->
          <div class="flex items-center gap-3 mb-6">
            <div class="flex flex-col gap-1 items-end">
              <div class="w-12 h-0.5 bg-[#ff4500]"></div>
              <div class="w-8 h-0.5 bg-[#ff4500]"></div>
            </div>
            <span
              class="text-[#ff4500] font-bold text-sm uppercase tracking-wider"
            >
              GET OUR SERVICE
            </span>
          </div>

          <!-- Heading -->
          <h2
            class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
          >
            Get Premium Auto Car Service<br />
            Feel Free To Contact Us.
          </h2>
        </div>

        <!-- Right Buttons -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <!-- CTA Button -->
          <button
            class="bg-[#ff4500] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 hover:bg-[#cc3700] transition-colors whitespace-nowrap"
          >
            GET OUR SERVICE
          </button>

          <!-- Play Button -->
          <button
            class="flex items-center justify-center w-14 h-14 border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all group"
          >
            <svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
