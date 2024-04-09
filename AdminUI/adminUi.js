const apiUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
const itemsPerPage = 10;
let currentPage = 1;
let data = []; // Empty array to store fetched data
let deleteSelected =[];
const firstPageBtn = creatButton();
const prevPageBtn =  creatButton();
const nextPageBtn =  creatButton();
const lastPageBtn =  creatButton();
const imagePaths =
[
    "./images/left-button.png","./images/previous-button.png",
    "./images/next-button.png","./images/rightbutton.png"
]

/**
 * purpose of the below mention function to hit the BackEnd url and get the based on the 
 * response call the method or print the error if we got any.
 */

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        data = await response.json();
        renderTable(data);
        renderPagination(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

/**
 * render the data which has been passed as parameter into the table by creating rows.
 * 
 */
const renderTable = (records) => {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    for (let i = startIndex; i < endIndex && i < records.length; i++) {
        let eachRow = renderRow(records[i])
        addingEventListeners(eachRow,records[i])
        tableBody.appendChild(eachRow);
    }
}

/**
 * function add row dynamically into the table.
 * @param {*} record 
 * @returns row
 */
const renderRow = (record) => {
    const row = document.createElement('tr');
    row.id = record.id;
    // console.log(record.id)
    row.innerHTML = `
    <td><input type="checkbox" class="row-checkbox" data-id="${record.id}"></td>
    <td>${record.name}</td>
    <td>${record.email}</td>
    <td>${record.role.toUpperCase()}</td>
    <td>
        <button class="edit-record" data-id="${record.id}"><img  src="./images/edit.png"   width="12px"/></button>
        <button class="delete-record" data-id="${record.id}"><img src="./images/garbage.png"  width="12px" /></button>
    </td>
    `;
    return row;
}

/**
 * add event listeners for each row for particular columns.
 * @param {*} row 
 */
const addingEventListeners = (row,rowdata) => {
    const editButton = row.querySelector('.edit-record');
    const deleteButton = row.querySelector('.delete-record');
    const checkbox =row.querySelector(".row-checkbox");
    editButton.addEventListener('click', () => { handleEditRow(row) });
    deleteButton.addEventListener('click', handleDeleteRow);
    checkbox.addEventListener('change',()=>{handleCheckboxChange(rowdata,checkbox)})
    row.isSelected=false;
    row.addEventListener('click',()=>{handleRowSelection(row,rowdata)});

}

// Function to render pagination buttons
function renderPagination(records) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(records.length / itemsPerPage);
    if(totalPages==1){
            const pageBtn = creatButton();
            pageBtn.textContent = totalPages;
            pageBtn.id="page-"+totalPages;
            pageBtn.addEventListener('click', () => {
                currentPage = totalPages;
                renderTable(records);
                changePaginationbuttoncolor(totalPages,pagination);
            });
            pagination.appendChild(pageBtn);
            renderTable(records);
            changePaginationbuttoncolor(totalPages,pagination); 
    }
    else{
    addStaticImageBtnInPagination(firstPageBtn,imagePaths[0])
    firstPageBtn.id="firstPageBtn";
    firstPageBtn.addEventListener('click', () => {
        currentPage = 1;
        renderTable(records);
        changePaginationbuttoncolor(currentPage,pagination)
    });
    pagination.appendChild(firstPageBtn);
    addStaticImageBtnInPagination(prevPageBtn,imagePaths[1])
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(records);
            changePaginationbuttoncolor(currentPage,pagination)
        }
    });
    pagination.appendChild(prevPageBtn);
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = creatButton();
        pageBtn.textContent = i;
        pageBtn.id="page-"+i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderTable(records);
            changePaginationbuttoncolor(i,pagination);
        });
        pagination.appendChild(pageBtn);
    }

    addStaticImageBtnInPagination(nextPageBtn,imagePaths[2])
    nextPageBtn.id="nextPageBtn";
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable(records);
            changePaginationbuttoncolor(currentPage,pagination)
        }
    });

    pagination.appendChild(nextPageBtn);
    addStaticImageBtnInPagination(lastPageBtn,imagePaths[3])
    lastPageBtn.id="lastPageBtn";
    lastPageBtn.addEventListener('click', () => {
        currentPage = totalPages;
        renderTable(records);
        changePaginationbuttoncolor(currentPage,pagination)
        
    });
    pagination.appendChild(lastPageBtn);
    changePaginationbuttoncolor(currentPage,pagination)
  }
}


