const landpageImg = document.querySelector(".landpage__divImg-img");
const landpageDivImg = document.querySelector(".landpage__divImg");
let cat;
let bestqualities = [];

//RESET SCROLL ONLOAD
// addEventListener("load",()=>{
//     scroll(0,0);
// })

const getImg = async() => {
    fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",{
        method: "GET",
        headers: {"x-api-key":"live_LpcOOa2VUTBXwXsRz3h1r3iyjibZtUVDGvyna8TkQy814hIixStPaRWwYvxf6r39"}
    })
    .then(res => res.json())
    .then(res => {
        document.querySelector(".landpage__divImg-img").setAttribute("src",res[0].url);
        document.querySelector(".maininfo__divImg-img").setAttribute("src",res[0].url);
        document.querySelector(".thirdsection__divImg-img").setAttribute("src",res[0].url);
        cat = res;
    })
    .catch(e => {
        console.log("Error:" + e);
        document.querySelector(".landpage__divError").classList.add("landpage__divImg--active");
    });
}


landpageImg.addEventListener("load",()=>{
    let catPhrase = `Hi, I'm ${cat[0].breeds[0].name}`;
    let letter = 0;
    console.log(cat)
    document.querySelector(".landpage__divImg").classList.add("landpage__divImg--active");
    document.querySelector(".landpagebg").style.filter = "brightness(.25) contrast(1.06)";

    let intervalo = setInterval(() => {
        document.querySelector(".landpage__h2").textContent += catPhrase[letter];
        letter++;
        if(letter == catPhrase.length){
            clearInterval(intervalo);
            document.querySelector(".landpage__seemore").classList.add("landpage__seemoreAnim");
        }
    }, Math.random() * (120 - 70) + 70);

    document.querySelector(".maininfo > p").innerHTML =
        `« Hi, I'm <b>${cat[0].breeds[0].name}</b>, I consider myself ${cat[0].breeds[0].temperament.toLowerCase()}... among a lot moowr awesome qualities. <br>
        I hope you can learn some things about me in this purrwsome web. »`;
    
    document.querySelector(".secondsection > p").textContent = cat[0].breeds[0].description;

    let iterator = 0;
    for(i in Object.keys(cat[0].breeds[0])){
        let objeto = Object.keys(cat[0].breeds[0]);
        if(cat[0].breeds[0][objeto[i]] >= 4){
            bestqualities[iterator] = [objeto[i], cat[0].breeds[0][objeto[i]]];
            iterator++;
        }
    }

    const thirdsection__h2 = document.querySelectorAll(".thirdsection h2");
    for(let i = 0; i < 6; i++){
        bestqualities[i][0] = bestqualities[i][0].replace("_"," ");
        thirdsection__h2[i].innerHTML = bestqualities[i][0].toUpperCase();
        let h2 = document.createElement("h2");
            for(let j = 0; j < bestqualities[i][1]; j++){
                h2.textContent += "★";
            }
            if(bestqualities[i][1] == 4) h2.textContent += "☆";
            thirdsection__h2[i].appendChild(h2)
    }
})
getImg();


//FIX ANIMATIONS ON END
landpageDivImg.addEventListener("animationend",()=>{
    landpageDivImg.style.opacity = "1";
    landpageDivImg.style.transform = "scale(130%) translateY(100px)";
    landpageDivImg.style.filter = "brightness(1)";
})
document.querySelector(".landpage__divError").addEventListener("animationend",()=>{
    document.querySelector(".landpage__divError").style.opacity = "1";
    document.querySelector(".landpage__divError").style.transform = "scale(130%) translateY(100px)";
    document.querySelector(".landpage__divError").style.filter = "brightness(1)";
})

const overhere = document.querySelector(".overhere");
const maininfo = document.querySelector(".maininfo");
const secondsection_p = document.querySelector(".secondsection > p");
const secondsection_h2 = document.querySelector(".secondsection > h2");
const stars = document.querySelector(".stars");
addEventListener("scroll",(e)=>{
    if(window.scrollY > 750){
        document.querySelector(".maininfo__divImg").style.opacity = "1";
    }
    if(window.scrollY > 966 && window.scrollY < 1600){
        maininfo.style.transform = `translate(${(window.scrollY - 966) ** 1.1}px,${-(window.scrollY - 966)}px)`;
        secondsection_p.style.transform = `translate(${(window.scrollY - 966) ** 1.1}px,${-(window.scrollY - 966)}px)`;
        secondsection_h2.style.transform = `translate(${(window.scrollY - 966) ** 1.1}px,${-(window.scrollY - 966)}px)`;
        stars.style.transform = `translate(${(window.scrollY - 966) * 1.5}px,${-(window.scrollY - 966)}px)`;

        document.querySelector(".thirdsection").style.transform = `translate(${(window.scrollY - 1600) * 1.2}px, ${-(window.scrollY - 1600)}px)`;

    }
    if(window.scrollY < 966){
        maininfo.style.transform = `translate(0,0)`;
        secondsection_p.style.transform = `translate(0,0)`;
        secondsection_h2.style.transform = `translate(0,0)`;
        stars.style.transform = `translate(0,0)`;
        document.querySelector(".thirdsection").style.transform = `translate(0,0)`;
    }
    if(window.scrollY > 1600){
        document.querySelector(".thirdsection").style.transform = `translate(0,0)`;
    }
})

//STAR ANIMATIONS
document.querySelector("star").addEventListener("click",()=>{
    document.querySelector("star").classList.add("starAnim");
})

let direction = "right";
setInterval(() => {
    if(direction == "right"){
        document.querySelector(".title img").style.transform = "rotate(30deg)";
        direction = "left";
    }else{
        document.querySelector(".title img").style.transform = "rotate(-30deg)";
        direction = "right";
    }
}, 1000);

document.querySelector("input").addEventListener("click",()=>{
    window.open("https://www.instagram.com/isma.hr17/")
})