const searchedcontainer = document.querySelector(".searched-item-container");
const animeBox = document.querySelector(".anime-box");
const resultText = document.querySelector(".searched-item-container h3");

// form search
const form = document.querySelector("#form-box");
const params = new URLSearchParams(window.location.search);
const searchValue = params.get("search");

if (searchValue.trim()) {
  fetchSearchData(searchValue);
} else {
  console.log("enter correct value");
}

async function fetchSearchData(searchValue) {
  try {
    const page = 2;
    const queryTerm = searchValue;
    // console.log(resultText);

    console.log(queryTerm);

    animeBox.innerHTML = "";
    const allAnime = [];
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${queryTerm}&page=${page}&limit=25`
    );
    const data = await res.json();

    // tag creation
    resultText.innerHTML = "";
    resultText.innerHTML = `Search result for: ${queryTerm}`;

    for (i = 0; i < page; i++) {
      allAnime.push(...data.data);
    }
    // console.log(allAnime.length);

    allAnime.forEach((ele) => {
      animeBox.appendChild(cardCreateFunc(ele));
    });
  } catch (error) {
    console.log(error);
  }
}

// make animeCard Function
function cardCreateFunc(ele) {
  const animeCard = document.createElement("div");
  animeCard.className = "anime-card";

  const img = document.createElement("img");
  img.src = ele.images.jpg.image_url;
  img.alt = ele.title;

  const animeInfo = document.createElement("div");
  animeInfo.className = "anime-info";

  const h3 = document.createElement("h3");
  h3.textContent = ele.title;

  const subInfo = document.createElement("div");
  subInfo.className = "sub-info";

  const rate = document.createElement("p");
  rate.textContent = `⭐ ${ele.score}`;

  const type = document.createElement("p");
  type.textContent = `${ele.type}`;

  subInfo.append(rate, type);
  animeInfo.append(h3, subInfo);
  animeCard.append(img, animeInfo);

  return animeCard;
}
