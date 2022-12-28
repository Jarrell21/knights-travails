import Graph from './graph';

const UI = (() => {
  const chessBoardContainer = document.querySelector('.chess-board-container');
  const placeKnightBtn = document.querySelector('.place-knight-btn');
  const selectEndBtn = document.querySelector('.select-end-btn');
  const travailBtn = document.querySelector('.travail-btn');
  const resetBtn = document.querySelector('.reset-btn');

  const loadPage = () => {
    createChessBoard();
    initButtons();
  };

  const createChessBoard = () => {
    for (let i = 8; i >= 1; i -= 1) {
      for (let j = 1; j <= 8; j += 1) {
        chessBoardContainer.innerHTML += `<div class="chess-box" data-coord="${i},${j}"></div>`;
      }
    }
  };

  const initButtons = () => {
    placeKnightBtn.addEventListener('click', chooseStartPosition);
    selectEndBtn.addEventListener('click', chooseEndPosition);
    travailBtn.addEventListener('click', knightTravails);
    resetBtn.addEventListener('click', clearChessBoard);
  };

  const chooseStartPosition = (e) => {
    const chessBoardBoxes = document.querySelectorAll('.chess-box');

    e.target.classList.add('active');

    chessBoardBoxes.forEach((element) => {
      element.setAttribute('id', 'choosing-start');
      element.addEventListener('click', placeKnight);
    });
  };

  const chooseEndPosition = (e) => {
    const chessBoardBoxes = document.querySelectorAll('.chess-box');

    e.target.classList.add('active');

    chessBoardBoxes.forEach((element) => {
      if (element.classList.contains('starting-place')) return;
      element.setAttribute('id', 'choosing-end');
      element.addEventListener('click', selectEnd);
    });
  };

  const placeKnight = (e) => {
    const chessBoardBoxes = document.querySelectorAll('.chess-box');

    chessBoardBoxes.forEach((element) => {
      element.removeAttribute('id');
      element.removeEventListener('click', placeKnight);
    });

    e.target.innerHTML = `<img src="assets/knight.png" class="knight-img" alt="chess-knight-piece">`;
    e.target.classList.add('starting-place');
    e.target.style.background = 'green';

    placeKnightBtn.classList.remove('active');
    placeKnightBtn.setAttribute('disabled', 'true');
    selectEndBtn.removeAttribute('disabled');
    resetBtn.removeAttribute('disabled');
  };

  const selectEnd = (e) => {
    const chessBoardBoxes = document.querySelectorAll('.chess-box');

    chessBoardBoxes.forEach((element) => {
      element.removeAttribute('id');
      element.removeEventListener('click', selectEnd);
    });

    e.target.style.background = 'red';
    e.target.classList.add('ending-place');
    selectEndBtn.classList.remove('active');
    selectEndBtn.setAttribute('disabled', 'true');
    travailBtn.removeAttribute('disabled');
  };

  const knightTravails = () => {
    const startingPlace = document.querySelector('.starting-place');
    const endingPlace = document.querySelector('.ending-place');
    const start = startingPlace.getAttribute('data-coord');
    const end = endingPlace.getAttribute('data-coord');
    const [...chessBoardBoxes] = document.querySelectorAll('.chess-box');
    const movesArray = Graph.knightsTravails(start, end);

    selectEndBtn.setAttribute('disabled', 'true');
    travailBtn.setAttribute('disabled', 'true');
    resetBtn.setAttribute('disabled', 'true');

    // Find the path moves in the chessboard squares
    const chessBoardMoves = chessBoardBoxes.filter(function (e) {
      return this.includes(e.getAttribute('data-coord'));
    }, movesArray);

    // Sort the chessboard squares the same as the original path moves arrangement
    chessBoardMoves.sort(
      (a, b) =>
        movesArray.indexOf(a.getAttribute('data-coord')) -
        movesArray.indexOf(b.getAttribute('data-coord'))
    );

    // Marking each chessboard square along the path
    for (let i = 0; i < chessBoardMoves.length; i += 1) {
      setTimeout(() => {
        if (i === 0) {
          // Delete previous starting place
          chessBoardMoves[i].classList.remove('starting-place');
        } else {
          chessBoardMoves[i].style.background = 'green';

          chessBoardMoves[i - 1].innerHTML = `${i - 1}`;

          chessBoardMoves[i].innerHTML = `<span >${i}</span>
              <img src="assets/knight.png" class="knight-img"  alt="chess-knight-piece">`;

          // When the loop reaches the endPlace, change the endPlace to be the starting place
          // and enable selectEndBtn and resetBtn
          if (i === chessBoardMoves.length - 1) {
            chessBoardMoves[i].classList.remove('ending-place');
            chessBoardMoves[i].classList.add('starting-place');
            selectEndBtn.removeAttribute('disabled');
            resetBtn.removeAttribute('disabled');
          }
        }
      }, i * 1000);
    }
  };

  const clearChessBoard = () => {
    chessBoardContainer.innerHTML = '';

    placeKnightBtn.removeAttribute('disabled');
    selectEndBtn.classList.remove('active');
    selectEndBtn.setAttribute('disabled', 'true');
    travailBtn.setAttribute('disabled', 'true');
    resetBtn.setAttribute('disabled', 'true');

    createChessBoard();
  };

  return { loadPage };
})();

export default UI;
