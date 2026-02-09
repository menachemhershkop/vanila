// import 'dotenv/config';
// require('dotenv').config()
const deskNews = document.getElementById('deskNews');
const card = document.getElementById('card');
const extent = document.getElementById('extent');
const create = document.getElementById('create');
const submit = document.getElementById('submit');
let img;

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
        // console.log(typeof local);
        
        local.forEach(element => {
            // console.log(element);
            
        deskNews.innerHTML += `
        <section class="card" onclick="extentNwes(this)" id="${element.id}">
        <div class="author">${element.source.name}</div>
            <div class="title"><a href=${element.url} >${element.title}</a></div><br>
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
    // console.log(item.id);
    
    extent.style.display = 'block';
    // extent.style.position = 'absolute';
    const local = JSON.parse(localStorage.getItem('item'));
    const title = local.filter(title => title.id == item.id);
    // console.log(title[0]);
    const extra = document.createElement('section');
    extra.innerHTML = `
        <div class="author">${title[0].source.name}</div>
            <div class="title"><a herf=${title[0].url} >${title[0].title}</a></div><br>
            <div class="urlToImage"><img src=${title[0].image} alt="pic" height="100"></div>
            <div class="des">${title[0].content}</div>
            <button onclick="getNews()">Close</button>
        `
    extra.classList = 'extent'
    deskNews.innerHTML = ""
    deskNews.appendChild(extra)

}
function close(){
    console.log(123);
    extent.style.display = 'none';
    // extent.style.background = '#000'
    getNews()

    
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
// async function news(){
// const news =await fetch(url);
// const data =await news.json();
// deskNews.innerHTML = "";
// data.articles.forEach(element => {

//     deskNews.innerHTML += `
//     <section class="card" onclick="extentNwes(this)">
//      <div class="author">${element.source.name}</div>
//         <div class="title"><a herf=${element.url} >${element.title}</a></div><br>
//          <div class="des">${element.description}</div>
//         <div class="urlToImage"><img src=${element.image} alt="pic" height="100"></div>
//     </section>    
//     `
// });
// }
// // news()
getNews()

create.addEventListener('submit', (e)=>{
    
    e.preventDefault()
    // console.log(e.target[0].value);
    const formData  = new FormData(create)
    // console.log(Object.fromEntries(formData).content);
    // const img = toDataURL(Object.fromEntries(formData).image,(a)=>{console.log(a)
    // })
    console.log(img);
    
    const story = {id:Math.floor(Math.random()*10**10), title:Object.fromEntries(formData).title, content:Object.fromEntries(formData).content, description:Object.fromEntries(formData).description, source:{name:'העלאה באתר'}, image:img}
    // story.source.name = 'העלאה באתר'
    // console.log(story);
    const local = JSON.parse(localStorage.getItem('item'));
    local.push(story)
    // local.json()
    // console.log(local);
    
    localStorage.setItem('item', JSON.stringify(local))
    
})

// function toDataURL(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       callback(reader.result);
//     }
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }

function encodeImageFileAsURL(element) {
var file = element.files[0];
var reader = new FileReader();
reader.onloadend = function() {
    // document.pic64.value =reader.result;
console.log('RESULT:', reader.result);
img = reader.result;
}
reader.readAsDataURL(file);
}