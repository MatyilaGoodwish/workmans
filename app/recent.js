(function(){

    const getCurrentUserApplications = (user) =>{
        const recentApplication = firebase.firestore()
        .collection('recent-applications')
        .doc(user.uid);

        recentApplication.get()
        .then((doc)=>{
            if(doc.exists){
                const renderTemplate = Handlebars.compile(`
                 <div class="row">
                    <div class="col-md-6 p-2">
                        <h4> Date </h4>
                       <p>  {{ timestamp }} </p>
                    </div>
                    <div class="col-md-6 p-2">
                        <h4>Position </h4>
                        <p> {{ recent }} </p>
                    </div>
                 </div>
                      
                `);
                document.getElementById('recent-applications').innerHTML = renderTemplate(doc.data());
            }else{
                document.getElementById('recent-applications').innerHTML = `
                    <span class="alert alert-warning">
                        You do not have recent applications, <a href="jobs.php"> Apply Now </a>
                    </span>
                `;
            }
        })
    }

    firebase.auth()
    .onAuthStateChanged((user)=>{
        if(user){
            getCurrentUserApplications(user);
        }else{
            document.getElementById('recent-applications').innerHTML = "";
        }
    })

}())