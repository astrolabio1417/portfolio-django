window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger);

    const START = "top 80%";

    const createScrollTrigger = (triggerElement, timeline, start = START) => {
        return ScrollTrigger.create({
            trigger: triggerElement,
            start,
            onEnter: () => timeline.play(),
        });
    };

    const confettiAnimation = () => {
        const timeline = gsap.timeline();

        timeline.fromTo(
            ".parallax-bg-confetti",
            { y: -500 },
            {
                y: 420,
                scrollTrigger: {
                    scrub: 40,
                    start: "top bottom",
                },
            }
        );

        timeline.fromTo(
            ".parallax-bg-confetti-2",
            { y: -500 },
            {
                y: 200,
                ease: "power1.out",
                scrollTrigger: {
                    scrub: 40,
                    start: "top bottom",
                },
            },
            "<"
        );

        timeline.from(
            ".parallax-div",
            {
                delay: 1,
                opacity: 0,
                duration: 3,
                y: -200,
                x: -150,
                ease: "power1.out",
            },
            "<"
        );
        return timeline;
    };

    const setupAnimation = () => {
        document.querySelectorAll(".slide-from-top-left").forEach((element) => {
            const timeline = gsap.timeline({ paused: true, delay: 0.2 });
            timeline.from(element, {
                opacity: 0,
                y: "-2.5rem",
                x: "-2.5rem",
                duration: 1.2,
                ease: "circ.out",
            });
            createScrollTrigger(element, timeline);
        });

        document
            .querySelectorAll(".slide-from-bottom-left")
            .forEach((element) => {
                const timeline = gsap.timeline({ paused: true, delay: 0.2 });
                timeline.from(element, {
                    opacity: 0,
                    y: "2.5rem",
                    x: "-2.5rem",
                    duration: 1.2,
                    ease: "circ.out",
                });
                createScrollTrigger(element, timeline);
            });

        document
            .querySelectorAll(".increase-with-from-zero")
            .forEach((element) => {
                const timeline = gsap.timeline({ paused: true, delay: 0.3 });
                timeline.from(element, {
                    opacity: 0,
                    width: 0,
                    duration: 1,
                    ease: "circ.out",
                });
                createScrollTrigger(element, timeline);
            });

        confettiAnimation();
    };

    gsap.set("body", { autoAlpha: 1, onfinish: setupAnimation });
});
