app.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: 
    /*html*/
    `<div class="product-display">
      <div class="product-container">
      <div class="row">
      <div class="col-1"></div>
      <div class="col-5">
        <div class="product-image">
          <img v-bind:src="image">
        </div>
        </div>
       
        <div class="col-6">
        <div class="product-info">
          <h1>{{ title }}</h1>
 
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
  
          <p>Shipping: {{ shipping }}</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
          <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)" 
          class="color-circle" 
          :style="{ backgroundColor: variant.color }">
        </div>
        <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            v-on:click="addToCart">
            Add to Cart
          </button>
</div>
</div>
</div>
</div>


        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
      return {
          product: 'STARWARS',
          brand: 'LEGO',
          selectedVariant: 0,
          details: ['Condition: NEW', 'Brand: LEGO', 'Build Your Empire'],
          variants: [
            { id: 2234, color: 'red', image: './assets/images/vader.jpg', quantity: 50 },
            { id: 2235, color: 'green', image: './assets/images/boba.jpg', quantity: 50 },
            { id: 2236, color: 'grey', image: './assets/images/storm.jpg', quantity: 50 },
        ],
          
          reviews: []
      }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
          this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
          if (this.premium) {
            return 'Free'
          }
          return 2.99
        }
    }
  })