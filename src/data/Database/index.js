import { firebase } from "@react-native-firebase/database";

const fireDb = firebase
  .app()
  .database('https://rnfirebasedemo-739b2-default-rtdb.asia-southeast1.firebasedatabase.app/')

export default fireDb