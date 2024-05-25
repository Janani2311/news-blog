const urlParams = new URLSearchParams(window.location.search)
const category = urlParams.get("id");
const url = `https://inshortsapi.vercel.app/news?category=${category}`;


//function to display the list of news fetched depends on the catgory which user clicked
async function newsList(){
    let data = await fetchData_News();
    console.log(data);
    let heading = document.getElementById("category-name");
    heading.innerHTML='';
    heading.innerHTML = `<h1>${category}</h1>`
    let wrapper = document.getElementById("news-list");
    wrapper.innerHTML='';
    let listgroup = document.createElement("div");
    listgroup.setAttribute("class","list-group");
    data.data.forEach((e) => {
        listgroup.innerHTML +=   `
          <a target="_blank" href="${e.readMoreUrl}" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between category-list">
                <div><img src="${e.imageUrl}" alt="${e.title}" style="height:100px; width:100px;"></div>
                <div>
                    <div class="d-flex w-100 justify-content-between landing-list">
                    <h3 class="mb-1">${e.title}</h3>
                    <small class="text-muted">${e.time}</small>
                    </div>
                    <p class="mb-1">${e.content}<p>
                    <small class="text-muted">${e.author}, ${e.date}</small>
                </div>
            </div>
          </a>
         `
    });

    wrapper.append(listgroup);
  
}

//fetch method to fetch data using API URL
async function fetchData_News(){
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
newsList();
