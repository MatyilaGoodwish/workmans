<?php
	$title = "My Account | Work Placements";
	$description = "Accounts management and CV Builder";
?>

<?php require_once("templates/header.php") ?>
 
<style>
    .my-4{
        margin-top: 10em;
        margin-bottom: 4em;
    }
    .btn{
        text-outline:none;
        border: none;
    }
</style>


<div class="container my-4">
<div class="row">
<div class="col-md-3">
    <a href="index.php" class="btn btn-secondary btn-block"> <i class="fa fa-home"></i>  Home</a>
</div>
<div class="col-md-3">
    <a href="jobs.php" class="btn btn-secondary btn-block">  <i class="fa fa-book"></i> Apply for jobs</a>
</div>
<div class="col-md-3">
    <a href="profile.php" class="btn btn-secondary btn-block"> <i class="fa fa-user"></i> Update Profile</a>
</div>
<div class="col-md-3" >
    <a href="javascript:;" id="logout" class="btn btn-danger btn-block"> <i class="fa fa-sign-out"></i> Logout</a>
</div>
</div>


</div>

<div class="container my-4" >
    <div class="card">
        <div class="card-header">
         	 <i class="fa fa-book"></i>    Recent Applications
        </div>
        <div class="card-body" id="recent-applications">
            <img src="img/loader.gif" alt="loading..." width="64">
        </div>
    </div>
</div>

<div class="container" >
<h3> <i class="fa fa-search"></i>  Advance Job Search</h3>
<p>Find jobs faster online using the advance search options</p>
<script async src='https://cse.google.com/cse.js?cx=partner-pub-5573581608002514:9992657821'></script><div class="gcse-searchbox-only"></div>
           
</div>

<div class="container" id="charting" >
	<div class="row">
		<div class="col-md-6 p-4">
			<h2> <i class="fa fa-group"></i>  User Registrations</h2>
            <p>Registered users highly active on the system</p>
			<canvas id="registrations">
           
			</canvas>
		</div>
		<div class="col-md-6 p-4">
			<h2>  <i class="fa fa-folder"></i>  CV's Submitted to Employers</h2>
            <p>Requested by employers working with us</p>
		<canvas id="curriculum"></canvas>
		</div>
	</div>
</div>

<script src="app/recent.js"></script>
<script src="app/dashboard.js"></script>
<script src="app/registration-data.js" async></script>

<?php require_once("templates/footer.php"); ?>
	