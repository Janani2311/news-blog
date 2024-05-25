
var url = `https://inshortsapi.vercel.app/news?category=national`;
var localNews_url = `https://inshortsapi.vercel.app/news?category=all`;
var category_url = `https://inshortsapi.vercel.app/news?category=business`;
var top_picks_url = `https://inshortsapi.vercel.app/news?category=hatke`;


let category = ["national","business","sports","world","politics","technology","startup","entertainment","miscellaneous","hatke","sceince","automobile"];
let navlist = ["sports","world","technology","science","business"];

//Bootstrap function to work side carousel where Categories are listed
var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
  return new bootstrap.Offcanvas(offcanvasEl)
})

//function to get data from fetchData and mapped in carousel
async function topstoriesList(){
    let data = await fetchData_News(url);
    let carouselData = data.data;
    console.log(carouselData);
    let top_Stories = document.getElementById("top-stories-wrapper");
    top_Stories.innerHTML='';

    top_Stories.innerHTML = `<div class="item active">
                <img src="${carouselData[0].imageUrl}" class="d-block w-100" alt="${carouselData[0].title}" style="height:400px;">
                <div class="carousel-caption">
                <h3>${carouselData[0].title}</h3>
                <p></p>
                </div>
            </div>

            <div class="item">
                <img src="${carouselData[1].imageUrl}" class="d-block w-100" alt="${carouselData[1].title}" style="height:400px;">
                <div class="carousel-caption">
                <h3>${carouselData[1].title}</h3>
                </div>
            </div>

            <div class="item">
                <img src="${carouselData[2].imageUrl}" class="d-block w-100" alt="${carouselData[2].title}" style="height:400px;">
                <div class="carousel-caption">
                <h3>${carouselData[2].title}</h3>
                </div>
            </div>
            
            <div class="item">
                <img src="${carouselData[3].imageUrl}" class="d-block w-100" alt="${carouselData[3].title}" style="height:400px;">
                <div class="carousel-caption">
                <h3>${carouselData[3].title}</h3>
                </div>
            </div>
            
            <div class="item">
                <img src="${carouselData[4].imageUrl}" class="d-block w-100" alt="${carouselData[4].title}" style="height:400px;">
                <div class="carousel-caption">
                <h3>${carouselData[4].title}</h3>
                </div>
            </div>`  
}


//function to get local stories and displayed as list-group
async function localnewsList(){
    let data = await fetchData_News(localNews_url); 
    let localNewsData = data.data;
    let local_stories = document.getElementById("latest-news-wrapper");
    local_stories.innerHTML = '';

    localNewsData.forEach((e) => {
        let content = e.content.substring(0,50);
        let localNews = document.createElement('div');

        localNews.innerHTML =  `<div class="list-group list-group-horizontal-md">
        <a target="_blank" href="${e.readMoreUrl}" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between latest-group">
            <h5 class="mb-1">${e.title}</h5>
          </div>
          <p class="mb-1">${content}</p>
            <small>${e.date}</small>
        </a>
      </div>`
        local_stories.append(localNews);
    });   

}

//function to get recommended news and displayed as cards with Read more button
async function categoryCard(){
    let data = await fetchData_News(category_url); 
    let categoryData = data.data;

    let cards = document.getElementById("card-wrapper");
    cards.innerHTML = '';

    categoryData.forEach((e) => {
        let card = document.createElement("div");
        card.setAttribute("class","card");
        card.innerHTML = `
        <img src="${e.imageUrl}" class="card-img-top" alt="${e.title}">
        <div class="card-body">
          <h5 class="card-title">${e.title}</h5>
          <a target="_blank" href="${e.readMoreUrl}" class="">Read More...</a>
        </div>`
      cards.append(card);
    })
    
}

//function to get news data and displayed as list-group
async function topPicks(){
    let data = await fetchData_News(top_picks_url ); 
    let picksData = data.data;
    console.log(picksData);
    let top_picks = document.getElementById("top-picks");
    top_picks.innerHTML = '';
    let topNews = document.createElement('div');
    topNews.setAttribute("class","list-group");

    picksData.forEach((e) => {
        topNews.innerHTML +=   `
        <a target="_blank" href="${e.readMoreUrl}" class="list-group-item list-group-item-action list-group-horizontal-md">
            <div class="d-flex w-100">
                <img src="${e.imageUrl}" alt="${e.title}" style="height:50px; width:50px;">
                <h5 class="mb-1">${e.title}</h5>
            </div>
        
        </a>
      `
        top_picks.append(topNews);
    });   

}

// function to fetch data using API URL
async function fetchData_News(url){
    try {
        let res = await fetch(url)
        let data = await res.json()
        if(res.status===200){
            return data;    
        }
        else
            alert(`${res.status} - ${res.statusText}`)
    } catch (error) {
        console.error(error)
    }
}

// function to populate the offcanvas with category list
 (function () {
  let offcanvas = document.getElementById("offcanvas-body");
  let ul = document.createElement("ul");
  ul.setAttribute("class","menu");
  category.forEach((e)=>{
   
    ul.innerHTML +=  `<li><button class="dropdown-item" onClick="goToDetails('${e}')">${e}</button></li>`;
    
  })
  offcanvas.append(ul);
 })();

 //function to add nav-list-items in navbar
 (function () {
  console.log("here")
  let navUl = document.getElementById("navbar-list");
  
  navlist.forEach((e)=>{
   
    navUl.innerHTML +=  `<li class="nav-item">
    <button class="btn btn-link" onClick="goToDetails('${e}')">${e}</button>
  </li>`;
    
  })
 
 })();


// Navigation to landingpage
function goToDetails(id)   
{
    console.log(id)   
    window.location.href=`./../HTML/landingPage.html?id=${id}`
}

topstoriesList();
localnewsList();
categoryCard();
topPicks();

