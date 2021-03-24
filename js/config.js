var firebaseConfig = { //firebase SDK configuration.
    apiKey: "AIzaSyDfaJsUIZXdni_R4Tcw_cu1Q6oA8h1EuVg",
    authDomain: "internettechnique-2021.firebaseapp.com",
    projectId: "internettechnique-2021",
    storageBucket: "internettechnique-2021.appspot.com",
    messagingSenderId: "269839795109",
    appId: "1:269839795109:web:6a7ebf494d625ac859de4c"
  };
  firebase.initializeApp(firebaseConfig);//instantiating firebase SDK.
  const myAuth = firebase.auth(); //defining firebase Authentication.