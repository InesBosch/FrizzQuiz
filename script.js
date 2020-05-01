var apiKey = "5a5474fd63875fccee47ce53a36563d5";

/*Initializing booleans to save quiz results*/

var wavy = false;

var curly = false;

var coily = false;

var fine = false;

var medium = false;

var coarse = false;

var straight = false;

function straightClicked(){
    straight = true;
    wavy = false;
    curly = false;
    coily = false;
    return straight;
}

function wavyClicked(){
    straight = false;
    wavy = true;
    curly = false;
    coily = false;
    return wavy;
}

function curlyClicked(){
    straight = false;
    wavy = false;
    curly = true;
    coily = false;
    return curly;
}

function coilyClicked(){
    straight = false;
    wavy = false;
    curly = false;
    coily = true;
    return coily;
}

function fineClicked(){
    fine = true;
    medium = false;
    coarse = false;
    return fine;
}

function mediumClicked(){
    fine = false;
    medium = true;
    coarse = false;
    return medium;
}

function coarseClicked(){
    fine = false;
    medium = false;
    coarse = true;
    return coarse;
}

function displayResults(){

    var location = document.getElementById("location").value;

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    document.getElementById("results").style.background = "#97d3c7";

    var parent = document.getElementById("results");

    var textNode;

    var textNode2;

    fetch(url).then(response => response.json())

    .then(data => { 
        var humidity = data['main']['humidity'];
        if(humidity < 50){
            textNode = document.createTextNode("Your hair forecast: NO FRIZZ!\n");
            textNode2 = document.createTextNode("Humidity in your city is low today; we recommend to follow your regular routine.\n");
        }
        if(humidity >= 50){
            textNode = document.createTextNode("Your hair forecast: Frizzy!\n");
            if(straight == true){
               if(fine == true){
                textNode2 = document.createTextNode("For thin straight hair we recommend: \n Frizz smoothing hair sheets");
               }
               if(medium == true){
                textNode2 = document.createTextNode("For medium straight hair we recommend: \n A light oil");
               }
               if(coarse == true){
                textNode2 = document.createTextNode("For coarse straight hair we recommend: \n A leave-in spray");
               }
            }
           if(wavy == true){
               if(fine == true){
                textNode2 = document.createTextNode("For thin wavy hair we recommend: \n A styling mousse");
               }
               if(medium == true){
                textNode2 = document.createTextNode("For medium wavy hair we recommend: \n A styling mousse and an oil");
               }
               if(coarse == true){
                textNode2 = document.createTextNode("For coarse wavy hair we recommend: \n A styling lotion and an oil");
               }
            }
            if(curly == true){
                if(fine == true){
                 textNode2 = document.createTextNode("For thin curly hair we recommend: \n A styling mousse ");
                }
                if(medium == true){
                    textNode2 = document.createTextNode("For medium curly hair we recommend: \n A styling lotion and mousse");
                }
                if(coarse == true){
                    textNode2 = document.createTextNode("For coarse curly hair we recommend: \n A styling lotion and gel ");
                }
             }
             if(coily == true){
                if(fine == true){
                 textNode2 = document.createTextNode("For thin coily hair we recommend: \n Gel");
                }
                if(medium == true){
                    textNode2 = document.createTextNode("For medium coily hair we recommend: \n A styling lotion and gel");
                }
                if(coarse == true){
                    textNode2 = document.createTextNode("For coarse coily hair we recommend: \n A leave-in cream and gel");
                }
             }
            
        }
        parent.appendChild(textNode);
        parent.appendChild(textNode2);
    });
}
