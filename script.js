'use strict';

const params = new URLSearchParams(window.location.search)
const url = `https://lambda.shpp.me/multilink?page=${params.get('page')}`;
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

    const { pageBackgroundStyle, page, username, avatar, defaultButtonsStyle } = setup;

    const avatarBlock = document.createElement('div');
    avatarBlock.classList.add('avatar-block');
    root.style = pageBackgroundStyle;

    setTitle(page);
    setAvatar(avatarBlock, avatar);
    setTitleText(avatarBlock, username)

    root.append(avatarBlock);
    root.append(setLinks(links, defaultButtonsStyle));

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
    const { link, text, customStyle } = linkData;

    const linkItem = document.createElement('a');
    linkItem.setAttribute('href', link);
    linkItem.setAttribute('target', "blank");
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



