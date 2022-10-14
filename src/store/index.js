import { createStore } from "vuex"
import axios from "axios"

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

const store = createStore({
  state: {
    products: { data: {} },
    cart: []
  },
  getters: {
    cartTotalPrice: (state) => {
      let total = 0;

      state.cart.forEach(item => {
        total += (item.product.price - (item.product.price * (item.product.discountPercentage)/100)) * item.quantity
      })

      return total.toFixed(2)
    }
  },
  actions: {
    getProducts({ commit }) {
      return axios("https://dummyjson.com/products")
        .then(({ data }) => {
          commit('getProducts', data)
          return data
        })
    },
    addProductToCart({ commit }, { product, quantity }) {
      commit('addToCart', { product, quantity })
    },
    removeProductFromCart({ commit }, { product, quantity }) {
      commit('removeFromCart', { product, quantity })
    }
  },
  mutations: {
    getProducts: (state, productsData) => {
      state.products.data = productsData.products
    },
    addToCart: (state, { product, quantity }) => {

      let productInCart = state.cart.find(item => {
        return item.product.id === product.id
      })

      if (productInCart) {
        productInCart.quantity++
      } else {
        state.cart.push({
          product,
          quantity: 1
        })
      }

      updateLocalStorage(state.cart)
    },
    removeFromCart: (state, { product }) => {
      let productInCart = state.cart.find(item => {
        return item.product.id === product.id
      })

      if (productInCart) {
        if (productInCart.quantity > 1) {
          productInCart.quantity--
        } else {
          state.cart = state.cart.filter( item => item.product.id !== product.id )
        }
      }

      updateLocalStorage(state.cart)
    },
    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem('cart')
      if (cart) {
        state.cart = JSON.parse(cart)
      }
    }
  },
  modules:{}
})

export default store