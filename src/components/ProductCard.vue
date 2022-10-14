<template>
  <div class="card !pt-0 !px-0">
    <div class="card-header mb-5">
      <div class="h-40 2xl:h-64">
        <img :src="product.thumbnail" alt="" class="h-full w-full object-cover object-center">
      </div>
      <div class="card__category">{{ product.category }}</div>
    </div>
    <div class="card-body px-6">
      <p class="card-title">{{ product.title }}</p>
      <p class="text-[22px] line-clamp-2 mb-5">{{ product.description }}</p>
      <p class="font-poppins text-[26px] font-semibold">${{ discount(product).toFixed(2) }}</p>
      <div class="w-full flex items-center gap-2 mb-[18px]">
        <span class="bg-red-100 text-red-500 rounded-[4px] p-[5px]">{{ product.discountPercentage }}%</span>
        <span class="text-gray-400 line-through">${{ product.price }}</span>
      </div>
      <p class="text-yellow-400">
        <i class="pi pi-star-fill"></i> {{ product.rating }}
      </p>
    </div>
    <div class="card-footer px-6 mt-9">
      <div v-if="productTotal" class="flex justify-center items-center gap-3 mt-[46px]">
        <button class="btn btn-primary" @click="removeFromCart()">
          <i class="pi pi-minus"></i>
        </button>
           {{ productTotal }}
        <button class="btn btn-primary" @click="addToCart()">
          <i class="pi pi-plus"></i>
        </button>
      </div>
      <button v-else class="btn btn-primary btn-fluid" @click="addToCart()">
        <i class="pi pi-shopping-cart"></i>
        Add To Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    discount(product) {
      return product.price - (product.price * (product.discountPercentage)/100)
    },
    addToCart() {
      this.$store.dispatch('addProductToCart', {
        product: this.product
      })
    },
    removeFromCart() {
      this.$store.dispatch('removeProductFromCart', {
        product: this.product
      })
    }
  },
  computed: {
    productTotal() {
      const item = this.$store.state.cart.find(i => i.product.id === this.product.id)

      if(item) return item.quantity
      else return null
    }
  }
}
</script>