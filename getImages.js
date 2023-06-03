const images = document.querySelectorAll(".slick-slide img");
let adImages = [];
for (let i = 0; i < (images.length/2)-1; i++) {
  adImages[i] = images[i].src;
}

adImages;