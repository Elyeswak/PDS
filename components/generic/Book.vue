<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-12 gap-8">
        
        <!-- Left Panel - Compact Sidebar -->
        <div class="lg:col-span-4 xl:col-span-3 bg-white rounded-xl shadow-lg p-6">
          <div class="sticky top-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Schedule Appointment
            </h2>
            <p class="text-gray-600 mb-6 text-sm">
              Book a consultation with our team in just a few clicks.
            </p>

            <ul class="space-y-4 text-gray-700 mb-8">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm">Flexible Scheduling</span>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">Instant Confirmation</span>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">Calendar Sync</span>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm">24/7 Support</span>
              </li>
            </ul>

            <button class="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-sm">
              Get a Quote
            </button>
            
            <div class="mt-6 pt-6 border-t border-gray-100">
              <p class="text-xs text-gray-500">
                Need help? <a href="#" class="text-indigo-600 hover:text-indigo-800">Contact support</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Right Panel - Full-width Calendar -->
        <div class="lg:col-span-8 xl:col-span-9">
          
          <!-- Success Message -->
          <div v-if="showSuccess" class="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <p class="text-green-800 font-medium">Booking Confirmed! Check your email for details.</p>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="showError" class="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <p class="text-red-700 font-medium">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="mb-4 bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center">
            <div class="text-center">
              <svg class="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-3" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-gray-700 font-medium">Loading booking calendar...</span>
              <p class="text-gray-500 text-sm mt-1">This should only take a moment</p>
            </div>
          </div>

          <!-- Cal.com Embed Container - Full width with fixed height -->
          <div class="relative">
            <div ref="calEmbed" class="cal-embed-container"></div>
          </div>

        </div>

      </div>
    </div>
  </div>
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
    // Create the embed HTML
    const embedHTML = `
      <div style="width:100%;height:100%;overflow:auto;min-height:600px" id="cal-inline"></div>
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
        calLink:"test145/car",
        config: {
          "layout": "month_view",
          "theme": "light",
          "height": "600px"
        }
      });
    `;

    script.onload = () => {
      isLoading.value = false;
      
      // Force the Cal.com iframe to respect our container height
      setTimeout(() => {
        const iframe = calEmbed.value?.querySelector('iframe');
        if (iframe) {
          iframe.style.height = '600px';
          iframe.style.minHeight = '600px';
          iframe.style.maxHeight = '600px';
          iframe.style.width = '100%';
        }
      }, 1000);
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
  height: 600px;
  min-height: 600px;
  max-height: 600px;
  width: 100%;
  position: relative;
}

/* Custom scrollbar */
.cal-embed-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.cal-embed-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.cal-embed-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.cal-embed-container::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
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
    height: 550px;
    min-height: 550px;
    max-height: 550px;
  }
}

@media (max-width: 768px) {
  .cal-embed-container {
    height: 500px;
    min-height: 500px;
    max-height: 500px;
  }
  
  .lg\:col-span-8 {
    grid-column: span 12;
  }
  
  .lg\:col-span-4 {
    grid-column: span 12;
    margin-bottom: 1.5rem;
  }
}
</style>