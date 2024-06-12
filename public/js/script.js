// APlayer
const aplayer = document.querySelector("#aplayer");
if(aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    audio: [{
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar
    }],
    autoplay: true
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on('play', function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avatar.style.animationPlayState = "paused";
  });
}
// End APlayer

// Button Like
const buttonLike = document.querySelector("[button-like]");
if(buttonLike) {
  buttonLike.addEventListener("click", () => {
    const id = buttonLike.getAttribute("button-like");

    const status = buttonLike.classList.contains("active") ? "dislike" : "like";
    
    fetch(`/songs/like/${status}/${id}`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          const elementNumber = buttonLike.querySelector(".inner-number");
          elementNumber.innerHTML = data.like;
          buttonLike.classList.toggle("active");
        }
      })
  })
}
// End Button Like