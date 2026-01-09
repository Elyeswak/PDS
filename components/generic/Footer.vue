<template>
  <footer class="bg-[#1a1f2e] text-white">
    <div class="container mx-auto px-8 md:px-28 lg:px-32 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h5 class="font-bold mb-6 relative inline-block">
            About Company
            <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-[#ff4500]"></span>
          </h5>
          <p class="text-gray-400 mb-6 leading-relaxed">
            Centric aplications productize before front end vortals visualize front end is results and value added
          </p>
          <div class="mb-4">
            <p class="font-semibold mb-2">WE ARE AVAILABLE</p>
            <p class="text-gray-400">Mon-Sat: 09.00 am to 6.30 pm</p>
          </div>
          <a
            href="#contact"
            @click.prevent="scrollToSection('contact')"
            class="inline-block bg-[#ff4500] hover:bg-[#ff5722] text-white font-semibold px-8 py-3 transition-colors cursor-pointer"
          >
            CONTACT US
          </a>
        </div>

        <div>
          <h5 class="font-bold mb-6 relative inline-block">
            Quick link
            <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-[#ff4500]"></span>
          </h5>
          <ul class="space-y-3">
            <li>
              <a
                href="#about"
                @click.prevent="scrollToSection('about')"
                class="text-gray-400 hover:text-white transition-colors flex items-center cursor-pointer"
              >
                <span class="mdi mdi-chevron-right mr-2"></span>
                About Us
              </a>
            </li>
            <li>
              <a
                href="#services"
                @click.prevent="scrollToSection('services')"
                class="text-gray-400 hover:text-white transition-colors flex items-center cursor-pointer"
              >
                <span class="mdi mdi-chevron-right mr-2"></span>
                Popular Services
              </a>
            </li>
            <li>
              <a
                href="#why-us"
                @click.prevent="scrollToSection('why-us')"
                class="text-gray-400 hover:text-white transition-colors flex items-center cursor-pointer"
              >
                <span class="mdi mdi-chevron-right mr-2"></span>
                Why Choose Us
              </a>
            </li>
            <li>
              <a
                href="#products"
                @click.prevent="scrollToSection('products')"
                class="text-gray-400 hover:text-white transition-colors flex items-center cursor-pointer"
              >
                <span class="mdi mdi-chevron-right mr-2"></span>
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#testimonial"
                @click.prevent="scrollToSection('testimonial')"
                class="text-gray-400 hover:text-white transition-colors flex items-center cursor-pointer"
              >
                <span class="mdi mdi-chevron-right mr-2"></span>
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                @click.prevent="scrollToSection('contact')"
                class="text-gray-400 hover:text-white transition-colors flex items-center cursor-pointer"
              >
                <span class="mdi mdi-chevron-right mr-2"></span>
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 class="font-bold mb-6 relative inline-block">
            Recent Posts
            <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-[#ff4500]"></span>
          </h5>
          <div class="space-y-6">
            <div>
              <NuxtLink to="/blog/repair-cars" class="block hover:text-[#ff4500] transition-colors mb-2">
                We Repair Cars With Care
              </NuxtLink>
              <div class="flex items-center text-gray-400">
                <span class="mdi mdi-calendar-blank mr-2"></span>
                <span>Post By Malen 2023</span>
              </div>
            </div>
            <div>
              <NuxtLink to="/blog/quality-repairs" class="block hover:text-[#ff4500] transition-colors mb-2">
                Quality Repairs For Your Car
              </NuxtLink>
              <div class="flex items-center text-gray-400">
                <span class="mdi mdi-calendar-blank mr-2"></span>
                <span>Post By Malen 2023</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 class="font-bold mb-6 relative inline-block">
            Newsletter
            <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-[#ff4500]"></span>
          </h5>
          <p class="text-gray-400 mb-6 leading-relaxed">
            Aplications prodize before front end vortals visualize front end
          </p>
          <form @submit.prevent="handleSubscribe" class="space-y-4">
            <input
              v-model="email"
              type="email"
              placeholder="Email Address"
              class="w-full bg-[#252b3d] border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-[#ff4500] transition-colors"
              required
            />
            <button
              type="submit"
              class="w-full bg-[#ff4500] hover:bg-[#ff5722] text-white font-semibold py-3 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="bg-[#151922] py-6">
      <div class="container mx-auto px-24 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 mb-4 md:mb-0">
          Copyright © 2025 <span class="text-white font-semibold">PDS</span>. All Rights Reserved.
        </p>
        <div class="flex space-x-4">
          <a href="https://facebook.com" target="_blank" class="w-10 h-10 rounded-full bg-[#252b3d] hover:bg-[#ff4500] flex items-center justify-center transition-colors">
            <span class="mdi mdi-facebook"></span>
          </a>
          <a href="https://twitter.com" target="_blank" class="w-10 h-10 rounded-full bg-[#252b3d] hover:bg-[#ff4500] flex items-center justify-center transition-colors">
            <span class="mdi mdi-twitter"></span>
          </a>
          <a href="https://instagram.com" target="_blank" class="w-10 h-10 rounded-full bg-[#252b3d] hover:bg-[#ff4500] flex items-center justify-center transition-colors">
            <span class="mdi mdi-instagram"></span>
          </a>
          <a href="https://linkedin.com" target="_blank" class="w-10 h-10 rounded-full bg-[#252b3d] hover:bg-[#ff4500] flex items-center justify-center transition-colors">
            <span class="mdi mdi-linkedin"></span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const email = ref('');

const handleSubscribe = () => {
  console.log('Subscribe with email:', email.value);
  email.value = '';
};

const scrollToSection = (sectionId) => {
  // Scroll to top first (for home)
  if (sectionId === 'home') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  // Check if we're on the home page
  const currentPath = window.location.pathname;
  
  if (currentPath !== '/') {
    // If not on home page, navigate to home with hash
    window.location.href = `/#${sectionId}`;
    return;
  }

  // If on home page, smooth scroll to section
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 56; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
</script>
