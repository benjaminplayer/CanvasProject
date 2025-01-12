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


}

//naredi side menu da dela


/*
console.log(optionsButton)
console.log(optionsMenu);*/
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

