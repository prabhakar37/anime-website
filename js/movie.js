const animeGrid = document.querySelector(".anime-grid");
const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("closeBtn");
const wrapper = document.querySelector(".wrapper");


async function fetchMovieFunction() {
  try {
    const res = await fetch(
      "https://api.jikan.moe/v4/anime?type=movie&limit=25"
    );
    const data = await res.json();

    data.data.forEach((ele) => {
      // calling anime card function
      animeGrid.appendChild(cardFunc(ele));
    });
  } catch (error) {
    console.log(error);
  }
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


// Sidebar fucntionality
menuButton.addEventListener("click", () => {
  sidebar.style.display = "inline-block";
  menuButton.style.display = "none";
  wrapper.classList.add("no-scroll");
});

closeBtn.addEventListener("click", () => {
  sidebar.style.display = "none";
  menuButton.style.display = "block";
  wrapper.classList.remove("no-scroll");
});
