# Matrix Operations

A small browser-based matrix calculator built with HTML, CSS, and vanilla JavaScript.

**Live demo:** https://akashyadav-matricescalculator.netlify.app/

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a browser.
3. Enter positive row and column counts, then select **Create Matrices**.
4. Fill in the values for Matrix A and Matrix B.
5. Choose **Add**, **Subtract**, or **Multiply** to display the result.

No package installation or build step is required.

## Supported operations

- **Addition:** adds corresponding entries from matrices A and B.
- **Subtraction:** subtracts corresponding entries from matrix B from matrix A.
- **Multiplication:** the current interface creates both matrices with the same dimensions, so multiplication is supported only for square matrices. The app displays a validation message if multiplication is attempted with a rectangular shape.

Empty matrix cells are treated as zero.

## Project files

- `index.html` — page structure and controls.
- `styles.css` — layout and visual styling.
- `scripts.js` — matrix creation, input reading, and arithmetic operations.

## Tests

The matrix multiplication regression tests use Node.js's built-in test runner:

```sh
node --test tests/matrix-multiplication.test.js
```
