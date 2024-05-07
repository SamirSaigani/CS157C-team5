function displayImage(event) {
    var imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = ''; // Clear previous images
  
    var reader = new FileReader();
    reader.onload = function() {
      var imgElement = document.createElement('img');
      imgElement.src = reader.result;
      imgElement.classList.add('uploaded-image');
      imagePreview.appendChild(imgElement);
  
      // Show the submit button
      var submitButton = document.getElementById('submitButton');
      submitButton.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
  
    // Hide the file input
    var fileInput = document.getElementById('imageInput');
    fileInput.style.display = 'none';
  
    // Redirct to Home Page
    document.getElementById('submitButton').addEventListener('click', function() {
    window.location.href = '/';
  });
  }



document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', '/add-product', true);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Add the newly added product to the page
          var shopContent = document.querySelector('.shop-content');
          var productBox = document.createElement('div');
          productBox.classList.add('product-box');
          productBox.innerHTML = `
            <img src="${response.image}" alt="" class="product-img">
            <h2 class="product-title">${response.title}</h2>
            <span class="product-brand">${response.brand}</span>
          `;
          shopContent.appendChild(productBox);
        } else {
          alert('Failed to add product');
        }
      } else {
        alert('Error occurred');
      }
    };
    
    xhr.onerror = function() {
      alert('Error occurred');
    };
    
    xhr.send(formData);
  });