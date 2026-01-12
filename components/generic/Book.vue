<template>
  <section class="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="flex flex-col gap-1 items-end">
            <div class="w-12 h-0.5 bg-[#ff4500]"></div>
            <div class="w-8 h-0.5 bg-[#ff4500]"></div>
          </div>
          <span class="text-[#ff4500] font-bold text-sm uppercase tracking-wider">
            BOOK NOW
          </span>
          <div class="flex flex-col gap-1 items-start">
            <div class="w-12 h-0.5 bg-[#ff4500]"></div>
            <div class="w-8 h-0.5 bg-[#ff4500]"></div>
          </div>
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Schedule Your Appointment
        </h2>
        <p class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Book a consultation with our expert team in just a few clicks. We're here to help!
        </p>
      </div>

      <div class="grid lg:grid-cols-12 gap-6 lg:gap-8">
        
        <!-- Left Panel - Info Cards (Smaller) -->
        <div class="lg:col-span-3 space-y-4">
          
          <!-- Main Info Card -->
          <div class="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center gap-2 mb-4">
              <div class="bg-gradient-to-r from-[#ff4500] to-[#ff6b35] p-2 rounded-lg">
                <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">Quick Booking</h3>
            </div>
            
            <p class="text-gray-600 text-sm mb-4">
              Schedule in minutes with our streamlined system.
            </p>

            <ul class="space-y-3">
              <li class="flex items-center gap-2 text-sm">
                <div class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                  <svg class="h-3.5 w-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-700">Flexible Scheduling</span>
              </li>

              <li class="flex items-center gap-2 text-sm">
                <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                  <svg class="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-700">Instant Confirmation</span>
              </li>

              <li class="flex items-center gap-2 text-sm">
                <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                  <svg class="h-3.5 w-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-700">Calendar Sync</span>
              </li>

              <li class="flex items-center gap-2 text-sm">
                <div class="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">
                  <svg class="h-3.5 w-3.5 text-[#ff4500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-700">24/7 Support</span>
              </li>
            </ul>
          </div>

          <!-- CTA Card -->
          <div class="bg-gradient-to-br from-[#ff4500] to-[#ff6b35] rounded-xl shadow-lg p-5 text-white">
            <div class="flex items-center gap-2 mb-3">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 class="text-lg font-bold">Need Help?</h3>
            </div>
            <p class="mb-4 text-white/90 text-sm">
              Questions? Our team is ready to assist you.
            </p>
            <NuxtLink to="#contact" class="w-full min-w-full py-2.5 px-4 bg-white text-[#ff4500] font-bold text-sm rounded-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Contact Support
            </NuxtLink>
          </div>

        </div>

        <!-- Right Panel - Calendar Embed (Much Wider) -->
        <div class="lg:col-span-9">
          
          <!-- Success Message -->
          <div v-if="showSuccess" class="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-5 animate-fade-in shadow-lg">
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-green-900 font-bold text-lg">Booking Confirmed!</p>
                <p class="text-green-700 text-sm">Check your email for appointment details.</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="showError" class="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-5 animate-fade-in shadow-lg">
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-red-900 font-bold">Booking Error</p>
                <p class="text-red-700 text-sm">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="bg-white rounded-2xl border-2 border-gray-200 shadow-xl p-12 flex items-center justify-center">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#ff4500] to-[#ff6b35] rounded-full mb-4">
                <svg class="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p class="text-gray-900 font-bold text-lg mb-2">Loading Calendar...</p>
              <p class="text-gray-600 text-sm">This should only take a moment</p>
            </div>
          </div>

          <!-- Cal.com Embed Container -->
          <div v-show="!isLoading" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="relative">
              <div ref="calEmbed" class="cal-embed-container p-4 sm:p-6"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const calEmbed = ref<HTMLElement | null>(null);
const showSuccess = ref(false);
const showError = ref(false);
const errorMessage = ref('');
const isLoading = ref(true);

let messageListener: ((e: MessageEvent) => void) | null = null;

