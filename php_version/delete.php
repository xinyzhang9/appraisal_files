<?php 

$filepath =  'upload/'; // The place the files will be uploaded to.
if(empty($_GET['f']))
  exit();
$file = str_replace(array('/', '..'), '', $_GET['f']);
$filePath = realpath($filepath.$file);
if($filePath !== FALSE)
  unlink($filePath);

header("Location: index.php"); /* Redirect browser */
exit();

?>