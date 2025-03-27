document.addEventListener("DOMContentLoaded", function () {

  const artworks = [
    "./public/images/alchemyrg/optimized/Fury.jpg",
    "./public/images/alchemyrg/optimized/IMG_2498.jpg",
    "./public/images/alchemyrg/optimized/IMG_5313.jpg",
    "./public/images/alchemyrg/optimized/IMG_7162.jpg",
    "./public/images/alchemyrg/optimized/IMG_7163.jpg",
    "./public/images/alchemyrg/optimized/IMG_7166.jpg",
    "./public/images/alchemyrg/optimized/IMG_7169.jpg",
    "./public/images/alchemyrg/optimized/IMG_7170.jpg",
    "./public/images/alchemyrg/optimized/IMG_7171.jpg",
    "./public/images/alchemyrg/optimized/IMG_7172.jpg",
    "./public/images/alchemyrg/optimized/IMG_7187.jpg",
    "./public/images/alchemyrg/optimized/IMG_8341.jpg",
    "./public/images/alchemyrg/optimized/IMG_8836.jpg",
    "./public/images/alchemyrg/optimized/RajGupta_11_047A.jpg",
    "./public/images/alchemyrg/optimized/RajGupta_11_131A.jpg",
    "./public/images/alchemyrg/optimized/RajGupta_11_213.jpg",
  ];

  // Get the container elements
  const slideContainer1 = document.getElementById("slideImage1");
  const slideContainer2 = document.getElementById("slideImage2");
  
  // Create img elements inside the containers
  const img1 = document.createElement("img");
  const img2 = document.createElement("img");
  slideContainer1.appendChild(img1);
  slideContainer2.appendChild(img2);
  
  let activeContainer = slideContainer1;
  let inactiveContainer = slideContainer2;
  let currentIndex = 0;

  // Preload images for smoother transitions
  artworks.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Set initial image
  img1.src = artworks[0];
  slideContainer1.classList.add("active");

  // Function to switch images with fade effect
  function switchImage() {
    // Get next image index
    currentIndex = (currentIndex + 1) % artworks.length;
    
    // Get the img element in the inactive container
    const inactiveImg = inactiveContainer.querySelector("img");
    
    // Set new image source
    inactiveImg.src = artworks[currentIndex];
    
    // Wait a moment for the image to load
    setTimeout(() => {
      // Remove active class from current active and add to inactive
      activeContainer.classList.remove("active");
      inactiveContainer.classList.add("active");
      
      // Swap active and inactive references
      const temp = activeContainer;
      activeContainer = inactiveContainer;
      inactiveContainer = temp;
    }, 100);
  }

  // Switch images every 4 seconds
  setInterval(switchImage, 4000);
});