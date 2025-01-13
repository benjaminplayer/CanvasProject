window.onload = () => {
    let title = document.querySelector('title');
    title.innerHTML = getPostTitle() +" : " +getSubRedditName();
    console.log(localStorage.getItem('postHTML'));
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
    let commentNode = document.createComment(commentContent);
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = commentNode.nodeValue.trim();
}

function generateComments(){

}