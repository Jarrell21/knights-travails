/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/graph.js":
/*!******************************!*\
  !*** ./src/modules/graph.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Graph = (() => {
  const chessBoard = new Map();

  const addVertices = (size = 8) => {
    for (let i = 1; i <= size; i += 1) {
      for (let j = 1; j <= size; j += 1) {
        chessBoard.set(`${[i, j]}`, []);
      }
    }
  };

  const addEdges = (board = chessBoard) => {
    for (const [vertex] of board) {
      const vertexArr = vertex.split(',');
      const x = parseInt(vertexArr[0]);
      const y = parseInt(vertexArr[1]);

      const clockOfDirection = {
        1: [x + 1, y + 2],
        2: [x + 2, y + 1],
        4: [x + 2, y - 1],
        5: [x + 1, y - 2],
        7: [x - 1, y - 2],
        8: [x - 2, y - 1],
        10: [x - 2, y + 1],
        11: [x - 1, y + 2],
      };

      for (const pos in clockOfDirection) {
        const move = clockOfDirection[pos].toString();
        if (board.has(move) && !board.get(vertex).includes(move)) {
          chessBoard.get(vertex).push(move);
        }
      }
    }
  };

  const knightsTravails = (start, end) => {
    let numberOfMoves = 0;
    const paths = [];
    const visited = new Set();
    const queue = [];
    queue.push([start, [start]]);

    while (queue.length > 0) {
      const [current, path] = queue.shift();
      visited.add(current);
      if (current === end) {
        paths.push(path);
      }
      const neighbors = chessBoard.get(current);
      for (const pos of neighbors) {
        if (!visited.has(pos)) {
          queue.push([pos, [...path, pos]]);
        }
      }
    }

    const moves = paths[0].map((element) => {
      numberOfMoves += 1;
      return element;
    });
    // console.log(moves);
    // console.log(numberOfMoves);
    return { moves, numberOfMoves };
  };

  return { addVertices, addEdges, knightsTravails };
})();

Graph.addVertices();
Graph.addEdges();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Graph);


/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph */ "./src/modules/graph.js");


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

    console.log(_graph__WEBPACK_IMPORTED_MODULE_0__["default"].knightsTravails(start, end));
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ "./src/modules/ui.js");


