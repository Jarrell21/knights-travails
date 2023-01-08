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

    const moves = paths[0].map((element) => element);
    return moves;
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
    const movesArray = _graph__WEBPACK_IMPORTED_MODULE_0__["default"].knightsTravails(start, end);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0Isc0JBQXNCLFdBQVc7QUFDakMsMEJBQTBCLE9BQU87QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ25FTztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsc0JBQXNCLFFBQVE7QUFDOUIsK0VBQStFLEVBQUUsR0FBRyxFQUFFO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsOERBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsZ0RBQWdELE1BQU07QUFDdEQ7QUFDQSxtREFBbUQsRUFBRTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxFQUFFLEVBQUM7Ozs7Ozs7VUN2SmxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEI7QUFDOUI7QUFDQSw4Q0FBOEMsNERBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL21vZHVsZXMvZ3JhcGguanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEdyYXBoID0gKCgpID0+IHtcclxuICBjb25zdCBjaGVzc0JvYXJkID0gbmV3IE1hcCgpO1xyXG5cclxuICBjb25zdCBhZGRWZXJ0aWNlcyA9IChzaXplID0gOCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHNpemU7IGogKz0gMSkge1xyXG4gICAgICAgIGNoZXNzQm9hcmQuc2V0KGAke1tpLCBqXX1gLCBbXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBhZGRFZGdlcyA9IChib2FyZCA9IGNoZXNzQm9hcmQpID0+IHtcclxuICAgIGZvciAoY29uc3QgW3ZlcnRleF0gb2YgYm9hcmQpIHtcclxuICAgICAgY29uc3QgdmVydGV4QXJyID0gdmVydGV4LnNwbGl0KCcsJyk7XHJcbiAgICAgIGNvbnN0IHggPSBwYXJzZUludCh2ZXJ0ZXhBcnJbMF0pO1xyXG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQodmVydGV4QXJyWzFdKTtcclxuXHJcbiAgICAgIGNvbnN0IGNsb2NrT2ZEaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgMTogW3ggKyAxLCB5ICsgMl0sXHJcbiAgICAgICAgMjogW3ggKyAyLCB5ICsgMV0sXHJcbiAgICAgICAgNDogW3ggKyAyLCB5IC0gMV0sXHJcbiAgICAgICAgNTogW3ggKyAxLCB5IC0gMl0sXHJcbiAgICAgICAgNzogW3ggLSAxLCB5IC0gMl0sXHJcbiAgICAgICAgODogW3ggLSAyLCB5IC0gMV0sXHJcbiAgICAgICAgMTA6IFt4IC0gMiwgeSArIDFdLFxyXG4gICAgICAgIDExOiBbeCAtIDEsIHkgKyAyXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgcG9zIGluIGNsb2NrT2ZEaXJlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBtb3ZlID0gY2xvY2tPZkRpcmVjdGlvbltwb3NdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKGJvYXJkLmhhcyhtb3ZlKSAmJiAhYm9hcmQuZ2V0KHZlcnRleCkuaW5jbHVkZXMobW92ZSkpIHtcclxuICAgICAgICAgIGNoZXNzQm9hcmQuZ2V0KHZlcnRleCkucHVzaChtb3ZlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBrbmlnaHRzVHJhdmFpbHMgPSAoc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgY29uc3QgcGF0aHMgPSBbXTtcclxuICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KCk7XHJcbiAgICBjb25zdCBxdWV1ZSA9IFtdO1xyXG4gICAgcXVldWUucHVzaChbc3RhcnQsIFtzdGFydF1dKTtcclxuXHJcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBbY3VycmVudCwgcGF0aF0gPSBxdWV1ZS5zaGlmdCgpO1xyXG4gICAgICB2aXNpdGVkLmFkZChjdXJyZW50KTtcclxuICAgICAgaWYgKGN1cnJlbnQgPT09IGVuZCkge1xyXG4gICAgICAgIHBhdGhzLnB1c2gocGF0aCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmVpZ2hib3JzID0gY2hlc3NCb2FyZC5nZXQoY3VycmVudCk7XHJcbiAgICAgIGZvciAoY29uc3QgcG9zIG9mIG5laWdoYm9ycykge1xyXG4gICAgICAgIGlmICghdmlzaXRlZC5oYXMocG9zKSkge1xyXG4gICAgICAgICAgcXVldWUucHVzaChbcG9zLCBbLi4ucGF0aCwgcG9zXV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vdmVzID0gcGF0aHNbMF0ubWFwKChlbGVtZW50KSA9PiBlbGVtZW50KTtcclxuICAgIHJldHVybiBtb3ZlcztcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBhZGRWZXJ0aWNlcywgYWRkRWRnZXMsIGtuaWdodHNUcmF2YWlscyB9O1xyXG59KSgpO1xyXG5cclxuR3JhcGguYWRkVmVydGljZXMoKTtcclxuR3JhcGguYWRkRWRnZXMoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyYXBoO1xyXG4iLCJpbXBvcnQgR3JhcGggZnJvbSAnLi9ncmFwaCc7XHJcblxyXG5jb25zdCBVSSA9ICgoKSA9PiB7XHJcbiAgY29uc3QgY2hlc3NCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGVzcy1ib2FyZC1jb250YWluZXInKTtcclxuICBjb25zdCBwbGFjZUtuaWdodEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1rbmlnaHQtYnRuJyk7XHJcbiAgY29uc3Qgc2VsZWN0RW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdC1lbmQtYnRuJyk7XHJcbiAgY29uc3QgdHJhdmFpbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cmF2YWlsLWJ0bicpO1xyXG4gIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0LWJ0bicpO1xyXG5cclxuICBjb25zdCBsb2FkUGFnZSA9ICgpID0+IHtcclxuICAgIGNyZWF0ZUNoZXNzQm9hcmQoKTtcclxuICAgIGluaXRCdXR0b25zKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY3JlYXRlQ2hlc3NCb2FyZCA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSA4OyBpID49IDE7IGkgLT0gMSkge1xyXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSA4OyBqICs9IDEpIHtcclxuICAgICAgICBjaGVzc0JvYXJkQ29udGFpbmVyLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cImNoZXNzLWJveFwiIGRhdGEtY29vcmQ9XCIke2l9LCR7an1cIj48L2Rpdj5gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBwbGFjZUtuaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNob29zZVN0YXJ0UG9zaXRpb24pO1xyXG4gICAgc2VsZWN0RW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hvb3NlRW5kUG9zaXRpb24pO1xyXG4gICAgdHJhdmFpbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGtuaWdodFRyYXZhaWxzKTtcclxuICAgIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJDaGVzc0JvYXJkKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaG9vc2VTdGFydFBvc2l0aW9uID0gKGUpID0+IHtcclxuICAgIGNvbnN0IGNoZXNzQm9hcmRCb3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVzcy1ib3gnKTtcclxuXHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICBjaGVzc0JvYXJkQm94ZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnY2hvb3Npbmctc3RhcnQnKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlS25pZ2h0KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNob29zZUVuZFBvc2l0aW9uID0gKGUpID0+IHtcclxuICAgIGNvbnN0IGNoZXNzQm9hcmRCb3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVzcy1ib3gnKTtcclxuXHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICBjaGVzc0JvYXJkQm94ZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3N0YXJ0aW5nLXBsYWNlJykpIHJldHVybjtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Nob29zaW5nLWVuZCcpO1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0RW5kKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYWNlS25pZ2h0ID0gKGUpID0+IHtcclxuICAgIGNvbnN0IGNoZXNzQm9hcmRCb3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVzcy1ib3gnKTtcclxuXHJcbiAgICBjaGVzc0JvYXJkQm94ZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlS25pZ2h0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGUudGFyZ2V0LmlubmVySFRNTCA9IGA8aW1nIHNyYz1cImFzc2V0cy9rbmlnaHQucG5nXCIgY2xhc3M9XCJrbmlnaHQtaW1nXCIgYWx0PVwiY2hlc3Mta25pZ2h0LXBpZWNlXCI+YDtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3N0YXJ0aW5nLXBsYWNlJyk7XHJcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ2dyZWVuJztcclxuXHJcbiAgICBwbGFjZUtuaWdodEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIHBsYWNlS25pZ2h0QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgc2VsZWN0RW5kQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgIHJlc2V0QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RFbmQgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgY2hlc3NCb2FyZEJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZXNzLWJveCcpO1xyXG5cclxuICAgIGNoZXNzQm9hcmRCb3hlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0RW5kKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAncmVkJztcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2VuZGluZy1wbGFjZScpO1xyXG4gICAgc2VsZWN0RW5kQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgc2VsZWN0RW5kQnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgdHJhdmFpbEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qga25pZ2h0VHJhdmFpbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzdGFydGluZ1BsYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0aW5nLXBsYWNlJyk7XHJcbiAgICBjb25zdCBlbmRpbmdQbGFjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmRpbmctcGxhY2UnKTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gc3RhcnRpbmdQbGFjZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnKTtcclxuICAgIGNvbnN0IGVuZCA9IGVuZGluZ1BsYWNlLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcpO1xyXG4gICAgY29uc3QgWy4uLmNoZXNzQm9hcmRCb3hlc10gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlc3MtYm94Jyk7XHJcbiAgICBjb25zdCBtb3Zlc0FycmF5ID0gR3JhcGgua25pZ2h0c1RyYXZhaWxzKHN0YXJ0LCBlbmQpO1xyXG5cclxuICAgIHNlbGVjdEVuZEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgIHRyYXZhaWxCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICByZXNldEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuXHJcbiAgICAvLyBGaW5kIHRoZSBwYXRoIG1vdmVzIGluIHRoZSBjaGVzc2JvYXJkIHNxdWFyZXNcclxuICAgIGNvbnN0IGNoZXNzQm9hcmRNb3ZlcyA9IGNoZXNzQm9hcmRCb3hlcy5maWx0ZXIoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5jbHVkZXMoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnKSk7XHJcbiAgICB9LCBtb3Zlc0FycmF5KTtcclxuXHJcbiAgICAvLyBTb3J0IHRoZSBjaGVzc2JvYXJkIHNxdWFyZXMgdGhlIHNhbWUgYXMgdGhlIG9yaWdpbmFsIHBhdGggbW92ZXMgYXJyYW5nZW1lbnRcclxuICAgIGNoZXNzQm9hcmRNb3Zlcy5zb3J0KFxyXG4gICAgICAoYSwgYikgPT5cclxuICAgICAgICBtb3Zlc0FycmF5LmluZGV4T2YoYS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnKSkgLVxyXG4gICAgICAgIG1vdmVzQXJyYXkuaW5kZXhPZihiLmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcpKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBNYXJraW5nIGVhY2ggY2hlc3Nib2FyZCBzcXVhcmUgYWxvbmcgdGhlIHBhdGhcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hlc3NCb2FyZE1vdmVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAvLyBEZWxldGUgcHJldmlvdXMgc3RhcnRpbmcgcGxhY2VcclxuICAgICAgICAgIGNoZXNzQm9hcmRNb3Zlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdzdGFydGluZy1wbGFjZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjaGVzc0JvYXJkTW92ZXNbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICdncmVlbic7XHJcblxyXG4gICAgICAgICAgY2hlc3NCb2FyZE1vdmVzW2kgLSAxXS5pbm5lckhUTUwgPSBgJHtpIC0gMX1gO1xyXG5cclxuICAgICAgICAgIGNoZXNzQm9hcmRNb3Zlc1tpXS5pbm5lckhUTUwgPSBgPHNwYW4gPiR7aX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMva25pZ2h0LnBuZ1wiIGNsYXNzPVwia25pZ2h0LWltZ1wiICBhbHQ9XCJjaGVzcy1rbmlnaHQtcGllY2VcIj5gO1xyXG5cclxuICAgICAgICAgIC8vIFdoZW4gdGhlIGxvb3AgcmVhY2hlcyB0aGUgZW5kUGxhY2UsIGNoYW5nZSB0aGUgZW5kUGxhY2UgdG8gYmUgdGhlIHN0YXJ0aW5nIHBsYWNlXHJcbiAgICAgICAgICAvLyBhbmQgZW5hYmxlIHNlbGVjdEVuZEJ0biBhbmQgcmVzZXRCdG5cclxuICAgICAgICAgIGlmIChpID09PSBjaGVzc0JvYXJkTW92ZXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBjaGVzc0JvYXJkTW92ZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnZW5kaW5nLXBsYWNlJyk7XHJcbiAgICAgICAgICAgIGNoZXNzQm9hcmRNb3Zlc1tpXS5jbGFzc0xpc3QuYWRkKCdzdGFydGluZy1wbGFjZScpO1xyXG4gICAgICAgICAgICBzZWxlY3RFbmRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICByZXNldEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCBpICogMTAwMCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2xlYXJDaGVzc0JvYXJkID0gKCkgPT4ge1xyXG4gICAgY2hlc3NCb2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBwbGFjZUtuaWdodEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICBzZWxlY3RFbmRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBzZWxlY3RFbmRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICB0cmF2YWlsQnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgcmVzZXRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcblxyXG4gICAgY3JlYXRlQ2hlc3NCb2FyZCgpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IGxvYWRQYWdlIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVSTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVUkgZnJvbSAnLi9tb2R1bGVzL3VpJztcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5sb2FkUGFnZSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==