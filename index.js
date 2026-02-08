const deskNews = document.getElementById('deskNews');
const extent = document.getElementById('extent');
const create = document.getElementById('create');

function homePage(){
    deskNews.style.display = 'block';
    extent.style.display = 'none';
    create.style.display = 'none';
}

function extentNwes(){
    extent.style.display = 'block';
    // extent.style.position = 'absolute';
}
function close(){
    deskNews.style.display = 'none';
    extent.style.display = 'none';
    extent.style.background = '#000'
    console.log(123);
    
}

function upload(){
    deskNews.style.display = 'none';
    extent.style.display = 'none';
    create.style.display = 'block';
}