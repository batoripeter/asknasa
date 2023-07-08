"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let currentDate = year + "-" + month + "-" + day;
let myEventListener = (event) => __awaiter(void 0, void 0, void 0, function* () {
    currentDate = document.getElementById("userDateInput").value;
    backgroundFill(currentDate);
});
function backgroundFill(currentDate) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("https://api.nasa.gov/planetary/apod?api_key=j3HzB7I0cRAep37Ke3G6lCsuoKzXQGswHcsF30Bb&date=" + currentDate);
        let data = yield response.json();
        let bgPhoto = data["url"];
        document.getElementById("dailyPhoto").src = bgPhoto;
        document.body.style.backgroundSize = "cover";
        document.getElementById("title").innerHTML = data["title"];
        document.getElementById("text").innerHTML = data["explanation"];
        document.getElementById("copyright").innerHTML = "Copyright: " + data["copyright"];
    });
}
backgroundFill(currentDate);
let buttonClick = document.getElementById("btn");
buttonClick.addEventListener("click", myEventListener);
function fetchImages() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("https://api.nasa.gov/planetary/apod?api_key=j3HzB7I0cRAep37Ke3G6lCsuoKzXQGswHcsF30Bb&start_date=2022-02-20&end_date=2022-02-27");
        let imageData = yield response.json();
        let i = 0;
        while (i < 8) {
            let link = document.createElement("a");
            link.href = (imageData[i].url);
            link.setAttribute("id", "link");
            link.setAttribute("class", "example-image-link");
            link.setAttribute("data-lightbox", "example-set");
            document.getElementById("gallery").appendChild(link);
            let image = document.createElement("img");
            image.src = (imageData[i].url);
            image.setAttribute("id", "image");
            image.setAttribute("class", "example-image");
            image.setAttribute("width", "300px");
            document.getElementById("link").appendChild(image);
            i++;
        }
    });
}
fetchImages();
