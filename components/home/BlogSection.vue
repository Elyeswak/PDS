<template>
  <section class="w-full py-[124px] flex flex-col gap-7">
    <div class="mx-auto max-w-[1200px] px-4 flex flex-col items-center gap-7">
      <div class="relative flex flex-col items-center gap-2">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-5 h-0.5 bg-[#eb3300]" />
            <div class="w-[30px] h-0.5 bg-[#eb3300]" />
          </div>
          <div class="font-bold text-[#eb3300] text-sm tracking-[0] leading-[14px] whitespace-nowrap">
            NEWS &amp; UPDATES
          </div>
          <div class="flex items-center gap-2">
            <div class="w-[30px] h-0.5 bg-[#eb3300]" />
            <div class="w-5 h-0.5 bg-[#eb3300]" />
          </div>
        </div>
        <h2 class="font-bold text-neutral-950 text-5xl text-center tracking-[0] leading-[58.9px] whitespace-nowrap">
          Latest Blog Posts
        </h2>
      </div>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        <div
          v-for="(post, index) in blogPosts"
          :key="index"
          class="bg-[#f3f1f2] border-0 shadow-none"
        >
          <div class="p-10 flex flex-col h-full">
            <div class="flex gap-4">
              <div class="flex items-center gap-1.5 pr-4 border-r border-[#cdcdcd]">
                <span class="mdi mdi-calendar-blank w-3 h-3.5 text-[#363739]"></span>
                <span class="font-medium text-[#363739] text-sm tracking-[0] leading-4 whitespace-nowrap">
                  {{ post.date }}
                </span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="mdi mdi-tag w-3.5 h-3.5 text-[#363739]"></span>
                <span class="font-medium text-[#363739] text-sm tracking-[0] leading-4 whitespace-nowrap">
                  {{ post.category }}
                </span>
              </div>
            </div>
            <h3 class="font-bold text-neutral-950  mt-6">
              {{ post.title }}
            </h3>
            <div class="h-[160px] mt-6" />
            <div class="flex items-center gap-[4.6px] cursor-pointer mt-6">
              <span class="font-bold text-neutral-950 text-base tracking-[0] leading-[26px] whitespace-nowrap">
                READ DETAILS
              </span>
              <span class="mdi mdi-arrow-right w-3.5 h-4 text-neutral-950"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const blogPosts = [
  {
    date: "15 APR, 2023",
    category: "ELECTRONICS",
    title: "How to provide great car service to",
  },
  {
    date: "15 MAY, 2023",
    category: "OIL CHANGE",
    title: "Efficient repairs, reliable Results",
  },
  {
    date: "15 MAY, 2023",
    category: "ACCESSORIES",
    title: "We'll get your car back on the",
  },
];
</script>
