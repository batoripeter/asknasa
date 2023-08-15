import http from "axios";
import { z } from "zod";

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let currentDate = year + "-" + month + "-" + day;

let myEventListener = async () => {
  currentDate = (document.getElementById("userDateInput") as HTMLInputElement).value;
  backgroundFill(currentDate);
};

const NasaResponseSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  media_type: z.string(),
  service_version: z.string(),
  title: z.string(),
  url: z.string(),
  copyright: z.string().optional(),
});

type NasaResponse = z.infer<typeof NasaResponseSchema>;

const backgroundFill = async (currentDate: string) => {
  const response = await http.get(
    "https://api.nasa.gov/planetary/apod?api_key=j3HzB7I0cRAep37Ke3G6lCsuoKzXQGswHcsF30Bb&date=" + currentDate
  );
  const data: NasaResponse = response.data;
  const result = NasaResponseSchema.safeParse(data);

  if (!result.success) {
    return alert("Error in received data");
  } 
  
  let imageElement = document.getElementById("dailyPhoto") as HTMLImageElement;
  let bgPhoto = data["url"];
  imageElement.src = bgPhoto;
  document.body.style.backgroundSize = "cover";
  document.getElementById("title")!.innerHTML = data["title"];
  document.getElementById("text")!.innerHTML = data["explanation"];
  document.getElementById("copyright")!.innerHTML =
    "Copyright: " + data["copyright"];
};
backgroundFill(currentDate);

let buttonClick = document.getElementById("btn") as HTMLButtonElement;
buttonClick.addEventListener("click", myEventListener);


const NasaFetchSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  media_type: z.string(),
  service_version: z.string(),
  title: z.string(),
  url: z.string(),
  copyright: z.string().optional(),
});

const NasaFetchResponseSchema = z.array(NasaFetchSchema);
type NasaFetch = z.infer<typeof NasaFetchResponseSchema>

async function fetchImages() {
  const response = await http.get(
    "https://api.nasa.gov/planetary/apod?api_key=j3HzB7I0cRAep37Ke3G6lCsuoKzXQGswHcsF30Bb&start_date=2022-02-21&end_date=2022-02-28"
  );
  const imageData : NasaFetch = response.data;
  const result = NasaFetchResponseSchema.safeParse(imageData);

console.log(result)
  if (!result.success) {
    return alert("Error in received gallery data");
  } 

  let i = 0

  while (i < 8) {
    let link = document.createElement("a");
    link.href = imageData[i].url
    link.setAttribute("id", "link"+[i]);
    link.setAttribute("class", "example-image-link");
    link.setAttribute("data-lightbox", "example-set");
    (document.getElementById("gallery") as HTMLElement).appendChild(link);

    let image = document.createElement("img");
    image.src = imageData[i].url
    image.setAttribute("id", "image");
    image.setAttribute("class", "example-image");
    (document.getElementById("link"+[i]) as HTMLImageElement).appendChild(image);

    i++;
  }
}
fetchImages();
