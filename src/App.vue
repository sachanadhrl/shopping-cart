<template>
  <div class="w-full h-16 bg-primary flex justify-center items-center">
    <h3 class="text-2xl text-white font-bold">Shoping Cart App</h3>
  </div>
  <div class="flex gap-16 py-14 px-5">
    <div class="w-4/5 h-screen grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 items-stretch gap-10">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div class="w-1/3 h-screen">
      <div class="card !px-[42px]">
        <h2 class="font-poppins text-[22px] font-semibold mb-10">Shopping Cart</h2>
        <table class="table-auto w-full text-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>QTY</th>
              <th>Price</th>
              <th>Sub total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carts" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ discount(item).toFixed(2) }}</td>
              <td>{{ item.quantity*discount(item).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>

        <hr class="my-12">

        <div class="flex justify-between mb-16">
          <p class="text-gray-400 text-lg">Total</p>
          <p class="text-xl font-semibold">{{ totalPrice }}</p>
        </div>

        <button class="btn btn-primary btn-fluid">
          <i class="pi pi-shopping-cart"></i>
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import store from './store'
import ProductCard from './components/ProductCard.vue'

const products = computed(() => store.state.products.data)
store.dispatch('getProducts')

function discount(item) {
  return item.product.price - (item.product.price * (item.product.discountPercentage)/100)
}

const carts = computed(() => store.state.cart)

const totalPrice = computed(() => store.getters.cartTotalPrice)

store.commit('updateCartFromLocalStorage')

</script>