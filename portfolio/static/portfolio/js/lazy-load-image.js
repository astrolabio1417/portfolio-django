const loadLazyImages = () => {
    const handleIntersection = (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const lazyImage = entry.target;
            const src = lazyImage.dataset.src;
            if (!src) return;
            lazyImage.classList.remove("lazy");
            lazyImage.src = src;
            observer.unobserve(lazyImage);
        });
    };

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    };

    if (!("IntersectionObserver" in window)) return;

    const lazyImages = document.querySelectorAll(".lazy");
    const observer = new IntersectionObserver(handleIntersection, options);
    lazyImages.forEach((lazyImage) => observer.observe(lazyImage));
};

window.addEventListener("load", () => {
    loadLazyImages();
});
