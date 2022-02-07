<template>
  <v-card>
    <v-card-title>model test</v-card-title>
    <v-card-text>
      <v-text-field v-model="name" label="name"></v-text-field>
      <v-textarea v-model="text" auto-grow></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="read">read</v-btn>
      <v-btn @click="write">write</v-btn>
      <v-btn @click="update">update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { User, userConverter } from '@/models/users';

@Component
export default class ModelTest extends Vue {
  name = '';
  text = '';
  
  async read() {
    const docRef = doc(collection(getFirestore(), "users").withConverter(userConverter), "u1");
    const docSnap = await getDoc(docRef);

    this.text = docSnap.exists()? JSON.stringify(docSnap.data(), null, 2): '';
  }
  async write() {
    const date = new Date();
    const user = new User(this.name, date, date);

    await setDoc(doc(collection(getFirestore(), "users").withConverter(userConverter), "u1"), user);
    await this.read();
  }
  async update() {
    const user = {name: this.name, updatedAt:  new Date()};

    await updateDoc(doc(collection(getFirestore(), "users").withConverter(userConverter), "u1"), user);
    await this.read();
  }
}
</script>

<style scoped>

</style>