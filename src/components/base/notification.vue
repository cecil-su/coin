<template>
  <div class="su-container fixed tc index-iii" v-if="notifications.length">
    <div class="su-notification">
      <div class="su-notification-item" v-for="item in notifications" transition="notification" :class="typeClass(item)">
        <div class="header">{{item.title}}</div>
        <p>{{item.content}}</p>
        <i class="su-notification-item-close" @click="closeItem(item)"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'su-notification',
    computed: {
      notifications () {
        return this.$root.su_notification
      }
    },
    methods: {
      typeClass (item) {
        if (!item.type) {
          return {
            'default': true
          }
        }
        let classList = {}
        classList[item.type] = true
        return classList
      },
      closeItem (item) {
        this.notifications.$remove(item)
      }
    }
  }
</script>