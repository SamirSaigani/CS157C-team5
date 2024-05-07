document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("uploadForm");
  var titleInput = document.getElementById("title");
  var brandInput = document.getElementById("brand");
  var urlInput = document.getElementById("url");
  var fileInput = document.getElementById("uploadImage");

  if (form) {
  form.addEventListener("submit", function (event) {


    event.preventDefault();

    // Get the values of form inputs
    var title = titleInput.value;
    var brand = brandInput.value;
    var url = urlInput.value;
    var file = fileInput.files[0];

    // Construct a FormData object to store form data
    var formData = new FormData();
    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("url", url);
    formData.append("file", file);

    // Send the form data to the server using fetch API
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Upload successful:", data);
        // Optionally, do something with the response from the server
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  };
});
