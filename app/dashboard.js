firebase.auth()
    .onAuthStateChanged((user)=>{
        if(!user){
            location.replace('index.php');
        }
    })

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('logout')
    .addEventListener('click', (e)=>{
        firebase.auth().signOut();
    })
})
