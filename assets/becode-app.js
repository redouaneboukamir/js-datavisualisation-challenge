/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 

Your name :    Boukamir Redouane 
Date :  14 november 2018
Contact information : redouaneboukamir@gmail.com

What does this script do ? 
...

*/

// Your scripting goes here...
// Recuperation des ID
const InsertAfter = document.getElementById('Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police');
const InsertAfterTwo = document.getElementById('Homicides');
const TableOne = document.getElementById('table1');
const TableTwo = document.getElementById('table2');

// Insertion garaphique Avant titre tableau
let Graph = document.createElement("div");
Graph.setAttribute("class","Graphique");
Graph.setAttribute("id","Graphique");
InsertAfter.appendChild(Graph);

// Deuxieme Graphique
let GraphTwo = document.createElement("div");
GraphTwo.setAttribute("class","Graphique");
GraphTwo.setAttribute("id","GraphiqueTwo");
InsertAfterTwo.appendChild(GraphTwo);
                             
// Recuperation td 1er tableau
const TdTableOne = TableOne.getElementsByTagName('td');
const TdTableTwo = TableTwo.getElementsByTagName('td');
const Letter = /[A-Z]/gi
let j =0, pos = 0;

// Recupération ligne pays en tableau 2 dimensions
let data = [], dataTwo = [], DonnesTwo = [], Donnes = [];
let index = 0;

// Table 1
for(let i = 0; i < TdTableOne.length ; i++){
    let pays = {};
    if(TdTableOne[i].innerHTML.match(Letter)){
        pos = i;
        let k=0;
        for(j ; j < (pos+12); j++){
            pays[k]=TdTableOne[j].innerHTML;
            k++;
            if(k==12){
                data.push(pays);
            }
        }
    }
};
// Tableau d'objets
for(let j = 2; j < 13 ; j++){
    for(let i = 0; i < data.length ; i++){

            if(j >= 10){
                let Annee = {"Années":"20"+j, "infractions": data[i][j-1], "Pays":data[i][0]};
                Donnes.push(Annee);
            }else{
                let Annee = {"Années":"200"+j, "infractions": data[i][j-1], "Pays":data[i][0]};
                Donnes.push(Annee);
            }
    }
}
// Suppression des ":"
for(let i = 0; i < Donnes.length ; i++){
    if(Donnes[i].infractions == ":"){
        Donnes.splice(i,1);
    }
}
// Dessin graphique
let svg = dimple.newSvg("#Graphique", 790, 400);
let Chart = new dimple.chart(svg,Donnes);
const x = Chart.addCategoryAxis("x","Années");
const y = Chart.addMeasureAxis("y", "infractions");
Chart.addSeries("Pays", dimple.plot.line);
Chart.addLegend(10, 0, 800, 100, "right");
Chart.draw();

// table 2
pos =0;
j = 0;
for(let i = 0; i < TdTableTwo.length ; i++){
    let pays = {};
    if(TdTableTwo[i].innerHTML.match(Letter)){
        pos = i;
        let k=0;
        for(j ; j < (pos+3); j++){
            pays[k]=TdTableTwo[j].innerHTML;
            k++;
            if(k==3){
                dataTwo.push(pays);
            }
        }
    }
};
// Remplissage Tableau Donnes
let k =1;
for(let j = 7; j < 13 ; j+=3){
    for(let i = 0; i < dataTwo.length ; i++){

            if(j >= 10){
                let Annee = {"Années":`20${j} -${j+2}`, "Homicide": dataTwo[i][k], "Pays":dataTwo[i][0]};
                DonnesTwo.push(Annee);
            }else{
                let Annee = {"Années":`200${j} -0${j+2}`, "Homicide": dataTwo[i][k], "Pays":dataTwo[i][0]};
                DonnesTwo.push(Annee);
            }
    }
    k++;
}
console.log(DonnesTwo)

let svg2 = dimple.newSvg("#GraphiqueTwo", 590, 400);
let Chart2 = new dimple.chart(svg2,DonnesTwo);
const x2 = Chart2.addCategoryAxis("x","Années");
const y2 = Chart2.addMeasureAxis("y", "Homicide");
Chart2.addSeries("Pays", dimple.plot.circle);
Chart2.addLegend(60, 10, 500, 20, "right");
Chart2.draw();
