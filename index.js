// import 'dotenv/config';
// require('dotenv').config()
const deskNews = document.getElementById('deskNews');
const card = document.getElementById('card');
const extent = document.getElementById('extent');
const create = document.getElementById('create');
// console.log(process.env.API);
const url = 'https://gnews.io/api/v4/top-headlines?category=general&lang=he&country=il&max=10&apikey=717174a865271784e43562cffe989640'

async function getNews(){
    if (localStorage.getItem("item") === null) {
        const news =await fetch(url);
        const data =await news.json();
        
        localStorage.setItem('item', JSON.stringify(data.articles))
        return getNews()
    }
    else{
        deskNews.innerHTML = "";
        const local = JSON.parse(localStorage.getItem('item'));
        local.forEach(element => {
        deskNews.innerHTML += `
        <section class="card" onclick="extentNwes(this)" id="${element.id}">
        <div class="author">${element.source.name}</div>
            <div class="title"><a herf=${element.url} >${element.title}</a></div><br>
            <div class="des">${element.description}</div>
            <div class="urlToImage"><img src=${element.image} alt="pic" height="100"></div>
        </section>    
        `
        return
});        
    }
}
function homePage(){
    getNews()
    deskNews.style.display = 'grid';
    extent.style.display = 'none';
    create.style.display = 'none';
}

function extentNwes(item){
    console.log(item.id);
    
    extent.style.display = 'block';
    // extent.style.position = 'absolute';
    const local = JSON.parse(localStorage.getItem('item'));
    const title = local.filter(title => title.id == item.id);
    console.log(title[0]);
    const extra = document.createElement('section');
    extra.innerHTML = `
        <div class="author">${title[0].source.name}</div>
            <div class="title"><a herf=${title[0].url} >${title[0].title}</a></div><br>
            <div class="urlToImage"><img src=${title[0].image} alt="pic" height="100"></div>
            <div class="des">${title[0].content}</div>
            <button onclick="close()">Close</button>
        `
    extra.classList = 'extent'
    deskNews.innerHTML = ""
    deskNews.appendChild(extra)

}
function close(){
    console.log(123);
    extent.style.display = 'none';
    // extent.style.background = '#000'
    news()

    
}
extent.addEventListener('click', ()=>{
    console.log(123);
    deskNews.style.display = 'none';
    extent.style.display = 'none';
})

function upload(){
    deskNews.style.display = 'none';
    extent.style.display = 'none';
    create.style.display = 'block';
}
async function news(){
const news =await fetch(url);
const data =await news.json();
deskNews.innerHTML = "";
data.articles.forEach(element => {

    deskNews.innerHTML += `
    <section class="card" onclick="extentNwes(this)">
     <div class="author">${element.source.name}</div>
        <div class="title"><a herf=${element.url} >${element.title}</a></div><br>
         <div class="des">${element.description}</div>
        <div class="urlToImage"><img src=${element.image} alt="pic" height="100"></div>
    </section>    
    `
});
}
// news()
getNews()