document.addEventListener('DOMContentLoaded', _modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0Isc0JBQXNCLFdBQVc7QUFDakMsMEJBQTBCLE9BQU87QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RU87QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QiwrRUFBK0UsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtBQUNqRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsOERBQXFCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxFQUFFLEVBQUM7Ozs7Ozs7VUNqSGxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEI7QUFDOUI7QUFDQSw4Q0FBOEMsNERBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL21vZHVsZXMvZ3JhcGguanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEdyYXBoID0gKCgpID0+IHtcclxuICBjb25zdCBjaGVzc0JvYXJkID0gbmV3IE1hcCgpO1xyXG5cclxuICBjb25zdCBhZGRWZXJ0aWNlcyA9IChzaXplID0gOCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHNpemU7IGogKz0gMSkge1xyXG4gICAgICAgIGNoZXNzQm9hcmQuc2V0KGAke1tpLCBqXX1gLCBbXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBhZGRFZGdlcyA9IChib2FyZCA9IGNoZXNzQm9hcmQpID0+IHtcclxuICAgIGZvciAoY29uc3QgW3ZlcnRleF0gb2YgYm9hcmQpIHtcclxuICAgICAgY29uc3QgdmVydGV4QXJyID0gdmVydGV4LnNwbGl0KCcsJyk7XHJcbiAgICAgIGNvbnN0IHggPSBwYXJzZUludCh2ZXJ0ZXhBcnJbMF0pO1xyXG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQodmVydGV4QXJyWzFdKTtcclxuXHJcbiAgICAgIGNvbnN0IGNsb2NrT2ZEaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgMTogW3ggKyAxLCB5ICsgMl0sXHJcbiAgICAgICAgMjogW3ggKyAyLCB5ICsgMV0sXHJcbiAgICAgICAgNDogW3ggKyAyLCB5IC0gMV0sXHJcbiAgICAgICAgNTogW3ggKyAxLCB5IC0gMl0sXHJcbiAgICAgICAgNzogW3ggLSAxLCB5IC0gMl0sXHJcbiAgICAgICAgODogW3ggLSAyLCB5IC0gMV0sXHJcbiAgICAgICAgMTA6IFt4IC0gMiwgeSArIDFdLFxyXG4gICAgICAgIDExOiBbeCAtIDEsIHkgKyAyXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgcG9zIGluIGNsb2NrT2ZEaXJlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBtb3ZlID0gY2xvY2tPZkRpcmVjdGlvbltwb3NdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKGJvYXJkLmhhcyhtb3ZlKSAmJiAhYm9hcmQuZ2V0KHZlcnRleCkuaW5jbHVkZXMobW92ZSkpIHtcclxuICAgICAgICAgIGNoZXNzQm9hcmQuZ2V0KHZlcnRleCkucHVzaChtb3ZlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBrbmlnaHRzVHJhdmFpbHMgPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgbGV0IG51bWJlck9mTW92ZXMgPSAwO1xyXG4gICAgY29uc3QgcGF0aHMgPSBbXTtcclxuICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KCk7XHJcbiAgICBjb25zdCBxdWV1ZSA9IFtdO1xyXG4gICAgcXVldWUucHVzaChbc3RhcnQsIFtzdGFydF1dKTtcclxuXHJcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBbY3VycmVudCwgcGF0aF0gPSBxdWV1ZS5zaGlmdCgpO1xyXG4gICAgICB2aXNpdGVkLmFkZChjdXJyZW50KTtcclxuICAgICAgaWYgKGN1cnJlbnQgPT09IGVuZCkge1xyXG4gICAgICAgIHBhdGhzLnB1c2gocGF0aCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmVpZ2hib3JzID0gY2hlc3NCb2FyZC5nZXQoY3VycmVudCk7XHJcbiAgICAgIGZvciAoY29uc3QgcG9zIG9mIG5laWdoYm9ycykge1xyXG4gICAgICAgIGlmICghdmlzaXRlZC5oYXMocG9zKSkge1xyXG4gICAgICAgICAgcXVldWUucHVzaChbcG9zLCBbLi4ucGF0aCwgcG9zXV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vdmVzID0gcGF0aHNbMF0ubWFwKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIG51bWJlck9mTW92ZXMgKz0gMTtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKG1vdmVzKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKG51bWJlck9mTW92ZXMpO1xyXG4gICAgcmV0dXJuIHsgbW92ZXMsIG51bWJlck9mTW92ZXMgfTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBhZGRWZXJ0aWNlcywgYWRkRWRnZXMsIGtuaWdodHNUcmF2YWlscyB9O1xyXG59KSgpO1xyXG5cclxuR3JhcGguYWRkVmVydGljZXMoKTtcclxuR3JhcGguYWRkRWRnZXMoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyYXBoO1xyXG4iLCJpbXBvcnQgR3JhcGggZnJvbSAnLi9ncmFwaCc7XHJcblxyXG5jb25zdCBVSSA9ICgoKSA9PiB7XHJcbiAgY29uc3QgY2hlc3NCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGVzcy1ib2FyZC1jb250YWluZXInKTtcclxuICBjb25zdCBwbGFjZUtuaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1rbmlnaHQtYnRuJyk7XHJcbiAgY29uc3Qgc2VsZWN0RW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdC1lbmQtYnRuJyk7XHJcbiAgY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXQtYnRuJyk7XHJcblxyXG4gIGNvbnN0IGxvYWRQYWdlID0gKCkgPT4ge1xyXG4gICAgY3JlYXRlQ2hlc3NCb2FyZCgpO1xyXG4gICAgaW5pdEJ1dHRvbnMoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjcmVhdGVDaGVzc0JvYXJkID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDg7IGkgPj0gMTsgaSAtPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IDg7IGogKz0gMSkge1xyXG4gICAgICAgIGNoZXNzQm9hcmRDb250YWluZXIuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiY2hlc3MtYm94XCIgZGF0YS1jb29yZD1cIiR7aX0sJHtqfVwiPiR7aX0sJHtqfTwvZGl2PmA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBpbml0QnV0dG9ucyA9ICgpID0+IHtcclxuICAgIHBsYWNlS25pZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hvb3NlU3RhcnRQb3NpdGlvbik7XHJcbiAgICBzZWxlY3RFbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaG9vc2VFbmRQb3NpdGlvbik7XHJcbiAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyQ2hlc3NCb2FyZCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2hvb3NlU3RhcnRQb3NpdGlvbiA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBjaGVzc0JvYXJkQm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlc3MtYm94Jyk7XHJcblxyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgY2hlc3NCb2FyZEJveGVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NlbGVjdGluZycpO1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VLbmlnaHQpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2hvb3NlRW5kUG9zaXRpb24gPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgY2hlc3NCb2FyZEJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZXNzLWJveCcpO1xyXG5cclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgIGNoZXNzQm9hcmRCb3hlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdzZWxlY3RpbmcnKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEVuZCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBwbGFjZUtuaWdodCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBjaGVzc0JvYXJkQm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlc3MtYm94Jyk7XHJcblxyXG4gICAgY2hlc3NCb2FyZEJveGVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZUtuaWdodCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBlLnRhcmdldC50ZXh0Q29udGVudCA9ICdTJztcclxuICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsICdzdGFydGluZy1wbGFjZScpO1xyXG4gICAgY2hhbmdlQmdDb2xvcihlKTtcclxuICAgIGRpc2FibGVQbGFjZUtuaWdodEJ0bigpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdEVuZCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBjaGVzc0JvYXJkQm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlc3MtYm94Jyk7XHJcblxyXG4gICAgY2hlc3NCb2FyZEJveGVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RFbmQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZS50YXJnZXQudGV4dENvbnRlbnQgPSAnWCc7XHJcbiAgICBjaGFuZ2VCZ0NvbG9yKGUpO1xyXG4gICAgc2VsZWN0RW5kQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0aW5nUGxhY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pZD1cInN0YXJ0aW5nLXBsYWNlXCJdJyk7XHJcbiAgICBjb25zdCBzdGFydCA9IHN0YXJ0aW5nUGxhY2UuZ2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJyk7XHJcbiAgICBjb25zdCBlbmQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhHcmFwaC5rbmlnaHRzVHJhdmFpbHMoc3RhcnQsIGVuZCkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNsZWFyQ2hlc3NCb2FyZCA9ICgpID0+IHtcclxuICAgIGNoZXNzQm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBlbmFibGVQbGFjZUtuaWdodEJ0bigpO1xyXG4gICAgY3JlYXRlQ2hlc3NCb2FyZCgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNoYW5nZUJnQ29sb3IgPSAoZSkgPT4ge1xyXG4gICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGVuYWJsZVBsYWNlS25pZ2h0QnRuID0gKCkgPT4ge1xyXG4gICAgcGxhY2VLbmlnaHRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG5cclxuICAgIC8vIERpc2FibGUgc2VsZWN0QnRuIGFuZCByZXNldEJ0blxyXG4gICAgc2VsZWN0RW5kQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgc2VsZWN0RW5kQnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgcmVzZXRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGlzYWJsZVBsYWNlS25pZ2h0QnRuID0gKCkgPT4ge1xyXG4gICAgcGxhY2VLbmlnaHRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBwbGFjZUtuaWdodEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuXHJcbiAgICAvLyBFbmFibGUgc2VsZWN0QnRuIGFuZCByZXNldEJ0blxyXG4gICAgc2VsZWN0RW5kQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgIHJlc2V0QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBsb2FkUGFnZSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVUk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gJy4vbW9kdWxlcy91aSc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVUkubG9hZFBhZ2UpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=