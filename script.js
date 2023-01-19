
let titre
let rechTitre = document.querySelector("#champRech");
let fond = document.querySelector(".fond");

rechTitre.addEventListener("keyup",(event) => {
     if(event.keyCode == 13){
        titre = document.querySelector("#champRech").value;
        console.log(titre);
        rechTitre.value = "";
        recherche()
    }})

async function recherche(){
 await fetch ("http://www.omdbapi.com/?s="+titre+"&apikey=e19963b")
    .then(Response => Response.json())
    .then(data => {
        let totalTitres = [...data.Search];
        console.log(totalTitres);
        fond.setAttribute("src",totalTitres[0].Poster)

    })
    .catch(error =>console.error(error))
}


