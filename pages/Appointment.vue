<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Appointment Dashboard
        </h1>
        <p class="text-gray-600">
          Manage and view all scheduled appointments
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Total</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Confirmed</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.confirmed }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Cancelled</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.cancelled }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Upcoming</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.upcoming }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow mb-6 p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              v-model="filters.status"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @change="fetchAppointments"
            >
              <option value="all">All Appointments</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="RESCHEDULED">Rescheduled</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Name or email..."
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @input="fetchAppointments"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Date From
            </label>
            <input
              v-model="filters.dateFrom"
              type="date"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @change="fetchAppointments"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Date To
            </label>
            <input
              v-model="filters.dateTo"
              type="date"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @change="fetchAppointments"
            />
          </div>
        </div>
      </div>

      <div v-if="loading" class="bg-white rounded-lg shadow p-12 text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p class="text-gray-600">Loading appointments...</p>
      </div>

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div v-if="appointments.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
          <p class="mt-1 text-sm text-gray-500">No appointments match your filters.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendee
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company / Service
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="appointment in appointments"
                :key="appointment.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span class="text-indigo-600 font-medium text-sm">
                        {{ getInitials(appointment.attendeeName) }}
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ appointment.attendeeName }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ appointment.attendeeEmail }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDate(appointment.startTime) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatTime(appointment.startTime) }} - {{ formatTime(appointment.endTime) }}
                  </div>
                  <div class="text-xs text-gray-400 mt-1">
                    {{ appointment.attendeeTimezone }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ appointment.companyName || 'N/A' }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ appointment.serviceInterest || 'N/A' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(appointment.status)"
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ appointment.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    @click="viewDetails(appointment)"
                    class="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-if="selectedAppointment"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        @click.self="selectedAppointment = null"
      >
        <div class="relative top-20 mx-auto p-8 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Appointment Details</h3>
            <button
              @click="selectedAppointment = null"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div class="border-b pb-4">
              <label class="text-sm font-medium text-gray-500">Attendee Name</label>
              <p class="mt-1 text-lg text-gray-900">{{ selectedAppointment.attendeeName }}</p>
            </div>

            <div class="border-b pb-4">
              <label class="text-sm font-medium text-gray-500">Email</label>
              <p class="mt-1 text-gray-900">{{ selectedAppointment.attendeeEmail }}</p>
            </div>

            <div class="border-b pb-4">
              <label class="text-sm font-medium text-gray-500">Date & Time</label>
              <p class="mt-1 text-gray-900">
                {{ formatDate(selectedAppointment.startTime) }} at {{ formatTime(selectedAppointment.startTime) }}
              </p>
              <p class="text-sm text-gray-500 mt-1">Timezone: {{ selectedAppointment.attendeeTimezone }}</p>
            </div>

            <div class="border-b pb-4" v-if="selectedAppointment.companyName">
              <label class="text-sm font-medium text-gray-500">Company</label>
              <p class="mt-1 text-gray-900">{{ selectedAppointment.companyName }}</p>
            </div>

            <div class="border-b pb-4" v-if="selectedAppointment.serviceInterest">
              <label class="text-sm font-medium text-gray-500">Service Interest</label>
              <p class="mt-1 text-gray-900">{{ selectedAppointment.serviceInterest }}</p>
            </div>

            <div class="border-b pb-4" v-if="selectedAppointment.specialRequirements">
              <label class="text-sm font-medium text-gray-500">Special Requirements</label>
              <p class="mt-1 text-gray-900">{{ selectedAppointment.specialRequirements }}</p>
            </div>

            <div class="border-b pb-4">
              <label class="text-sm font-medium text-gray-500">Status</label>
              <p class="mt-1">
                <span :class="getStatusClass(selectedAppointment.status)" class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ selectedAppointment.status }}
                </span>
              </p>
            </div>

            <div class="border-b pb-4" v-if="selectedAppointment.meetingUrl">
              <label class="text-sm font-medium text-gray-500">Meeting Link</label>
              <p class="mt-1">
                <a :href="selectedAppointment.meetingUrl" target="_blank" class="text-indigo-600 hover:text-indigo-800">
                  Join Meeting →
                </a>
              </p>
            </div>

            <div v-if="selectedAppointment.cancellationReason">
              <label class="text-sm font-medium text-gray-500">Cancellation Reason</label>
              <p class="mt-1 text-gray-900">{{ selectedAppointment.cancellationReason }}</p>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              @click="selectedAppointment = null"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface Appointment {
  id: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeeTimezone: string;
  startTime: string;
  endTime: string;
  status: string;
  companyName?: string;
  serviceInterest?: string;
  specialRequirements?: string;
  meetingUrl?: string;
  cancellationReason?: string;
}

const appointments = ref<Appointment[]>([]);
const selectedAppointment = ref<Appointment | null>(null);
const loading = ref(true);

const filters = ref({
  status: 'all',
  search: '',
  dateFrom: '',
  dateTo: ''
});

const stats = computed(() => {
  const now = new Date();
  return {
    total: appointments.value.length,
    confirmed: appointments.value.filter(a => a.status === 'CONFIRMED').length,
    cancelled: appointments.value.filter(a => a.status === 'CANCELLED').length,
    upcoming: appointments.value.filter(a => 
      a.status === 'CONFIRMED' && new Date(a.startTime) > now
    ).length
  };
});

onMounted(() => {
  fetchAppointments();
});

async function fetchAppointments() {
  loading.value = true;
  try {
    const query = new URLSearchParams();
    if (filters.value.status !== 'all') query.append('status', filters.value.status);
    if (filters.value.search) query.append('search', filters.value.search);
    if (filters.value.dateFrom) query.append('dateFrom', filters.value.dateFrom);
    if (filters.value.dateTo) query.append('dateTo', filters.value.dateTo);

    const response = await $fetch(`/api/appointments?${query.toString()}`);
    appointments.value = response as Appointment[];
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
  } finally {
    loading.value = false;
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
}

function getStatusClass(status: string): string {
  const classes = {
    CONFIRMED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    RESCHEDULED: 'bg-yellow-100 text-yellow-800',
    NO_SHOW: 'bg-gray-100 text-gray-800'
  };
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800';
}

function viewDetails(appointment: Appointment) {
  selectedAppointment.value = appointment;
}
</script>
