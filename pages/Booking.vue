<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Schedule Your Appointment
        </h1>
        <p class="text-lg text-gray-600">
          Book a consultation with our team. We offer 2 time slots per day.
        </p>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccess"
        class="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 animate-fade-in"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-lg font-medium text-green-800">
              Booking Confirmed!
            </h3>
            <p class="mt-2 text-sm text-green-700">
              Your appointment has been successfully scheduled. Check your email for confirmation details.
            </p>
          </div>
          <button
            @click="showSuccess = false"
            class="ml-3 text-green-500 hover:text-green-700"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div
        v-if="showError"
        class="mb-8 bg-red-50 border border-red-200 rounded-lg p-6 animate-fade-in"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-lg font-medium text-red-800">
              Booking Error
            </h3>
            <p class="mt-2 text-sm text-red-700">
              {{ errorMessage }}
            </p>
          </div>
          <button
            @click="showError = false"
            class="ml-3 text-red-500 hover:text-red-700"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="animate-spin h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              Loading calendar...
            </p>
          </div>
        </div>
      </div>

      <!-- Cal.com Embed Container -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div 
          ref="calEmbed" 
          class="cal-embed-container"
        >
          <!-- Cal.com embed will be inserted here -->
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-indigo-600 mb-3">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
          <p class="text-gray-600 text-sm">Choose a time that works best for you from our available slots.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-indigo-600 mb-3">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
          <p class="text-gray-600 text-sm">Receive immediate email confirmation with all meeting details.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-indigo-600 mb-3">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Calendar Sync</h3>
          <p class="text-gray-600 text-sm">Automatically syncs with Google Calendar for easy management.</p>
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

// For cleanup
let messageListener: ((e: MessageEvent) => void) | null = null;

definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Book an Appointment',
  meta: [
    { name: 'description', content: 'Schedule your consultation with our team' }
  ]
});

onMounted(() => {
  if (!calEmbed.value) {
    console.error('Cal embed container not found');
    showError.value = true;
    errorMessage.value = 'Failed to load booking calendar. Please refresh the page.';
    isLoading.value = false;
    return;
  }

  try {
    console.log('Initializing Cal.com embed...');

    // Create the Cal.com embed
    calEmbed.value.innerHTML = `
      <div style="width:100%;height:100%;overflow:scroll" id="my-cal-inline-car"></div>
      <script type="text/javascript">
        (function (C, A, L) { 
          let p = function (a, ar) { a.q.push(ar); }; 
          let d = C.document; 
          C.Cal = C.Cal || function () { 
            let cal = C.Cal; 
            let ar = arguments; 
            if (!cal.loaded) { 
              cal.ns = {}; 
              cal.q = cal.q || []; 
              d.head.appendChild(d.createElement("script")).src = A; 
              cal.loaded = true; 
            } 
            if (ar[0] === L) { 
              const api = function () { p(api, arguments); }; 
              const namespace = ar[1]; 
              api.q = api.q || []; 
              if(typeof namespace === "string"){
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar); 
              return;
            } 
            p(cal, ar); 
          }; 
        })(window, "https://app.cal.com/embed/embed.js", "init");
        
        Cal("init", "car", {origin:"https://app.cal.com"});
        
        Cal.ns.car("inline", {
          elementOrSelector:"#my-cal-inline-car",
          config: {"layout":"month_view","theme":"dark"},
          calLink: "test145/car",
        });
        
        Cal.ns.car("ui", {"theme":"dark","hideEventTypeDetails":false,"layout":"month_view"});
      <\/script>
    `;

    // Execute the embedded scripts
    const scripts = calEmbed.value.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      const newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      
      if (script.src) {
        newScript.src = script.src;
        newScript.onload = () => {
          console.log('Cal.com script loaded successfully');
          isLoading.value = false;
        };
        newScript.onerror = () => {
          console.error('Failed to load Cal.com script');
          showError.value = true;
          errorMessage.value = 'Failed to load booking calendar. Please check your internet connection.';
          isLoading.value = false;
        };
      } else {
        newScript.text = script.text;
      }
      
      document.body.appendChild(newScript);
    }

    // Set a timeout to hide loading if script doesn't load
    setTimeout(() => {
      if (isLoading.value) {
        isLoading.value = false;
      }
    }, 5000);

    // Listen for booking success messages from Cal.com
    messageListener = (e: MessageEvent) => {
      // Verify the message is from Cal.com
      if (e.origin !== 'https://app.cal.com' && e.origin !== 'https://cal.com') {
        return;
      }

      const data = e.data;
      console.log('Received message from Cal.com:', data);
      
      if (data.type === 'booking:successful') {
        console.log('Booking successful!');
        showSuccess.value = true;
        showError.value = false;
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Auto-hide success message after 10 seconds
        setTimeout(() => {
          showSuccess.value = false;
        }, 10000);
      } else if (data.type === 'booking:failed') {
        console.error('Booking failed:', data);
        showError.value = true;
        errorMessage.value = 'Booking failed. Please try again or contact support.';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('message', messageListener);
    console.log('Cal.com message listener attached');

  } catch (error) {
    console.error('Error initializing Cal.com embed:', error);
    showError.value = true;
    errorMessage.value = 'An error occurred while loading the booking calendar.';
    isLoading.value = false;
  }
});

onUnmounted(() => {
  // Clean up event listener
  if (messageListener) {
    window.removeEventListener('message', messageListener);
    console.log('Cal.com message listener removed');
  }
});
</script>

<style scoped>
.cal-embed-container {
  min-height: 700px;
  position: relative;
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

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

@media (max-width: 640px) {
  .cal-embed-container {
    min-height: 600px;
  }
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>