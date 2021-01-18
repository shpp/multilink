'use strict';


const url = 'https://lambda.shpp.me/multilink?page=shpp';
const root = document.querySelector('#root');

const strJ = `{"links":

[{"text":"наш сайт",
"link":"https://portal.programming.org.ua",
"customStyle":"",
"id":1},

{"text":"блог",
"link":"https://blog.programming.org.ua",
"customStyle":"",
"id":2},

{"text":"портал",
"link":"https://portal.programming.org.ua",
"customStyle":"",
"id":3},
{"text":"facebook",
"link":"https://fb.com/shpp.kr",
"customStyle":"background: blue",
"id":4}],

"setup":
{"page":"shpp",
"username":"Школа програмування Ш++",
"avatar":"https://i.imgur.com/IAc9y5K.png",
"pageBackgroundStyle":"background: green; font-size: 20px",
"defaultButtonsStyle":"border: 5px solid white; background: transparent;"}}`


createSite(root, url);

function createSite(root, url) {
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            const { setup, links } = json;
            createUserPage(setup, links, root)



        })
        .then();


}

function createUserPage(setup, links, root) {
    const avatarBlock = document.createElement('div');
    avatarBlock.classList.add('avatar-block');
    root.style = setup.pageBackgroundStyle;

    setTitle(setup.title);
    setAvatar(avatarBlock, setup.avatar);
    setTitleText(avatarBlock, setup.username)

    root.append(avatarBlock);
    root.append(setLinks(links, setup.defaultButtonsStyle));

}


function setLinks(links, defaultButtonsStyle) {
    const linksBlock = document.createElement('div');
    linksBlock.classList.add('links-block');

    links.forEach(link => {
        linksBlock.append(setLink(link, defaultButtonsStyle));
    });

    return linksBlock;
}

function setLink(link, defaultButtonsStyle) {
    const linkItem = document.createElement('a');
    linkItem.setAttribute('href', link.link);
    linkItem.innerText = link.text;
    linkItem.style = defaultButtonsStyle;
    return linkItem;
}

function setTitle(title) {
    const titleText = document.querySelector('title');
    titleText.innerText = title;
}

function setAvatar(block, avatarURL) {
    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.setAttribute('src', avatarURL);
    block.append(avatar);
}

function setTitleText(block, text) {
    const titleText = document.createElement('h1');
    titleText.innerText = text;
    block.append(titleText);
}



