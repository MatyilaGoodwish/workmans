(function(){
    const ctx = document.getElementById("registrations").getContext("2d");

    const cv = document.getElementById("curriculum").getContext("2d");

    const estimateUsers = (userCount)=>{
        const chart_users = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: ['January', 'February'],
                datasets: [{
                    label: 'Recent Job Applicants',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [userCount /2, userCount]
                }]
            },
        
            // Configuration options go here
            options: {}
        });
    }

    const estimateCurriculumVitae = (userCount)=>{
        const chart_cv = new Chart(cv, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: ['January', 'February'],
                datasets: [{
                    label: 'CV Captured by Employers',
                    backgroundColor: 'rgb(255, 11, 11)',
                    borderColor: 'rgb(255, 11, 11)',
                    data: [userCount /2, userCount]
                }]
            },
        
            // Configuration options go here
            options: {}
        });
    }

    const getUserContext = (user) =>{
        //register user estimations
        const docRef = firebase.firestore()
        .collection('candidates');

        docRef.get()
        .then((snapShot)=>{
            estimateUsers(snapShot.size)
        })


        //render user profiles
        const docRef_cv = firebase.firestore()
        .collection('curriculum-vitae');

        docRef_cv.get()
        .then((snapShot)=>{
            estimateCurriculumVitae(snapShot.size)
        })

    }

    firebase.auth()
    .onAuthStateChanged((user)=>{
        if(user){
            document.getElementById("charting").style.display = "";
            getUserContext(user);
        }else{
            document.getElementById("charting").style.display = "none";
        }
    })

}())