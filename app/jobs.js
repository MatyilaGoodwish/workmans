(function(){

    const render_template = `
    {{#each posts}}
       <div class="card" style="{{> customStyle }}">
           <div class="card-header">
               <div class="card-title">
                   <h2> {{title}} </h2>
               </div>
           </div>
           <div class="card-body">
               <h3>{{salary}}</h3>
               {{{description}}}
           </div>
           <div class="card-footer">
               {{> getDescription }}
           </div>
       </div>
   {{/each}}
   `;
   
   Handlebars.registerPartial("customStyle", `
       box-shadow: 1px silver; margin-top: 10px; 
   
   `);
   
   Handlebars.registerPartial("getDescription", `
       <button data-job="{{title}}" class="btn btn-success btn-block btn-lg" > Send Application </button>
   `);
   
   const content = document.getElementById('content');
   const view_source = Handlebars.compile(render_template);
   content.innerHTML = view_source({
       posts: [
           {
               title: "Administrative Assistant",
               salary: "R7 500-R8 500 PM",
               description: "Our client, a well known garden equipment manufacturer and distributor seeks the services of an Administrative Assistant. The qualifying candidate will be well spoken, polite, driven, and a team player."
           }, 
           {
               title: "HR Administration",
               salary: "R200 000-R250 000 PA",
               description: "A Prestigious Law Firm in Sandton is looking for a HR Administrator to join their Dynamic Team."
           },
           {
               title: "Receptionist",
               salary: "R8 500 a month",
               description: "An awardwinning, industryleading marketing agency is looking to hire a Receptionist to join their team In Joburg If you have a background in Marketing, Events or Advertising and looking for a break into the industry, this is a perfect opportunity for you"
           },
           {
               title: "Receptionist – Hotel",
               salary: "R9 500 a month",
               description: "Our client has a vacancy for a new front office receptionist located at their Hotel. Each front office team member is required to deliver quality customer service by identifying and satisfying customer expectations, and to possess excellent communication and interpersonal skills. Team members are required to be committed to continuous improvement and best practice in services and experiences to enhance visitation and ensure repeat business. Duties include managing the front desk, welcoming guests, checking in and check out of guests, ensure assisting in the effective delivery of all services, Update customer relationship management system, assist with events, fulfill all reception & admin duties and other duties as required by management."
           },
           {
               title: "Restaurant Manager",
               salary: "R9 000-R12 000 PM",
               description: "We require restaurant management staff that are passionate, prepared to evolve with the times and become actively involved in all aspects of working in the restaurant environment..Minimum 3 yrs experience in a busy restaurant management position"
           },
           {
               title: "Administration Clerk",
               salary: "R17 750 a month",
               description: "Typical duties and responsibilities include, but are not limited to: screening telephone calls, enquiries and requests, and handling them when appropriate;meeting and greeting visitors at all levels of seniority;dealing with incoming email, faxes and post,liaising with Head Office, Principals, Secretaries, clients, suppliers and other staff;A clear criminal record is essentialPersonal commitment to Christian education and a willingness to contribute to the values and ethos of the School is essential"
           },
           {
               title: "Senior Property Manager",
               salary: "R55 000 a month",
               description: `This fast-growing and dynamic property management company offers a senior commercial property manager an excellent opportunity to grow and advance.
   
               It is a requirement of this position that the Property Manager should attend to all aspects of administrative, financial and operational activities arising in respect of the properties under management.`
           },
           {
               title: "Admin Assistant/Girl Friday",
               salary: "R7 000 - R8 000 PM",
               description: `
               Beneficial:<BR>
               <ul>
                   <li>Live in centurion</li>
                   <li>Have IT knowledge</li>
                   <li>Can work on the cloud and understand the cloud</li>
                   <li>Can work on wave accounting</li>
                   <li>Punctual and positive energy</li>
                   <li>Like to implement systems and like order</li>
         
               </ul>
     `
           },
           {
               title: "Store Manager",
               salary: "R30 000 - R40 000 PM",
               description: `Our client is looking for a Store Manager who will be responsible for maintaining customer service, take control of the entire operation and will take responsibility of all tasks and duties in his own portfolio as well accountability of all duties of immediate subordinates.`
           },
           {
               title: "Skin Care Clinic Store/Admin Manager",
               salary: `R15 000 - R20 000 PM`,
               description: `To manage the Skin Care Centre and its staff to ensure suitable enhancement of the brand and the achievement of revenue targets. Work as full time skin care therapists in an allocated Clinic. They advise, educate and perform skin care treatments on clients as well as retail our products in addition to supervisory function.`
           },
           {
               title: `Office Support Manager`,
               salary: "R40 000 a month",
               description: `Delegating roles and responsibilities to a team of one to administration assistants
               <BR>Working closely with the operations manager to ensure the effective flow of resources throughout the business at all times, adhering to the specific needs of each department
               <BR>Liaising with office suppliers on a daily basis
               <BR>Compiling weekly inventories of office stationery and restocking where necessary`
           }, {
               title: "Retail Sales Business Internships",
               salary: "R12 000 a month",
               description: `
               We are a private company in the Marketing Sales industry, and we are looking for individuals who are looking for opportunity to advance themselves in the Sales Marketing field and are willing to learn each of our phases of our business be able to propel their careers in this industry much faster.
               <BR>
               Our values are simple, and attitude based, we are expanding very fast as this year is going to be our biggest year of business in our existence as a company, with numerous clients cities are being opened up through our business.
               <BR>
               If you have a winning attitude, are charismatic, willing to put an above average effort in the industry, have 03 years experience and are looking to accelerate your career to another level then our business is looking for you.
               `
           }, {
               title: "Business Developer",
               salary: "R25 000 a month",
               description: `We are a young, diverse and dynamic team of characters that thrive in a fast moving, competitive environment full of opportunity and the latest tech. Our growth path challenges all employees to look beyond their job descriptions and to improve relentlessly – and we support our staff in doing just that.`
           },
           {
               title: "Administrator",
               salary: "R8 000 a month",
               description: `
               Monitoring emails
   Arranging purchase orders and managing day-to-day internal controls
   Ordering PPE, arranging medicals
   Assisting with travvel arrangents
   Assisting with tender documents and contractors packs
   Entering bills from monthly suppliers against PO’s
   Entering bills for ad hoc suppliers
   Preparing and posting payments to the accounting system
   Loading and verification of new suppliers - credit applications –BEE verification
   Maintain supplier profiles
   Tracking claims from employees and posting to accounting system
   Cell phone management of employees
   Capturing leave of employees on the HR system
   Fleet management, servicing of vehicles/fleet cards/licensing/insurance claims
   Able to adhere to process control documents and create/update process control documents
   Able to deal with confidential or sensitive information
   Reception stand-in
               `
           }
       ]
   });
   
   
   document.querySelectorAll('button')
       .forEach((elem)=>{
           elem.addEventListener('click', (e)=>{
               //alert(e.target.dataset.job)
               firebase.auth()
               .onAuthStateChanged((user)=>{
                   if(user){
                       const docRef = firebase.firestore()
                       .collection('recent-applications')
                       .doc(user.uid);
   
                       docRef.get().then((doc)=>{
                           if(doc.exists){
                               docRef.update({
                                   recent: e.target.dataset.job,
                                   timestamp: new Date().toLocaleString().toString()
                               })
                               .then(()=>{
                                   swal({
                                       title: e.target.dataset.job,
                                       text: "Your application for this job has been sent!",
                                       icon: "success"
                                   });
                               })
                               .catch((error)=>{
                                   //console.log(error.message);
                               })
                           }else{
                               docRef.set({
                                   recent: e.target.dataset.job,
                                   timestamp: new Date().toLocaleString().toString()
                               })
                               .then(()=>{
                                   swal({
                                       title: e.target.dataset.job,
                                       text: "Your application for this job has been sent!",
                                       icon: "success"
                                   });
                               })
                               .catch((error)=>{
                                   //console.log(error.message);
                               })
                           }
                       })
   
                   }else{
                       swal({
                           title: "Login Required",
                           text: "You are required to login before applying for a job",
                           icon: "error"
                       });
                   }
               })
           })
       })

}())
