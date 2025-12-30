<template>
<GenericHeader />
<GenericHero />
<GenericServices />
<GenericAbout />
<GenericCTA />
<GenericExperts />
<GenericAboutUsSection />
<GenericProducts/>
<GenericPricing />
<GenericWhyUs />
  <GenericBook calLink="test145/car">
    <template #title>Schedule Your Appointment</template>

    <template #description>
      Book a consultation with our team at a time that suits you.
    </template>

    <template #cta>
      <button
        class="w-fit rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white hover:bg-orange-600"
      >
        Get a Quote
      </button>
    </template>
  </GenericBook>
<GenericTestomanials />
<!-- <HomeBlogSection/> -->
<GenericContactSection />
<GenericFooter />
</template>