<?php 

// TODO: make three methods for generate, send, and download, where the method is passed in via query

require_once("./../../../assets/php/mysql_credentials.php");
require_once("./../../../assets/php/PHPMailer.php");

$curr_date = date('F j, Y');
$file_name = $curr_date . '.html';

// Top part
ob_start();
include 'announce-template-top.html';
file_put_contents($file_name, ob_get_clean());
 
// Connect to the mysql server, and check if it was successful
$con = mysqli_connect($mysqli_server, $mysqli_username, $mysqli_password, $mysqli_db);
if (!$con)
{
	$ret = array("success" => false,
				 "message" => "<h4>Could not load news items. Please try refreshing the page.</h4>",
				 "error" => "Database connection error."
				 );
	die(json_encode($ret));
}

// get all the announce items
$query = "SELECT * FROM news WHERE announce=1";

$result = mysqli_query($con, $query);

// If the query failed, we're done
if (!$result)
{
	$ret = array("success" => false,
				 "message" => "Could not load news items. Please try refreshing the page.",
				 "error" => "Query failed."
				 );
	die(json_encode($ret));
}

$posts = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Close the connection
mysqli_close($con);

/* Strip any html from the descriptions except for <a> tags and line breaks */
foreach ($posts as $key => $post) {
	$posts[$key]["post_description"] = str_replace( "\n", '<br /><br />', strip_tags($post["post_description"], "<a></a><br><br/><img>") );
}

// Reverse the $posts array so it's newest to oldest
// $posts = array_reverse($posts);

// News Items part
$button_html = '<a style="color: #F3F3F3;background-color: #FF7400;padding: 10px 16px;cursor: pointer;display: inline-block;font-family:sans-serif;font-weight:200;">Clickity Click</a>';

foreach ($posts as $key => $post) {
	$post_image_url = $post['post_image'];
	$post_title = $post['post_title'];
	$post_description = $post['post_description'];

	ob_start();
	include 'announce-template-news-item.html';
	file_put_contents($file_name, ob_get_clean(), FILE_APPEND);
}

// Bottom part
ob_start();
include 'announce-template-bottom.html';
file_put_contents($file_name, ob_get_clean(), FILE_APPEND);

// Mail the item out to ieee-announce@lists.illinois.edu
$mail = new PHPMailer;
$mail->From = "ieee-publicity@illinois.edu";
$mail->FromName = "IEEE UIUC Announce Newsletter";
$mail->addAddress("ieee-announce@lists.illinois.edu");

$mail->Subject = "IEEE UIUC Announce - " . $curr_date;
$mail->Body = file_get_contents($file_name);
$mail->isHTML(true);

// Send the mail, saving the status messsage
$mail_success = $mail->send();

readfile($file_name);

?>
