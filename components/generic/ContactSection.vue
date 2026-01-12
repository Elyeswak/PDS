<template>
  <section class="w-full relative py-12 lg:py-20">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div class="flex flex-col">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-[30px] h-0.5 bg-[#eb3300]" />
            <span class="font-bold text-[#eb3300] text-sm tracking-[0] leading-3.5">
              CONTACT US
            </span>
            <div class="w-5 h-0.5 bg-[#eb3300]" />
          </div>

          <h2 class="font-bold text-neutral-950 text-4xl lg:text-5xl tracking-[0] leading-[1.2] mb-6">
            Get In Touch
          </h2>

          <p class="font-normal text-[#4b4b4b] text-base tracking-[0] leading-7 mb-8 lg:mb-12">
            is a phrase used to encourage communication, often between
            <br />
            individuals or businesses, to connect or resolve issues.
          </p>

          <div class="flex flex-col gap-6 lg:gap-8 mb-8 lg:mb-12">
            <div
              v-for="(item, index) in contactItems"
              :key="index"
              class="flex items-center gap-4 lg:gap-5"
            >
              <div class="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] flex items-center justify-center bg-[#eb33001a] rounded-[35px] flex-shrink-0">
                <component :is="item.icon" class="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] text-[#eb3300]" />
              </div>
              <div class="flex flex-col">
                <span class="font-normal text-[#787878] text-sm lg:text-base tracking-[0] leading-[26px]">
                  {{ item.label }}
                </span>
                <span class="font-normal text-black text-base lg:text-lg tracking-[0] leading-7">
                  {{ item.value }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col pt-6 lg:pt-8 border-t border-[#d2d2d280]">
            <div class="flex items-center gap-4 lg:gap-6">
              <span class="font-bold text-black text-lg lg:text-xl tracking-[0] leading-[30px]">
                Follow Us
              </span>
              <button
                v-for="(social, index) in socialLinks"
                :key="index"
                class="w-10 h-10 lg:w-[45px] lg:h-[45px] flex items-center justify-center bg-[#f6f7f9] rounded-[22.5px] hover:bg-[#eb3300] hover:text-white transition-colors"
                :aria-label="social.label"
              >
                <component :is="social.icon" class="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        <div class="bg-[#f3f3f3] p-8 lg:p-12 flex flex-col rounded-lg">
          <h3 class="font-bold text-neutral-950 text-2xl lg:text-3xl tracking-[0] leading-tight mb-6 lg:mb-8">
            Send A Massage
          </h3>

          <form class="flex flex-col gap-6 lg:gap-[30px]" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-[30px]">
              <div class="relative">
                <User class="absolute left-[18px] lg:left-[22px] top-1/2 -translate-y-1/2 w-3.5 h-4 text-[#4b4b4b]" />
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Name"
                  class="w-full h-[50px] lg:h-[54px] bg-white border-0 pl-10 lg:pl-[45px] rounded font-normal text-[#4b4b4b] text-base px-3"
                />
              </div>
              <div class="relative">
                <Mail class="absolute left-[18px] lg:left-[22px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b4b4b]" />
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="Email Address"
                  class="w-full h-[50px] lg:h-[54px] bg-white border-0 pl-10 lg:pl-[45px] rounded font-normal text-[#4b4b4b] text-base px-3"
                />
              </div>
            </div>

            <div class="relative">
              <User class="absolute left-[18px] lg:left-[22px] top-1/2 -translate-y-1/2 w-3.5 h-4 text-[#4b4b4b] z-10" />
              <select
                v-model="formData.selected"
                class="w-full h-[50px] lg:h-14 bg-white border-0 pl-10 lg:pl-[45px] rounded font-normal text-[#4b4b4b] text-base px-3 appearance-none"
              >
                <option value="" disabled>Select</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div class="relative">
              <MessageSquare class="absolute left-[18px] lg:left-[22px] top-[17px] w-4 h-4 text-[#4b4b4b] z-10" />
              <textarea
                v-model="formData.message"
                placeholder="Massage"
                class="w-full min-h-[130px] lg:min-h-[148px] bg-white border-0 pl-[40px] lg:pl-[45px] pt-3 rounded font-normal text-[#4b4b4b] text-base resize-none px-3"
              />
            </div>

            <div class="flex justify-center">
              <button
                type="submit"
                class="w-[170px] lg:w-[193px] h-[55px] lg:h-[60px] bg-[#eb3300] hover:bg-[#d42e00] text-white font-normal text-base tracking-[0] leading-[26px] flex items-center justify-center"
              >
                SUBMIT NOW
                <ArrowRight class="ml-2 w-3.5 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Twitter,
  User,
} from 'lucide-vue-next';

const contactItems = [
  {
    icon: Phone,
    label: "PhoneIcon Call",
    value: "+123 (907) 555-101",
  },
  {
    icon: Mail,
    label: "Email drop Us",
    value: "needhelprepair@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Inglewood, Maine 98380",
  },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
];

const formData = ref({
  name: '',
  email: '',
  selected: '',
  message: '',
});

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
};
</script>