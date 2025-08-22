const animeGrid =   document.querySelector(".anime-grid");


async function fetchMovieFunction() {

  const res = await fetch("https://api.jikan.moe/v4/anime?type=movie&limit=25");
  const data = await res.json();

//   console.log(data);

  data.data.forEach(ele => {
    // calling anime card function
    animeGrid.appendChild(cardFunc(ele))
  });
}
fetchMovieFunction();


// make animeCard Function
function cardFunc(ele) {
  const animeCard = document.createElement("div");
    animeCard.className = "anime-card";

    const img = document.createElement("img");
    img.src = ele.images.jpg.image_url;
    img.alt = ele.title;

    const animeInfo = document.createElement("div");
    animeInfo.className = "anime-info";

    const h3 = document.createElement("h3");
    h3.textContent = ele.title;

    const subInfo =  document.createElement("div");
    subInfo.className = "sub-info"

    const rate = document.createElement("p");
    rate.textContent = `⭐ ${ele.score}`;

    const type = document.createElement("p");
    type.textContent = `${ele.type}`


    subInfo.append(rate,type)
    animeInfo.append(h3, subInfo);
    animeCard.append(img, animeInfo);
  return animeCard;
}


