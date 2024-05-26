function createMatrices() {
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);
    
    if (isNaN(rows) || isNaN(columns) || rows < 1 || columns < 1) {
        alert('Please enter valid numbers for rows and columns.');
        return;
    }

    const matrixContainer = document.getElementById('matrixContainer');
    matrixContainer.innerHTML = '';

    const createMatrixHTML = (matrixId) => {
        let matrixHTML = `<div><h2>Matrix ${matrixId.toUpperCase()}</h2><div class="matrix" id="matrix${matrixId}" style="grid-template-columns: repeat(${columns}, 50px);">`;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                matrixHTML += `<input type="number" id="${matrixId}${i}${j}" class="matrix-cell">`;
            }
        }
        matrixHTML += `</div></div>`;
        return matrixHTML;
    };

    matrixContainer.innerHTML = createMatrixHTML('a') + createMatrixHTML('b');

    const matrixResult = document.getElementById('matrixResult');
    matrixResult.style.gridTemplateColumns = `repeat(${columns}, 50px)`;

    const operations = document.getElementById('operations');
    operations.style.display = 'flex';

    matrixResult.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            matrixResult.innerHTML += `<div id="result${i}${j}"></div>`;
        }
    }
}

function getMatrixValues(matrixId, rows, columns) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(parseFloat(document.getElementById(`${matrixId}${i}${j}`).value) || 0);
        }
        matrix.push(row);
    }
    return matrix;
}

function setMatrixValues(matrixId, values) {
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            document.getElementById(`${matrixId}${i}${j}`).textContent = values[i][j];
        }
    }
}

function addMatrices() {
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);
    const A = getMatrixValues('a', rows, columns);
    const B = getMatrixValues('b', rows, columns);
    const result = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(A[i][j] + B[i][j]);
        }
        result.push(row);
    }
    setMatrixValues('result', result);
}

function subtractMatrices() {
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);
    const A = getMatrixValues('a', rows, columns);
    const B = getMatrixValues('b', rows, columns);
    const result = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(A[i][j] - B[i][j]);
        }
        result.push(row);
    }
    setMatrixValues('result', result);
}

function multiplyMatrices() {
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);
    const A = getMatrixValues('a', rows, columns);
    const B = getMatrixValues('b', rows, columns);
    const result = Array.from({ length: rows }, () => Array(columns).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            for (let k = 0; k < columns; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    setMatrixValues('result', result);
}
