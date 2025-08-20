const hero = document.querySelector(".hero")
const slider = document.querySelector(".slider");


async function fetchData(){
    const URL = "https://api.jikan.moe/v4/anime"
    const resData = await fetch(URL);
    const result = await resData.json();
    // console.log(result);
    // console.log(result.data);  // it peovide objs ka Array  [ {},{},....]


    let j = 0;
    setInterval(function(){
      const {title, type, score, year, synopsis,images} = result.data[j];
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
        <p class="slider-anime-details">${synopsis.slice(0, 180)+"..."}</p>
      </div>
      <div class="slider-image">
        <img src= "${images.jpg.image_url}" alt=""></div>
    </div>`;

    hero.innerHTML = heroHTML;
    j++;
      if(j >=result.data.length ){
        j = 0;
      }
    
    }, 3000)

}
fetchData()









