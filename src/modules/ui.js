const ui = (() => {
  const gameBoardContainer = document.querySelector('.game-board-container');
  const placeKnightBtn = document.querySelector('.place-knight-btn');
  const selectEndBtn = document.querySelector('.select-end-btn');
  const resetBtn = document.querySelector('.reset-btn');

  const loadPage = () => {
    createGameBoard();
    initButtons();
  };

  const createGameBoard = () => {
    for (let i = 1; i <= 64; i += 1) {
      gameBoardContainer.innerHTML += `<div class="board-box" data-id="${i}"></div>`;
    }
  };

  const initButtons = () => {
    placeKnightBtn.addEventListener('click', chooseBox);
    resetBtn.addEventListener('click', clearGameBoard);
  };

  const chooseBox = (e) => {
    const gameBoardBoxes = document.querySelectorAll('.board-box');

    e.target.classList.add('active');

    gameBoardBoxes.forEach((element) => {
      element.style.cursor = 'pointer';
      element.addEventListener('mouseover', changeBgColor);
      element.addEventListener('mouseout', removeBgColor);
      element.addEventListener('click', placeKnight);
    });
  };

  const clearGameBoard = () => {
    gameBoardContainer.innerHTML = '';
    handleButtons();
    createGameBoard();
  };

  const placeKnight = (e) => {
    const gameBoardBoxes = document.querySelectorAll('.board-box');

    gameBoardBoxes.forEach((element) => {
      element.style.cursor = '';
      element.removeEventListener('mouseout', removeBgColor);
      element.removeEventListener('mouseover', changeBgColor);
      element.removeEventListener('click', placeKnight);
    });

    e.target.textContent = 'X';
    e.target.classList.add('main-place');
    changeBgColor(e);
    handleButtons();
  };

  const handleButtons = () => {
    if (placeKnightBtn.classList.contains('active')) {
      placeKnightBtn.classList.remove('active');
      placeKnightBtn.setAttribute('disabled', 'true');
      selectEndBtn.removeAttribute('disabled');
      resetBtn.removeAttribute('disabled');
    } else {
      placeKnightBtn.removeAttribute('disabled');
      selectEndBtn.setAttribute('disabled', 'true');
      resetBtn.setAttribute('disabled', 'true');
    }
  };

  const changeBgColor = (e) => {
    e.target.style.background = 'red';
  };

  const removeBgColor = (e) => {
    e.target.style.background = '';
  };

  return { loadPage };
})();

export default ui;
