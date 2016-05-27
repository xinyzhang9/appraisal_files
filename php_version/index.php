<form method='post' enctype='multipart/form-data' action='upload.php'>
    File: <input type='file' name='file_upload'>
    <input type='submit'>
</form>

<?php
$dir    = 'upload/';
$files1 = scandir($dir,1);
foreach ($files1 as $value) {
	if (endsWith($value,'pdf')) {
		echo "<p>". $value . "<button class = 'removeFile'>remove</button></p>";
	}
    

}
function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== false);
}
?>