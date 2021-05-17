"use strict";
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

    //Mobile Menu
    const mobileBtn = document.querySelector(".mobile-btn"),
        mobileMenu = document.querySelector(".navbar"),
        mobileBtnItems = document.querySelectorAll(".mobile-btn__item");

    function openMobileMenu() {
        document.body.classList.toggle("overflowHidden");
        mobileMenu.classList.toggle("navbar-show");
        mobileBtnItems.forEach((item, i) => {
            if (i == 0) {
                item.classList.toggle("mobile-btn__active1");
            } else if (i == 1) {
                item.classList.toggle("hide");
            } else {
                item.classList.toggle("mobile-btn__active2");
            }
        });
    }
    mobileBtn.addEventListener("click", openMobileMenu);

    //Modal
    const modal = document.querySelector(".modal"),
        modalOverlay = document.querySelector(".modal-overlay"),
        openBtn = document.querySelectorAll("[data-modal]"),
        firstOpenBtn = document.querySelector("#firstBtn");

    function openModal(modal, overlay) {
        modal.classList.add("show");
        modal.classList.remove("hide");

        overlay.classList.add("show");
        overlay.classList.remove("hide");

        document.body.style.overflow = "hidden";
    }

    function closeModal(modal, overlay) {
        modal.classList.remove("show");
        modal.classList.add("hide");

        overlay.classList.remove("show");
        overlay.classList.add("hide");

        document.body.style.overflow = "visible";
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal(modal, modalOverlay);
        }
    });

    openBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            openModal(modal, modalOverlay);
        });
    });

    firstOpenBtn.addEventListener("click", () => {
        openMobileMenu();
        openModal(modal, modalOverlay);
    });

    modal.addEventListener("click", (e) => {
        console.log(e.target);
        if (
            e.target === modal ||
            e.target.classList.contains(modalOverlay) ||
            e.target.getAttribute("data-close") == ""
        ) {
            closeModal(modal, modalOverlay);
        }
    });

    //Courses Cards
    class Course {
        constructor(title, text, count, hours, parentSelector, ...classes) {
            this.title = title;
            this.text = text;
            this.count = count;
            this.hours = hours;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }
        createcard() {
            const card = document.createElement("div");

            if (this.classes.length === 0) {
                this.card = "courses-list__item";
                card.classList.add(this.card);
            } else {
                this.classes.forEach((className) => {
                    card.classList.add(className);
                });
            }

            card.innerHTML = `
                <div class="courses-list__desc">
                    <h3 class="courses-list__title">
                        ${this.title}
                    </h3>
                    <p class="courses-list__subtitle">
                        ${this.text}
                    </p>
                </div>
                <!-- /.courses-list__desc -->
                <button class="courses-list__btn btn">
                    <span class="courses-list__btn-name"
                        >${this.count} videos</span
                    >
                    <hr class="courses-list__line" />
                    <span class="courses-list__btn-name"
                        >${this.hours} hours</span
                    >
                </button>
            `;

            this.parent.append(card);
        }
    }

    //GET requests
    const getResource = async function (url) {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(
                `Couldn't refresh ${url} with status: ${res.status}`
            );
        }

        return await res.json();
    };

    getResource("http://localhost:3000/courses").then((data) => {
        data.forEach(({ title, desc, count, hours }) => {
            new Course(title, desc, count, hours, ".courses-list").createcard();
        });
    });
});
