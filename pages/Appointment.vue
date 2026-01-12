<template>
  <!-- Loading check - prevents flash while checking auth -->
  <div v-if="!isClient" class="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#ff4500] mb-4"></div>
      <p class="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>

  <!-- Main Content -->
  <div v-else class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Header Section -->
    <div
      class="bg-gradient-to-r from-gray-900 to-[#ff6b35] text-white py-12 lg:py-16"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="flex flex-col gap-1 items-end">
            <div class="w-12 h-0.5 bg-white"></div>
            <div class="w-8 h-0.5 bg-white"></div>
          </div>
          <span
            class="text-white font-bold text-xs sm:text-sm uppercase tracking-wider"
          >
            MANAGEMENT PORTAL
          </span>
          <div class="flex flex-col gap-1 items-start">
            <div class="w-12 h-0.5 bg-white"></div>
            <div class="w-8 h-0.5 bg-white"></div>
          </div>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3">
          Appointment Dashboard
        </h1>
        <p
          class="text-center text-white/90 text-base sm:text-lg max-w-2xl mx-auto"
        >
          Manage and monitor all scheduled appointments in one place
        </p>
      </div>
    </div>

    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-8 relative z-10"
    >
      <!-- Stats Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
      >
        <!-- Total -->
        <div
          class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-blue-500 group hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
              >
                Total
              </p>
              <p class="text-3xl lg:text-4xl font-bold text-gray-900">
                {{ stats.total }}
              </p>
            </div>
            <div
              class="flex-shrink-0 bg-blue-500 rounded-lg p-4 group-hover:scale-110 transition-transform"
            >
              <svg
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Confirmed -->
        <div
          class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-green-500 group hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
              >
                Confirmed
              </p>
              <p class="text-3xl lg:text-4xl font-bold text-gray-900">
                {{ stats.confirmed }}
              </p>
            </div>
            <div
              class="flex-shrink-0 bg-green-500 rounded-lg p-4 group-hover:scale-110 transition-transform"
            >
              <svg
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Cancelled -->
        <div
          class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-red-500 group hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
              >
                Cancelled
              </p>
              <p class="text-3xl lg:text-4xl font-bold text-gray-900">
                {{ stats.cancelled }}
              </p>
            </div>
            <div
              class="flex-shrink-0 bg-red-500 rounded-lg p-4 group-hover:scale-110 transition-transform"
            >
              <svg
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Upcoming -->
        <div
          class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-[#ff4500] group hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2"
              >
                Upcoming
              </p>
              <p class="text-3xl lg:text-4xl font-bold text-gray-900">
                {{ stats.upcoming }}
              </p>
            </div>
            <div
              class="flex-shrink-0 bg-[#ff4500] rounded-lg p-4 group-hover:scale-110 transition-transform"
            >
              <svg
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div
        class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100 mx-4 sm:mx-0"
      >
        <div class="flex items-center gap-2 mb-6">
          <div
            class="bg-gradient-to-r from-[#ff4500] to-[#ff6b35] p-2 rounded-lg"
          >
            <svg
              class="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900">Filter Appointments</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="h-4 w-4 text-[#ff4500]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Status
            </label>
            <div class="relative">
              <select
                v-model="filters.status"
                class="w-full appearance-none rounded-xl border-2 border-gray-200 shadow-sm focus:border-[#ff4500] focus:ring-2 focus:ring-[#ff4500]/20 transition-all pl-4 pr-10 py-3 bg-white font-medium text-gray-700"
                @change="fetchAppointments"
              >
                <option value="all">All Status</option>
                <option value="CONFIRMED">✓ Confirmed</option>
                <option value="CANCELLED">✗ Cancelled</option>
                <option value="RESCHEDULED">↻ Rescheduled</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#ff4500]"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="h-4 w-4 text-[#ff4500]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </label>
            <div class="relative">
              <input
                v-model="filters.search"
                type="text"
                placeholder="Name, email, VIN..."
                class="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-[#ff4500] focus:ring-2 focus:ring-[#ff4500]/20 transition-all pl-10 pr-4 py-3 font-medium text-gray-700 placeholder-gray-400"
                @input="fetchAppointments"
              />
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="h-4 w-4 text-[#ff4500]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              From Date
            </label>
            <input
              v-model="filters.dateFrom"
              type="date"
              class="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-[#ff4500] focus:ring-2 focus:ring-[#ff4500]/20 transition-all px-4 py-3 font-medium text-gray-700"
              @change="fetchAppointments"
            />
          </div>

          <div>
            <label
              class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="h-4 w-4 text-[#ff4500]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              To Date
            </label>
            <input
              v-model="filters.dateTo"
              type="date"
              class="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-[#ff4500] focus:ring-2 focus:ring-[#ff4500]/20 transition-all px-4 py-3 font-medium text-gray-700"
              @change="fetchAppointments"
            />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <div
          class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#ff4500] mb-4"
        ></div>
        <p class="text-gray-600 font-medium">Loading appointments...</p>
      </div>

      <!-- Appointments List -->
      <div v-else>
        <!-- Empty State -->
        <div
          v-if="appointments.length === 0"
          class="bg-white rounded-xl shadow-lg p-12 text-center"
        >
          <div
            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4"
          >
            <svg
              class="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            No appointments found
          </h3>
          <p class="text-gray-500">
            Try adjusting your filters to see more results
          </p>
        </div>

        <!-- Has Appointments -->
        <div v-else class="space-y-4">
          <!-- Desktop Table View -->
          <div
            class="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      Attendee
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      VIN / Reason
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="appointment in paginatedAppointments"
                    :key="appointment.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div
                          class="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-[#ff4500] to-[#ff6b35] rounded-full flex items-center justify-center shadow-md"
                        >
                          <span class="text-white font-bold text-sm">
                            {{ getInitials(appointment.attendeeName) }}
                          </span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-bold text-gray-900">
                            {{ appointment.attendeeName }}
                          </div>
                          <div class="text-sm text-gray-600">
                            {{ appointment.attendeeEmail }}
                          </div>
                          <div
                            v-if="appointment.attendeePhoneNumber"
                            class="text-xs text-gray-500 mt-1 flex items-center gap-1"
                          >
                            <svg
                              class="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {{ appointment.attendeePhoneNumber }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-semibold text-gray-900">
                        {{ formatDate(appointment.startTime) }}
                      </div>
                      <div class="text-sm text-gray-600">
                        {{ formatTime(appointment.startTime) }} -
                        {{ formatTime(appointment.endTime) }}
                      </div>
                      <div
                        class="text-xs text-gray-500 mt-1 flex items-center gap-1"
                      >
                        <svg
                          class="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {{ appointment.attendeeTimezone }}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div
                        v-if="appointment.vim"
                        class="text-sm font-mono font-bold text-[#ff4500] mb-1 flex items-center gap-1"
                      >
                        <svg
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                          />
                        </svg>
                        {{ appointment.vim }}
                      </div>
                      <div
                        v-if="appointment.reason"
                        class="text-sm text-gray-700"
                      >
                        {{ appointment.reason }}
                      </div>
                      <div
                        v-if="!appointment.vim && !appointment.reason"
                        class="text-sm text-gray-400 italic"
                      >
                        No details
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="getStatusClass(appointment.status)"
                        class="px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm"
                      >
                        {{ appointment.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        @click="viewDetails(appointment)"
                        class="inline-flex items-center gap-2 text-[#ff4500] hover:text-[#ff6b35] font-bold transition-colors group cursor-pointer"
                      >
                        <span>View Details</span>
                        <svg
                          class="h-4 w-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mobile Card View -->
          <div class="lg:hidden space-y-4 px-4">
            <div
              v-for="appointment in paginatedAppointments"
              :key="appointment.id"
              class="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-2xl transition-all"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3 flex-1">
                  <div
                    class="flex-shrink-0 h-14 w-14 bg-gradient-to-br from-[#ff4500] to-[#ff6b35] rounded-full flex items-center justify-center shadow-md"
                  >
                    <span class="text-white font-bold">
                      {{ getInitials(appointment.attendeeName) }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-base font-bold text-gray-900 truncate">
                      {{ appointment.attendeeName }}
                    </div>
                    <div class="text-sm text-gray-600 truncate">
                      {{ appointment.attendeeEmail }}
                    </div>
                  </div>
                </div>
                <span
                  :class="getStatusClass(appointment.status)"
                  class="px-2.5 py-1 text-xs font-bold rounded-full shadow-sm flex-shrink-0"
                >
                  {{ appointment.status }}
                </span>
              </div>

              <div class="space-y-3 mb-4">
                <div class="flex items-start gap-2 text-sm">
                  <svg
                    class="h-5 w-5 text-[#ff4500] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <div class="font-semibold text-gray-900">
                      {{ formatDate(appointment.startTime) }}
                    </div>
                    <div class="text-gray-600">
                      {{ formatTime(appointment.startTime) }} -
                      {{ formatTime(appointment.endTime) }}
                    </div>
                  </div>
                </div>

                <div
                  v-if="appointment.attendeePhoneNumber"
                  class="flex items-center gap-2 text-sm text-gray-600"
                >
                  <svg
                    class="h-5 w-5 text-[#ff4500] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{{ appointment.attendeePhoneNumber }}</span>
                </div>

                <div
                  v-if="appointment.vim"
                  class="flex items-center gap-2 text-sm"
                >
                  <svg
                    class="h-5 w-5 text-[#ff4500] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  <span class="font-mono font-bold text-[#ff4500]">{{
                    appointment.vim
                  }}</span>
                </div>

                <div
                  v-if="appointment.reason"
                  class="flex items-start gap-2 text-sm text-gray-700"
                >
                  <svg
                    class="h-5 w-5 text-[#ff4500] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>{{ appointment.reason }}</span>
                </div>
              </div>

              <button
                @click="viewDetails(appointment)"
                class="w-full bg-gradient-to-r from-[#ff4500] to-[#ff6b35] text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>View Full Details</span>
                <svg
                  class="h-5 w-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-0"
          >
            <div class="text-sm text-gray-600 font-medium">
              Showing
              <span class="font-bold text-gray-900">{{ startIndex + 1 }}</span>
              to
              <span class="font-bold text-gray-900">{{
                Math.min(endIndex, filteredAppointments.length)
              }}</span>
              of
              <span class="font-bold text-gray-900">{{
                filteredAppointments.length
              }}</span>
              appointments
            </div>

            <div class="flex items-center gap-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                :class="[
                  'px-4 py-2 rounded-lg font-bold transition-all shadow-sm',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200',
                ]"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div class="flex items-center gap-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'px-4 py-2 rounded-lg font-bold transition-all shadow-sm',
                    currentPage === page
                      ? 'bg-gradient-to-r from-[#ff4500] to-[#ff6b35] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200',
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-4 py-2 rounded-lg font-bold transition-all shadow-sm',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200',
                ]"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Details Modal -->
<div
  v-if="selectedAppointment"
  class="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 p-4 flex items-center justify-center"
  @click.self="selectedAppointment = null"
>
  <div
    class="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl transform transition-all"
  >
    <!-- Modal Header -->
    <div
      class="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white px-4 sm:px-6 py-4 rounded-t-xl"
    >
      <div class="flex justify-between items-start gap-3">
        <div class="min-w-0 flex-1">
          <h3 class="text-xl sm:text-2xl font-bold mb-1 truncate">
            {{ selectedAppointment.attendeeName }}
          </h3>
          <p class="text-white/60 text-xs truncate">
            Appointment #{{ selectedAppointment.id.slice(0, 8) }}
          </p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <span
            :class="getStatusBadgeClass(selectedAppointment.status)"
            class="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap"
          >
            {{ selectedAppointment.status }}
          </span>
          <button
            @click="selectedAppointment = null"
            class="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
    </div>

    <!-- Modal Body -->
    <div class="px-4 sm:px-6 py-4 max-h-[65vh] overflow-y-auto bg-gray-50">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Left Column: Appointment Details -->
        <div class="space-y-3">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50 px-3 py-2 border-b border-gray-200">
              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-[#ff4500] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h4 class="font-bold text-gray-900 text-sm truncate">Contact Details</h4>
              </div>
            </div>

            <div class="p-3 space-y-3">
              <!-- Attendee Info -->
              <div class="flex items-start gap-2.5">
                <div class="flex-shrink-0 w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">Name</p>
                  <p class="text-sm font-bold text-gray-900 truncate">
                    {{ selectedAppointment.attendeeName }}
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-2.5">
                <div class="flex-shrink-0 w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">Email</p>
                  <p class="text-sm font-semibold text-gray-900 break-all">
                    {{ selectedAppointment.attendeeEmail }}
                  </p>
                </div>
              </div>

              <!-- Phone Number -->
              <div
                v-if="selectedAppointment.attendeePhoneNumber"
                class="flex items-start gap-2.5"
              >
                <div class="flex-shrink-0 w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">Phone</p>
                  <p class="text-sm font-bold text-gray-900 truncate">
                    {{ selectedAppointment.attendeePhoneNumber }}
                  </p>
                </div>
              </div>

              <!-- VIN Number -->
              <div v-if="selectedAppointment.vim" class="flex items-start gap-2.5">
                <div class="flex-shrink-0 w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-[#ff4500]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">VIN</p>
                  <p class="text-sm font-mono font-bold text-[#ff4500] break-all">
                    {{ selectedAppointment.vim }}
                  </p>
                </div>
              </div>

              <!-- Address -->
              <div v-if="selectedAppointment.address" class="flex items-start gap-2.5">
                <div class="flex-shrink-0 w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">Address</p>
                  <p class="text-sm text-gray-900 break-words">
                    {{ selectedAppointment.address }}
                  </p>
                </div>
              </div>

              <!-- Reason -->
              <div v-if="selectedAppointment.reason" class="flex items-start gap-2.5">
                <div class="flex-shrink-0 w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">Reason</p>
                  <p class="text-sm text-gray-900 break-words">
                    {{ selectedAppointment.reason }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Date & Additional Info -->
        <div class="space-y-3 flex flex-col">
          <!-- Date & Time Section -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50 px-3 py-2 border-b border-gray-200">
              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-[#ff4500] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h4 class="font-bold text-gray-900 text-sm truncate">Schedule</h4>
              </div>
            </div>

            <div class="p-3 space-y-3">
              <div class="flex items-start gap-2.5">
                <div class="flex-shrink-0 w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">Date</p>
                  <p class="text-sm font-bold text-gray-900 break-words">
                    {{ formatDate(selectedAppointment.startTime) }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-2.5">
                <div class="flex-shrink-0 w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">Time</p>
                  <p class="text-sm font-bold text-gray-900 truncate">
                    {{ formatTime(selectedAppointment.startTime) }} - {{ formatTime(selectedAppointment.endTime) }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-2.5">
                <div class="flex-shrink-0 w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="h-4 w-4 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 font-medium mb-0.5">Timezone</p>
                  <p class="text-sm font-semibold text-gray-900 truncate">
                    {{ selectedAppointment.attendeeTimezone }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- VIN Display as License Plate - Takes remaining space -->
          <div
            v-if="selectedAppointment.vim"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex-1 flex flex-col justify-center"
          >
            
            <!-- License Plate Style -->
            <div class="relative flex-1 flex items-center justify-center">
              <div class="bg-linear-to-b from-gray-900 to-gray-800 rounded-lg p-3 border-2 border-blue-800 shadow-lg w-full">
                <!-- Top stripe -->
                <div class="bg-gray-900 text-white text-[10px] font-bold text-center py-0.5 mb-2 rounded">
                  VEHICLE IDENTIFICATION
                </div>
                
                <!-- License plate number -->
                <div class="bg-white rounded px-3 py-3 border-2 border-gray-900">
                  <div class="text-center">
                    <span class="font-mono font-black text-blue-900 text-xl tracking-widest uppercase break-all">
                      HJHK474
                    </span>
                  </div>
                </div>
                
                <!-- Bottom stripe -->
                <div class="bg-gray-900 text-white text-[10px] font-bold text-center py-0.5 mt-2 rounded">
                  REGISTERED VEHICLE
                </div>
              </div>
            </div>
          </div>

          <!-- Cancellation Notice -->
          <div
            v-if="selectedAppointment.cancellationReason"
            class="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-sm border border-red-200 p-3"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  class="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h4 class="font-bold text-gray-900 text-sm truncate">Cancellation</h4>
            </div>
            <p class="text-gray-800 text-sm font-medium break-words">
              {{ selectedAppointment.cancellationReason }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
    <div
      class="px-4 sm:px-6 py-3 bg-white rounded-b-xl flex justify-end border-t border-gray-200"
    >
      <button
        @click="selectedAppointment = null"
        class="px-5 py-2 bg-gradient-to-r from-[#ff4500] to-[#ff6b35] text-white font-bold rounded-lg hover:shadow-md transition-all text-sm"
      >
        Close
      </button>
    </div>
  </div>
</div>

    <!-- Bottom Spacing -->
    <div class="pb-12"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

// Disable SSR for this page to prevent hydration issues
definePageMeta({
  ssr: false
})

interface Appointment {
  id: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeeTimezone: string;
  attendeePhoneNumber?: string;
  startTime: string;
  endTime: string;
  status: string;
  companyName?: string;
  serviceInterest?: string;
  specialRequirements?: string;
  reason?: string;
  address?: string;
  vim?: string;
  meetingUrl?: string;
  cancellationReason?: string;
}

// Client-side check to prevent flash
const isClient = ref(false)

const appointments = ref<Appointment[]>([]);
const selectedAppointment = ref<Appointment | null>(null);
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 5;

const filters = ref({
  status: "all",
  search: "",
  dateFrom: "",
  dateTo: "",
});

const filteredAppointments = computed(() => {
  return appointments.value;
});

const totalPages = computed(() => {
  return Math.ceil(filteredAppointments.value.length / itemsPerPage);
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage;
});

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage;
});

const paginatedAppointments = computed(() => {
  return filteredAppointments.value.slice(startIndex.value, endIndex.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const stats = computed(() => {
  const now = new Date();
  return {
    total: appointments.value.length,
    confirmed: appointments.value.filter((a) => a.status === "CONFIRMED")
      .length,
    cancelled: appointments.value.filter((a) => a.status === "CANCELLED")
      .length,
    upcoming: appointments.value.filter(
      (a) => a.status === "CONFIRMED" && new Date(a.startTime) > now
    ).length,
  };
});

onMounted(() => {
  isClient.value = true
  fetchAppointments();
});

async function fetchAppointments() {
  loading.value = true;
  try {
    const query = new URLSearchParams();
    if (filters.value.status !== "all")
      query.append("status", filters.value.status);
    if (filters.value.search) query.append("search", filters.value.search);
    if (filters.value.dateFrom)
      query.append("dateFrom", filters.value.dateFrom);
    if (filters.value.dateTo) query.append("dateTo", filters.value.dateTo);

    const response = await $fetch(`/api/appointments?${query.toString()}`);
    appointments.value = (response as any).appointments || [];

    // Reset to page 1 when filters change
    currentPage.value = 1;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
  } finally {
    loading.value = false;
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatusClass(status: string): string {
  const classes = {
    CONFIRMED: "bg-green-100 text-green-800 border border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border border-red-200",
    RESCHEDULED: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    NO_SHOW: "bg-gray-100 text-gray-800 border border-gray-200",
  };
  return (
    classes[status as keyof typeof classes] ||
    "bg-gray-100 text-gray-800 border border-gray-200"
  );
}

function getStatusBadgeClass(status) {
  const classes = {
    CONFIRMED: "bg-green-500/20 text-green-300 border border-green-400",
    CANCELLED: "bg-red-500/20 text-red-300 border border-red-400",
    RESCHEDULED: "bg-yellow-500/20 text-yellow-300 border border-yellow-400",
    NO_SHOW: "bg-gray-500/20 text-gray-300 border border-gray-400",
  };
  return classes[status] || "bg-gray-500/20 text-gray-300 border border-gray-400";
}

function viewDetails(appointment: Appointment) {
  selectedAppointment.value = appointment;
}
</script>
