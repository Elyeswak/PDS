<template>
  <section class="w-full bg-[#f5f5f5] py-20 px-8 md:px-16 lg:px-24">
    <div class="container mx-auto max-w-[1920px]">
      <!-- Header -->
      <div class="flex flex-col items-center mb-16">
        <div class="flex items-center gap-3 mb-4">
          <div class="flex flex-col gap-1 items-end">
            <div class="w-12 h-0.5 bg-[#ff4500]"></div>
            <div class="w-8 h-0.5 bg-[#ff4500]"></div>
          </div>
          <span class="font-bold text-[#ff4500] text-sm tracking-wider uppercase">
            POPULAR PRODUCTS
          </span>
          <div class="flex flex-col gap-1 items-start">
            <div class="w-12 h-0.5 bg-[#ff4500]"></div>
            <div class="w-8 h-0.5 bg-[#ff4500]"></div>
          </div>
        </div>
        <h2 class="font-bold text-black text-5xl tracking-tight">
          Browse Our Products
        </h2>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="flex flex-col"
        >
          <!-- Product Image -->
          <div class="bg-gray-200 rounded-lg px-12 py-8 mb-6 flex items-center justify-center h-64">
            <img
              :src="product.image"
              :alt="product.name"
              class="max-w-full max-h-full object-contain"
            />
          </div>

          <!-- Product Info -->
          <div class="flex flex-col items-center">
            <!-- Star Rating -->
            <div class="flex gap-1 mb-3">
              <span
                v-for="star in 5"
                :key="star"
                class="text-xl"
                :class="star <= product.rating ? 'text-[#ffa500]' : 'text-gray-300'"
              >
                ★
              </span>
            </div>

            <!-- Product Name -->
            <h3 class="font-semibold text-black text-xl mb-2 text-center">
              {{ product.name }}
            </h3>

            <!-- Price -->
            <p class="font-semibold text-gray-700 text-lg">
              ${{ product.price.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Product {
  name: string;
  price: number;
  rating: number;
  image: string;
}

const products: Product[] = [
  {
    name: "Body Spring",
    price: 29.00,
    rating: 4,
    image: "/images/products/body-spring.png",
  },
  {
    name: "Brake pad",
    price: 59.00,
    rating: 5,
    image: "/images/products/brake-pad.png",
  },
  {
    name: "Brake pad-1",
    price: 45.00,
    rating: 5,
    image: "/images/products/brake-pad-1.png",
  },
  {
    name: "Absorber Air",
    price: 99.00,
    rating: 5,
    image: "/images/products/absorber-air.png",
  },
];
</script>