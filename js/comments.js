window.onload = () => {
    let title = document.querySelector('title');
    generatePost();
    title.innerHTML = getPostTitle() +" : " +getSubRedditName();
}


const menubuttons = document.querySelectorAll(".dropdown-button");

menubuttons.forEach(element => {
    element.addEventListener('click', () => {
        console.log(event.target.closest(".dropdown-button"));
        openMenu(event.target.closest(".dropdown-button"));
    });
});

function openMenu(button) {
    button.nextElementSibling.classList.toggle('show');
    console.log(button.children[1]);
    button.children[1].classList.toggle('active');
}

const body = document.getElementsByTagName('body')[0];
const optionsMenu = document.querySelectorAll(".options-menu");
const optionsButton = document.querySelector(".options-button");
const loginMenu = document.querySelector(".login");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".login-top").childNodes[1];
const gridContainer = document.querySelector(".grid-container");
const ham1button = document.querySelector('#b2');
const ham1 = document.querySelector('.hamMen1');
const sideHamTogg = document.querySelector('.hamSidebar');
const sidebar = document.querySelector('#sidebar');
const commentUpvote = document.querySelectorAll(".comment-upvote");
const commentDownvote = document.querySelectorAll(".comment-downvote");

console.log(commentUpvote);

commentUpvote.forEach(element => {
    element.addEventListener('click', () => {
        console.log(event.target.closest(".comment-upvote"));
        voteComm(event.target.closest(".comment-upvote"));
    })
});

commentDownvote.forEach(element =>{
    element.addEventListener('click', () =>{
        voteComm(event.target.closest(".comment-downvote"))
    })
});

function voteComm(button) {
    console.log(otherVotes(button));
    if(otherVotes(button)){
        let arr = Array.from(button.parentNode.children)
        let idx = arr.indexOf(button);
        //najde index drugega gumba
        for (let i = 0; i < arr.length; i++) {
            if (i !== idx && arr[i].classList.contains("filled")) {
                removeVote(arr[i].children[0]);
                break;
            }
        }
    }

    let svg = button.children[0].children[0];
    let commentNode = document.createComment(svg.outerHTML); // zakomentira celoten svg tag
    svg.parentNode.replaceChild(commentNode, svg); // zamenja nekomentiran svg z komentiranim (new, old)

    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgFill = document.createElementNS(svgNamespace, "svg");
    svgFill.setAttribute("fill", "currentColor");
    svgFill.setAttribute("height", "16");
    let path;

    switch (button.classList.contains("comment-upvote")) {
        case true:
            //countVote(element.parentNode, "up");
            svgFill.setAttribute("icon-name", "upvote-fill");
            svgFill.setAttribute("viewBox", "0 0 20 20");
            svgFill.setAttribute("width", "16");
            svgFill.setAttribute("xmlns", svgNamespace);
            path = document.createElementNS(svgNamespace, "path");
            path.setAttribute(
                "d",
                "M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Z"
            );
            svgFill.appendChild(path);
            button.children[0].appendChild(svgFill);
            button.parentNode.classList.add("up");
            break;

        case false:
            //countVote(element.parentNode, "down");
            svgFill.setAttribute("icon-name", "downvote-fill");
            svgFill.setAttribute("viewBox", "0 0 20 20");
            svgFill.setAttribute("width", "16");
            svgFill.setAttribute("xmlns", svgNamespace);
            path = document.createElementNS(svgNamespace, "path");
            path.setAttribute(
                "d",
                "M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Z"
            );

            svgFill.appendChild(path);
            button.children[0].appendChild(svgFill);
            button.parentNode.classList.add("down");
            break;
        default:
            console.log("something went wrong!");
            break;
    }

    button.classList.add('filled');

}

optionsButton.addEventListener('click', () => {
    optionsButton.parentNode.children[2].classList.toggle('active');
});

document.getElementById("b1").addEventListener('click', () => {
    loginMenu.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('inbg')
});

closeButton.addEventListener('click', () => {
    loginMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('inbg');
});

overlay.addEventListener('click', () => {
    if (loginMenu.classList.contains('active')) {
        loginMenu.classList.remove('active');
        overlay.classList.remove('active');
    }

    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active1');
    }

    body.classList.remove('inbg');
});

