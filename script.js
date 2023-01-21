
let titre;
let imageFilm;
let totalTitres;
let ma_recherch;
let images;
let tabtitre = []; 
let modale = document.querySelector("#modalFilm");
let rechTitre = document.querySelector("#champRech");
let fond = document.querySelector(".fondFilm");
let fondFilm = document.querySelector("#fond");
let titremsg = document.querySelector("h3");
let imagesbox = document.querySelector("#surcouche #msgbox #imageBox");
let boutonMsgBox = document.querySelector("#surcouche #msgbox #case");

let surcouche1 = document.querySelector("#surcouche");

let titreModale = document.querySelector(".modal-title");

function selection(){

    //let pointeur = event.target.dataset.key;
       console.log("ca marche");
       surcouche1.style.display = "block";
  
   }

//-------------evenement recherche input enter---------------------------------------------
rechTitre.addEventListener("keyup",(event) => {
     if(event.keyCode == 13){
        titre = document.querySelector("#champRech").value;
        console.log(titre);
        rechTitre.value = "";
        sessionStorage.setItem('search',titre);
        
        window.location.href = "/films.html"; 
   

}})
ma_recherch = sessionStorage.getItem('search');
recherche();
//-------------evenement recherche input click---------------------------------------------  
function rechTitres() {
    
       titre = document.querySelector("#champRech").value;
       console.log(titre);
       rechTitre.value = "";
       sessionStorage.setItem('search',titre);
       window.location.href = "/films.html"; 
          
   }


    
//------------------------------fonction recherche-----------------------------------    
async function recherche(){
    
 await fetch ("http://www.omdbapi.com/?s="+ma_recherch+"&apikey=e19963b")
    .then(Response => Response.json())
    .then(data => {
         totalTitres = [...data.Search];
        console.log(totalTitres);
        
        for (let i=0; i<totalTitres.length;i++){
            if(totalTitres[i].Type == "movie"){
               
            tabtitre.push(totalTitres[i].Title) ;  
            imageFilm = document.createElement('img');
            imageFilm.setAttribute("src",totalTitres[i].Poster);
            imageFilm.setAttribute("type","button");
            imageFilm.setAttribute("class","imageTitre class"+i);
            imageFilm.setAttribute("id","imageTitre"+i);
            imageFilm.setAttribute("data-key",i);
            imageFilm.setAttribute("onclick","selection");
                       fondFilm.append(imageFilm); 
           
             
            }  
        }
        if (fondFilm.hasChildNodes()) {
            images = fondFilm.querySelectorAll("img");
        }
        console.log(images); 
    })
   
    .catch(error =>console.error(error));
    images.forEach((image, index) => {
        image.addEventListener("click", () => {
            let titre = tabtitre[index];
            surcouche1.style.display = "block";
            titremsg.textContent = titre;
            imagesbox.setAttribute("src",totalTitres[index].Poster);
        });
    }); 
}



console.log(images); 
boutonMsgBox.addEventListener('click',()=> surcouche1.style.display = "none")