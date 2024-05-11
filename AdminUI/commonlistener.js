


/**
 * @param {*} className 
 * @param {*} row 
 * @returns nothing
 * Based on eth user selection we trigger the method.
 */
export function handleEditorOrDeleteRow(className = "", row, data) {
    if (className === "edit-record") {
        handleEditRow(row, data);
    }
    else if (className === "delete-record") {
        handleDeleteRow(row, data);
    }
    else {
        return;
    }
}


/**
 * method used for edit the data of particular record using basic
 * prompt.
 * @param {*} row 
 */
export const handleEditRow = (row, arr) => {
    const rowData = arr.find(item => item.id === row.id);
    for (let key in rowData) {
        if (key === "id") {
            continue;
        }
        let newValue = prompt(`Enter new value for ${key}:`, rowData[key]);
        if (newValue !== null) {
            rowData[key] = newValue; // Update the property in the data object
        }
    }
    return arr;
}


/**
 * Delets the row from table
 * @param {*} row 
 */
export const handleDeleteRow = (row, records) => {
    const rowId = row.id;
     for(let i=0;i<records.length;i++){
        if(records[i].id==rowId){
            records.splice(i,1);
        }
     }
}

/**
 * This method handle the checkbox logic which will used in the multiselect deletion.
 * @param {*} record 
 * @param {*} checkbox 
 */
export const handleCheckboxChange = (record, checkbox, deleteSelected=[]) => {
    let selectedrecords = [...deleteSelected]
    // console.log(checkbox.checked)
    if (checkbox.checked) {
        selectedrecords.push(record.id)
    }
    else {
        selectedrecords = deleteSelected.filter((id) => {
            id !== record.id
        })
    }
    // console.log(selectedrecords)
    return selectedrecords;
}

/**
 * 
 * @param {*} row 
 * @param {*} rowdata 
 * @param {*} arr 
 */
export function handleRows(row, arr=[]) {
    let selectedrows = [...arr]
    if (row.isSelected == false) {
        row.style.backgroundColor = "rgb(200, 197, 197)"
        row.isSelected = true;
        selectedrows.push(row.id)

    }
    else {
        row.style.backgroundColor = "white"
        row.isSelected = false;
        selectedrows = arr.filter(id => {
            id == row.id
        })
    }
    return selectedrows;
}


/**
 * creates a button element
 * @returns button element
 */
export function creatButton() {
    const button = document.createElement('button');
    return button;
}




export const handleDeleteselectedRows = (totalrecords, recordofrowselection, recordsofcheckboxselected) => {
    console.log(recordofrowselection)
    console.log(totalrecords.length)
    console.log(recordsofcheckboxselected)
   totalrecords.forEach((eachrecord,index) => {
        if (recordofrowselection.includes(eachrecord.id.toString()) || recordsofcheckboxselected.includes(eachrecord.id.toString())) {
            totalrecords.splice(index,1);
            return false;
        }
        return true;
    })
    return totalrecords;
}