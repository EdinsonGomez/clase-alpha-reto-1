export function getRowFromText (text) {
  const rows = text
    .split('\n')
    .map((row) => row.split("#"))
    .map((row) => row.map((v) => {
      let value = v.trim();

      if (isNaN(v)) {
        return value;
      }

      return +value;
    }));

  return rows;
};

export function orderRows (rows = []) {
  return rows.map((r, idx) => {
    const row = [];

    r.forEach((v) => {
      if (typeof v === 'string') {
        row[1] = v;
        return;
      }

      if (typeof v === 'number' && v === idx + 1) {
        row[0] = v;
      }

      if (typeof v === 'number' && Number.isInteger(v) && v !== idx + 1) {
        row[2] = v;
        return;
      }

      if (typeof v === 'number' && !Number.isInteger(v) && v !== idx + 1) {
        row[3] = v;
        return;
      }
    });

    return row;
  });
};

const arrayToNodes = (rows = []) => {
  const nodes = rows.map((row) => {
    const rowElement = document.createElement('tr');

    row.forEach((v) => {
      const tdElement = document.createElement('td');
      tdElement.innerHTML = v;

      rowElement.appendChild(tdElement);
    });

    return rowElement;
  });

  return nodes;
}

export function insertRowsToTable (queryTable, rows) {
  const tbodyElement = document.querySelector(`${queryTable} tbody`);

  const nodes = arrayToNodes(rows);

  if (!nodes.length || !tbodyElement) return;

  tbodyElement.removeChild(tbodyElement.lastElementChild);

  nodes.forEach((nodeHtml) => {
    tbodyElement.appendChild(nodeHtml);
  })
}