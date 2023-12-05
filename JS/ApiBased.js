const apiKey = '5f5f22acff0f4e84adfbf632971f18bd';

const url = 'https://newsapi.org/v2/everything?q=';
const searchBtn = document.querySelector(".search-btn");
const text = document.querySelector('.search-txt');
const darkMode = document.querySelector('.bx-moon');
const menu = document.querySelector('.bx-menu');
const card = document.getElementById('cardTemp');


window.addEventListener('load',() =>fetchNews('India'));


async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    bindData(data.articles);
    // console.log(data);
}

function bindData(articles){
    const card_con = document.getElementById('card-con');

    card_con.innerHTML="";

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone = card.content.cloneNode(true);
        // console.log(cardClone);
        fillCard(cardClone,article);
        card_con.appendChild(cardClone);
    });
}

function fillCard(cardClone,article){
    const newImg = cardClone.getElementById('newsImg');
    const newsTitle = cardClone.getElementById('newsTitle');
    const newsDes = cardClone.getElementById('newsDes');
    const newsSrc = cardClone.getElementById('newsSrc');

    newImg.src= article.urlToImage;
    newsTitle.innerHTML = String((article.title)).slice(0,65)+"...";
    if(article.description!==""){
    newsDes.innerHTML = String((article.description)).slice(0,85)+"...";
}

    const date = new Date(article.publishedAt).toLocaleString('en-US',{timeZone:'Asia/Jakarta'});
    newsSrc.innerHTML = article.source.name +" "+ date+".";

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    })
    
}


function news(id){
    const currSlected = document.querySelector('.active');
    const navItem = document.getElementById(id);
    // console.log(text);


   if(currSlected){
    currSlected.classList.remove('active');
}
navItem.classList.add('active');
text.value="";

    fetchNews(id);
}





function callThis(){
    const currSlected = document.querySelector('.active');
    const query = text.value;
    // console.log(query);
    if(!query) return;
    if(currSlected)
    currSlected.classList.remove('active');
    fetchNews(query);
}
        searchBtn.addEventListener('click',()=>callThis());

        text.addEventListener('keyup',(event)=>{
            if(event.code === 'Enter' ){
                callThis();
            }
        });
    
    function reload(){
        window.location.reload();
    }

    darkMode.addEventListener('click',()=>{
        darkMode.classList.toggle('bx-sun');
        darkMode.classList.toggle('bx-moon');

        // var rootCss = document.querySelector(":root");
        // if(darkMode.classList.contains('bx-sun')){
        //     rootCss.style.setProperty('--II-bg','#fff');   
            const nav = document.querySelector('.navbar');
            const cards = document.querySelector('.cards');
            // card.classList.toggle('sunCard');
            cards.classList.toggle('sunCards');
            nav.classList.toggle('sunNav');
            
        // }
        // else{
        //     rootCss.style.setProperty('#fff','--II-bg');
        // }
    });

    const nav = document.getElementById('navVer');
    function show(){
        // console.log(nav)
        nav.classList.toggle('ac');
            // nav.classList.toggle('verNav');
            menu.classList.toggle('bx-menu');
            menu.classList.toggle('bx-collapse');    
    }

    window.onscroll = () =>{
        nav.classList.remove('ac');
       if(menu.classList.contains('bx-collapse')){
        menu.classList.remove('bx-collapse');
        menu.classList.add('bx-menu');
       }
        
    }