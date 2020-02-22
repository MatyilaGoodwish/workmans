'use strict';
class Subscriber{
    constructor(){
        this.reader = new FileReader();
    }
    subscribe(student){
        let docRef = student.cv.files[0];
        let email = student.email.value;
        let first = student.firstname.value;
        let last = student.lastname.value;
        this.reader.addEventListener('load', function(e){
            emailjs.send("gmail", "sevtrio", {"name":first,"email":email,"lastname":last})
            .then(function(response) {
                swal("Congratulations", "We will be intouch!" ,"success");
             }, function(error) {
                swal("Oops", "Please try again later" ,"error");
             });
        });
       
        if(docRef.type === "application/pdf" && docRef.size < 5000000 ){
            this.reader.readAsDataURL(docRef);
        }else{
            console.error(docRef.type)
        }
    }
}
const Subscriptions = new Subscriber();
