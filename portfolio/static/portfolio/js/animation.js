const setupAnimation = () => {
    document.querySelectorAll("[letters-fade-in]").forEach((value) => {
        let tl = gsap.timeline({ paused: true });
        const elements = [...value.querySelectorAll(".char")];
        tl.from(elements, {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out",
            stagger: { amount: elements.length * 0.025 },
        });
        createScrollTrigger(value, tl);
    });

    document.querySelectorAll("[words-slide-from-right]").forEach((value) => {
        let tl = gsap.timeline({ paused: true });
        const elements = [...value.querySelectorAll(".word")];
        tl.from(elements, {
            opacity: 0,
            x: "2rem",
            duration: 0.6,
            ease: "power2.out",
            stagger: { amount: 0.2 },
        });
        createScrollTrigger(value, tl);
    });

    document.querySelectorAll("[slide-from-right]").forEach((value) => {
        let tl = gsap.timeline({ paused: true });
        tl.from(value, {
            opacity: 0,
            x: "2rem",
            duration: 0.6,
            ease: "power2.out",
            stagger: { amount: 0.2 },
        });
        createScrollTrigger(value, tl);
    });

    document.querySelectorAll("[slide-from-top]").forEach((value) => {
        let tl = gsap.timeline({ paused: true });
        const delay = value.dataset?.delay
            ? parseFloat(value.dataset.delay)
            : 0;

        tl.from(
            value,
            {
                opacity: 0,
                y: "-2rem",
                duration: 0.6,
                ease: "power2.out",
                stagger: { amount: 0.2 },
            },
            delay
        );
        createScrollTrigger(value, tl);
    });

    document.querySelectorAll("[slide-from-bottom]").forEach((value) => {
        let tl = gsap.timeline({ paused: true });
        const delay = value.dataset?.delay
            ? parseFloat(value.dataset.delay)
            : 0;
        tl.from(
            value,
            {
                opacity: 0,
                y: "2rem",
                duration: 0.6,
                ease: "power2.out",
                stagger: { amount: 0.2 },
            },
            delay
        );
        createScrollTrigger(value, tl);
    });

    document
        .querySelectorAll("[elements-slide-from-bottom]")
        .forEach((value) => {
            let tl = gsap.timeline({ paused: true });
            const elements = Array.from(value.children);
            tl.from(elements, {
                opacity: 0,
                y: "2rem",
                duration: 0.6,
                ease: "power2.out",
                stagger: { amount: 0.2 },
            });
            createScrollTrigger(value, tl);
        });

    function createScrollTrigger(triggerElement, timeline) {
        const start = triggerElement.dataset?.start || "top 80%";

        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            },
        });
        ScrollTrigger.create({
            trigger: triggerElement,
            start,
            onEnter: () => timeline.play(),
        });
    }
};

const divergenceMeterAnimation = async () => {
    const getImageUrl = (number) =>
        `static/portfolio/images/numbers/${number}.png`;
    const getRandomNumber = () => Math.floor(Math.random() * 10);
    const padNumber = (number) => number.toString().padStart(2, "0");
    const animateRandom = (divergenceMeterItems) => {
        divergenceMeterItems.forEach((item, index) => {
            if (index === 1)
                return item.setAttribute("src", getImageUrl("blank"));
            item.setAttribute("src", getImageUrl(getRandomNumber()));
        });
    };
    const animateDateTime = (divergenceMeterItems) => {
        // "1 1 1 1 1 1 1 1"
        // "hours hours minute minute seconds seconds milliseconds milliseconds"
        const data = new Date();
        const hours = padNumber(data.getHours());
        const minutes = padNumber(data.getMinutes());
        const seconds = padNumber(data.getSeconds());
        const milliseconds = padNumber(data.getMilliseconds());

        const numbers = [
            ...hours.split(""),
            ...minutes.split(""),
            ...seconds.split(""),
            ...milliseconds.split(""),
        ];

        divergenceMeterItems.forEach((item, index) => {
            item.setAttribute("src", getImageUrl(numbers[index]));
        });
    };
    const divergenceMeter = document.querySelector(".divergence-meter");
    const divergenceMeterItems = Array.from(
        divergenceMeter.querySelectorAll(".meter")
    );

    while (divergenceMeterItems) {
        if (divergenceMeter.matches(":hover")) {
            animateRandom(divergenceMeterItems);
            await new Promise((resolve) => setTimeout(resolve, 100));
            continue;
        }

        animateDateTime(divergenceMeterItems);
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
};

window.addEventListener("load", () => {
    setupAnimation();
    divergenceMeterAnimation().then(() => console.log("done"));
    gsap.set(document.querySelector("body"), { autoAlpha: 1 });
});

let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span",
});
