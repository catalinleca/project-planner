import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyDLjoaU9S17STr3CpdYbTAi3p34A5wWVjs",
    authDomain: "tracker-d183f.firebaseapp.com",
    databaseURL: "https://tracker-d183f.firebaseio.com",
    projectId: "tracker-d183f",
    storageBucket: "tracker-d183f.appspot.com",
    messagingSenderId: "589668992589",
    appId: "1:589668992589:web:bc525fbed8c9615e"
};

export const userConfig = {
    enableLogging: false,
    useFirestoreForProfile: true,
    userProfile: 'users',
    attachAuthIsReady: true
}

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;

// const app = firebase.initializeApp(firebaseConfig);
// const base = Rebase.createClass(app.database());
//
// export { base };
