
let titre;
let imageFilm;
let tabtitre = []; 
let modale = document.querySelector(".modal");
let rechTitre = document.querySelector("#champRech");
let fond = document.querySelector(".fondFilm");
let fondFilm = document.querySelector("#fond");
let imagesFilm = document.querySelector(".imageTitre");
let titreModale = document.querySelector(".modal-title");
let ma_recherch = sessionStorage.getItem('search');
console.log(titreModale);

//-------------evenement recherche input enter---------------------------------------------
rechTitre.addEventListener("keyup",(event) => {
     if(event.keyCode == 13){
        titre = document.querySelector("#champRech").value;
        console.log(titre);
        rechTitre.value = "";
        sessionStorage.setItem('search',titre);
        window.location.href = "/films.html";     
    }})

//-------------evenement recherche input click---------------------------------------------  
function rechTitres() {
    
       titre = document.querySelector("#champRech").value;
       console.log(titre);
       rechTitre.value = "";
       sessionStorage.setItem('search',titre);
       window.location.href = "/films.html";     
   }


    recherche()
//------------------------------fonction recherche-----------------------------------    
async function recherche(){
 await fetch ("http://www.omdbapi.com/?s="+ma_recherch+"&apikey=e19963b")
    .then(Response => Response.json())
    .then(data => {
        let totalTitres = [...data.Search];
        console.log(totalTitres);
        
        for (let i=0; i<totalTitres.length;i++){
            if(totalTitres[i].Type == "movie"){
               
            tabtitre.push(totalTitres[i].Title) ;  
            imageFilm = document.createElement('img');
            imageFilm.setAttribute("src",totalTitres[i].Poster);
            imageFilm.setAttribute("class","imageTitre class"+i);
            imageFilm.setAttribute("data-bs-target","#modalFilm");
            imageFilm.setAttribute("data-bs-toggle","modal");
            fondFilm.append(imageFilm);  
             
            }
            titreModale.textContent = totalTitres[i].Title; 
        }
        console.log(tabtitre);
    })
    .catch(error =>console.error(error))
}

// imagesFilm.addEventListener('click', (e)=>{  
//      console.log("ça marche");
//     console.log(titreModale) ;
//     // modale.style.display = "block";
//     titreModale.textContent = "";
// }); 
