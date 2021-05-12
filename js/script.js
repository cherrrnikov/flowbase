document.addEventListener("DOMContentLoaded", () => {
    //VideoPlayer

    const player = document.querySelector(".main-video"),
        video = player.querySelector(".main-video__player"),
        playerOverlay = player.querySelector(".main-video__overlay"),
        playBtn = player.querySelector("[data-play]");

    function playVideo() {
        playerOverlay.classList.add("hide");
        playBtn.classList.add("hide");
        video.play();
    }

    function closeVideo() {
        playerOverlay.classList.remove("hide");
        playBtn.classList.remove("hide");
        video.pause();
    }

    playBtn.addEventListener("click", playVideo);
    video.addEventListener("click", closeVideo);
});