onMounted(() => {
  if (!calEmbed.value) {
    showError.value = true;
    errorMessage.value = 'Failed to load booking calendar.';
    isLoading.value = false;
    return;
  }

  try {
    // Create the embed HTML - auto height on mobile
    const isMobile = window.innerWidth < 768;
    const embedHeight = isMobile ? 'auto' : '650px';
    
    const embedHTML = `
      <div style="width:100%;height:${embedHeight};overflow:auto;${isMobile ? 'min-height:550px;' : ''}" id="cal-inline"></div>
    `;
    
    calEmbed.value.innerHTML = embedHTML;

    // Create and append the script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      (function(C,A,L){
        let p=function(a,ar){a.q.push(ar)};
        let d=C.document;
        C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;
          if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true;}
          if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];
            if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["initNamespace",namespace]);}else p(cal,ar);return;}
          p(cal,ar);
        };
      })(window,"https://app.cal.com/embed/embed.js","init");
      Cal("init","car",{origin:"https://app.cal.com"});
      Cal.ns.car("inline",{
        elementOrSelector:"#cal-inline",
        calLink:"test145/call",
        config: {
          "layout": "month_view",
          "theme": "light"
        }
      });
    `;

    script.onload = () => {
      setTimeout(() => {
        isLoading.value = false;
        
        // Force consistent height for the iframe (only on desktop)
        const iframe = calEmbed.value?.querySelector('iframe');
        if (iframe && !isMobile) {
          iframe.style.height = '650px';
          iframe.style.maxHeight = '650px';
        }
      }, 800);
    };

    script.onerror = () => {
      showError.value = true;
      errorMessage.value = 'Failed to load booking calendar script.';
      isLoading.value = false;
    };

    document.body.appendChild(script);

    // Fallback timeout
    setTimeout(() => { 
      if (isLoading.value) {
        isLoading.value = false;
      }
    }, 5000);

    // Listen for booking events
    messageListener = (e: MessageEvent) => {
      if (!["https://app.cal.com", "https://cal.com"].includes(e.origin)) return;
      const data = e.data;
      if (data.type === "booking:successful") {
        showSuccess.value = true;
        showError.value = false;
        setTimeout(() => showSuccess.value = false, 10000);
      } else if (data.type === "booking:failed") {
        showError.value = true;
        errorMessage.value = "Booking failed. Please try again.";
      }
    };

    window.addEventListener("message", messageListener);
  } catch (error) {
    console.error('Error loading calendar:', error);
    showError.value = true;
    errorMessage.value = "An error occurred loading the booking calendar.";
    isLoading.value = false;
  }
});

onUnmounted(() => {
  if (messageListener) {
    window.removeEventListener("message", messageListener);
  }
});
</script>

<style scoped>
.cal-embed-container { 
  height: 650px;
  max-height: 650px;
  width: 100%;
  position: relative;
}

/* Ensure the iframe has proper spacing */
.cal-embed-container :deep(iframe) {
  border-radius: 12px;
  height: 650px !important;
  max-height: 650px !important;
}

.animate-fade-in { 
  animation: fade-in 0.3s ease-out; 
}

@keyframes fade-in { 
  from { 
    opacity: 0; 
    transform: translateY(-10px); 
  } 
  to { 
    opacity: 1; 
    transform: translateY(0); 
  } 
}

.animate-spin { 
  animation: spin 1s linear infinite; 
}

@keyframes spin { 
  to { 
    transform: rotate(360deg); 
  } 
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .cal-embed-container {
    height: 600px;
    max-height: 600px;
  }
  
  .cal-embed-container :deep(iframe) {
    height: 600px !important;
    max-height: 600px !important;
  }
}

@media (max-width: 768px) {
  .cal-embed-container {
    height: auto;
    max-height: none;
    min-height: 550px;
  }
  
  .cal-embed-container :deep(iframe) {
    height: auto !important;
    max-height: none !important;
    min-height: 550px !important;
  }
  
  .lg\:col-span-9 {
    grid-column: span 12;
  }
  
  .lg\:col-span-3 {
    grid-column: span 12;
    margin-bottom: 0;
  }
}

@media (max-width: 640px) {
  .cal-embed-container {
    height: auto;
    max-height: none;
    min-height: 500px;
  }
  
  .cal-embed-container :deep(iframe) {
    height: auto !important;
    max-height: none !important;
    min-height: 500px !important;
  }
}
</style>
