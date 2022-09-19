const imageDiv = document.getElementById("image-viewer");
const imageDivImage = document.querySelector("#image-viewer-image");
const imageDivHide = document.getElementById("image-viewer-hide");
const images = document.querySelectorAll("img");

function popup(e) {
    imageDiv.classList.remove("d-none");
    imageDivImage.setAttribute('src', e.target.src ?? '');
    document.querySelector('body').classList.add("overflow-hidden");
}

function hide() {
    document.querySelector("body").classList.remove("overflow-hidden");
    imageDiv.classList.add('d-none');
}

images.forEach(image => image.addEventListener('click', popup))
imageDivHide.addEventListener('click', hide)