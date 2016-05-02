<?php
require_once("inc/config.php.inc");
require_once("inc/dbconnection.php.inc");
require_once("inc/auth.php.inc");
?>

<html>

<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script> 
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	
	<script src="scripts/photogallery.js"></script>
	<link href="style/main.css" rel="stylesheet">
	<title>Photo Gallery</title>
</head>
<body>
	<div id="maingallerydiv">
	<?php
	if (loggedIn()){
	?>
		<div id="sidebar">
		</div>
		<div id="content">
			<div id="filter">
				<div id="thumbsize" class="btn-group btn-group-sm" role="group" aria-label="...">
					<button type="button" class="btn btn-default">1</button>
					<button type="button" class="btn btn-default active">2</button>
					<button type="button" class="btn btn-default">3</button>
					<button type="button" class="btn btn-default">4</button>
				</div>
			</div>
			<div id="photopane">
			</div>
		</div>
	</div>
	<?php
	}
	else {
	?>
	<form class="form-signin" role="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
        <h4 class="form-signin-heading">Please login</h4>
		<input type="text" class="form-control" name="username" placeholder="username" required autofocus></br>
		<input type="password" class="form-control" name="password" placeholder="password" required>
		<button class="btn btn-lg btn-primary btn-block" type="submit" name="login">Login</button>
		<button class="btn btn-lg btn-primary btn-block" type="submit" name="register">Register</button>
	</form>
	<?php
	}
	?>	 
</body>

</html>