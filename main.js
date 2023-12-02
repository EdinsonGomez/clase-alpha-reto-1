import './style.css'
import { getRowFromText, orderRows, insertRowsToTable } from './fileHelper';

function proccessFile (fileAsText) {
  let rows = getRowFromText(fileAsText);
  rows = orderRows(rows);
  insertRowsToTable('#data_table', rows);
}

function onSelectFile (e) {
  if (!e.target.files.length) return;
  
  const [file] = e.target.files;
  const fileRead = new FileReader();

  fileRead.onload = (e) => {
    proccessFile(e.target.result);
  }

  fileRead.readAsText(file);
}


const fileInput = document.querySelector("#file_input");
fileInput.addEventListener("change", onSelectFile);