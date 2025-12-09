document.addEventListener("DOMContentLoaded", () => {
        // 🔥 Collection page entry animation
    const collectionPage = document.querySelector(".collection-page");
    if (collectionPage) {
        // thoda delay deke smooth feel
        setTimeout(() => {
            collectionPage.classList.add("visible");
        }, 150);
    }

    const slides = Array.from(document.querySelectorAll(".product-slide"));
    const prevBtn = document.querySelector(".arrow-prev");
    const nextBtn = document.querySelector(".arrow-next");

    let currentIndex = 0;
    let autoSlideTimer = null;
    const AUTO_DELAY = 6500; // slow luxury auto-slide

    function updateSlides() {
        const total = slides.length;
        slides.forEach((slide, index) => {
            slide.classList.remove("active", "prev", "next");

            if (index === currentIndex) {
                slide.classList.add("active");
            } else if (index === (currentIndex - 1 + total) % total) {
                slide.classList.add("prev");
            } else if (index === (currentIndex + 1) % total) {
                slide.classList.add("next");
            }
        });
    }

    function goTo(index) {
        const total = slides.length;
        currentIndex = (index + total) % total;
        updateSlides();
        restartAutoSlide();
    }

    function next() {
        goTo(currentIndex + 1);
    }

    function prev() {
        goTo(currentIndex - 1);
    }

    function startAutoSlide() {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(next, AUTO_DELAY);
    }

    function restartAutoSlide() {
        startAutoSlide();
    }

    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    // Swipe / drag support
    const viewport = document.querySelector(".carousel-viewport");
    if (viewport) {
        let startX = 0;
        let isDown = false;

        viewport.addEventListener("touchstart", (e) => {
            if (e.touches.length === 1) {
                isDown = true;
                startX = e.touches[0].clientX;
            }
        });

        viewport.addEventListener("touchend", (e) => {
            if (!isDown) return;
            isDown = false;
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;

            if (Math.abs(diff) > 40) {
                if (diff < 0) {
                    next();
                } else {
                    prev();
                }
            }
        });

        viewport.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.clientX;
        });

        document.addEventListener("mouseup", (e) => {
            if (!isDown) return;
            isDown = false;
            const endX = e.clientX;
            const diff = endX - startX;

            if (Math.abs(diff) > 60) {
                if (diff < 0) {
                    next();
                } else {
                    prev();
                }
            }
        });
    }

    // Initial
    updateSlides();
    startAutoSlide();

    // ===== COMMISSION MODAL LOGIC =====
    const commissionButtons = document.querySelectorAll(".commission-btn");
    const commissionModal = document.getElementById("commissionModal");
    const closeCommissionModal = document.getElementById("closeCommissionModal");
    const selectedPieceName = document.getElementById("selectedPieceName");

    commissionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productName = btn.getAttribute("data-product");
            if (selectedPieceName) {
                selectedPieceName.textContent = productName || "Selected Piece";
            }
            if (commissionModal) {
                commissionModal.classList.add("active");
            }
        });
    });

    if (closeCommissionModal && commissionModal) {
        closeCommissionModal.addEventListener("click", () => {
            commissionModal.classList.remove("active");
        });

        commissionModal.addEventListener("click", (e) => {
            if (e.target === commissionModal) {
                commissionModal.classList.remove("active");
            }
        });
    }

    // ===== IMAGE LIGHTBOX (fullscreen on click) =====
    const visuals = document.querySelectorAll(".product-visual");
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");
    const lightboxBackdrop = document.getElementById("imageLightboxBackdrop");

    function openLightboxFromElement(el) {
        if (!el || !lightbox || !lightboxImg) return;
        const style = window.getComputedStyle(el);
        const bg = style.backgroundImage; // url("...")
        if (!bg || bg === "none") return;

        // extract URL from url("...")
        let url = bg.slice(4, -1).replace(/["']/g, "");
        lightboxImg.src = url;
        lightbox.classList.add("active");
    }

    visuals.forEach((v) => {
        v.addEventListener("click", () => openLightboxFromElement(v));
    });

    function closeLightboxFn() {
        if (lightbox) {
            lightbox.classList.remove("active");
        }
    }

    if (closeLightbox) closeLightbox.addEventListener("click", closeLightboxFn);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightboxFn);
});
