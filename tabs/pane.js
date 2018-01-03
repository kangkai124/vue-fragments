Vue.component('pane', {
  template: '\
    <div class="pane"> \
      <slot></slot> \
    </div>',
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      show: true
    }
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  },
  watch: {
    label () {
      this.updateNav()
    }
  },
  mounted() {
     this.updateNav()
  }
})
