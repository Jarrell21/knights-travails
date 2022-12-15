const ui = (() => {
  const loadPage = () => {
    createGameBoard();
  };
  const createGameBoard = () => {
    const container = document.querySelector('.game-board-container');

    for (let i = 1; i <= 64; i++) {
      container.innerHTML += `<button>${i}</button>`;
    }
  };

  return { loadPage };
})();

export default ui;
