let body = document.getElementById('body');

let headerSep = document.getElementById('headerSeparation');
let title = document.getElementById('titleH1');
let title2 = document.getElementById('twoPoints');
let title3 = document.getElementById('titleEnd');

let linkedin = document.getElementById('linkedin');
let github =  document.getElementById('github');
let mail = document.getElementById('mail');

//Variable lié au menu
let headerSepWidth = 0;
let titlePosition = -125, title3Position = -175, linkPosition = 40; 
let titleOpacity = 0, title2Opacity = 0, title3Opacity = 0, linkOpacity = 0;
let linkCount = 0;

let nav = document.getElementById('nav');
let navMenuAnim = document.getElementById('navAnim'), navAnim = document.getElementById('navAnimMove');
let BNavAnim = document.getElementById('beforeNavAnimMove'), ANavAnim = document.getElementById('afterNavAnimMove');
let underBNav = document.getElementById('underBNav'), underANav = document.getElementById('underANav');
let li1 = document.getElementById('li1'), li2 = document.getElementById('li2');
let li3 = document.getElementById('li3'), li4 = document.getElementById('li4');
let menuPosition = 0;
let finalMenuPosition, direction;

let bordRadStart = 0, bordRadBottom = 20, bordRadBefore = 0, bordRadAfter = 10;
let move;

let colors = {
    firstColor : { R: 50, G: 53, B: 102 },
    secondColor : { R: 53, G: 108, B: 58 },
    thirdColor : { R: 116, G: 45, B: 45 },
    fourthColor : { R: 126, G: 97, B: 63 }
}
let actualColor = { R: 50, G: 53, B: 102 };
let finalColor = { R: undefined, G: undefined, B: undefined };
let colorRTrans, colorGTrans, colorBTrans;

let initialLogo = document.getElementById('lo1'), initialLogoSize = 100, initialLogoLi = li1;
let finalLogo, finalLogoSize = 0;
let actualLogo, actualLogoSize = 0;
let changeMenu = false;

