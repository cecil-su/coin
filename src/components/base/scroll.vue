<template>
  <div class="su-scroll">
    <slot></slot>
    <div class="flex center" v-if="showMes" style="line-height: 50px;">loading...</div>
  </div>
</template>

<script>
  export default {
    name: 'su-scroll',
    props: {
      update: {
        type: Function
      },
      showMes: false,
      id: {
        type: Number,
        default: 1
      },
      samePage: {
        type: Boolean,
        default: false
      },
      allLoaded: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scrollEventTarget: null,
        bottomReached: false
      }
    },
    methods: {
      init () {
        this.scrollEventTarget = this.getScrollEventTarget(this.$el)
        this.fillContainer()
      },
      getScrollEventTarget (element) {
        let currentNode = element
        while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
          let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
          if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode
          }
          currentNode = currentNode.parentNode
        }
        return window
      },
      getScrollTop (element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
        } else {
          return element.scrollTop
        }
      },
      fillContainer () {
        this.$nextTick(() => {
          this.scrollEventTarget.addEventListener('scroll', this.scrollListener)
        })
      },
      checkBottomReached () {
        if (this.scrollEventTarget === window) {
          return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight
        } else {
          return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1
        }
      },
      scrollListener () {
        if (this.$parent.$parent.active !== undefined) {
          if (this.id === this.$parent.$parent.active + 1) {
            this.samePage = true
          } else {
            this.samePage = false
          }
        } else {
          this.samePage = true
        }
        // this.showMes = true
        this.bottomReached = this.checkBottomReached()
        // console.log(this.id, this.samePage)
        if (window.localStorage.getItem('LOAD_PAGE-' + this.id) === null) {
          window.localStorage.setItem('LOAD_PAGE-' + this.id, 2)
        }
        if (this.bottomReached && !this.allLoaded && typeof this.update === 'function' && this.samePage) {
          this.update()
        }
      },
      unbind () {
        window.localStorage.removeItem('LOAD_PAGE-' + this.id)
        this.scrollEventTarget.removeEventListener('scroll', this.scrollListener)
      }
    },
    ready () {
      this.init()
      window.localStorage.removeItem('LOAD_PAGE-' + this.id)
    },
    beforeDestroy () {
      this.unbind()
    }
  }
</script>