<template>
<v-app>
  <v-main>
    <LayoutNormal v-if="isAuth" />
    <LayoutAuth v-else />
  </v-main>
  <!-- <hr>
  <FirebaseTest /> -->
  <v-main>
    <v-container class="justify-center align-center" fill-height>
      <ModelTest />
    </v-container>
  </v-main>
</v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LayoutNormal from '@/components/layout/normal.vue';
import LayoutAuth from '@/components/layout/auth.vue';
// import FirebaseTest from '@/components/layout/firebaseTest.vue';
//import ModelTest from '@/components/test/model.vue';

@Component({
  components: {
    LayoutNormal,
    LayoutAuth,
    // FirebaseTest,
    //ModelTest,
  }
})
export default class App extends Vue {
  isAuth = false
}
</script>


<style lang="scss">
</style>
