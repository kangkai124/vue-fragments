Vue.component('tabs', {
  template: '\
    <div class="tabs"> \
      <div class="tabs-bar"> \
        <div \
          :class="tabCls(item)" \
          v-for="(item, index) in navList" \
          @click="handleChange(index)"> \
          {{ item.label }} \
          <span v-if="item.closable"> \
            x \
          </span> \
        </div> \
      </div> \
      <div class="tabs-content"> \
        <slot></slot> \
      </div> \
    </div>',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data: function () {
    return {
      navList: [],
      currentValue: this.value
    }
  },
  mounted() {
    console.log(this.value)
  },
  methods: {
    getTabs () {
      return this.$children.filter(function (item) {
        return item.$options.name === 'pane'
      })
    },
    updateNav () {
      this.navList = []
      var _this = this
      this.getTabs().forEach(function (pane, index) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index,
          closable: pane.closable
        })
        if (!pane.name) { pane.name = index }
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus () {
      var tabs = this.getTabs()
      var _this = this
      tabs.forEach(function (tab) {
        return tab.show = tab.name === _this.currentValue
      })
    },
    tabCls (item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    handleChange (index) {
      var nav = this.navList[index]
      var name = nav.name
      this.currentValue = name
      // 更新 value
      this.$emit('input', name)
      // 触发一个自定义事件，供父级使用
      this.$emit('on-click', name)
    }
  },
  watch: {
    value (val) {
      this.currentValue = value
    },
    currentValue () {
      this.updateStatus()
    }
  }
})
