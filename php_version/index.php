<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">

<form method='post' enctype='multipart/form-data' action='upload.php'>
	<div class = 'input-group'>
		File: <input type='file' name='file_upload'>
    	<input type='submit' class = "btn btn-success">
	</div>
    
</form>
<hr>
<?php
$dir    = 'upload/';
$files1 = scandir($dir,1);
echo "<table class = 'table'>";
echo "<tr><th>File Name</th><th>Action</th>";
foreach ($files1 as $value) {
	if (endsWith($value,'pdf')) {
		echo "<tr>";
		echo "<td>".$value."</td>";
		echo "<td><a href=\"delete.php?f={$value}\" class = 'btn btn-danger'>Delete</a></td>";
		echo "</tr>";
	}
    

}
echo "</table>";
function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== false);
}

?>