//fonctions lié au menu///////////////////////////////////////////////
//permet selection de couleur progressif/harmonieux entre diff section du menu
function colorMix(){
    colorRTrans = (actualColor.R - finalColor.R)/16;
    if (colorRTrans > 0) {colorRTrans -= colorRTrans*2;}
    else if (colorRTrans < 0) {colorRTrans += Math.abs(colorRTrans)*2;}
    
    colorGTrans = (actualColor.G - finalColor.G)/16;
    if (colorGTrans > 0) {colorGTrans -= colorGTrans*2;}
    else if (colorGTrans < 0) {colorGTrans += Math.abs(colorGTrans)*2;}
    
    colorBTrans = (actualColor.B - finalColor.B)/16;
    if (colorBTrans > 0) {colorBTrans -= colorBTrans*2;}
    else if (colorBTrans < 0) {colorBTrans += Math.abs(colorBTrans)*2;}
}
//permet application des couleurs differentes  
function colorChange () {
    if (colorRTrans == undefined) { colorMix(); };
    if ((actualColor.R != finalColor.R)&&(actualColor.G != finalColor.G)&&(actualColor.B != finalColor.B)){
        if (Math.abs(finalMenuPosition - menuPosition) <= 40){
            actualColor.R += colorRTrans;
            actualColor.G += colorGTrans;
            actualColor.B += colorBTrans;
            body.style.background = "rgb(" + actualColor.R + ", " + actualColor.G + ", " + actualColor.B + ")";
            underBNav.style.background = "rgb(" + actualColor.R + ", " + actualColor.G + ", " + actualColor.B + ")";
            underANav.style.background = "rgb(" + actualColor.R + ", " + actualColor.G + ", " + actualColor.B + ")";
        }
    }
}
//gere l'arrondie du menu en fonction de sa place sur le nav
function navChangForm() {
    if((menuPosition <= 26)&&(menuPosition >= 0)){
        if ((menuPosition <= 19)&&(menuPosition >= 0)){
            nav.style.borderRadius = "20px " + (bordRadStart += direction) +"px 20px 20px";
        }
        if((menuPosition <= 26)&&(menuPosition > 16)){
            underBNav.style.borderRadius = "0px 0px 0px " + (bordRadBefore += direction) + "px";
        }
    }
    else if((menuPosition >= 125)&&(menuPosition <= 150)){
        if((menuPosition >= 131)&&(menuPosition <= 150)){
            nav.style.borderRadius = "20px 20px " + (bordRadBottom -= direction) + "px 20px";
        }
        if((menuPosition >= 125)&&(menuPosition < 135)){
            underANav.style.borderRadius = (bordRadAfter -= direction) + "px 0px 0px 0px";
        }
    }
    else if ((menuPosition > 20)&&(menuPosition < 130)){
        bordRadStart = 20; bordRadBottom = 20; 
        nav.style.borderRadius = "20px 20px 20px 20px";
        if ((menuPosition > 26)&&(menuPosition < 125)){
            bordRadBefore = 10; bordRadAfter = 10;
            underBNav.style.borderRadius = "0px 0px 0px 10px";
            underANav.style.borderRadius = "10px 0px 0px 0px";
        }
    }
}
//gere l'apparition disparition des logos du menu
function logoGrowthDegrowth() {
    if ((initialLogo.id == finalLogo.id)&&(changeMenu == true)){ }
    else {
        if(initialLogoSize <= 100){
            initialLogo.style.backgroundSize = (initialLogoSize -= 10) + '%';
            actualLogo = finalLogo;
        }
        if((finalLogoSize < 100)&&(Math.abs(menuPosition-finalMenuPosition) <= 20)){ 
            finalLogo.style.backgroundSize = (finalLogoSize += 10) + '%';
            actualLogoSize = finalLogoSize;
        }
    }
}
//calcul la position du menu
function moveMenu(positionToGo) {
    if( menuPosition > positionToGo ) {
        if ((menuPosition - positionToGo) >= 75){
            menuPosition -= 4; direction = -4; 
        }
        else if ((menuPosition - positionToGo) >= 10){
            menuPosition -= 2; direction = -2;
        }
        else{
            menuPosition -= 1; direction = -1;
        }       
    }
    else if ( menuPosition < positionToGo ) {
        if ((positionToGo - menuPosition) >= 75){
            menuPosition += 4; direction = 4;
        }
        else if ((positionToGo - menuPosition) >= 10){
            menuPosition += 2; direction = 2;
        }
        else{
            menuPosition += 1; direction = 1;
        }   
    }
    navChangForm();
    colorChange();
    logoGrowthDegrowth();
    BNavAnim.style.height = menuPosition + "px";
}
//active tout les changements lié au menu
nav.addEventListener('click', selectionNav);
function selectionNav(event){
    let liSelect = event.composedPath();
    //console.log(liSelect[0].id); console.log(liSelect[1].id);

    if (((liSelect[0].id||liSelect[1].id) == li1.id )||((liSelect[0].id||liSelect[1].id) == li2.id )||
        ((liSelect[0].id||liSelect[1].id) == li3.id )||((liSelect[0].id||liSelect[1].id) == li4.id )) {
            if ((liSelect[0].id||liSelect[1].id) == initialLogoLi.id) { }
            else{

                clearInterval(move); move = undefined; 
                colorRTrans = undefined; colorGTrans = undefined; colorBTrans = undefined; 

                if(changeMenu == true){
                    initialLogo = actualLogo;
                    initialLogoSize = actualLogoSize;
                    finalLogoSize = 0;
                }   

                if ((liSelect[0].id||liSelect[1].id) == li1.id ) {
                    finalMenuPosition = 0; finalColor = colors.firstColor; 
                    finalLogo = document.getElementById('lo1'); initialLogoLi = li1;
                }
                else if ((liSelect[0].id||liSelect[1].id) == li2.id ) {
                    finalMenuPosition = 50; finalColor = colors.secondColor; 
                    finalLogo = document.getElementById('lo2'); initialLogoLi = li2;
                }
                else if ((liSelect[0].id||liSelect[1].id) == li3.id ) {
                    finalMenuPosition = 100; finalColor = colors.thirdColor; 
                    finalLogo = document.getElementById('lo3'); initialLogoLi = li3;
                }
                else if ((liSelect[0].id||liSelect[1].id) == li4.id ) {
                    finalMenuPosition = 150; finalColor = colors.fourthColor; 
                    finalLogo = document.getElementById('lo4'); initialLogoLi = li4;
                }
    
                if (changeMenu == false) { changeMenu = true; }
            
                move = setInterval(function(){ 
                    moveMenu(finalMenuPosition);
                    if(menuPosition == finalMenuPosition){
                        clearInterval(move);
                        colorRTrans = undefined; colorGTrans = undefined; colorBTrans = undefined;
                    }
                }, 10);
        }
    }
}

