<template>
  <section class="relative w-full min-h-screen bg-neutral-100 flex items-center justify-center py-[114px]">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center">
        <div class="flex items-center gap-4 mb-6">
          <div class="flex items-center gap-2">
            <div class="w-5 h-0.5 bg-[#eb3300]" />
            <div class="w-[30px] h-0.5 bg-[#eb3300]" />
          </div>
          <div class="font-bold text-[#eb3300] text-sm tracking-[0] leading-[14px] whitespace-nowrap">
            ERROR 404
          </div>
          <div class="flex items-center gap-2">
            <div class="w-[30px] h-0.5 bg-[#eb3300]" />
            <div class="w-5 h-0.5 bg-[#eb3300]" />
          </div>
        </div>

        <div class="mb-12">
          <h1 class="font-bold text-neutral-950 text-[120px] md:text-[180px] text-center tracking-[0] leading-none">
            404
          </h1>
        </div>

        <h2 class="font-bold text-neutral-950 text-4xl md:text-5xl text-center tracking-[0] leading-[58.9px] mb-6">
          Page Not Found
        </h2>

        <p class="font-normal text-[#4b4b4b] text-lg text-center tracking-[0] leading-[31.5px] max-w-[600px] mb-12">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center px-8 py-4 bg-[#eb3300] text-white font-bold text-base rounded-none hover:bg-[#d42e00] transition-colors"
          >
            Go Back Home
          </NuxtLink>
          <button
            @click="goBack"
            class="inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-950 font-bold text-base rounded-none border-2 border-neutral-950 hover:bg-neutral-950 hover:text-white transition-colors"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const goBack = () => {
  window.history.back();
};
</script>