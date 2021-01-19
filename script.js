'use strict';

const url = 'https://lambda.shpp.me/multilink?page=shpp';
const root = document.querySelector('#root');

createSite(root, url);

function createSite(root, url) {
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            const { setup, links } = json;
            createUserPage(setup, links, root)
        })
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

function setLink(linkData, defaultButtonsStyle) {
    const {link, text, customStyle} = linkData;
    
    const linkItem = document.createElement('a');
    linkItem.setAttribute('href', link);
    linkItem.innerText = text;
    linkItem.style = customStyle ? customStyle : defaultButtonsStyle;
    
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



