const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const animeGrid = document.querySelector(".anime-grid");

async function fetchData() {
  try {
    const URL = "https://api.jikan.moe/v4/anime";
    const resData = await fetch(URL);
    const result = await resData.json();
    // console.log(result);
    // console.log(result.data);  // it peovide objs ka Array  [ {},{},....]

    let j = 0;
    setInterval(function () {
      const { title, type, score, year, synopsis, images } = result.data[j];
      const heroHTML = `
    <div class="slider">
      <div class="slider-text-box">
        <h2 class="slider-anime-title">${title}</h2>
        <div class="anime-small-info">
          <ul>
            <li><span class="material-symbols-outlined">play_circle</span>${type}</li>
            <li><span class="material-symbols-outlined">star_rate</span>${score}</li>
            <li><span class="material-symbols-outlined">calendar_today</span>${year}</li>
          </ul>
        </div>
        <p class="slider-anime-details">${synopsis.slice(0, 180) + "..."}</p>
      </div>
      <div class="slider-image">
        <img src= "${images.jpg.image_url}" alt=""></div>
    </div>`;

      hero.innerHTML = heroHTML;
      j++;
      if (j >= result.data.length) {
        j = 0;
      }
    }, 3000);
  } catch (error) {
    console.log("Error fetching Anime:", error);
  }
}
fetchData();


// for trending card

async function fetchPopularData() {
  try {
    const res = await fetch(
      "https://api.jikan.moe/v4/anime?order_by=members&sort=desc&limit=10"
    );
    const data = await res.json();

    data.data.forEach((ele) => {
      // calling anime card function
      animeGrid.appendChild(cardFunc(ele));
    });
  } catch (error) {
    console.log("Error fetching Trending Anime:", error);
  }
}
fetchPopularData();

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

  const p = document.createElement("p");
  p.textContent = `⭐ ${ele.score}`;

  animeInfo.append(h3, p);
  animeCard.append(img, animeInfo);
  return animeCard;
}
