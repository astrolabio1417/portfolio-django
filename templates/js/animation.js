const wrappers = document.querySelectorAll(".square-wrapper");
wrappers.forEach(wrapper => wrapper.classList.remove("square-transition"))

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) return entry.target.classList.add("square-transition");
    })
})


wrappers.forEach(wrapper => {
    observer.observe(wrapper);
})