ham1button.addEventListener('click', () => {
    ham1.classList.toggle('active');
});

sideHamTogg.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active1');
    body.classList.toggle('inbg');
});

window.matchMedia("(max-width: 800px)").addEventListener('change', () => {
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active1');
        body.classList.remove('inbg');
    }
    body.style.height = '100%';
    body.style.width = '100%';

});

getPostValue();

function getPostValue(){
    let localvotes = JSON.parse(localStorage.getItem('VoteValues'));
    console.log(localvotes);

}

function getPostTitle(){
    let articleContent = document.querySelector('.article-content');
    return articleContent.children[0].innerHTML;
}

function getSubRedditName(){
    return document.querySelector('.article-poster').innerHTML;
}

function otherVotes(element) {
    let arr = Array.from(element.parentNode.children);
    let idx = arr.indexOf(element);
    console.log(idx);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains("filled") && i !== idx)
            return true;
    }
    return false;
}

function removeVote(element) {
    element.children[0].remove();

    //dobi comment
    let comnode = Array.from(element.childNodes).find(node => node.nodeType == Node.COMMENT_NODE);
    //dobi samo kodo brez commenta in jo shrani v div
    let svgcode = comnode.nodeValue.trim();
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgcode;
    let svg = tempDiv.firstElementChild;
    element.replaceChild(svg, comnode);
    element.parentNode.classList.remove("filled");
    console.log(element.parentNode.classList);
    if(element.parentNode.parentNode.classList.contains("up")){
        element.parentNode.parentNode.classList.remove("up");
        return;
    }
       
    if(element.parentNode.parentNode.classList.contains("down"))
        element.parentNode.parentNode.classList.remove("down");
}

function generatePost(){
    
    let commentContent = localStorage.getItem('postHTML');
    let main = document.querySelector('main');
    let temp = document.createElement('article');
    main.prepend(temp);
    let commentNode = document.createComment(commentContent);
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = commentNode.nodeValue.trim();
    let article = tempDiv.firstElementChild;
    main.replaceChild(article, temp);

    let articleHead = document.querySelector('.article-head');
    let button = document.createElement('button');
    let a = document.createElement('a');
    let span = document.createElement('span');
    button.classList.add("return-button");
    a.setAttribute('href','../index.html');
    articleHead.prepend(button);
    button.appendChild(a);
    a.appendChild(span)
    span.appendChild(createSvgIcon());
    
    article = document.querySelectorAll('article')[0];
    console.log(article);
    
    if(article.children[0].classList.contains('image-holder')){
        fixImage();
    }

    if(article.children[0].children[3].classList.contains('article-image')){
        fixArticleImg();
    }

}

function generateComments(){

}

function createSvgIcon() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNamespace, "svg");
  
    svgElement.setAttribute("rpl", "");
    svgElement.setAttribute("fill", "currentColor");
    svgElement.setAttribute("height", "16");
    svgElement.setAttribute("icon-name", "back-outline");
    svgElement.setAttribute("viewBox", "0 0 20 20");
    svgElement.setAttribute("width", "16");
  
    const pathElement = document.createElementNS(svgNamespace, "path");
    pathElement.setAttribute("d", "M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z");
  
    svgElement.appendChild(pathElement);
  
    return svgElement;
}

function fixImage(){
    let imageContainer = document.querySelector('.holder-image');
    let image = imageContainer.children[1];
    console.log(image.getAttribute("src"));
    let att = "../" +image.getAttribute("src")
    image.setAttribute('src', att);
}

function fixArticleImg(){
    let imageContainer = document.querySelector('.article-image');
    let image = imageContainer.children[0];
    if(image.outerHTML.includes('img')){
        let att = "../" + image.getAttribute('src');
        image.setAttribute('src',att);}
    if(image.outerHTML.includes('canvas')){
        if(image.classList.contains('redditLogoCanvas')){
            drawReddit();
        }
        else{
            drawTwitter();
            commentTwitter();
        }
    }
}

