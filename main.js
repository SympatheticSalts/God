function share(){
    try {
        var img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
    } catch(e) {
        var img = canvas.toDataURL().split(',')[1];
    }
    // open the popup in the click handler so it will not be blocked
    var w = window.open();
    w.document.write('Uploading...');
    // upload to imgur using jquery/CORS
    // https://developer.mozilla.org/En/HTTP_access_control
    $.ajax({
        url: 'http://api.imgur.com/2/upload.json',
        type: 'POST',
        data: {
            type: 'base64',
            // get your key here, quick and fast http://imgur.com/register/api_anon
            key: 'YOUR-API-KEY',
            name: 'neon.jpg',
            title: 'test title',
            caption: 'test caption',
            image: img
        },
        dataType: 'json'
    }).success(function(data) {
        w.location.href = data['upload']['links']['imgur_page'];
    }).error(function() {
        alert('Could not reach api.imgur.com. Sorry :(');
        w.close();
    });
}



document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

function activateButton(id){
    document.getElementById(document.querySelector('.active-navbar').id).classList.remove("active-navbar");
    document.getElementById(id).classList.add("active-navbar");
}

function jump(id){
    document.getElementById(id+"-Section").scrollIntoView(true);

}

function shrinkButtons(){
    var cusid_ele = document.getElementsByClassName("navbar-button")
    for (var i = 0; i < cusid_ele.length; ++i) {
        var item = cusid_ele[i];  
        item.toggleAttribute('stuck')
    }
    document.getElementById('sticky-div').toggleAttribute('stuck')
}

const observer = new IntersectionObserver( ([e]) => shrinkButtons(),{threshold: [1]});
  
observer.observe(document.getElementById('sticky-div'));

function goToByScroll(id){
    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}

addEventListener('click', function (ev) {
    if (ev.target.classList.contains('navbar-button')) {
        ev.preventDefault();
    }   
});

function selectPhysique(id){
    const active = document.querySelector('.active-physique')
    
    if (active != null){
        active.classList.remove("active-physique");
    }
    document.getElementById(id).classList.add("active-physique");
}
function selectMuscle(id){
    const active = document.querySelector('.active-muscle')
    if (active != null){
        active.classList.remove("active-muscle");
    }
    document.getElementById(id).classList.add("active-muscle");
}
function selectBreast(id){
    const active = document.querySelector('.active-breast')
    if (active != null){
        active.classList.remove("active-breast");
    }
    document.getElementById(id).classList.add("active-breast");
}
function selectButt(id){
    const active = document.querySelector('.active-butt')
    if (active != null){
        active.classList.remove("active-butt");
    }
    document.getElementById(id).classList.add("active-butt");
}
function selectHair(id){
    const active = document.querySelector('.active-hair')
    if (active != null){
        active.classList.remove("active-hair");
    }
    document.getElementById(id).classList.add("active-hair");
}
function selectSpecies(id){
    const active = document.querySelector('.active-species')
    if (active != null){
        active.classList.remove("active-species");
    }
    document.getElementById(id).classList.add("active-species");
}