//fonction lié aux animation d'ouverture de page
//animation titre et lien a l'ouverture page
function openning(){
    if (headerSepWidth <= 95){
        if(headerSepWidth <= 45){
            headerSepWidth += 5;
        }
        else if (headerSepWidth <= 70){
            headerSepWidth += 2.5;
        }
        else if (headerSepWidth <= 90){
            headerSepWidth += 1.25;
        }
        else { headerSepWidth += 0.625;}
        headerSep.style.width = headerSepWidth + '%';
    }
    else {
        if (titlePosition <5){
            if (titleOpacity <= 1){
                titleOpacity += 0.028573;
                title.style.opacity = titleOpacity;
            }
            if (titlePosition <= -30){
                titlePosition += 5;
            }
            else if (titlePosition <= -5){
                titlePosition += 2.5;
            }
            else{ titlePosition += 1.25; }
            title.style.marginLeft = titlePosition + 'px';
        }

        else{
            if(title2Opacity <= 1){
                title2Opacity +=0.05;
                title2.style.opacity = title2Opacity;
            }

            if (title2Opacity >= 1){
                if (title3Position <= -40){
                    title3Opacity += 0.0125;
                    title3Position+= 5;
                    title3.style.opacity = title3Opacity;
                    title3.style.marginLeft = title3Position + 'px';
                }
                else if (title3Position <= -10){
                    title3Opacity += 0.03;
                    title3Position+= 2.5;
                    title3.style.opacity = title3Opacity;
                    title3.style.marginLeft = title3Position + 'px';
                }
                else if (title3Position < 0){
                    title3Opacity += 0.0457;
                    title3Position+= 1.25;
                    title3.style.opacity = title3Opacity;
                    title3.style.marginLeft = title3Position + 'px'; 
                }
                else {
                    if (linkCount == 0){ positionLink(linkedin); }
                    else if (linkCount == 1){ positionLink(github); }
                    else if (linkCount == 2){ positionLink(mail); }
                    }

                    /*clearInterval(open);*/

            }
        }
    }
}
//animation des liens a l'ouverture page
function positionLink(linkName){
    if (linkPosition >= 15){
        linkPosition -= 5;
        linkOpacity += 0.091;
    }
    else if (linkPosition >= 0){
        linkPosition -= 2.5;
        linkOpacity += 0.091;
    } 
    else if (linkPosition > -5) {
        linkPosition -= 1.25;
        if (linkOpacity < 0.98){
            linkOpacity += 0.091;   
        }  
    }
    linkName.style.marginTop = linkPosition + 'px';
    linkName.style.opacity = linkOpacity;
    if(linkPosition == -5){
        linkCount ++; linkOpacity = 0, linkPosition = 40;
    }
}

open = setInterval(openning, 11);

var loc = window.location.href;
console.log(loc);
