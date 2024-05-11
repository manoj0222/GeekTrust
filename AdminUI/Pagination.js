/**
 * Creation a button of pagination along with images and return those button
 * @param {*} id 
 * @param {*} imagepath 
 * @returns button element
 */
export const creatPaginationButton =(id,imagepath)=>{
    const buttonElment =creatButton();
    addStaticImageBtnInPagination(buttonElment,imagepath);
    buttonElment.id=id;
    return buttonElment;
}

/**
 * creates a button element
 * @returns button element
 */
export function creatButton() {
    const button = document.createElement('button');
    return button;
}

/**
 * It simple add image to button
 * @param {*} paginationbutton 
 * @param {*} imagepath 
 */
const addStaticImageBtnInPagination = (paginationbutton,imagepath)=>{
    paginationbutton.innerHTML= `<img src="${imagepath}" alt="_leftButton" width="10px"/>`
}