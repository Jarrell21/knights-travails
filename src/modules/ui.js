const UI = (() => {
  const gameBoardContainer = document.querySelector('.game-board-container');
  const placeKnightBtn = document.querySelector('.place-knight-btn');
  const selectEndBtn = document.querySelector('.select-end-btn');
  const resetBtn = document.querySelector('.reset-btn');

  const loadPage = () => {
    createGameBoard();
    initButtons();
  };

  const createGameBoard = () => {
    for (let i = 8; i >= 1; i -= 1) {
      for (let j = 1; j <= 8; j += 1) {
        gameBoardContainer.innerHTML += `<div class="board-box" data-coord="[${i},${j}]"></div>`;
      }
    }
  };

  const initButtons = () => {
    placeKnightBtn.addEventListener('click', chooseStartPosition);
    selectEndBtn.addEventListener('click', chooseEndPosition);
    resetBtn.addEventListener('click', clearGameBoard);
  };

  const chooseStartPosition = (e) => {
    const gameBoardBoxes = document.querySelectorAll('.board-box');

    e.target.classList.add('active');

    gameBoardBoxes.forEach((element) => {
      element.setAttribute('id', 'selecting');
      element.addEventListener('click', placeKnight);
    });
  };

  const clearGameBoard = () => {
    gameBoardContainer.innerHTML = '';
    enablePlaceKnightBtn();
    disableSelectEndBtn();
    disableResetBtn();
    createGameBoard();
  };

  const placeKnight = (e) => {
    const gameBoardBoxes = document.querySelectorAll('.board-box');

    gameBoardBoxes.forEach((element) => {
      element.removeAttribute('id');
      element.removeEventListener('click', placeKnight);
    });

    e.target.textContent = 'S';
    e.target.setAttribute('data-id', 'starting-place');
    changeBgColor(e);
    disablePlaceKnightBtn();
    enableSelectEndBtn();
    enableResetBtn();
  };

  const chooseEndPosition = (e) => {
    const gameBoardBoxes = document.querySelectorAll('.board-box');

    e.target.classList.add('active');

    gameBoardBoxes.forEach((element) => {
      element.setAttribute('id', 'selecting');
      element.addEventListener('click', selectEnd);
    });
  };

  const selectEnd = (e) => {
    const gameBoardBoxes = document.querySelectorAll('.board-box');

    gameBoardBoxes.forEach((element) => {
      element.removeAttribute('id');
      element.removeEventListener('click', selectEnd);
    });

    e.target.textContent = 'X';
    changeBgColor(e);
    selectEndBtn.classList.remove('active');

    const startingPlace = document.querySelector('[data-id="starting-place"]');
    const start = startingPlace.getAttribute('data-coord');
    const end = e.target.getAttribute('data-coord');

    console.log(start, end);
    // knightsTravails(start, end);
  };

  const changeBgColor = (e) => {
    e.target.style.background = 'red';
  };

  const enablePlaceKnightBtn = () => {
    placeKnightBtn.removeAttribute('disabled');
  };

  const disablePlaceKnightBtn = () => {
    placeKnightBtn.classList.remove('active');
    placeKnightBtn.setAttribute('disabled', 'true');
  };

  const enableSelectEndBtn = () => {
    selectEndBtn.removeAttribute('disabled');
  };

  const disableSelectEndBtn = () => {
    selectEndBtn.classList.remove('active');
    selectEndBtn.setAttribute('disabled', 'true');
  };

  const enableResetBtn = () => {
    resetBtn.removeAttribute('disabled');
  };

  const disableResetBtn = () => {
    resetBtn.setAttribute('disabled', 'true');
  };

  return { loadPage };
})();

export default UI;
