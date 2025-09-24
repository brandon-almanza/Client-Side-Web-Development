//Brandon Argenal Almanza, 301467830
//Select the gallery and favorites section
document.addEventListener("DOMContentLoaded", function () {
      const gallery = document.getElementById("gallery");
      const favoritesContainer = document.getElementById("favorites");
      const maxFavorites = 5;
      let favorites = [];
  
      //When an image is clicked in the gallery
      //it will open a larger version
      gallery.addEventListener("click", function (event) {
          if (event.target.tagName === "IMG") {
              openImageViewer(event.target);
          }
      });
      //Function to show the image in a bigger view
      function openImageViewer(img) {
          //Create a new div to show the image and buttons
          const viewer = document.createElement("div");
          viewer.className = "image-viewer";
          //Add the image and buttons inside the div
          viewer.innerHTML = `
              <div class="viewer-content">
                  <img src="${img.src}" alt="Zoomed Image">
                  <button id="add-to-favorites">Add to Favorites</button>
                  <button id="close-viewer">Close</button>
              </div>
          `;
          //Add viewer to web page
          document.body.appendChild(viewer);
          //When add to favorites is clicked
          //Image will be added to favorites
          document.getElementById("add-to-favorites").addEventListener("click", function () {
              addToFavorites(img.src);
              document.body.removeChild(viewer);
          });
          
          //When close is clicked
          //Remove viewer
          document.getElementById("close-viewer").addEventListener("click", function () {
              document.body.removeChild(viewer);
          });
      }
  
      //Function to save an image to the favorites section
      function addToFavorites(imgSrc) {
          //Check if the limit is reached
          if (favorites.length >= maxFavorites) {
              alert("You can only favourite 5 images. Remove one in order to add another.");
              return;
          }
          
          //If the image is not already saved, add it to the list
          if (!favorites.includes(imgSrc)) {
              favorites.push(imgSrc);
              updateFavorites();
          }
      }
  
      //Function to update favorites section
      function updateFavorites() {
          //Clear the current favorite images
          favoritesContainer.innerHTML = "";
          
          //Loopthrough the favorites and display them
          favorites.forEach((src, index) => {
              const favItem = document.createElement("div");
              favItem.className = "favorite-item";
              favItem.innerHTML = `
                  <img src="${src}" class="fav-img"> 
                  <button class="remove-fav" data-index="${index}">Remove</button>
              `;
              favoritesContainer.appendChild(favItem);
          });
  
          //When the remove button is clicked
          //Remove the image
          document.querySelectorAll(".remove-fav").forEach(button => {
              button.addEventListener("click", function () {
                  removeFavorite(button.getAttribute("data-index"));
              });
          });
      }
  
      //Function to remove an image from favorites
      function removeFavorite(index) {
          //Remove image from the list and update display
          favorites.splice(index, 1);
          updateFavorites();
      }
  });
  
