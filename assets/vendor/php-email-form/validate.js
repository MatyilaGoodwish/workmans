jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.php-email-form').submit(function(e) {
    //console.log(e.target)

      const createUser = (createUserAccount) =>{
        firebase.auth()
        .createUserWithEmailAndPassword(e.target.email.value, btoa(e.target.email.value))
          .then((user)=>{
            swal("Your message has been received!");
          }).catch((error)=>{
            console.log(error)
          })
      };

      const checkErrorCode = (code) =>{
        if(code === "auth/wrong-password"){
          swal("We already have your file opened with our administrators");
        }else if(code === "auth/user-not-found") {
          createUser(code);
        }
      };


      firebase.auth()
        .signInWithEmailAndPassword(e.target.email.value, btoa(e.target.email.value))
          .then((user)=>{
            swal("We already have your file stored opened with our administrators");
          })
          .catch((error)=>{
            checkErrorCode(error.code,);
        })
  })

});