function submit(){
    let physique = (document.querySelector('.active-physique'))
    let muscle = (document.querySelector('.active-muscle'))
    let breast = (document.querySelector('.active-breast'))
    let butt = (document.querySelector('.active-butt'))
    let hair = (document.querySelector('.active-hair'))
    let species = (document.querySelector('.active-species'))
    
    let missing = ""

    if(physique == null){
        if (missing != ""){
            missing += ", "
        }
        missing += "Physique"
    }
    if(muscle == null){
        if (missing != ""){
            missing += ", "
        }
        missing += "Muscle"
    }
    if(breast == null){
        if (missing != ""){
            missing += ", "
        }
        missing += "Breast"
    }
    if(butt == null){
        if (missing != ""){
            missing += ", "
        }
        missing += "Butt"
    }
    if(hair == null){
        if (missing != ""){
            missing += ", "
        }
        missing += "Hair"
    }
    if(species == null){
        if (missing != ""){
            missing += ", "
        }
        missing += "Species"
    }


    if (missing != ""){
        alert("Missing the following: " + missing);
    } else {
        const images = [physique.getElementsByTagName('img')[0], muscle.getElementsByTagName('img')[0], breast.getElementsByTagName('img')[0], butt.getElementsByTagName('img')[0], hair.getElementsByTagName('img')[0], species.getElementsByTagName('img')[0]];
        const outputImageAspectRatio = 4/5;
        
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 480*2*6;
        canvas.height = 650*2;


        for (let i = 0; i < images.length; i++) {
            let inputWidth = images[i].naturalWidth;
            let inputHeight = images[i].naturalHeight;
            let inputImageAspectRatio = inputWidth / inputHeight;

            let outputWidth = inputWidth;
            let outputHeight = inputHeight;

            if (inputImageAspectRatio > outputImageAspectRatio) {
                outputWidth = inputHeight * outputImageAspectRatio;
            } else if (inputImageAspectRatio < outputImageAspectRatio) {
                outputHeight = inputWidth / outputImageAspectRatio;
            }

            let outputX = (outputWidth - inputWidth) * 0.5;
            let outputY = (outputHeight - inputHeight) * 0.5;

            let outputImage = document.createElement('canvas');
            
            console.log("Image: " + i + "      " + outputX + ", " + outputY + ", " +  outputWidth + ", " +  outputHeight)
            context.drawImage(images[i], -1*outputX, -1*outputY, outputWidth, outputHeight, i*480*2, 200, 480*2, 600*2);
        } 
        context.fillStyle = '#2e3440';
        context.fillRect(0, 0, 480*2*6, 200);
        context.fillStyle = '#bf616a';
        context.font = "72px base";
        context.fillText("Physique:", 10, 10+72); 
        context.fillText("Muscle:", 10+(480*2), 10+72); 
        context.fillText("Breast Size:", 10+(480*2)*2, 10+72); 
        context.fillText("Butt Size:", 10+(480*2)*3, 10+72); 
        context.fillText("Hair:", 10+(480*2)*4, 10+72); 
        context.fillText("Species", 10+(480*2)*5, 10+72); 
        context.fillStyle = '#eceff4';
        context.fillText(physique.getElementsByTagName('h1')[0].textContent, 10, 20+72*2); 
        context.fillText(muscle.getElementsByTagName('h1')[0].textContent, 10+(480*2), 20+72*2); 
        context.fillText(breast.getElementsByTagName('h1')[0].textContent, 10+(480*2)*2, 20+72*2); 
        context.fillText(butt.getElementsByTagName('h1')[0].textContent, 10+(480*2)*3, 20+72*2); 
        context.fillText(hair.getElementsByTagName('h1')[0].textContent, 10+(480*2)*4, 20+72*2); 
        context.fillText(species.getElementsByTagName('h1')[0].textContent, 10+(480*2)*5, 20+72*2); 

        //context.drawImage(PImg, 0, 0, PImg.naturalWidth, PImg.naturalHeight, 0, 0,480, 600);
        var link = document.createElement('a');
        link.download = 'new_body.png';
        link.href = document.getElementById('canvas').toDataURL()
        link.click();
    }
}


var I = document.getElementById('Intro-Section');
var BT = document.getElementById('Body-Section');
var BS = document.getElementById('Breast-Section');
var B = document.getElementById('Butt-Section');
var H = document.getElementById('Hair-Section');
var S = document.getElementById('Species-Section');

window.onscroll = function(){
    //TOP
    let distanceI = I.getBoundingClientRect().top
    let distanceBT = BT.getBoundingClientRect().top
    let distanceBS = BS.getBoundingClientRect().top
    let distanceB = B.getBoundingClientRect().top
    let distanceH = H.getBoundingClientRect().top
    let distanceS = S.getBoundingClientRect().top

    let minD = Math.min(Math.abs(distanceI), Math.abs(distanceBT), Math.abs(distanceBS), Math.abs(distanceB), Math.abs(distanceH), Math.abs(distanceS))

    if(Math.abs(distanceI) == minD){
        activateButton("Intro");
    }
    if(Math.abs(distanceBT) == minD){
        activateButton("Body");
    }
    if(Math.abs(distanceBS) == minD){
        activateButton("Breast");
    }
    if(Math.abs(distanceB) == minD){
        activateButton("Butt");
    }
    if(Math.abs(distanceH) == minD){
        activateButton("Hair");
    }
    if(Math.abs(distanceS) == minD){
        activateButton("Species");
    }
}
