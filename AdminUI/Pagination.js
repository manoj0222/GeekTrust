import { creatButton } from "./commonlistener.js";

const imagePaths =
    [
        "./images/left-button.png",
        "./images/previous-button.png",
        "./images/next-button.png",
        "./images/rightbutton.png"
    ]



/**
 * Creation a button of pagination along with images and return those button
 * @param {*} id 
 * @param {*} imagepath 
 * @returns button element
 */
export const creatPaginationButton = (id, index) => {
    const buttonElment = creatButton();
    addStaticImageBtnInPagination(buttonElment, imagePaths[index]);
    buttonElment.id = id;
    return buttonElment;
}


/**
 * It simple add image to button
 * @param {*} paginationbutton 
 * @param {*} imagepath 
 */
const addStaticImageBtnInPagination = (paginationbutton, imagepath) => {
    paginationbutton.innerHTML = `<img src="${imagepath}" alt="_leftButton" width="10px"/>`
}


/**
 * 
 * @param {*} id 
 * @param {*} pagination 
 */
export const changePaginationbuttoncolor = (id, pagination) => {
    const allPageBtns = pagination.querySelectorAll('button');
    const currentPageButton = document.getElementById(`page-${id}`);
    for (let i = 0; i < allPageBtns.length; i++) {
        if (allPageBtns[i].id === currentPageButton.id) {
            allPageBtns[i].style.backgroundColor = '#ADD8E6';
        }
        else {
            allPageBtns[i].style.backgroundColor = 'whitesmoke';
        }
    }

};