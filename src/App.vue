<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">LOGIN</router-link> |
      <router-link v-if="ISshow" to="/about">个人中心</router-link>
      <span v-if="!ISshow" :class="['flow-wave', 'text']"> 你敢登录吗？</span>
    </div>

    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      showsome: this.showsome,
      hidesome: this.hidesome
    };
  },
  data() {
    return {
      ISshow: false
    };
  },
  methods: {
    showsome() {
      this.ISshow = true;
    },
    hidesome() {
      this.ISshow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.flow-wave {
  background: radial-gradient(
        circle at 10px -7px,
        transparent 8px,
        currentColor 8px,
        currentColor 9px,
        transparent 9px
      )
      repeat-x,
    radial-gradient(
        circle at 10px 27px,
        transparent 8px,
        currentColor 8px,
        currentColor 9px,
        transparent 9px
      )
      repeat-x;
  background-size: 20px 20px;
  background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
}
.flow-wave {
  animation: waveFlow 1s infinite linear;
}
@keyframes waveFlow {
  from {
    background-position-x: -10px, 0;
  }
  to {
    background-position-x: -30px, -20px;
  }
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

.text {
  display: inline-block;
  color: violet;
}
</style>
