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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ui);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCLHlFQUF5RSxFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLENBQUM7QUFDRDtBQUNBLGlFQUFlLEVBQUUsRUFBQzs7Ozs7OztVQ2pGbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QjtBQUM5QjtBQUNBLDhDQUE4Qyw0REFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1aSA9ICgoKSA9PiB7XHJcbiAgY29uc3QgZ2FtZUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgY29uc3QgcGxhY2VLbmlnaHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxhY2Uta25pZ2h0LWJ0bicpO1xyXG4gIGNvbnN0IHNlbGVjdEVuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtZW5kLWJ0bicpO1xyXG4gIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0LWJ0bicpO1xyXG5cclxuICBjb25zdCBsb2FkUGFnZSA9ICgpID0+IHtcclxuICAgIGNyZWF0ZUdhbWVCb2FyZCgpO1xyXG4gICAgaW5pdEJ1dHRvbnMoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA2NDsgaSArPSAxKSB7XHJcbiAgICAgIGdhbWVCb2FyZENvbnRhaW5lci5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCJib2FyZC1ib3hcIiBkYXRhLWlkPVwiJHtpfVwiPjwvZGl2PmA7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBwbGFjZUtuaWdodEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNob29zZUJveCk7XHJcbiAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyR2FtZUJvYXJkKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaG9vc2VCb3ggPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgZ2FtZUJvYXJkQm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtYm94Jyk7XHJcblxyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgZ2FtZUJvYXJkQm94ZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBjaGFuZ2VCZ0NvbG9yKTtcclxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHJlbW92ZUJnQ29sb3IpO1xyXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VLbmlnaHQpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2xlYXJHYW1lQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBnYW1lQm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBoYW5kbGVCdXR0b25zKCk7XHJcbiAgICBjcmVhdGVHYW1lQm9hcmQoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBwbGFjZUtuaWdodCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBnYW1lQm9hcmRCb3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1ib3gnKTtcclxuXHJcbiAgICBnYW1lQm9hcmRCb3hlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJyc7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCByZW1vdmVCZ0NvbG9yKTtcclxuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBjaGFuZ2VCZ0NvbG9yKTtcclxuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlS25pZ2h0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gJ1gnO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWFpbi1wbGFjZScpO1xyXG4gICAgY2hhbmdlQmdDb2xvcihlKTtcclxuICAgIGhhbmRsZUJ1dHRvbnMoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVCdXR0b25zID0gKCkgPT4ge1xyXG4gICAgaWYgKHBsYWNlS25pZ2h0QnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgcGxhY2VLbmlnaHRCdG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgIHBsYWNlS25pZ2h0QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICBzZWxlY3RFbmRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICByZXNldEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwbGFjZUtuaWdodEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIHNlbGVjdEVuZEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgcmVzZXRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2hhbmdlQmdDb2xvciA9IChlKSA9PiB7XHJcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JlZCc7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVtb3ZlQmdDb2xvciA9IChlKSA9PiB7XHJcbiAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgbG9hZFBhZ2UgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1aSBmcm9tICcuL21vZHVsZXMvdWknO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHVpLmxvYWRQYWdlKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9