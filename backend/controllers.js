document.addEventListener('DOMContentLoaded', function() {
     
    var form = document.getElementById('uploadForm');
    var titleInput = document.getElementById('title');
    var brandInput = document.getElementById('brand');
    var urlInput = document.getElementById('url');
    var fileInput = document.getElementById('uploadImage');


    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Get the values of form inputs
        var title = titleInput.value;
        var brand = brandInput.value;
        var url = urlInput.value;
        var file = fileInput.files[0];

        // Use the form values as needed, for example, log them to console
        console.log('Title:', title);
        console.log('Brand:', brand);
        console.log('URL:', url);
        console.log('File:', file); // This will log the File object
    });
});
