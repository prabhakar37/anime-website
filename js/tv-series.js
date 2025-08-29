let animeGrid = document.querySelector(".anime-grid");
let previousButton = document.querySelector(".previous");
let nextButton = document.querySelector(".next");

async function fetchSeriesData() {
  try {
    let page = 4;
    let allSeries = [];
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?type=TV&page=${page}&limit=25`
    );
    const seriesData = await res.json();
    // console.log(seriesData.data);

    for (let i = 1; i <= page; i++) {
      allSeries.push(...seriesData.data);
    }
    console.log("max card: " + allSeries.length);
    previousButton.style.display = "none";

    let start = 0;
    let end = 13;
    const maxSize = allSeries.length;
    let lastAdd = 0;

    // For initial 14 card visible
    for (let i = start; i <= end; i++) {
      animeGrid.append(cardCreateFunc(allSeries[i]));
    }

    // Nxt button
    nextButton.addEventListener("click", function () {
      lastAdd = 0;
      start = end + 1;
      end = end + 14;

      if (end > maxSize) {
        // to remove Nxt button at last page
        end = maxSize - 1;
        nextButton.style.display = "none";
      }
      if (!(start < 14)) {
        previousButton.style.display = "inline-block";
      }
      let count = 0;
      for (start; start <= end; start++) {
        animeGrid.append(cardCreateFunc(allSeries[start]));
        count++;
      }
      lastAdd = count;
      console.log("count: " + count);
    });

    // Previous Button
    previousButton.addEventListener("click", function () {
      start = end - lastAdd;

      if (start < 15) {
        previousButton.style.display = "none";    // remove Back button at 1st page
      }
      if (end < maxSize) {                        // to Show Nxt button
        nextButton.style.display = "inline-block";
      }
      for (end; end > start; end--) {
        animeGrid.lastElementChild.remove();
      }
      lastAdd = 14;
    });
  } catch (error) {
    console.log("Error Fetching TV data: " + error);
  }
}
fetchSeriesData();

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


// Sidebar fucntionality
const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("closeBtn");
const wrapper = document.querySelector(".wrapper");

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
