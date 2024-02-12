const sliderImg = document.querySelectorAll(".slider-item-img");
const sliderVideo = document.querySelectorAll(".slider-item-video");
const accessToken = "435003998f8f9e50cc0e8b597196e625";
const videoId = 824804225;

const apiUrl = `https://api.vimeo.com/videos/${videoId}`;

fetch(apiUrl, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then((data) => {
    const url = data.player_embed_url + '?autoplay=1&muted=1';
    const imgSrc = data.pictures.base_link;
    sliderImg.forEach((el) => (el.src = imgSrc));
    sliderVideo.forEach((el) => (el.src = url));
  })
  .catch((error) => {
    console.error("Error fetching video data:", error);
  });


$(".multiple-items").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: '<button class="slick-prev"></button>',
  nextArrow: '<button class="slick-next"></button>',
});

$(".single-item").slick({
  dots: true,
  prevArrow: '<button class="slick-prev"></button>',
  nextArrow: '<button class="slick-next"></button>'
});

const liItems = document.querySelectorAll("ul li");

liItems.forEach((li, index) => {
  li.dataset.index = index + 1;
});


sliderImg.forEach((img) => {
  img.addEventListener("click", function () {

    document.querySelector('.pop-up-wrapper').classList.toggle('visible');

    const clickedIndex = img.dataset.index;

    liItems.forEach((li) => {
      li.classList.remove("slick-active");

      if (clickedIndex === li.dataset.index) {
        li.classList.add("slick-active");
      }

    });
  });
});
