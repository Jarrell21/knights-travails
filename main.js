/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHNCQUFzQixRQUFRO0FBQzlCLCtFQUErRSxFQUFFLEdBQUcsRUFBRTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLENBQUM7QUFDRDtBQUNBLGlFQUFlLEVBQUUsRUFBQzs7Ozs7OztVQzVIbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QjtBQUM5QjtBQUNBLDhDQUE4Qyw0REFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBVSSA9ICgoKSA9PiB7XHJcbiAgY29uc3QgZ2FtZUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgY29uc3QgcGxhY2VLbmlnaHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxhY2Uta25pZ2h0LWJ0bicpO1xyXG4gIGNvbnN0IHNlbGVjdEVuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtZW5kLWJ0bicpO1xyXG4gIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0LWJ0bicpO1xyXG5cclxuICBjb25zdCBsb2FkUGFnZSA9ICgpID0+IHtcclxuICAgIGNyZWF0ZUdhbWVCb2FyZCgpO1xyXG4gICAgaW5pdEJ1dHRvbnMoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gODsgaSA+PSAxOyBpIC09IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gODsgaiArPSAxKSB7XHJcbiAgICAgICAgZ2FtZUJvYXJkQ29udGFpbmVyLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cImJvYXJkLWJveFwiIGRhdGEtY29vcmQ9XCJbJHtpfSwke2p9XVwiPjwvZGl2PmA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBpbml0QnV0dG9ucyA9ICgpID0+IHtcclxuICAgIHBsYWNlS25pZ2h0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hvb3NlU3RhcnRQb3NpdGlvbik7XHJcbiAgICBzZWxlY3RFbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaG9vc2VFbmRQb3NpdGlvbik7XHJcbiAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyR2FtZUJvYXJkKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaG9vc2VTdGFydFBvc2l0aW9uID0gKGUpID0+IHtcclxuICAgIGNvbnN0IGdhbWVCb2FyZEJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLWJveCcpO1xyXG5cclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgIGdhbWVCb2FyZEJveGVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NlbGVjdGluZycpO1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VLbmlnaHQpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2xlYXJHYW1lQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBnYW1lQm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBlbmFibGVQbGFjZUtuaWdodEJ0bigpO1xyXG4gICAgZGlzYWJsZVNlbGVjdEVuZEJ0bigpO1xyXG4gICAgZGlzYWJsZVJlc2V0QnRuKCk7XHJcbiAgICBjcmVhdGVHYW1lQm9hcmQoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBwbGFjZUtuaWdodCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBnYW1lQm9hcmRCb3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1ib3gnKTtcclxuXHJcbiAgICBnYW1lQm9hcmRCb3hlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VLbmlnaHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSAnUyc7XHJcbiAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCAnc3RhcnRpbmctcGxhY2UnKTtcclxuICAgIGNoYW5nZUJnQ29sb3IoZSk7XHJcbiAgICBkaXNhYmxlUGxhY2VLbmlnaHRCdG4oKTtcclxuICAgIGVuYWJsZVNlbGVjdEVuZEJ0bigpO1xyXG4gICAgZW5hYmxlUmVzZXRCdG4oKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaG9vc2VFbmRQb3NpdGlvbiA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBnYW1lQm9hcmRCb3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1ib3gnKTtcclxuXHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICBnYW1lQm9hcmRCb3hlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdzZWxlY3RpbmcnKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEVuZCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZWxlY3RFbmQgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgZ2FtZUJvYXJkQm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtYm94Jyk7XHJcblxyXG4gICAgZ2FtZUJvYXJkQm94ZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEVuZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9ICdYJztcclxuICAgIGNoYW5nZUJnQ29sb3IoZSk7XHJcbiAgICBzZWxlY3RFbmRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgY29uc3Qgc3RhcnRpbmdQbGFjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlkPVwic3RhcnRpbmctcGxhY2VcIl0nKTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gc3RhcnRpbmdQbGFjZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnKTtcclxuICAgIGNvbnN0IGVuZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHN0YXJ0LCBlbmQpO1xyXG4gICAgLy8ga25pZ2h0c1RyYXZhaWxzKHN0YXJ0LCBlbmQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNoYW5nZUJnQ29sb3IgPSAoZSkgPT4ge1xyXG4gICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICdyZWQnO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGVuYWJsZVBsYWNlS25pZ2h0QnRuID0gKCkgPT4ge1xyXG4gICAgcGxhY2VLbmlnaHRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRpc2FibGVQbGFjZUtuaWdodEJ0biA9ICgpID0+IHtcclxuICAgIHBsYWNlS25pZ2h0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgcGxhY2VLbmlnaHRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZW5hYmxlU2VsZWN0RW5kQnRuID0gKCkgPT4ge1xyXG4gICAgc2VsZWN0RW5kQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBkaXNhYmxlU2VsZWN0RW5kQnRuID0gKCkgPT4ge1xyXG4gICAgc2VsZWN0RW5kQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgc2VsZWN0RW5kQnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGVuYWJsZVJlc2V0QnRuID0gKCkgPT4ge1xyXG4gICAgcmVzZXRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRpc2FibGVSZXNldEJ0biA9ICgpID0+IHtcclxuICAgIHJlc2V0QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IGxvYWRQYWdlIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVSTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVUkgZnJvbSAnLi9tb2R1bGVzL3VpJztcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5sb2FkUGFnZSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==