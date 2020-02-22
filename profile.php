<?php
	$title = "Application Form | Work Placements";
	$description = "Apply today to increase the chances of getting employment";
?>

<?php require_once("templates/header.php") ?>
 
<div id="placeholder" class="my-4"><div>

<script>
    firebase.auth()
    .onAuthStateChanged((user)=>{
        if(!user){
            location.replace("/")
        }
    })
    function Profile(form){
        firebase.auth()
            .onAuthStateChanged(function(user) {
                console.log(form.lastname.value)
                firebase.firestore().collection('candidates').doc(user.uid)
                    .set({
                        firstname: form.firstname.value || "",
                        lastname: form.lastname.value || "",
                        qualification: form.qualification.value || "",
                        address: {
                            no: form.no.value || "",
                            street: form.street.value || "",
                            city: form.city.value || "",
                            postal: form.postal.value || ""
                        },
                        contact: {
                            phone: form.phone.value || ""
                        }
                    })
                    .then(() => {
                        swal("Confirmation", "Your details have been captured", "success");
                    })
                    .catch((error) => {
                        console.warn(error)
                    })
            })
    }
</script>

<script id="employee-view" type="text/x-handlebars-template">
    <div class="container my-4">
        <div class="row">
            <div class="col-md-3">
                <a href="myaccount.php" class="btn btn-danger btn-lg">Back</a>
            </div>
            <div class="col-md-6 py-4">
                <h1>My Profile</h1>
                <span>{{user.displayName}} keep your profile updated.</span>
                <div class="my-5 border-top"></div>
                <form action="javascript:Profile(this.employee)" method="POST" id="employee">
                
                <h4 class="h4 my-1">Personal Details</h4>
                <br>
               
                <label for="firstname">First Name</label>
                    <p>
                    <input type="text" value="{{data.firstname}}" required name="firstname" placeholder="First Name" class="form-control">
                    </p>
                <label for="firstname">Last Name</label>

               

                <p>
                    <input type="text" value="{{data.lastname}}" required name="lastname" placeholder="Last Name"  class="form-control">
                </p>
                <label for="qualification">Qualification</label>
                <p>
                    <input required value="{{data.qualification}}" name="qualification" id="qualification" name="wp_qualification" class="form-control">
                </p>

                <h4 class="h4">Postal Address</h4>
                 <br>
                <p>
                    <input type="text" required placeholder="Address Line 1" class="form-control" name="no" value="{{data.address.no}}">
                </p>
                <p>
                    <input type="text" required placeholder="Street Name" class="form-control" name="street" value="{{data.address.street}}">
                </p>
                <p>
                    <input type="text" required placeholder="City" class="form-control" name="city" value="{{data.address.city}}">
                </p>
                <p>
                    <input type="number" required placeholder="Postal Code" class="form-control" name="postal" value="{{data.address.postal}}">
                </p>
                <h4 class="h4">Contact Details</h4>
                <br>
                <label for="email">Registered Email</label>
                    <p>
                    <input type="email" readonly value="{{user.email}}" required name="email" placeholder="email" class="form-control">
                    </p>
                    <label for="phone">Phone Number</label>
                 <p>
                    <input type="text" placeholder="Phone Number" value="{{data.contact.phone}}" name="phone" class="form-control" required>
                 </p>
                <div class="my-5 border-bottom"></div>
                 <p>
                    <button type="submit" class="btn btn-info btn-lg">Update</button>
                 </p>

                
               </form>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</script>



<script src="app/registration.js"></script>


<?php require_once("templates/footer.php"); ?>
	