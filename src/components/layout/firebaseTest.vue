<template>
  <v-main>
    <v-container class="justify-center align-center">
      <v-btn @click="test">TEST</v-btn>
      <v-btn @click="sampleData">sampleData</v-btn>
      <v-btn @click="getDocData">특정문서가져오기</v-btn>
      <v-btn @click="getQueryDocData">여러문서가져오기</v-btn>
      <v-btn @click="getAllDocData">모든문서가져오기</v-btn>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

@Component
export default class FirebaseTest extends Vue {
  async test() {
    const aaaRef = await doc(getFirestore(), 'test', 'aaa');
    console.log('aaaRef:', aaaRef);
    
    await setDoc(aaaRef, { country: true }, { merge: true });
    
  }
  async sampleData() {
    const citiesRef = collection(getFirestore(), "cities");

    await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"] });
    await setDoc(doc(citiesRef, "LA"), {
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000,
        regions: ["west_coast", "socal"] });
    await setDoc(doc(citiesRef, "DC"), {
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000,
        regions: ["east_coast"] });
    await setDoc(doc(citiesRef, "TOK"), {
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000,
        regions: ["kanto", "honshu"] });
    await setDoc(doc(citiesRef, "BJ"), {
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000,
        regions: ["jingjinji", "hebei"] });
  }
  async getDocData() {
    const docRef = doc(getFirestore(), "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  async getQueryDocData() {
    const q = query(collection(getFirestore(), "cities"), where("capital", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
  async getAllDocData() {
    const querySnapshot = await getDocs(collection(getFirestore(), "cities"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
}

</script>

<style scoped>

</style>