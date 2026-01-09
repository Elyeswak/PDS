<template>
  <GenericHeader />
  <div id="home">
    <GenericHero />
  </div>
  <div id="services">
    <GenericServices />
  </div>
  <div id="about">
    <GenericAbout />
    <GenericCTA />
    <GenericExperts />
    <GenericAboutUsSection />
  </div>
  <div id="products">
    <GenericProducts />
  </div>
  <div id="pricing">
    <GenericPricing />
  </div>
  <div id="why-us">
    <GenericWhyUs />
  </div>
  <div id="book">
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
  </div>
  <div id="testimonial">
    <GenericTestomanials />
  </div>
  <div id="contact">
    <GenericContactSection />
  </div>
  <GenericFooter />
</template>
