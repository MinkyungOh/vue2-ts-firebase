<template>
  <v-container class="justify-center align-center fill-height">
    <v-btn @click="incr">incr</v-btn>
    <v-btn @click="decr">decr</v-btn>
    <v-chip>{{count}}</v-chip>
    <AuthSign />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import AuthSign from '@/components/auth/sign.vue';
import TestStore from '@/store/test';

@Component({
  components: {
    AuthSign,
  }
})
export default class LayoutAuth extends Vue {
  async test(): Promise<void> {
    console.log(this.$firebase);
    
    const aaaRef = await doc(getFirestore(), 'test', 'aaa');
    console.log('aaaRef:', aaaRef);
    
    await setDoc(aaaRef, { country: true }, { merge: true });
  }

  get count(): number {
    return TestStore.count;
  }

  incr(): void {
    TestStore.incr();
  }

  decr(): void {
    TestStore.decr();
  }
}

</script>

<style scoped>

</style>