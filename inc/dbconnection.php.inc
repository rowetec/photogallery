<?php

// Create connection
$dbConn = mysqli_connect($sqlHostname, $sqlUsername, $sqlPassword, $sqlDatabase);

// Check connection
if (!$dbConn) {
    die("Connection to database failed: " . mysqli_connect_error());
}

?>