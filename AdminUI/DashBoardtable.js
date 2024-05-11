import { fetchMembersData } from "./Api.js";
import {handleCheckboxChange,handleEditorOrDeleteRow,handleRows,creatButton,handleDeleteselectedRows} from "./commonlistener.js";
import {creatPaginationButton,changePaginationbuttoncolor} from "./Pagination.js"


//variables
let data =[];
let data_2=[];
let currentPage=1;
let itemsPerPage=10;
let deletebasedonrowSelection=[];
let deletebasedoncheckselection=[]
const searchbtn=document.getElementById("searchInput");
const deletebtn=document.getElementById("deleteSelectedButton");





export async function render(){
    data= await fetchMembersData();
    renderTable(data);
    renderPagination(data);
    searchbtn.addEventListener('input',(event)=>{
        console.log(event)
        searchBasedOnText(event)}
    );
    deletebtn.addEventListener('click',()=>deleteRecords())
}


function renderTable(records){
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    for (let i = startIndex; i < endIndex && i < records.length; i++) {
        let eachRow = createDashBoardtableRow(records[i],i)
        eachRow.addEventListener('click', (event) => { handleRowSelection(eachRow,event,records) });
        tableBody.appendChild(eachRow);
    }
}

export const createDashBoardtableRow = (eachrecord, index) => {
    let row = document.createElement('tr');
    row.className = "dashBoardrow";
    row.setAttribute('data-name', eachrecord.name);
    row.setAttribute('data-email', eachrecord.email);
    row.setAttribute('data-role', eachrecord.role);
    row.role = eachrecord.role;
    row.id = eachrecord.id;
    row.isSelected  = false;
    row.innerHTML = createCells(eachrecord, index);
    return row;
}

const createCells = (record, index) => {
    return `
    <td data-id="1-${index}"><input type="checkbox" class="row-checkbox" data-id="1-1-${index}"></td>
    <td data-id="2-${index}">${record.name}</td>
    <td data-id="3-${index}">${record.email}</td>
    <td data-id="4-${index}">${record.role.toUpperCase()}</td>
    <td data-id="5-${index}">
        <button class="edit-record" data-id="5-1-${index}"><img  src="./images/edit.png"   width="12px"/></button>
        <button class="delete-record" data-id="5-2-${index}"><img src="./images/garbage.png"  width="12px" /></button>
    </td>
    `;
}


/** 
 * @param {*} row 
 * @param {*} event 
 * This function was built on follow event delegation concept based on the
 *  cell selection our row will catch the action and dispatch to corresponding method.
 */

function handleRowSelection(row,event,records) {
   let {dataset: { id },className}=event.target;

    if (event.target.matches('img')) {
        let { dataset: { id }, className } = event.target.closest('button');
        handleEditorOrDeleteRow(className,row,records);
        renderTable(records);
        renderPagination(records);
    }
    else if(event.target.matches('input')&&className==="row-checkbox"){
       event.target.isChecked=event.target.isChecked?false:true;
       let result= handleCheckboxChange(row,event.target,deletebasedoncheckselection);
       deletebasedoncheckselection=[...result];
    //    console.log(deletebasedoncheckselection)
    }
    else if(event.target.matches('td')){
      let result = handleRows(row,deletebasedonrowSelection);
      console.log(result);
      deletebasedonrowSelection=[...result];
    //   console.log(deletebasedonrowSelection)
    }
    else{
        return
    }
}


function deleteRecords(){
    let fileteredresult = handleDeleteselectedRows(data,deletebasedoncheckselection,deletebasedonrowSelection);
    renderTable(fileteredresult);
    renderPagination(fileteredresult);
}

function searchBasedOnText(event){
   let text = event.target.value.toLowerCase();
   currentPage = 1;
   console.log(text);
  if(text==""){
     renderTable(data);
     renderPagination(data);
  }
  else{
    const filteredData = data.filter(item => {
        for (let key in item) {
            if (item[key].toString().toLowerCase().includes(text)) {
                return true;
            }
        }
        return false; // If no property matches the search input, exclude the item
    });
    renderTable(filteredData);
    renderPagination(filteredData);
  }
}

/**
 * 
 * @param {*} records 
 */
function renderPagination(records) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(records.length / itemsPerPage);
    let leftButton =  creatPaginationButton("firstPageBtn",0);
    let prevPageBtn = creatPaginationButton("previousPageBtn",1);
    let nextPageBtn = creatPaginationButton("nextPageBtn",2);
    let lastPageBtn = creatPaginationButton("lastPageBtn",3);
    if (totalPages == 1) {
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = creatButton();
            pageBtn.textContent = i;
            pageBtn.id = "page-" + i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderTable(records);
                changePaginationbuttoncolor(i, pagination);
            });
            pagination.appendChild(pageBtn);
        }
        changePaginationbuttoncolor(currentPage, pagination);
    }
    else {
        leftButton.addEventListener('click', () => {
            currentPage = 1;
            renderTable(records);
            changePaginationbuttoncolor(currentPage, pagination)
        });
        pagination.appendChild(leftButton);
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(records);
                changePaginationbuttoncolor(currentPage, pagination)
            }
        });
        pagination.appendChild(prevPageBtn);
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = creatButton();
            pageBtn.textContent = i;
            pageBtn.id = "page-" + i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderTable(records);
                changePaginationbuttoncolor(i, pagination);
            });
            pagination.appendChild(pageBtn);
        }
        nextPageBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(records);
                changePaginationbuttoncolor(currentPage, pagination)
            }
        });
        pagination.appendChild(nextPageBtn);
        lastPageBtn.addEventListener('click', () => {
            currentPage = totalPages;
            renderTable(records);
            changePaginationbuttoncolor(currentPage, pagination)

        });
        pagination.appendChild(lastPageBtn);
        changePaginationbuttoncolor(currentPage, pagination);
    }

}


