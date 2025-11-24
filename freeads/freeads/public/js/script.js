let slide1 = document.getElementById("slide1");
let slide2 = document.getElementById("slide2");
let valeur1 =document.getElementById("prix1");
let valeur2 = document.getElementById("prix2");
let espace = 1;

//data table
//new DataTable('#example');

function slidE1(){
    if(parseInt(slide2.value)-parseInt(slide1.value) <= espace){
        slide1.value = parseInt(slide2.value) - espace;
    }
    let nombreFormate = parseInt(slide1.value).toLocaleString('us-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true
    })
    valeur1.textContent = nombreFormate;
}


function slidE2(){
    if(parseInt(slide2.value)-parseInt(slide1.value) <= espace){
        slide2.value = parseInt(slide1.value) + espace;
    }
    let nombreFormate = parseInt(slide2.value).toLocaleString('us-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true
    })
    valeur2.textContent = nombreFormate;
}