const socket = io()
const chess = new Chess()
const boardElement = document.querySelector('.chessboard')
let draggedPiece= null
let sourceSquare = null
let playerRole = null

// 1:22:53 timestamp marked

// const renderBoard = () => {
//     // position of each element on the board
//     const board = chess.board()
//     boardElement.innerHTML = ''
//     board.forEach((row, rowIndex) => {
//         row.forEach((square, squareIndex) => {  // Use 'row' here instead of 'board'
//             const squareElement = document.createElement('div')
//             squareElement.classList.add('square',
//             (rowIndex + squareIndex)%2===0 ? 'light':'dark'
//             )
//             squareElement.dataset.row = rowIndex
//             squareElement.dataset.col = squareIndex
//             if(square){
//                 const pieceElement = document.createElement('div')
//                 pieceElement.classList.add('piece')
//             }
//         })
//     })
// }


const handleMove = ()=>{

}

const pieceUnicode = ()=>{

}

renderBoard()