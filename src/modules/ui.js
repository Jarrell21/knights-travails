import Graph from './graph';

const UI = (() => {
  const chessBoardContainer = document.querySelector('.chess-board-container');
  const placeKnightBtn = document.querySelector('.place-knight-btn');
  const selectEndBtn = document.querySelector('.select-end-btn');
  const resetBtn = document.querySelector('.reset-btn');

  const loadPage = () => {
    createChessBoard();
    initButtons();
  };

  const createChessBoard = () => {
    for (let i = 8; i >= 1; i -= 1) {
      for (let j = 1; j <= 8; j += 1) {
        chessBoardContainer.innerHTML += `<div class="chess-box" data-coord="${i},${j}">${i},${j}</div>`;
      }
    }
  };

  const initButtons = () => {
    placeKnightBtn.addEventListener('click', chooseStartPosition);
    selectEndBtn.addEventListener('click', chooseEndPosition);
    resetBtn.addEventListener('click', clearChessBoard);
  };

  const chooseStartPosition = (e) => {
    const chessBoardBoxes = document.querySelectorAll('.chess-box');

    e.target.classList.add('active');

    chessBoardBoxes.forEach((element) => {
      element.setAttribute('id', 'selecting');
      element.addEventListener('click', placeKnight);
    });
  };

  const chooseEndPosition = (e) => {
    const chessBoardBoxes = document.querySelectorAll('.chess-box');

    e.target.classList.add('active');

    chessBoardBoxes.forEach((element) => {
      element.setAttribute('id', 'selecting');
      element.addEventListener('click', selectEnd);
    });
  };

  const placeKnight = (e) => {
    const chessBoardBoxes = document.querySelectorAll('.chess-box');

    chessBoardBoxes.forEach((element) => {
      element.removeAttribute('id');
      element.removeEventListener('click', placeKnight);
    });

    // e.target.textContent = 'S';
    e.target.setAttribute('data-id', 'starting-place');
    changeBgColor(e);
    disablePlaceKnightBtn();
  };

  const selectEnd = (e) => {
    const chessBoardBoxes = document.querySelectorAll('.chess-box');

    chessBoardBoxes.forEach((element) => {
      element.removeAttribute('id');
      element.removeEventListener('click', selectEnd);
    });

    // e.target.textContent = 'X';
    changeBgColor(e);
    selectEndBtn.classList.remove('active');

    const startingPlace = document.querySelector('[data-id="starting-place"]');
    const start = startingPlace.getAttribute('data-coord');
    const end = e.target.getAttribute('data-coord');

    console.log(Graph.knightsTravails(start, end));
  };

  const clearChessBoard = () => {
    chessBoardContainer.innerHTML = '';
    enablePlaceKnightBtn();
    createChessBoard();
  };

  const changeBgColor = (e) => {
    e.target.style.background = 'red';
  };

  const enablePlaceKnightBtn = () => {
    placeKnightBtn.removeAttribute('disabled');

    // Disable selectBtn and resetBtn
    selectEndBtn.classList.remove('active');
    selectEndBtn.setAttribute('disabled', 'true');
    resetBtn.setAttribute('disabled', 'true');
  };

  const disablePlaceKnightBtn = () => {
    placeKnightBtn.classList.remove('active');
    placeKnightBtn.setAttribute('disabled', 'true');

    // Enable selectBtn and resetBtn
    selectEndBtn.removeAttribute('disabled');
    resetBtn.removeAttribute('disabled');
  };

  return { loadPage };
})();

export default UI;