/*
 * * 
 * This method simply add static images in the pagination component for respective button
 * @param {*} paginationbutton 
 * @param {*} imagepath 
 */
const addStaticImageBtnInPagination =(paginationbutton,imagepath)=>{
    paginationbutton.innerHTML= `<img src="${imagepath}" alt="_leftButton" width="10px"/>`
}


/**
 * method filter the data based on the search and we can search with any property
 * and if doesn't enter anything and search it will show the default page.
 */
function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    /**
     * In case if doesn't mention anything in search a
     */
    if (searchInput == "") {
        renderTable(data);
        renderPagination(data);
    }
    /**
     * filter based on the searched text by matching with any property.
     */
    else {
        const filteredData = data.filter(item => {
            for (let key in item) {
                if (item[key].toString().toLowerCase() == searchInput.toLowerCase()) {
                    return true;
                }
            }
            return false; // If no property matches the search input, exclude the item
        });
        renderTable(filteredData);
        renderPagination(filteredData);
    }

}


// Function to handle row deletion when the "Delete" button is clicked
function handleDeleteRow(event) {
    const row = event.target.closest('tr');
    const rowId = row.id;
    data = data.filter((item) => rowId !== item.id);
    renderTable(data);
    renderPagination(data);
}

// Function to handle row selection
function handleRowSelection(row,rowdata) {
    if(row.isSelected==false){
       row.style.backgroundColor="rgb(200, 197, 197)"
       row.isSelected=true;
       deleteSelected.push(rowdata.id)

    }
    else{
        row.style.backgroundColor="white"
        row.isSelected=false;
        deleteSelected=deleteSelected.filter(id =>{
            id==row.id
        })
    }
    
}

const onPressEnterInsideSearchBox = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleSearch()
    }
}

/**
 * method used for edit the data of particular record using basic
 * prompt.
 * @param {*} row 
 */
const handleEditRow = (row) => {
    const rowData = data.find(item => item.id === row.id);
    for (let key in rowData) {
        if (key === "id") {
            continue;
        }
        let newValue = prompt(`Enter new value for ${key}:`, rowData[key]);
        if (newValue !== null) {
            rowData[key] = newValue; // Update the property in the data object
        }
    }
    renderTable(data);
}

function creatButton() {
    const button = document.createElement('button');
    return button;
}

const changePaginationbuttoncolor = (id,pagination) => {
    const allPageBtns = pagination.querySelectorAll('button');
    const currentPageButton =  document.getElementById(`page-${id}`);
    console.log(allPageBtns)
    console.log(currentPageButton)
    allPageBtns.forEach(btn => {
        if(btn.id===currentPageButton.id){
            btn.style.backgroundColor = '#ADD8E6';
        }
        else{ 
            btn.style.backgroundColor = 'whitesmoke';
        }
         // Reset background color for all buttons
    });

};


const deleteBasedSelected =(eachRow)=>{
    if(eachRow.isSelected===true){
        return false;
    }
    return true
}

function deletedSelectedRows(){
    console.log(data.length)
    console.log(deleteSelected)
     data = data.filter((eachrow)=>{
        if(deleteSelected.includes(eachrow.id)){
            return false;
          }
        else{
            return true;
        }
    })
    console.log(data.length)
    renderTable(data);
    renderPagination(data); 
}


function handleCheckboxChange(record,checkbox){
 console.log(checkbox.checked)
    if(checkbox.checked){
        deleteSelected.push(record.id)
    }
    else{
        deleteSelected=deleteSelected.filter((id)=>{
            id!==record.id
        })
    }
}

fetchData()