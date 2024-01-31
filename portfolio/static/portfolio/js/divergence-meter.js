// random

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