function drawReddit(){
    const canvas = document.querySelector(".redditLogoCanvas");
    const ctx = canvas.getContext('2d');
    ctx.save();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.resetTransform();

    // Get canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate the center of the canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const circleCenterX = 120;
    const circleCenterY = 60;
    // Translate the canvas origin to the center
    ctx.translate(centerX - circleCenterX, centerY - circleCenterY);

    ctx.scale(3, 1.5);
    ctx.save();
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.miterLimit = 4;
    ctx.font = "15px ''";
    ctx.font = "   15px ''";
    ctx.scale(0.3125, 0.3125);
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = 0.001;
    ctx.miterLimit = "10";
    ctx.font = "   15px ''";
    ctx.translate(1.4065934065934016, 1.4065934065934016);
    ctx.scale(2.81, 2.81);
    ctx.save();
    ctx.fillStyle = "rgb(255,69,0)";
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = 1;
    ctx.miterLimit = "10";
    ctx.font = "   15px ''";
    ctx.transform(1, 0, 0, 1, 0, 0);
    ctx.beginPath();
    ctx.arc(45, 45, 45, 0, 6.283185307179586, false);
    ctx.closePath();
    ctx.fill("nonzero");
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = 1;
    ctx.miterLimit = "10";
    ctx.font = "   15px ''";
    ctx.transform(1, 0, 0, 1, 0, 0);
    ctx.beginPath();
    ctx.moveTo(75.011, 45);
    ctx.bezierCurveTo(74.877, 41.376, 71.83399999999999, 38.546, 68.199, 38.669);
    ctx.bezierCurveTo(66.588, 38.724999999999994, 65.056, 39.385, 63.893, 40.492);
    ctx.bezierCurveTo(58.77, 37.001999999999995, 52.752, 35.089, 46.566, 34.955);
    ctx.lineTo(49.485, 20.916999999999998);
    ctx.lineTo(59.116, 22.941999999999997);
    ctx.bezierCurveTo(59.384, 25.413999999999998, 61.599, 27.203999999999997, 64.071, 26.934999999999995);
    ctx.bezierCurveTo(66.54299999999999, 26.666999999999994, 68.333, 24.451999999999995, 68.064, 21.979999999999997);
    ctx.bezierCurveTo(67.79499999999999, 19.508, 65.58099999999999, 17.717999999999996, 63.108999999999995, 17.987);
    ctx.bezierCurveTo(61.687999999999995, 18.131999999999998, 60.413, 18.959999999999997, 59.708999999999996, 20.191);
    ctx.lineTo(48.68, 17.987);
    ctx.bezierCurveTo(47.931, 17.819, 47.181, 18.288999999999998, 47.013, 19.049999999999997);
    ctx.bezierCurveTo(47.013, 19.060999999999996, 47.013, 19.060999999999996, 47.013, 19.071999999999996);
    ctx.lineTo(43.690999999999995, 34.687);
    ctx.bezierCurveTo(37.42699999999999, 34.788, 31.330999999999996, 36.711999999999996, 26.140999999999995, 40.224);
    ctx.bezierCurveTo(23.500999999999994, 37.741, 19.339999999999996, 37.864, 16.856999999999992, 40.51499999999999);
    ctx.bezierCurveTo(14.373999999999992, 43.154999999999994, 14.496999999999993, 47.315999999999995, 17.147999999999993, 49.79899999999999);
    ctx.bezierCurveTo(17.662999999999993, 50.279999999999994, 18.254999999999992, 50.693999999999996, 18.914999999999992, 50.98499999999999);
    ctx.bezierCurveTo(18.86999999999999, 51.64499999999999, 18.86999999999999, 52.30499999999999, 18.914999999999992, 52.96499999999999);
    ctx.bezierCurveTo(18.914999999999992, 63.04299999999999, 30.65999999999999, 71.24199999999999, 45.144999999999996, 71.24199999999999);
    ctx.bezierCurveTo(59.629999999999995, 71.24199999999999, 71.375, 63.05399999999999, 71.375, 52.96499999999999);
    ctx.bezierCurveTo(71.42, 52.30499999999999, 71.42, 51.64499999999999, 71.375, 50.98499999999999);
    ctx.bezierCurveTo(73.635, 49.855, 75.056, 47.528, 75.011, 45);
    ctx.closePath();
    ctx.moveTo(30.011, 49.508);
    ctx.bezierCurveTo(30.011, 47.025000000000006, 32.036, 45, 34.519, 45);
    ctx.bezierCurveTo(37.001999999999995, 45, 39.027, 47.025, 39.027, 49.508);
    ctx.bezierCurveTo(39.027, 51.99100000000001, 37.002, 54.016000000000005, 34.519, 54.016000000000005);
    ctx.bezierCurveTo(32.025, 53.993, 30.011, 51.991, 30.011, 49.508);
    ctx.closePath();
    ctx.moveTo(56.152, 62.058);
    ctx.lineTo(56.152, 61.879);
    ctx.bezierCurveTo(52.953, 64.28399999999999, 49.038000000000004, 65.514, 45.033, 65.347);
    ctx.bezierCurveTo(41.028, 65.515, 37.114000000000004, 64.28399999999999, 33.914, 61.87899999999999);
    ctx.bezierCurveTo(33.489000000000004, 61.36399999999999, 33.567, 60.59299999999999, 34.082, 60.16799999999999);
    ctx.bezierCurveTo(34.529, 59.79899999999999, 35.167, 59.79899999999999, 35.626, 60.16799999999999);
    ctx.bezierCurveTo(38.333, 62.14799999999999, 41.632999999999996, 63.154999999999994, 44.988, 62.99799999999999);
    ctx.bezierCurveTo(48.344, 63.17699999999999, 51.655, 62.21499999999999, 54.394999999999996, 60.25799999999999);
    ctx.bezierCurveTo(54.88699999999999, 59.77699999999999, 55.69199999999999, 59.78799999999999, 56.17399999999999, 60.27999999999999);
    ctx.bezierCurveTo(56.655, 60.772, 56.644, 61.577, 56.152, 62.058);
    ctx.closePath();
    ctx.moveTo(55.537, 54.34);
    ctx.bezierCurveTo(55.458999999999996, 54.34, 55.391999999999996, 54.34, 55.313, 54.34);
    ctx.lineTo(55.347, 54.172000000000004);
    ctx.bezierCurveTo(52.864000000000004, 54.172000000000004, 50.839, 52.147000000000006, 50.839, 49.664);
    ctx.bezierCurveTo(50.839, 47.181, 52.864, 45.156, 55.347, 45.156);
    ctx.bezierCurveTo(57.830000000000005, 45.156, 59.855000000000004, 47.181, 59.855000000000004, 49.664);
    ctx.bezierCurveTo(59.955, 52.148, 58.02, 54.239, 55.537, 54.34);
    ctx.closePath();
    ctx.fill("nonzero");
    ctx.stroke();
    ctx.restore();
    ctx.restore();
    ctx.restore();
}

