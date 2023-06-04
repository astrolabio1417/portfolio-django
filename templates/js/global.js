$(document).ready(function (app) {
    console.log("====================================");
    console.log("ready");
    console.log("====================================");
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollToPlugin);

    ScrollSmoother.create({
        smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });

    animateWorks();

    function createScrollTrigger(element, timeline) {
        ScrollTrigger.create({
            trigger: element,
            start: "top bottom",
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            },
        });

        ScrollTrigger.create({
            trigger: element,
            start: $(element).attr("scrolltrigger-start") ?? "top 80%",
            onEnter: () => timeline.play(),
        });
    }

    $(".letters-fade-in-random").each((i, el) => {
        const e = new SplitText(el, {
            types: "words, chars",
        });
        const tl = gsap.timeline({ paused: true });
        tl.from(e.chars, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
            delay: 0.5,
            stagger: { amount: 0.4, from: "random" },
        });
        createScrollTrigger(el, tl);
    });

    $(".words-slide-up").each((_, el) => {
        const e = new SplitText(el, {
            types: "words, chars",
        });
        const tl = gsap.timeline({ paused: true });
        tl.from(e.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 0.5,
            ease: "back.out(2)",
            stagger: { amount: 0.5 },
        });
        createScrollTrigger(el, tl);
    });

    $(".fade-left").each((_, el) => {
        const tl = gsap.timeline({ paused: true });
        tl.from(el, {
            opacity: 0,
            delay: $(el).attr("delay") ?? 0.5,
            ease: "power1.out",
            x: -120,
        });
        createScrollTrigger(el, tl);
    });

    $(".fade-right").each((_, el) => {
        const tl = gsap.timeline({ paused: true });
        tl.from(el, {
            opacity: 0,
            delay: $(el).attr("delay") ?? 0.5,
            ease: "power1.out",
            x: 120,
        });
        createScrollTrigger(el, tl);
    });

    $(".stagger-group").each((_, el) => {
        const tl = gsap.timeline({ paused: true });
        tl.from($(el).find(".stagger-fade-bottom"), {
            delay: $(el).attr("delay") ?? 0.5,
            y: 120,
            duration: 0.4,
            ease: "power1.out",
            stagger: 0.05,
            opacity: 0,
        });
        createScrollTrigger(el, tl);
    });

    function animateWorks() {
        const stickyImage = document.querySelector(".sticky-content");
        const workList = document.querySelector(".work-list");
        ScrollTrigger.create({
            trigger: stickyImage,
            start: "center center",
            end: () =>
                "+=" +
                (workList.clientHeight - $(".sticky-image")?.last().height()),
            pin: true,
            pinSpacing: false,
        });

        // clip path images
        $(".work-item").each((i, e) => {
            if ($(".work-item").length - 1 <= i) return;
            const targetId = $(e).attr("data-target");
            const targetElement = $(`#${targetId}`);
            gsap.to(targetElement, {
                scrollTrigger: {
                    trigger: e,
                    start: "center+=10% center",
                    end: "bottom top",
                    scrub: true,
                },
                "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            });
        });
    }

    $("#contact-button").on("click", (event) => {
        goToContact(event);
    });

    function goToContact(event) {
        event.preventDefault();
        gsap.to(window, { duration: 1, scrollTo: "#contact" });
    }

    gsap.to("body", {
        opacity: 1,
        overflowY: "visible",
        onEnded: () => {
            ScrollTrigger.refresh(true);
            gsap.to(window, { duration: 1, scrollTo: 0 });
        },
    });
});
