<?php
if ('' != htmlentities(addslashes($_POST['greenPoint']))) {
    print "Spam attempt!";
    exit;
}
$name = htmlentities(addslashes($_POST['name']));
$email = htmlentities(addslashes($_POST['email']));
$message = htmlentities(addslashes($_POST['message']));
$subject = htmlentities(addslashes($_POST['subject']));
header('Content-Type: application/json');
if ($name === ''){
    print json_encode(array('message' => 'Name cannot be empty', 'code' => 0));
    exit();
}
if ($email === ''){
    print json_encode(array('message' => 'Email cannot be empty', 'code' => 0));
    exit();
} else {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        print json_encode(array('message' => 'Email format invalid.', 'code' => 0));
        exit();
    }
}
if ($subject === ''){
    print json_encode(array('message' => 'Subject cannot be empty', 'code' => 0));
    exit();
}
if ($message === ''){
    print json_encode(array('message' => 'Message cannot be empty', 'code' => 0));
    exit();
}
$content="From: $name \nReply-to: $email \n\n$message";
$recipient = "enquiries@gp-cts.com";
$mailheader = "From: feedback@gp-cts.com \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
print json_encode(array('message' => 'Email successfully sent!', 'code' => 1));
exit();
?>