function drawTwitter(){
    const twLog = document.getElementById("twitterLogoCanvas");
    const ctx1 = twLog.getContext('2d');
    ctx1.resetTransform();

    /*ctx1.translate(centerX, centerY);*/
    ctx1.scale(4, 2);
    ctx1.save();
    ctx1.strokeStyle = "rgba(0,0,0,0)";
    ctx1.miterLimit = 4;
    ctx1.font = "15px ''";
    ctx1.lineJoin = "round";
    ctx1.miterLimit = "2";
    ctx1.font = "   15px ''";
    ctx1.scale(0.032, 0.032);
    ctx1.translate(36.72098304681754, 0);
    ctx1.scale(3.7683145311280777, 3.7683145311280777);
    ctx1.translate(89.00934757, 46.8841404);
    ctx1.save();
    ctx1.fillStyle = "#1da1f2";
    ctx1.miterLimit = "2";
    ctx1.font = "   15px ''";
    ctx1.beginPath();
    ctx1.moveTo(154.729, 400);
    ctx1.bezierCurveTo(340.398, 400, 441.93399999999997, 246.124, 441.93399999999997, 112.68799999999999);
    ctx1.bezierCurveTo(441.93399999999997, 108.31799999999998, 441.84499999999997, 103.96799999999999, 441.64799999999997, 99.636);
    ctx1.translate(321.2669410793711, -66.6713452050392);
    ctx1.rotate(0);
    ctx1.arc(0, 0, 205.304, 0.944244359711523, 0.5887941340050098, 1);
    ctx1.rotate(0);
    ctx1.translate(-321.2669410793711, 66.6713452050392);
    ctx1.bezierCurveTo(473.91299999999995, 55.39, 454.44999999999993, 60.803999999999995, 434.0319999999999, 63.245);
    ctx1.bezierCurveTo(454.87299999999993, 50.744, 470.87199999999996, 30.967, 478.42099999999994, 7.393000000000001);
    ctx1.translate(375.1189541987111, -166.68325838484816);
    ctx1.rotate(0);
    ctx1.arc(0, 0, 202.42, 1.035221833986082, 1.3758878551748777, 0);
    ctx1.rotate(0);
    ctx1.translate(-375.1189541987111, 166.68325838484816);
    ctx1.bezierCurveTo(395.9029999999999, 12.276, 369.6789999999999, 0, 340.6409999999999, 0);
    ctx1.bezierCurveTo(284.89699999999993, 0, 239.69299999999993, 45.222, 239.69299999999993, 100.965);
    ctx1.bezierCurveTo(239.69299999999993, 108.89, 240.57999999999993, 116.596, 242.31199999999993, 123.99000000000001);
    ctx1.bezierCurveTo(158.41699999999992, 119.76700000000001, 84.02499999999992, 79.58500000000001, 34.237999999999914, 18.486000000000004);
    ctx1.translate(121.30896113432527, 69.15150945312604);
    ctx1.rotate(0);
    ctx1.arc(0, 0, 100.739, -2.6145975928122525, -3.142471067692117, 1);
    ctx1.rotate(0);
    ctx1.translate(-121.30896113432527, -69.15150945312604);
    ctx1.bezierCurveTo(20.569999999999915, 104.274, 38.389999999999915, 135.20100000000002, 65.48999999999992, 153.29500000000002);
    ctx1.translate(68.54904967538069, 53.16971948062492);
    ctx1.rotate(0);
    ctx1.arc(0, 0, 100.172, 1.601339046685102, 2.0793483323898143, 0);
    ctx1.rotate(0);
    ctx1.translate(-68.54904967538069, -53.16971948062492);
    ctx1.bezierCurveTo(19.758999999999922, 141.08900000000003, 19.758999999999922, 141.502, 19.758999999999922, 141.955);
    ctx1.bezierCurveTo(19.758999999999922, 190.858, 54.55299999999992, 231.68900000000002, 100.74099999999993, 240.94100000000003);
    ctx1.translate(74.18273695988815, 143.45801707327468);
    ctx1.rotate(0);
    ctx1.arc(0, 0, 101.036, 1.3048116896640765, 1.5713776736732037, 0);
    ctx1.rotate(0);
    ctx1.translate(-74.18273695988815, -143.45801707327468);
    ctx1.bezierCurveTo(67.63099999999993, 244.49400000000003, 61.302999999999926, 243.85500000000002, 55.15299999999992, 242.67400000000004);
    ctx1.bezierCurveTo(68.00399999999992, 282.79600000000005, 105.26799999999992, 311.99300000000005, 149.44899999999993, 312.809);
    ctx1.bezierCurveTo(114.89999999999992, 339.898, 71.37899999999993, 356.033, 24.077999999999932, 356.033);
    ctx1.translate(23.90362312873681, 151.13307420033857);
    ctx1.rotate(0);
    ctx1.arc(0, 0, 204.9, 1.5699452926694104, 1.6877225223332133, 0);
    ctx1.rotate(0);
    ctx1.translate(-23.90362312873681, -151.13307420033857);
    ctx1.bezierCurveTo(44.673999999999936, 383.279, 97.71999999999993, 399.993, 154.73399999999995, 399.993);
    ctx1.fill("nonzero");
    ctx1.stroke();
    ctx1.restore();
    ctx1.restore();
}

function commentTwitter(){
    let commenter = document.querySelector('.comment-info').children[0];
    let commentContent = document.querySelector('.comment-content');
    commentContent.innerHTML = "I think there might be an issue with the way you have drawn the logo. Try messng with tranlate values util it looks good. "
    commenter.innerHTML ="SigmaBoy69";
}