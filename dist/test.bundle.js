/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style-test.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style-test.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\r\\n    margin: 0;\\r\\n    padding: 0;\\r\\n    box-sizing: border-box;\\r\\n}\\r\\n:root {\\r\\n    /* Disk color variables */\\r\\n    --color-prm: #f00; --color-sec: #ff000055;\\r\\n    font-size: 3vmin;\\r\\n    --anim-delay: .25s;\\r\\n    --bgd-color: #1e1e1e;\\r\\n    /* --bgd-color-light: #2e2e2e; */\\r\\n    --prm-color: #e1e1e1;\\r\\n    /* --sec-color: #b0b0b0; */\\r\\n    /* Disk animation position variables */\\r\\n    --x0: 0;\\r\\n    --y0: 0;\\r\\n    --y3: 0;\\r\\n    --x6: 0;\\r\\n    --y6: 0;\\r\\n}\\r\\nbody {\\r\\n    background-color: var(--bgd-color);\\r\\n}\\r\\n\\r\\ndiv {\\r\\n    /* border: 1px solid orange; */\\r\\n    /* padding: 1vmin; */\\r\\n    color: var(--prm-color);\\r\\n}\\r\\n\\r\\n.container {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    justify-content: space-between;\\r\\n    height: 100vh;\\r\\n    width: 100vw;\\r\\n}\\r\\n\\r\\n.menu {\\r\\n    outline: 1px solid orange;\\r\\n    outline-offset: -1px;\\r\\n    justify-content: space-evenly;\\r\\n    display: flex;\\r\\n    height: 14vh;\\r\\n    align-items: center;\\r\\n}\\r\\n\\r\\n.bottom-menu {\\r\\n    justify-content: space-around;\\r\\n}\\r\\n\\r\\n.field {\\r\\n    outline: 1px solid orange;\\r\\n    outline-offset: -1px;\\r\\n    height: 72vh;\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n\\r\\n    background-size: calc(100vw/3) 8vh;\\r\\n    background-image:\\r\\n        linear-gradient(to right, #333 1px, transparent 1px),\\r\\n        linear-gradient(to bottom, #333 1px, transparent 1px);\\r\\n}\\r\\n\\r\\n.disk {\\r\\n    /* outline: 2px solid orange; */\\r\\n    /* outline-offset: -2px; */\\r\\n    padding: 2vmin;\\r\\n    background: goldenrod;\\r\\n    background: linear-gradient(0deg, var(--color-sec), var(--color-prm) 40% 60%, var(--color-sec));\\r\\n    border-radius: 3.5vmin;\\r\\n    width: calc(100vw/3);\\r\\n    height: 8vh;\\r\\n    position: absolute;\\r\\n    transition: linear var(--anim-delay);\\r\\n    transition: 0s;\\r\\n    margin: auto;\\r\\n}\\r\\n\\r\\n#disk-8 { width: calc(100vw/3 - 0*3.5vw); --color-prm: #f00; --color-sec: #f008; }\\r\\n#disk-7 { width: calc(100vw/3 - 1*3.5vw); --color-prm: #f80; --color-sec: #f808; }\\r\\n#disk-6 { width: calc(100vw/3 - 2*3.5vw); --color-prm: #ff0; --color-sec: #ff08; }\\r\\n#disk-5 { width: calc(100vw/3 - 3*3.5vw); --color-prm: #0f0; --color-sec: #0f08; }\\r\\n#disk-4 { width: calc(100vw/3 - 4*3.5vw); --color-prm: #0ff; --color-sec: #0ff8;}\\r\\n#disk-3 { width: calc(100vw/3 - 5*3.5vw); --color-prm: #00f; --color-sec: #00f8; }\\r\\n#disk-2 { width: calc(100vw/3 - 6*3.5vw); --color-prm: #f0f; --color-sec: #f0f8; }\\r\\n#disk-1 { width: calc(100vw/3 - 7*3.5vw); --color-prm: #faa; --color-sec: #faa8; }\\r\\n\\r\\n.btn {\\r\\n    min-width: 10vh;\\r\\n    min-height: 10vh;\\r\\n    border-radius: 50%;\\r\\n    font-weight: 700;\\r\\n}\\r\\n\\r\\n.input {\\r\\n    max-width: 7.5vw;\\r\\n    min-height: 5vh;\\r\\n}\\r\\n\\r\\n.moving {\\r\\n    background-color: var(--color-sec);\\r\\n    box-shadow:\\r\\n        /* 0 0 2.5vmin var(--color-sec), */\\r\\n        /* 0 0 5vmin var(--color-sec), */\\r\\n        0 0 5vmin 1vmin var(--color-prm);\\r\\n    animation-name: example;\\r\\n    animation-duration: calc(2*var(--anim-delay));\\r\\n    animation-timing-function: ease-in;\\r\\n    animation-timing-function: linear;\\r\\n  }\\r\\n  /* transform: translate(calc(e.pos.x-1*(50vw - (100vw/6))), calc(${e.pos.y}*8vh))} */\\r\\n  \\r\\n  @keyframes example {\\r\\n    0%   {transform: translate(calc(var(--x0)*(50vw - (100vw/6))), calc(var(--y0)*8vh))}\\r\\n    30%  {transform: translate(calc(var(--x0)*(50vw - (100vw/6))), calc(var(--y3)*8vh))}\\r\\n    70%  {transform: translate(calc(var(--x6)*(50vw - (100vw/6))), calc(var(--y3)*8vh))}\\r\\n    100% {transform: translate(calc(var(--x6)*(50vw - (100vw/6))), calc(var(--y6)*8vh))}\\r\\n  }\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tower-of-hanoi/./src/style-test.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var _i = 0; _i < this.length; _i++) {\n        var id = this[_i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i2 = 0; _i2 < modules.length; _i2++) {\n      var item = [].concat(modules[_i2]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://tower-of-hanoi/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://tower-of-hanoi/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style-test.css":
/*!****************************!*\
  !*** ./src/style-test.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_test_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style-test.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style-test.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_test_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_test_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_test_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_test_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://tower-of-hanoi/./src/style-test.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://tower-of-hanoi/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://tower-of-hanoi/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://tower-of-hanoi/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://tower-of-hanoi/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://tower-of-hanoi/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://tower-of-hanoi/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/handling-dom.js":
/*!*****************************!*\
  !*** ./src/handling-dom.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createComponent)\n/* harmony export */ });\nfunction createComponent(elType, elParent = 'document.body', elClass = [], elID = '', elContent = '') {\r\n    const el = document.createElement(elType);\r\n    elClass.forEach(cls => el.classList.add(cls));\r\n    if (elID !== '') el.id = elID;\r\n    el.innerHTML = elContent;\r\n    if (elParent) elParent.appendChild(el);\r\n    return el;\r\n}\n\n//# sourceURL=webpack://tower-of-hanoi/./src/handling-dom.js?");

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _handling_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handling-dom.js */ \"./src/handling-dom.js\");\n/* harmony import */ var _style_test_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-test.css */ \"./src/style-test.css\");\n\r\n\r\n\r\nconst log = console.log;\r\nlog('This is TEST.JS');\r\nconst body = document.body;\r\nconst container = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', body, ['container']);\r\nconst root = document.querySelector(':root');\r\n\r\nfunction positionElement(e) {\r\n    // log(e.weight, e.pos.x-1, e.pos.y);\r\n    e.element.style.transform = `translate(calc(${e.pos.x-1}*(50vw - (100vw/6))), calc(${e.pos.y}*8vh))`;\r\n}\r\n\r\n// Repositioning Element via CSS-animation\r\nfunction animateElementMove(x0, y0, x6, y6) {\r\n    const el = GameState.activeDisk.element;\r\n    el.style.transition = '0';\r\n    root.style.setProperty('--x0', `${x0 - 1}`);\r\n    root.style.setProperty('--y0', `${y0}`);   \r\n\r\n    root.style.setProperty('--x6', `${x6 - 1}`);\r\n    root.style.setProperty('--y6', `${y6}`);\r\n    el.classList.add('moving');\r\n    el.addEventListener('animationend', () => {\r\n        el.classList.remove('moving');\r\n        el.style.transform = `translate(calc(${x6-1}*(50vw - (100vw/6))), calc(${y6}*8vh))`;\r\n    })\r\n}\r\n\r\nfunction animateOneMove([tSrc, tTgt]) {\r\n    // Select active Disc\r\n    const topDiskAtTower = GameState.towers[tSrc].length;\r\n    if (topDiskAtTower > 0)\r\n        GameState.activeDisk = getDiskByID(`disk-${GameState.towers[tSrc][topDiskAtTower - 1]}`);\r\n    let x0 = tSrc;\r\n    let y0 = GameState.activeDisk.pos.y;\r\n    let x6 = tTgt;\r\n    let y6 = maxDisk - GameState.towers[tTgt].length;\r\n    // updating TOWERS\r\n    GameState.towers[tSrc].pop();\r\n    GameState.towers[tTgt].push(GameState.activeDisk.weight);\r\n    animateElementMove(x0, y0, x6, y6);\r\n    GameState.activeDisk.pos = {x : x6, y : y6} ;\r\n}\r\n\r\n// go forward one move\r\nfunction goForward() {\r\n\tif (GameState.instructions.length > 0 && !GameState.animationInProgress) {\r\n        const move = GameState.instructions.shift();\r\n\t\tanimateOneMove(move);\r\n        GameState.history.push(move);\r\n        showMoveCnt();\r\n    }\r\n}\r\n\r\n// go back one move\r\nfunction goBack() {\r\n\tif (GameState.history.length > 0 && !GameState.animationInProgress) {\r\n        const move = GameState.history.pop();\r\n\t\tanimateOneMove([move[1], move[0]]);\r\n        GameState.instructions.unshift(move);\r\n        showMoveCnt();\r\n    }\r\n}\r\n\r\nfunction startSolving() {\r\n\r\n    GameState.instructions.forEach((el, i) => \r\n        sleep(i*2*getDelayValue()).then(() => goForward()));\r\n}\r\n\r\nfunction showMoveCnt() {\r\n    displayCounter.innerHTML = GameState.history.length;\r\n}\r\n\r\nfunction showAnimationDelay() {\r\n    displayDelay.innerHTML = GameState.animationDelay;\r\n}\r\n\r\n// provides Delay in \"ms\" before execution portion of code, which follows .THEN, when function called\r\nfunction sleep(ms) {\r\n    return new Promise(resolve => setTimeout(resolve, ms));\r\n}\r\n\r\n// changing animation speed (delay): double orr half\r\nfunction changeDelay(sign) {\r\n    GameState.animationDelay = (sign >= 0)\r\n        ? GameState.animationDelay * 2\r\n        : GameState.animationDelay / 2;\r\n    root.style.setProperty('--anim-delay', `${GameState.animationDelay/1000}s`);\r\n    showAnimationDelay();\r\n}\r\n\r\nfunction getDelayValue() {\r\n    return GameState.animationDelay;\r\n}\r\n\r\n// getting position of the disc in a \"towers\" array\r\nfunction getXY(weight) {\r\n    let x = GameState.towers.findIndex(twr => twr.includes(weight));\r\n    let y = maxDisk - GameState.towers[x].indexOf(weight);\r\n    return { 'x': x, 'y': y };\r\n}\r\n\r\nfunction getDiskByID(id) {\r\n    const element = document.getElementById(id);\r\n    const weight = element.id.slice(-1) * 1;\r\n    return { 'weight' : weight, 'pos': getXY(weight), 'element' : element};\r\n}\r\n\r\nfunction randomizeDisks(numD, maxD = 8, twrs = 3) {\r\n    let res = [[],[],[]];\r\n    for (let w = maxD ; w > maxD - numD; w--) {\r\n        res[Math.floor(Math.random() * twrs)].push(w);\r\n    }\r\n    return res;\r\n}\r\n\r\nfunction normalizeDisks(numD, tSrc = 0, maxD = 8) {\r\n    let res = [[],[],[]];\r\n    for (let w = maxD; w > maxD - numD; w--) {\r\n        res[tSrc].push(w);\r\n    }  \r\n    return res;\r\n}\r\n\r\nfunction initField() {\r\n    // creating initial Disks disposition = normal-tower at Source Tower\r\n    GameState.towers = normalizeDisks(GameState.numDisk, SourceTower);\r\n    // add and position Disk elements at the field\r\n    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {\r\n        const newDiskElement = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', field, ['disk'], `disk-${weight}`);\r\n        positionElement(getDiskByID(`disk-${weight}`));\r\n        newDiskElement.draggable = 'true';\r\n    }\r\n    // Calculate Instructions to solve the puzzle\r\n    GameState.instructions = calcTowerMove(GameState.numDisk, SourceTower, TargetTower);\r\n    // synchronize delay values between js and css\r\n    root.style.setProperty('--anim-delay', `${GameState.animationDelay/1000}s`);\r\n}\r\n\r\nfunction restart(rnd = 'rnd') {\r\n    console.log('restart Game'); \r\n    // clearing history array;\r\n    GameState.history = [];\r\n    // read number of Disks from input field\r\n    GameState.numDisk = numberDisks.value;\r\n    // update new disks amount\r\n    for (let weight = maxDisk; weight > maxDisk - 8; weight--) {\r\n        const el = document.getElementById(`disk-${weight}`)\r\n        // add disks if new numDisk is bigger than previous\r\n        if (weight > maxDisk - GameState.numDisk && !el) {\r\n            (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', field, ['disk'], `disk-${weight}`);\r\n        // else remove disks from previous round should\r\n        } else if (weight <= maxDisk - GameState.numDisk && el) { \r\n            el.remove();    \r\n        }\r\n    }\r\n    // creating initial Disks disposition\r\n    GameState.towers = randomizeDisks(GameState.numDisk);\r\n    GameState.towers = (rnd === 'rnd') \r\n        ? randomizeDisks(GameState.numDisk)\r\n        : normalizeDisks(GameState.numDisk, rnd);\r\n    // position Disks at the field according to Towers array\r\n    for (let weight = maxDisk; weight > maxDisk - GameState.numDisk; weight--) {\r\n        positionElement(getDiskByID(`disk-${weight}`));\r\n    }\r\n    // Calculate Instructions to solve the puzzle\r\n    GameState.instructions = calcTowerBuild(GameState.towers, TargetTower);\r\n    showMoveCnt();\r\n}\r\n\r\n// Returns set of instructions to move whole Tower (normalized, i.e. 4-3-2-1)\r\n// with max Disk \"weight\", from Source Tower to Target Tower\r\nfunction calcTowerMove(weight, tSrc, tTgt) {\r\n    let res = []; \r\n    if (weight > 0) {\r\n      const tAux = 3 - tSrc - tTgt;\r\n      res.push(...calcTowerMove(weight-1, tSrc, tAux));\r\n      res.push([tSrc, tTgt]);\r\n      res.push(...calcTowerMove(weight-1, tAux, tTgt));\r\n    }\r\n    return res;\r\n}\r\n\r\n// Returns set of instructions to build Tower of Disks (from random Disks position) at Target Tower\r\nfunction calcTowerBuild(initTowers, tTgt) {\r\n\t\tlet res = [];\r\n\t\t// deep copy of Towers array\r\n\t\tconst newTowers = JSON.parse(JSON.stringify(initTowers));\r\n\t\t// Values for Max and Min weight of Disks in new Towers array\r\n\t\tconst maxW = Math.max(...newTowers.map(t => Math.max(...t)));\r\n\t\tconst minW = Math.min(...newTowers.map(t => Math.min(...t)));\r\n\t\t// determine Source (where maxW Disk is located) and Auxillary Towers\r\n\t\tconst tSrc = newTowers.findIndex(t => t.includes(maxW)); \r\n\t\tconst tAux = 3 - tSrc - tTgt;\r\n\t\t// Combine Recursive Tower building and Tower moving algorithms\r\n\t\tif (tSrc >= 0) {\r\n\t\t\tnewTowers[tSrc].shift();\r\n\t\t\tif (tSrc === tTgt) { // if heaviest Disk in new Array is at Target Tower already\r\n\t\t\t\tres.push(...calcTowerBuild(newTowers, tTgt))\r\n\t\t\t} else { // if it is not \r\n\t\t\t\tres.push(...calcTowerBuild(newTowers, tAux));\r\n\t\t\t\tres.push([tSrc, tTgt]);\r\n\t\t\t\tres.push(...calcTowerMove(maxW - minW, tAux, tTgt));\t\r\n\t\t\t}\r\n\t\t}\r\n  return res;\r\n}\r\n\r\nconst maxDisk = 8;\r\nconst SourceTower = 0;\r\nconst TargetTower = 2;\r\n\r\nlet solvPhase = false;\r\n\r\nconst GameState = {\r\n    towers : [[], [], []], // three arrays representing 3 Towers of Hanoi\r\n    history: [], // storing moves, that are already made\r\n    numDisk : 5, // Number of disks for current game-round\r\n    instructions : [], // set of instructions to solve puzzle from current positions\r\n    animationDelay : 250,\r\n    animationInProgress : false,\r\n    solvingAll : false,\r\n    activeDisk : {\r\n        weight: maxDisk,\r\n        pos : {'x': 0, 'y': 0},\r\n        element : '',\r\n    }\r\n}\r\n \r\n// const container = document.querySelector('.container');\r\n// indication of current Parent Element to append or remove new elements\r\nlet parentElement = container;\r\n// Top Menu\r\nconst topMenu = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', parentElement, ['menu', 'top-menu'] );\r\n// Game Field\r\nconst field = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', parentElement, ['field']);\r\ninitField();\r\n// Bottom Menu\r\nconst bottomMenu = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', parentElement, ['menu', 'bottom-menu']);\r\n\r\n// TOP - MENU BUTTONS\r\nparentElement = topMenu;\r\nconst numberDisks = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('input', parentElement, ['input'], 'number',);\r\nnumberDisks.type = 'number';\r\nnumberDisks.min = '2';\r\nnumberDisks.max = '8';\r\nnumberDisks.value = `${GameState.numDisk}`;\r\n// Btn - RESTART-RND\r\nconst btnRND = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', parentElement, ['btn'], 'btn-rnd', 'RND');\r\nbtnRND.addEventListener('click', () => restart('rnd'));\r\n// Btn - RESTART-NORM\r\nconst btnNorm = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', parentElement, ['btn'], 'btn-norm', 'Norm');\r\nbtnNorm.addEventListener('click', () => restart(0));\r\n// Btn - Go Back One Move\r\nconst btnGoBack = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', parentElement, ['btn'], 'btn-go-back', '{--');\r\nbtnGoBack.addEventListener('click', goBack);\r\n// Display number of Moves made\r\nconst displayCounter = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', parentElement, ['btn'], 'display-counter', '0');\r\n\r\n// Bottom-MENU Buttons\r\nparentElement = bottomMenu;\r\n// INCREASE Animation delay btn\r\nconst btnIncDelay = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', parentElement, ['btn'], 'inc-del', '+++');\r\nbtnIncDelay.addEventListener('click', () => changeDelay(+1));\r\n// Display Animation Speed\r\nconst displayDelay = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', parentElement, ['btn'], 'display-delay', `${GameState.animationDelay}`);\r\n// Decrease Animation delay btn\r\nconst btnDecDelay = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', parentElement, ['btn'], 'inc-del', '---');\r\nbtnDecDelay.addEventListener('click', () => changeDelay(-1));\r\n\r\n// FORWARD 1 step button\r\nconst btnOneStep = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', parentElement, ['btn'], 'btn-one-step', 'A >');\r\nbtnOneStep.addEventListener('click', goForward);\r\n// SOLVE puzzle to the end\r\nconst btnForward = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', parentElement, ['btn'], 'btn-forward', '>>>');\r\n// btnForward.addEventListener('click', startSolving);\r\nbtnForward.addEventListener('click', () => {\r\n    GameState.solvingAll = true;\r\n    goForward();\r\n});\r\n// puzzle to the end\r\nconst btnStop = (0,_handling_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', parentElement, ['btn'], 'btn-stop', '[_]');\r\nbtnStop.addEventListener('click', () => GameState.solvingAll = false );\r\n\r\n// Event Listeners for Animation purpose\r\nfield.addEventListener('animationstart', () => {\r\n    GameState.animationInProgress = true;\r\n});\r\nfield.addEventListener('animationend', () => {\r\n    GameState.animationInProgress = false;\r\n    if (GameState.solvingAll) goForward();\r\n});\n\n//# sourceURL=webpack://tower-of-hanoi/./src/test.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/test.js");
/******/ 	
/******/ })()
;