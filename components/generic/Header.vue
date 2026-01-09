<template>
  <header class="bg-[#0a0a0a] text-white sticky top-0 z-50">
    <div class="relative">
      <nav class="relative z-10">
        <div
          class="container px-4 lg:mx-auto lg:px-28 sm:justify-center justify-end"
        >
          <div class="flex items-center h-14 mx-auto w-full">
            <div
              class="hidden lg:flex items-center justify-center space-x-6 xl:space-x-10 font-medium"
            >
              <a
                href="#home"
                @click.prevent="scrollToSection('home')"
                class="text-white hover:text-gray-300 transition-colors text-sm xl:text-base whitespace-nowrap cursor-pointer"
              >
                HOME +
              </a>
              <a
                href="#about"
                @click.prevent="scrollToSection('about')"
                class="text-white hover:text-gray-300 transition-colors text-sm xl:text-base whitespace-nowrap cursor-pointer"
              >
                ABOUT US
              </a>
              <a
                href="#services"
                @click.prevent="scrollToSection('services')"
                class="text-white hover:text-gray-300 transition-colors text-sm xl:text-base whitespace-nowrap cursor-pointer"
              >
                SERVICES
              </a>
              <a
                href="#testimonial"
                @click.prevent="scrollToSection('testimonial')"
                class="text-white hover:text-gray-300 transition-colors text-sm xl:text-base whitespace-nowrap cursor-pointer"
              >
                TESTIMONIAL
              </a>
              <a
                href="#contact"
                @click.prevent="scrollToSection('contact')"
                class="text-white hover:text-gray-300 transition-colors text-sm xl:text-base whitespace-nowrap cursor-pointer"
              >
                CONTACT US
              </a>
            </div>

            <div
              class="hidden lg:flex items-center space-x-4 xl:space-x-6 shrink-0 ml-auto"
            >
              <NuxtLink
                to="/location"
                class="flex items-center space-x-2 text-[#ff4444] hover:text-red-400 transition-colors whitespace-nowrap"
              >
                <svg
                  class="w-3.5 h-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-normal tracking-wider text-sm xl:text-base"
                  >OFFICE LOCATION</span
                >
              </NuxtLink>
            </div>
            <button @click="toggleMobileMenu" class="lg:hidden text-white">
              <svg
                v-if="!isMobileMenuOpen"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      <!-- Hidden on mobile (below lg breakpoint) -->
      <div class="relative overflow-hidden bg-[#1a1a1a] hidden lg:block">
        <div class="absolute inset-0">
          <div
            class="absolute left-0 top-0 bottom-0 w-[20%] md:w-[20%] xl:w-[25%] bg-[#ff4500]"
            style="clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%)"
          ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 lg:px-20">
          <div
            class="flex flex-col lg:flex-row ml-40 justify-start items-start lg:items-center lg:justify-center py-4 space-y-4 lg:space-y-0 md:space-x-6 lg:space-x-8 xl:space-x-12"
          >
            <div class="flex items-center space-x-2 shrink-0">
              <div
                class="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12"
              >
                <svg
                  class="w-5 h-5 lg:w-6 lg:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <p class="text-gray-400 mb-0.5 text-xs lg:text-sm">
                  Make An Email
                </p>
                <p class="font-semibold text-white text-sm lg:text-base">
                  info@malen.com
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-2 shrink-0">
              <div
                class="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12"
              >
                <svg
                  class="w-5 h-5 lg:w-6 lg:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-gray-400 mb-0.5 text-xs lg:text-sm">
                  Call Us 24/7
                </p>
                <p
                  class="font-semibold text-white text-sm lg:text-base whitespace-nowrap"
                >
                  589 (246) 2145 2142
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-2 shrink-0">
              <div
                class="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12"
              >
                <svg
                  class="w-5 h-5 lg:w-6 lg:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-gray-400 mb-0.5 text-xs lg:text-sm">
                  Office Hours
                </p>
                <p
                  class="font-semibold text-white text-sm lg:text-base whitespace-nowrap"
                >
                  Mon-Sat 8am - 6pm
                </p>
              </div>
            </div>

            <div
              class="flex items-center space-x-3 lg:space-x-4 ml-14 shrink-0"
            >
              <button
                @click="toggleSearch"
                class="flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span
                  class="mdi mdi-magnify text-white text-lg lg:text-xl"
                ></span>
              </button>

              <button
                @click="toggleCart"
                class="flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span
                  class="mdi mdi-cart-outline text-white text-lg lg:text-xl"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden bg-[#1a1a1a] border-t border-gray-800"
    >
      <div class="container mx-auto px-6 py-4 space-y-3">
        <a
          href="#home"
          @click.prevent="
            scrollToSection('home');
            toggleMobileMenu();
          "
          class="block text-white hover:text-gray-300 transition-colors py-2 font-medium cursor-pointer"
        >
          HOME
        </a>
        <a
          href="#about"
          @click.prevent="
            scrollToSection('about');
            toggleMobileMenu();
          "
          class="block text-white hover:text-gray-300 transition-colors py-2 font-medium cursor-pointer"
        >
          ABOUT US
        </a>
        <a
          href="#services"
          @click.prevent="
            scrollToSection('services');
            toggleMobileMenu();
          "
          class="block text-white hover:text-gray-300 transition-colors py-2 font-medium cursor-pointer"
        >
          SERVICES
        </a>
        <a
          href="#testimonial"
          @click.prevent="
            scrollToSection('testimonial');
            toggleMobileMenu();
          "
          class="block text-white hover:text-gray-300 transition-colors py-2 font-medium cursor-pointer"
        >
          TESTIMONIAL
        </a>
        <a
          href="#contact"
          @click.prevent="
            scrollToSection('contact');
            toggleMobileMenu();
          "
          class="block text-white hover:text-gray-300 transition-colors py-2 font-medium cursor-pointer"
        >
          CONTACT US
        </a>
        <NuxtLink
          to="/location"
          class="flex items-center space-x-2 text-[#ff4444] hover:text-red-400 transition-colors py-2"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-normal">OFFICE LOCATION</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Get header height for offset
    const headerHeight = 56; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const toggleSearch = () => {
  console.log("Search clicked");
};

const toggleCart = () => {
  console.log("Cart clicked");
};
</script>
