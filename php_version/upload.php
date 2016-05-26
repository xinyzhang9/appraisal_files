
<?php

// Check for errors
if($_FILES['file_upload']['error'] > 0){
    die('An error ocurred when uploading.');
}

if(!filesize($_FILES['file_upload']['tmp_name'])){
    die('Please ensure you are uploading a pdf.');
}

// Check filetype
if($_FILES['file_upload']['type'] != 'application/pdf'){
    die('Unsupported filetype uploaded.');
}

// Check filesize max = 5M
if($_FILES['file_upload']['size'] > 5000000){
    die('File uploaded exceeds maximum upload size.');
}

// Check if the file exists
if(file_exists('upload/' . $_FILES['file_upload']['name'])){
    die('File with that name already exists.');
}

// Upload file
if(!move_uploaded_file($_FILES['file_upload']['tmp_name'], 'upload/' . $_FILES['file_upload']['name'])){
    die('Error uploading file - check destination is writeable.');
}

die('File uploaded successfully.');