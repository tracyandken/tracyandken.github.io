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
  if (value != "" && value != null) alert(`想${value}嘛? 罐罐遵命!`);

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