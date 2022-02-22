// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBItDXZqrN92UgcokiCBdFLL9pfY1Lxlqw",
  authDomain: "tracyandken-8610a.firebaseapp.com",
  projectId: "tracyandken-8610a",
  storageBucket: "tracyandken-8610a.appspot.com",
  messagingSenderId: "223376251660",
  appId: "1:223376251660:web:65a731eb8e9ab9a8ac0729",
  measurementId: "G-Z39MFM2JLG",
  databaseURL: "https://tracyandken-8610a-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Redeem
function redeem() {
  var value = prompt("想要許什麼願~?");
  if (value != "") alert(`想${value}嘛? 罐罐遵命!`);

  
  // db.ref(`/accounts/Queen`).on('value', function (snapshot) {
  //   if (snapshot.exists()){
  //       var value = prompt("想要許什麼願~?");
  //       if (value != "") {
  //           db.ref(`/accounts/Queen`).push({
  //           event: value,
  //           time: _DateTimezone(8)
  //           });
  //         alert(`罐罐:遵命!`);
  //       }
  //   }
  // });

}