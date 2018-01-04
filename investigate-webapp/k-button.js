Vue.component('k-button', {
  template: '\
    <button \
      @click="handleClick" \
      :style="btnStyle" \
      :disabled="disabled"> \
      <slot></slot> \
    </button>',
  props: {
    color: String,
    disabled: Boolean
  },
  data () {
    return {

    }
  },
  computed: {
    btnStyle () {
      if (this.disabled) {
        return {
          color: '#fff',
          'background-color': '#d9d9d9'
        }
      } else {
        if (this.color) {
          return {
            color: '#fff',
            'background-color': this.color
          }
        } else {
          return {
            color: '#fff',
            'background-color': 'rgb(8, 147, 236)'
          }
        }
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('on-click')
    }
  },
  mounted () {
    console.log(this.disabled)
  }
})
