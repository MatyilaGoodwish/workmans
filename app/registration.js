const content = document.getElementById('placeholder');
const registration_view = Handlebars.compile(document.getElementById('employee-view').innerHTML);
//render view
content.innerHTML = registration_view(firebase.auth().currentUser);

//populate user profile
firebase.auth()
    .onAuthStateChanged((user) => {
        const candidatesRef = firebase.firestore().collection('candidates').doc(user.uid);
        candidatesRef.get().then((doc) => {
            if (doc.exists) {
                content.innerHTML = registration_view({
                    data: doc.data(),
                    user: user
                })
            }
        });
    })


 