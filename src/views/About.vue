<template>
  <div class="about">
    <personal-center></personal-center>
  </div>
</template>

<script>
// @ is an alias to /src

import PersonalCenter from "@/components/about/PersonalCenter.vue";

export default {
  name: "about",
  data() {
    return {};
  },
  components: {
    PersonalCenter
  }
};
</script>
