class Carousel {
    constructor(carouselElement) {
        this.carouselElement = carouselElement;
        this.slides = this.carouselElement.querySelector(".slides");
        this.controlDots =
            this.carouselElement.querySelectorAll(".control-dots > *");
        this.slidesCount = this.slides.children.length;
        this.currentIndex = 0;

        this.setDotActiveStyle();
        this.bindEvents();
        this.startAutoSlide();
    }

    setCurrentIndex(index) {
        if (index >= this.slidesCount) {
            this.currentIndex = 0;
            return;
        }
        if (index < 0) {
            this.currentIndex = this.slidesCount - 1;
            return;
        }
        this.currentIndex = index;
    }

    showSlide(index) {
        this.setCurrentIndex(index);
        this.slides.style.transform = `translateX(${
            -this.currentIndex * 100
        }%)`;
        this.setDotActiveStyle();
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }

    previousSlide() {
        this.showSlide(this.currentIndex - 1);
    }

    startAutoSlide() {
        this.autoSlide = setInterval(() => this.nextSlide(), 3000);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlide);
    }

    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }

    setDotActiveStyle() {
        this.controlDots.forEach((dot) => dot.classList.remove("active"));
        this.controlDots[this.currentIndex].classList.add("active");
    }

    bindEvents() {
        const previousButton = this.carouselElement.querySelector(".previous");
        const nextButton = this.carouselElement.querySelector(".next");

        previousButton.addEventListener("click", () => {
            this.previousSlide();
            this.resetAutoSlide();
        });

        nextButton.addEventListener("click", () => {
            this.nextSlide();
            this.resetAutoSlide();
        });

        this.controlDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                this.showSlide(index);
                this.resetAutoSlide();
            });
        });

        this.carouselElement.addEventListener("mouseover", () => {
            this.stopAutoSlide();
        });
        this.carouselElement.addEventListener("mouseout", () => {
            this.resetAutoSlide();
        });
    }
}

const carousel = new Carousel(document.querySelector(".image-carousel"));
