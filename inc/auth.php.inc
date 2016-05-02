<?php

session_start();

function loggedIn() {
	if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
		return true;
	}
	else {
		return false;
	}
}

function login($username, $password) {
	if ($username == "test" && $password == "test"){
		$_SESSION['loggedin'] = true;
		return loggedIn();
	}
	else {
		return false;
	}
}

function logout() {
	session_destroy();
}

function register() {
	$salt 			= uniqid(mt_rand(), true);
	$username 		= mysqli::escape_string ($_POST['username']);
	$password 		= mysqli::escape_string ($_POST['password']);
	$passwordhash 	= sha1(sha1($salt.$username).sha1(mysqli::escape_string(password);
	$sql = "INSERT INTO users (username, salt, pwhash) VALUES ('".$username."', '".$salt."', '".$passwordhash."')";
	if ($dbConn->query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
}

?>