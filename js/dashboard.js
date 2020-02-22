'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const Tasks = Promise.resolve();
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        //console.log(reader.result)
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.firestore()
                    .collection('curriculum-vitae')
                    .doc(user.uid)
                    .set({
                        cv: reader.result,
                        time_stamp: new Date().toLocaleString()
                    })
                    .then(() => swal("Confirmation", "Your CV has been submitted!", "success"))
                    .then(() =>{
                        location.reload();
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                location.replace("/")
            }
        })
    })

    const readProfileData = Promise.resolve();
    Tasks
        .then(() => {
            const profile = document.getElementById('profile').innerHTML
            const placeholder = document.getElementById('placeholder')
            const cProfile = Handlebars.compile(profile)
            firebase.auth().onAuthStateChanged((user) => {
                placeholder.innerHTML = cProfile(user)
            })
        })

    function Tasks_Upload(next) {
        document.querySelectorAll('form')[0]
            .addEventListener('submit', function (sender) {
                next(sender.target.cv.files[0])
                if (sender.target.cv.files[0].size < 551850) {
                    reader.readAsDataURL(sender.target.cv.files[0])
                } else {
                    swal("Error", "Error file too large upload only CV no Qualifications", "error")
                }
            })

        document.getElementById('logout').addEventListener('click', (sender) => {
            if (sender.target.dataset.logout) {
                firebase.auth().signOut()
            }
        })
    }




    readProfileData
        .then(() => {
            firebase.auth().onAuthStateChanged(function (user) {
                if (!user) {
                    location.replace("/")
                } else {

                    const currentUserProfile = Promise.resolve(user)
                    currentUserProfile
                        .then((user) => {
                            const docRef = firebase.firestore().collection('curriculum-vitae').doc(user.uid);
                            docRef.get().then((doc) => {
                                if (doc.exists) {
                                    document.getElementById('file-info').innerHTML = `
                                        <a href="${doc.data().cv}" class="btn-lg btn btn-success"> Download CV </a>
                                        <br>
                                        Last updated: <small> ${doc.data().time_stamp} </small>
                                        `;
                                    
                                }
                                Tasks_Upload((res) => console.log(res))
                            }).catch((error) => {
                                console.log(error)
                            })

                        })
                }
            })
        })














})

