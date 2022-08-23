// ==UserScript==
// @name        EventHelper
// @version     14.29.0
// @author      achepta
// @description try to take over the world!
// @namespace   https://greasyfork.org/ru/scripts/399402-eventhelper
// @downloadURL https://hwm.events/scripts/code/EventHelper.user.js
// @updateURL   https://hwm.events/scripts/code/EventHelper.user.js
// @connect     hwm.events
// @connect     localhost
// @include     /^https:\/\/((www|qrator|my)(\.heroeswm\.ru|\.lordswm\.com))\/(leader_rogues|pirate_event|tj_single|hunting_event|leader_winter|pl_warlog|leader_guild|ambush_single_event|map_hero_event|naym_event|naym_event_set|war|faction_event|tj_event2|pirate_self_event|pirate_self_event_set|adventure_event|pirate_hunt|pirate_land|pl_info|tournaments|village_def)\.php.*/
// @grant       unsafeWindow
// @grant       GM.xmlHttpRequest
// @grant       GM.xmlhttpRequest
// @grant       GM_xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @license     GNU GPLv3
// @run-at      document-end
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return pl_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return pl_lvl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return my_sign; });
/* unused harmony export host */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return cdnHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return heroCreatures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return $; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return set; });
/* unused harmony export getScrollHeight */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return findAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return sortByKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return mapToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return encode; });
/* unused harmony export getCookie */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return allClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return allFactions; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var pl_id = getCookie("pl_id");
var pl_lvl = get("hero_combat_lvl", 0);
var my_sign = get("my_sign", null);
var host = location.host;
var cdnHost = host.includes("my.") ? "cfcdn.lordswm.com" : "dcdn.heroeswm.ru";
var heroCreatures = {};
function $(id) {
  var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return where.getElementById(id);
}
function get(key, def) {
  var result = JSON.parse(localStorage[key] === undefined ? null : localStorage[key]);
  return result == null ? def : result;
}
function set(key, val) {
  localStorage[key] = JSON.stringify(val);
}
function getScrollHeight() {
  return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
}
function findAll(regexPattern, sourceString) {
  var output = [];
  var match;
  var regexPatternWithGlobal = RegExp(regexPattern, _toConsumableArray(new Set("g" + regexPattern.flags)).join(""));

  while (match = regexPatternWithGlobal.exec(sourceString)) {
    delete match.input;
    output.push(match);
  }

  return output;
}
function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
function mapToArray(map) {
  var result = [];

  for (var _i = 0, _Object$entries = Object.entries(map); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    result.push([parseInt(key), value]);
  }

  return result;
}
function encode(str) {
  var customEncode = function customEncode(e) {
    return "%" + (parseInt(e.charAt(1) + e.charAt(5), 16) + 16 * function (x) {
      return -(2 * Math.pow(x, 3)) / 3 + 20 * Math.pow(x, 2) - 595 * x / 3 + 650;
    }(parseInt(e.charAt(4), 16)).toFixed()).toString(16);
  };

  return Array.from(str).map(function (c) {
    return c.charCodeAt(0) >= 1040 && c.charCodeAt(0) <= 1103 ? customEncode(encodeURIComponent(c)) : encodeURIComponent(c);
  }).join("");
}
function getCookie(name) {
  var value = "; ".concat(document.cookie);
  var parts = value.split("; ".concat(name, "="));
  if (parts.length === 2) return parts.pop().split(';').shift();
}
var allClasses = [[1, 'Рыцарь', 0, 'r1.png', 1], [1, 'Рыцарь света', 1, 'r101.png', 101], [2, 'Некромант', 0, 'r2.png', 2], [2, 'Некромант - повелитель смерти', 1, 'r102.png', 102], [3, 'Маг', 0, 'r3.png', 3], [3, 'Маг - разрушитель', 1, 'r103.png', 103], [4, 'Эльф', 0, 'r4.png', 4], [4, 'Эльф - заклинатель', 1, 'r104.png', 104], [5, 'Варвар', 0, 'r5.png', 5], [5, 'Варвар крови', 1, 'r105.png', 105], [5, 'Варвар - шаман', 2, 'r205.png', 205], [6, 'Темный эльф', 0, 'r6.png', 6], [6, 'Темный эльф - укротитель', 1, 'r106.png', 106], [7, 'Демон', 0, 'r7.png', 7], [7, 'Демон тьмы', 1, 'r107.png', 107], [8, 'Гном', 0, 'r8.png', 8], [8, 'Гном огня', 1, 'r108.png', 108], [9, 'Степной варвар', 0, 'r9.png', 9], [10, 'Фараон', 0, 'r10.png', 10]];
var allFactions = [[-1, 'All', ''], [1, 'Рыцарь', 'r1.png'], [2, 'Некромант', 'r2.png'], [3, 'Маг', 'r3.png'], [4, 'Эльф', 'r4.png'], [5, 'Варвар', 'r5.png'], [6, 'Темный эльф', 'r6.png'], [7, 'Демон', 'r7.png'], [8, 'Гном', 'r8.png'], [9, 'Степной варвар', 'r9.png'], [10, 'Фараон', 'r10.png'], [0, 'Нейтрал', 'r_neut.png']];

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "setSettings", function() { return /* binding */ setSettings; });
__webpack_require__.d(__webpack_exports__, "eventHelperSettings", function() { return /* binding */ eventHelperSettings; });

// EXTERNAL MODULE: ./src/utils/networkUtils.js
var networkUtils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/utils/commonUtils.js
var commonUtils = __webpack_require__(0);

// CONCATENATED MODULE: ./src/registration.js


function startRegistration(event) {
  event.target.outerHTML = "\n                <div id=\"reg_progress\" style=\"text-align: center\">\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0437\u0430\u043F\u0443\u0449\u0435\u043D...</div>\n            ";
  Object(networkUtils["a" /* doGet */])("register?pl_id=".concat(commonUtils["k" /* pl_id */]), function (response1) {
    Object(commonUtils["a" /* $ */])("reg_progress").innerHTML = "Учетная запись создана...";
    var formData = new FormData();
    formData.append('cdata', Math.floor(Math.random() * (20000 - 1000 + 1) + 1000).toFixed());
    formData.append('action', "");
    formData.append('parent_id', "0");
    formData.append('mailto', response1.receiver);
    formData.append('subject', response1.token);
    formData.append('msg', "");
    formData.append('sign', commonUtils["j" /* my_sign */]);
    formData.append('subm', "%CE%F2%EF%F0%E0%E2%E8%F2%FC+%28CTRL%2BEnter%29");
    Object(networkUtils["c" /* doHWMPost */])("/sms-create.php", formData, function (response2) {
      Object(commonUtils["a" /* $ */])("reg_progress").innerHTML = "Производится подтверждение личности...";
      Object(networkUtils["a" /* doGet */])("checkRegistration?pl_id=".concat(commonUtils["k" /* pl_id */]), function (response3) {
        if (response3.status === "good") {
          Object(commonUtils["a" /* $ */])("reg_progress").innerHTML = "Регистрация прошла успешно!";
          Object(commonUtils["m" /* set */])("hwm_events_token", response1.token);
        } else {
          Object(commonUtils["a" /* $ */])("reg_progress").innerHTML = "Что-то пошло не так :(";
        }
      });
    });
  });
}
// CONCATENATED MODULE: ./src/settings.js


function setSettings(key, text) {
  var where = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;
  var enabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  where.insertAdjacentHTML("beforeend", "\n                <div style=\"display: flex; color: green; font-size: 20px; cursor: pointer\"  id=\"".concat(key, "\" >\n                    <input style=\"height: 24px; width: 24px;\" id=\"").concat(key, "_checkbox\" type=\"checkbox\" ").concat(Object(commonUtils["g" /* get */])(key, enabled) ? ' checked' : '', ">\n                    <label for=\"").concat(key, "_checkbox\">").concat(text, "</label>\n                </div>"));
  Object(commonUtils["a" /* $ */])(key).addEventListener('click', function () {
    set(key, Object(commonUtils["a" /* $ */])("".concat(key, "_checkbox")).checked);
  });
}
function eventHelperSettings(where, callback) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "beforeend";
  where.insertAdjacentHTML(position, "\n                <div style=\"margin-top: 10px; display: flex; flex-direction: column;\"  id=\"event_helper_settings_container\">\n                    <div id=\"event_helper_settings\" class=\"home_button2 btn_hover2\" style=\"width: fit-content;align-self: center\">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 EventHelper</div>\n                </div>\n            ");
  Object(commonUtils["a" /* $ */])("event_helper_settings").addEventListener("click", function (e) {
    e.target.remove();
    var container = Object(commonUtils["a" /* $ */])("event_helper_settings_container");
    callback(container);
    var regHTML;

    if (!Object(commonUtils["g" /* get */])("hwm_events_token", null)) {
      regHTML = "\n                <div style=\"width: 100%; text-align: center\"><b>\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F!</b></div>\n                <div id=\"start_registration\" class=\"home_button2 btn_hover2\" style=\"padding: 2px 4px; margin-top: 4px\">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</div>\n            ";
    } else {
      regHTML = "";
    }

    container.insertAdjacentHTML("beforeend", "\n                    <div style=\"align-self: center\">\n                        ".concat(regHTML, "\n<!--                        <br>-->\n<!--                        <br>-->\n<!--                        <br>-->\n<!--                        <div style=\"width: 100%; text-align: center\"><b>\u0420\u0435\u043A\u043B\u0430\u043C\u0430!</b></div>-->\n<!--                        <p>\u041A\u0440\u0430\u0444\u0442 \u044E\u0432\u0435\u043B\u0438\u0440\u043A\u0438 \u0441 \u043E\u0442\u043A\u0430\u0442\u043E\u043C 2 \u043F\u0430\u0440\u044B <a href=\"/pl_info.php?id=6722246\">Kerrigan</a></p>-->\n        <!--                <p>\u041A\u0440\u0430\u0444\u0442 \u043E\u0440\u0443\u0436\u0438\u044F (\u043C\u0433\u043D\u043E\u0432\u0435\u043D\u043D\u044B\u0439) \u0441 \u043E\u0442\u043A\u0430\u0442\u043E\u043C 1 \u043F\u0430\u0440\u0430 <a href=\"/pl_info.php?id=7197821\">\u0413\u0440\u043E\u0437\u0430_\u0413\u0412\u0414</a></p>-->\n                    </div>\n                "));

    if (regHTML) {
      Object(commonUtils["a" /* $ */])("start_registration").addEventListener("click", startRegistration);
    }
  });
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return doGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return doPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return doHWMGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return doHWMPost; });
var OUTER_REQUESTS;

if (typeof GM_xmlHttpRequest !== "undefined") {
  OUTER_REQUESTS = GM_xmlHttpRequest;
} else if (typeof GM_xmlhttpRequest !== "undefined") {
  OUTER_REQUESTS = GM_xmlhttpRequest;
} else if (typeof GM !== "undefined" && typeof GM.xmlHttpRequest !== "undefined") {
  OUTER_REQUESTS = GM.xmlHttpRequest;
} else if (typeof GM !== "undefined" && typeof GM.xmlhttpRequest !== "undefined") {
  OUTER_REQUESTS = GM.xmlhttpRequest;
}

var HWM_EVENTS_SERVER = "http://hwm.events";
function doGet(url, callback) {
  var html = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  OUTER_REQUESTS({
    method: "GET",
    url: "".concat(HWM_EVENTS_SERVER, "/").concat(url),
    onload: function onload(res) {
      if (html) {
        callback(new DOMParser().parseFromString(res.responseText, "text/html"));
      } else {
        callback(JSON.parse(res.responseText));
      }
    }
  });
}
function doPost(url, params, callback) {
  var html = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  OUTER_REQUESTS({
    method: "POST",
    url: "".concat(HWM_EVENTS_SERVER, "/").concat(url),
    data: params,
    onload: function onload(res) {
      if (html) {
        callback(new DOMParser().parseFromString(res.responseText, "text/html"));
      } else {
        callback();
      }
    }
  });
}
function doHWMGet(url, callback) {
  var http = new XMLHttpRequest();
  http.open('GET', url, true);
  http.overrideMimeType("text/html; charset=windows-1251");
  http.send(null);

  http.onreadystatechange = function () {
    //Call a function when the state changes
    if (http.readyState === 4 && http.status === 200) {
      callback(new DOMParser().parseFromString(http.responseText, "text/html"));
    }
  };
}
function doHWMPost(url, params, callback) {
  var http = new XMLHttpRequest();
  http.open('POST', url, true);
  http.overrideMimeType("text/html; charset=windows-1251");
  http.send(params);

  http.onreadystatechange = function () {
    //Call a function when the state changes
    if (http.readyState === 4 && http.status === 200) {
      callback(new DOMParser().parseFromString(http.responseText, "text/html"));
    }
  };
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collapseEventDesc", function() { return collapseEventDesc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentLevel", function() { return getCurrentLevel; });
/* harmony import */ var _commonUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

function collapseEventDesc() {
  if (Object(_commonUtils__WEBPACK_IMPORTED_MODULE_0__[/* get */ "g"])("collapse_event_desc", false)) {
    if (document.querySelector(".event_desc_block_inside").getAttribute("style") == null) {
      document.querySelector(".event_desc_open_btn").click();
    }
  }
}
function getCurrentLevel() {
  var set_level = new URLSearchParams(window.location.search).get("sel_level");

  if (set_level) {
    return set_level;
  } else {
    if (document.getElementsByClassName("CheckpointCurrent").length > 0) {
      return document.getElementsByClassName("CheckpointCurrent")[0].innerHTML.match(/\d{1,3}/)[0];
    } else {
      return "100";
    }
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLeaderboard", function() { return setLeaderboard; });
/* harmony import */ var _utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


function setLeaderboard(where) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "afterbegin";
  var isLeaderboardExpanded = false;
  var topHeroes = [];
  Object(_utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__[/* doGet */ "a"])("getTopScores", function (doc) {
    topHeroes = doc;
    where.insertAdjacentHTML(position, "<div style=\"display: flex; flex-direction: column\" id=\"top_heroes_container\"></div><br>");
    resetLeaderboard();
  }, false);

  function resetLeaderboard() {
    var result = topHeroes.slice(0, 15).reduce(function (prev, curr, index) {
      return prev + getTopHeroTemplate(curr, index);
    }, "");
    Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* $ */ "a"])("top_heroes_container").innerHTML = "\n                <b style=\"user-select: none; text-align: center;\">\u041B\u0443\u0447\u0448\u0438\u0435 \u0438\u0433\u0440\u043E\u043A\u0438 (<span id=\"expand_top_heroes\" style=\"cursor: pointer; text-decoration: underline\">+</span>)</b>".concat(result, "\n            ");
    Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* $ */ "a"])("expand_top_heroes").addEventListener("click", function (e) {
      if (!isLeaderboardExpanded) {
        topHeroes.slice(15).forEach(function (curr, index) {
          Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* $ */ "a"])("top_heroes_container").insertAdjacentHTML("beforeend", getTopHeroTemplate(curr, index + 15));
        });
        isLeaderboardExpanded = true;
        e.target.innerHTML = "—";
      } else {
        resetLeaderboard();
        isLeaderboardExpanded = false;
      }
    });
  }

  function getTopHeroTemplate(hero, index) {
    return "\n                <div style=\"display: flex; justify-content: space-between; padding: 1px; font-size: smaller\">\n                    <div>".concat(index + 1, ".</div>\n                    <div style=\"text-align: center\">\n                        <a href=\"/clan_info.php?id=").concat(hero["clan_id"], "\">\n                        <img style=\"height: 15px; vertical-align: bottom\" src=\"https://").concat(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* cdnHost */ "d"], "/i_clans/l_").concat(hero["clan_id"], ".gif?1805\" alt=\"\"></a>\n                        \xA0\n                        <a href=\"/pl_info.php?id=").concat(hero["member_id"], "\" style=\"text-decoration: none; font-size: 9px\">").concat(hero["member_name"], "</a>\n                         [").concat(hero["member_cl"], "]\n                    </div>\n                    <div>").concat(hero["member_score"]).concat(hero["attempts_left"] ? "<span title=\"\u041E\u0441\u0442\u0430\u0432\u0448\u0438\u0435\u0441\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0438\" style=\"cursor: help; font-size: 5pt\">(".concat(hero["attempts_left"], ")</span>") : "", "</div>\n                </div>");
  }
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendBattle", function() { return sendBattle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEventBattles", function() { return getEventBattles; });
/* harmony import */ var _utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _utils_eventUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);




function sendBattle(warid, secret, type) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var battle_side = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;

  switch (type) {
    case "0":
      {
        Object(_utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__[/* doPost */ "d"])("uploadDbBattle", getSendBattleForm(warid, secret, battle_side), function () {
          if (index) {
            Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* $ */ "a"])("send_battle_".concat(index)).outerHTML = "Отправлено";
          }
        });
        break;
      }

    case "1":
      {
        Object(_utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__[/* doPost */ "d"])("uploadEventLeaderBattle", getSendBattleForm(warid, secret, battle_side), function () {
          if (index) {
            Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* $ */ "a"])("send_battle_".concat(index)).outerHTML = "Отправлено";
          }
        });
        break;
      }

    case "2":
      {
        Object(_utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__[/* doPost */ "d"])("uploadFFAEventBattle", getSendBattleForm(warid, secret, battle_side), function () {
          if (index) {
            Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* $ */ "a"])("send_battle_".concat(index)).outerHTML = "Отправлено";
          }
        });
        break;
      }

    case "3":
      {
        Object(_utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__[/* doPost */ "d"])("uploadFactionEventBattle", getSendBattleForm(warid, secret, battle_side), function () {
          if (index) {
            Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* $ */ "a"])("send_battle_".concat(index)).outerHTML = "Отправлено";
          }
        });
        break;
      }

    case "4":
      {
        Object(_utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__[/* doPost */ "d"])("uploadRoguesEventBattle", getSendBattleForm(warid, secret, battle_side), function () {
          if (index) {
            Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* $ */ "a"])("send_battle_".concat(index)).outerHTML = "Отправлено";
          }
        });
        break;
      }
  }

  function getSendBattleForm(warid, secret, battle_side) {
    var formData = new FormData();
    formData.append('battle_id', warid);
    formData.append('battle_secret', secret);
    formData.append('battle_side', battle_side);
    formData.append('is_clan', Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* get */ "g"])("only_clan_visibility", false));
    return formData;
  }
}
function getEventBattles(target) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "getFFAEventBattles";
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var lost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var battles;
  Object(_utils_networkUtils__WEBPACK_IMPORTED_MODULE_0__[/* doGet */ "a"])("".concat(from, "?wave=").concat(Object(_utils_eventUtils__WEBPACK_IMPORTED_MODULE_2__["getCurrentLevel"])(), "&token=").concat(Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* get */ "g"])("hwm_events_token", "")), function (doc) {
    battles = doc;
    processEventBattles(target);
  }, false);

  function processEventBattles() {
    var where = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    switch (callback) {
      case 1:
        {
          if (battles.AFS.length === 0 && !lost) {
            getEventBattles(target, from.replace("Battles", "FailedBattles"), callback, true);
          } else {
            where.insertAdjacentHTML("beforeend", getAFSEventBattlesTemplate(lost));
          }

          break;
        }

      case 2:
        {
          if (battles.AFS.length === 0 && battles.FFA.length === 0 && !lost) {
            getEventBattles(target, from.replace("Battles", "FailedBattles"), callback, true);
          } else {
            where.insertAdjacentHTML("beforeend", getFFAEventBattlesTemplate(lost));
          }
        }
    }
  }

  function getAFSEventBattlesTemplate(lost) {
    return "\n                <div style=\"display: flex;width: 100%;justify-content: space-evenly;\">\n                    <div style=\"display: flex; flex-direction: column\">\n                        <div style=\"text-align: center;\">\n                            <h3>\u0410\u0438\u041C</h3>\n                        </div>\n                        <div style=\"text-align: center;\">".concat(lost ? "Поражения" : "", "</div>\n                        ").concat(getBattlesTemplate(battles["AFS"]), "\n                    </div>\n                </div>");
  }

  function getFFAEventBattlesTemplate(lost) {
    return "\n                <div style=\"display: flex;width: 100%;justify-content: space-evenly;\">\n                    <div style=\"display: flex; flex-direction: column\">\n                        <div style=\"text-align: center;\">\n                            <h3>\u0410\u0438\u041C</h3>\n                        </div>\n                        <div style=\"text-align: center;\">".concat(lost ? "Поражения" : "", "</div>\n                        ").concat(getBattlesTemplate(battles["AFS"]), "\n                    </div>\n                    <div style=\"display: flex; flex-direction: column\"><div style=\"text-align: center;\"><h3>\u041A\u0411\u041E</h3></div><div style=\"text-align: center;\">").concat(lost ? "Поражения" : "", "</div>").concat(getBattlesTemplate(battles["FFA"], "FFA"), "</div>\n                </div>");
  }

  function getBattlesTemplate(battles) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AFS";
    var result = "";
    result += "<div style=\"text-align: center;\"><h4>\u0422\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C</h4></div>";
    var my_lvl_battles = battles.filter(function (battle) {
      return battle["hero_lvl"] === _utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* pl_lvl */ "l"];
    });
    result += ffaBattlesToHTML(my_lvl_battles);
    result += "<div style=\"text-align: center;\"><h4>\u0414\u0440\u0443\u0433\u0438\u0435 \u0443\u0440\u043E\u0432\u043D\u0438</h4></div>";
    var not_my_lvl_battles = battles.filter(function (battle) {
      return battle["hero_lvl"] !== _utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* pl_lvl */ "l"];
    });
    var cl_buckets = {};
    not_my_lvl_battles.forEach(function (battle) {
      if (cl_buckets.hasOwnProperty(battle.hero_lvl)) {
        cl_buckets[battle.hero_lvl].push(battle);
      } else {
        cl_buckets[battle.hero_lvl] = [battle];
      }
    });
    var cl_battles = Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* mapToArray */ "i"])(cl_buckets);
    cl_battles = Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* sortByKey */ "n"])(cl_battles, 0).reverse();
    cl_battles.forEach(function (bucket, index) {
      result += Object(_templates__WEBPACK_IMPORTED_MODULE_3__[/* getSpoiler */ "b"])(type, index, "<div class=\"home_button2 btn_hover2\" style=\"margin: 3px 0\">".concat(bucket[0], "\u0411\u0423 (").concat(bucket[1].length, ")</div>"), ffaBattlesToHTML(bucket[1]));
    });
    return result;
  }

  function ffaBattlesToHTML(battles) {
    if (battles.length > 0) {
      battles.sort(function (a, b) {
        return a.nickname.localeCompare(b.nickname);
      });
      return battles.reduce(function (prev, curr, index) {
        return prev + "\n                            <div style=\"display: flex; justify-content: space-between; padding: 1px;\">\n                                <div>".concat(index + 1, ".\xA0</div>\n                                <div style=\"text-align: center\"> <a href=\"/pl_info.php?nick=").concat(Object(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* encode */ "e"])(curr["nickname"]), "\" class=\"pi\" target=\"_blank\">").concat(curr["nickname"], "</a> ").concat("class" in curr ? "<img style=\"vertical-align: middle; height: 16px\" src=\"https://".concat(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_1__[/* cdnHost */ "d"], "/i/f/").concat(getClassById(curr["class"])[3], "?v=1.1\" alt=\"\">") : "", " [").concat(curr["hero_lvl"], "]</div>\n                                <div>\xA0").concat(getFFAEventBattleSide(curr), "</div>\n                                <div>\xA0<a target=\"_blank\" href=\"/warlog.php?warid=").concat(curr["battle_id"], "&show_for_all=").concat(curr["battle_secret"], "&lt=-1\">\u0411\u043E\u0439</a></div>\n                            </div>\n                            ");
      }, "");
    } else {
      return "<div style=\"text-align: center;\"><h5>\u043F\u0443\u0441\u0442\u043E</h5></div>";
    }
  }

  function getClassById(id) {
    for (var i = 0; i < allClasses.length; i++) {
      if (id === allClasses[i][4]) {
        return allClasses[i];
      }
    }

    return null;
  }

  function getFFAEventBattleSide(battle) {
    if ("battle_side" in battle) {
      if (battle["battle_side"] === 0) {
        return "Враг#1";
      } else if (battle["battle_side"] === 1) {
        return "Враг#2";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getSpoiler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNewCreatureIcon; });
/* harmony import */ var _utils_commonUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

function getSpoiler(type, index, spoilerHead, spoilerBody) {
  return "\n            <div>\n                <input type=\"checkbox\" id=\"spoiler_".concat(type, "_").concat(index, "\"/>\n                <label for=\"spoiler_").concat(type, "_").concat(index, "\">\n                    ").concat(spoilerHead, "\n                </label>\n                <div class=\"spoiler\">\n                    ").concat(spoilerBody, "\n                </div>\n            </div>\n        ");
}
function getNewCreatureIcon(creaturePortrait, newAmount) {
  return "\n        <div class=\"cre_creature custom-creature\">\n            <img src=\"https://".concat(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_0__[/* cdnHost */ "d"], "/i/army_html/fon_lvl").concat(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_0__[/* heroCreatures */ "h"][creaturePortrait] ? _utils_commonUtils__WEBPACK_IMPORTED_MODULE_0__[/* heroCreatures */ "h"][creaturePortrait].rarity : "1", ".png?v=1\" width=\"50\" height=\"50\" class=\"cre_mon_image2\" alt=\"\">\n            <img src=\"https://").concat(_utils_commonUtils__WEBPACK_IMPORTED_MODULE_0__[/* cdnHost */ "d"], "/i/portraits/").concat(creaturePortrait, "p33.png\" height=\"50\" alt=\"\" class=\"cre_mon_image1\">\n            <div class=\"cre_amount custom-amount\" id=\"add_now_count\">").concat(newAmount, "</div>\n        </div>");
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGlobalStyles", function() { return setGlobalStyles; });
function setGlobalStyles() {
  document.body.insertAdjacentHTML("beforeend", "\n                <style>\n                    .btn_hover2{\n                        transition: -webkit-filter .3s;\n                        transition: filter .3s;\n                    }\n                    .btn_hover2:hover{\n                        cursor: pointer;\n                        -webkit-filter: brightness(125%) drop-shadow(0 0 5px #ffe4b3);\n                         filter: brightness(125%) drop-shadow(0 0 5px #ffe4b3);\n                    }\n                    .home_button2{\n                        padding: 2px 4px;\n                        overflow: hidden;\n                        text-overflow: ellipsis;\n                        white-space: nowrap;\n                        image-rendering: -webkit-optimize-contrast;\n                        image-rendering: optimizeQuality;\n                        color: #592C08;\n                        font-family: verdana,geneva,arial cyr;\n                        -webkit-user-select: none;\n                        position: relative;\n                        font-size: 100%;\n                        text-align: center;\n                        font-weight: bold;\n                        cursor: pointer;\n                        background: url(../i/homeico/art_btn_bg_gold.png) #DAB761;\n                        background-size: 100% 100%;\n                        border-radius: 5px;\n                        box-shadow: inset 0 0 0 1px #fce6b0,\n                            inset 0 0 0 2px #a78750,\n                            0 0 0 1px rgba(0,0,0,.13);\n                        line-height: 25px;\n                    }\n                    input[id^=\"spoiler\"] {\n                        display: none;\n                    }\n        \n                    input[id^=\"spoiler\"] + label {\n                        display: block;\n                        text-align: center;\n                        font-size: 14px;\n                        cursor: pointer;\n                        transition: all .6s;\n                    }\n        \n                    input[id^=\"spoiler\"] ~ .spoiler {\n                        display: none;\n                        opacity: 0;\n                        transition: all .6s;\n                    }\n        \n                    input[id^=\"spoiler\"]:checked + label + .spoiler {\n                        display: block;\n                        opacity: 1;\n                    }\n                    \n                     .record-wrapper{\n                        display: flex;\n                        flex-direction: column;\n                    }\n                    .record-container {\n                        display: flex;\n                        flex-wrap: nowrap;\n                        width: 100%;\n                        overflow: auto;\n                        margin-top: 4px;\n                    }\n                    .record-wrapper + .record-wrapper {\n                        border-top: 2px solid black;\n                    }\n        \n                    .record-players, .record-number {\n                        display: flex;\n                        align-items: center;\n                        justify-content: center;\n                    }\n        \n                    .record-number {\n                        font-weight: bold;\n                        font-size: 18px;\n                    }\n                    \n                    .record-players {\n                        flex-direction: column;\n                        padding: 4px;\n                    }\n        \n                    .record-players-creatures {\n                        display: flex;\n                        flex-wrap: nowrap;\n                    }\n                    .record-players-arms {\n                        height: 40px;          \n                    }\n                    .record-player-creatures {\n                        display: flex;\n                    }\n                    \n                    .player-creatures-row {\n                        display: flex;\n                        flex-direction: row;\n                        flex-wrap: nowrap;\n                        justify-content: center;\n                    }\n                    .creatures-checkers {\n                        display: flex;\n                        justify-content: space-around;\n                    }\n                    .creatures-apply {\n                        display: flex;\n                        flex-direction: column-reverse;\n                        justify-content: space-evenly;\n                        padding: 4px;\n                    }\n                    .player-leadership {\n                        display: flex;\n                        align-items: center;\n                    }\n        \n                    .records-container-header {\n                        /*background: url(\"https://media3.giphy.com/media/YFFG4W2MvihirVoSQU/giphy.gif\") repeat;*/\n                        background-size: 6%;\n                        display: flex;\n                        flex-direction: row;\n                        flex-wrap: nowrap;\n                        justify-content: center;\n                        width: 100%;\n                    }\n        \n                    .records-container-header > div {\n                        padding: 10px;\n                        background: #f8f8f2;\n                        border-radius: 20px;\n                        border: 2px solid rgb(26,55,86);\n                    }\n        \n                    .records-container-body {\n                        display: flex;\n                        flex-direction: column;\n                        margin-top: 10px;\n                        width: 670px;\n                    }\n        \n                    .record-result {\n                        display: flex; \n                        justify-content: center; \n                        align-items: center\n                    }\n                    .record-result > div {\n                        margin: 5px 5px 5px 0;\n                        display: flex;\n                        align-items: center;\n                    }\n                    .record-result img {\n                        height: 24px; \n                        vertical-align: middle\n                    }\n                    .record-result span {\n                        font-weight: bold\n                    }\n                    .custom-creature {\n                       width: 40px;\n                    }\n                    .custom-creature > img {\n                        border-radius: 50%;\n                        border: 1px solid #747474;\n                        width: 50px;\n                        height: 50px;\n                        object-fit: cover;\n                    \n                    }\n                    .custom-amount {\n                        right: unset;\n                        left: calc(50% - (12px));\n                        bottom: -0.3em;\n                        width: 40px;\n                        text-align: center;\n                    }\n                    .good-creature {\n                        cursor: pointer;\n                    }\n                    .bad-creature {\n                        color: #ff5050;\n                        cursor: pointer;\n                    }\n                    \n                    .special-creature {\n                       margin-left: 20px;\n                       display: flex;\n                    }\n                    .special-creature-info{\n                        display: flex;\n                        justify-content: space-between;\n                    }\n                    \n                    .special-creature-info-button{\n                        cursor:pointer;\n                        z-index: 1;\n                    }\n                    .special-creature-info-button:hover {\n                        filter: brightness(1.25);\n                    }\n                    .special-creature-stats {\n                        display: flex;\n                        flex-direction: column;\n                        margin-top: 2px;\n                    }\n                    .special-creature-stats > div {\n                        display: flex;\n                        justify-content: space-between;\n                        height: 25px;\n                    }\n                    .special-creature-stats > div > div {\n                        display: flex;\n                    }\n                    .special-creature-stat-icon{\n                        vertical-align: bottom;\n                        height: 20px;\n                        filter: drop-shadow(0.01rem 0.01rem 0 #747474) drop-shadow(-0.01rem -0.01rem 0 #747474);\n                    }\n                    .special-creature-stat-value {\n                        font-size: 14px;\n                        font-weight: bold;\n                    }\n                    .special-creature-extended {\n                        display: none;\n                    }\n                    .visible{\n                        display: block;\n                    }\n                    .failed-records-wrapper {\n                        display: flex;\n                        justify-content: center;\n                    }\n                    .failed-records-container {\n                        display: flex; \n                        flex-direction: column;\n                        width: fit-content;\n                    }\n                    \n                    \n                    .faction-hunt-data {\n                        display: flex;\n                        flex-direction: row;\n                        flex-wrap: nowrap;\n                    }\n                    .btn_hover2{\n                        transition: -webkit-filter .3s;\n                        transition: filter .3s;\n                    }\n                    .btn-gradient {\n                        text-decoration: none;\n                        color: white;\n                        padding: 5px;\n                        display: inline-block;\n                        cursor: pointer;\n                        position: relative;\n                        border: 1px solid rgba(0,0,0,0.21);\n                        border-bottom: 4px solid rgba(0,0,0,0.21);\n                        border-radius: 4px;\n                        text-shadow: 0 1px 0 rgba(0,0,0,0.15);\n                        user-select: none;\n                    }\n        \n                    .btn-gradient.blue:active {background: #608FBF;}\n                    .btn-gradient.blue {\n                        background: rgba(102,152,203,1);\n                        background: linear-gradient(to bottom, rgba(102,152,203,1) 0%, rgba(92,138,184,1) 100%);\n                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6698cb', endColorstr='#5c8ab8', GradientType=0 );\n                    }\n                    \n                    \n                    .progress {\n                        font-size: 14px !important;\n                        text-shadow: none;\n                    }\n                    \n                    .wrapper {\n                        color: black;\n                        letter-spacing: 1px;\n                        display: flex;\n                        justify-content: center;\n                    }\n                    .wrapperStat {\n                        display: flex;\n                        flex-direction: column;\n                        justify-content: center;\n                        text-align: center;\n                        align-items: center;\n                        padding: 5px;\n                    }\n                    \n                    /* custom scrollbar */\n                    .record-container::-webkit-scrollbar {\n                      width: 20px;\n                    }\n                    \n                    .record-container::-webkit-scrollbar-track {\n                      background-color: transparent;\n                    }\n                    \n                    .record-container::-webkit-scrollbar-thumb {\n                      background-color: #d6dee1;\n                      border-radius: 20px;\n                      border-top: 6px solid transparent;\n                      border-bottom: 6px solid transparent;\n                      background-clip: content-box;\n                    }\n                    \n                    .record-container::-webkit-scrollbar-thumb:hover {\n                      background-color: #a8bbbf;\n                    }\n                </style>\n            ");
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/utils/networkUtils.js
var networkUtils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/utils/commonUtils.js
var commonUtils = __webpack_require__(0);

// EXTERNAL MODULE: ./src/styles.js
var styles = __webpack_require__(7);

// EXTERNAL MODULE: ./src/settings.js + 1 modules
var settings = __webpack_require__(1);

// EXTERNAL MODULE: ./src/utils/eventUtils.js
var eventUtils = __webpack_require__(3);

// EXTERNAL MODULE: ./src/leaderboard.js
var leaderboard = __webpack_require__(4);

// EXTERNAL MODULE: ./src/templates.js
var templates = __webpack_require__(6);

// CONCATENATED MODULE: ./src/events/leader.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







function leaderEvent() {
  var lg_lvl = parseInt(Object(commonUtils["g" /* get */])('hero_leader_lvl', 10));
  var battles = [];
  var isLostBattles = false;
  unsafeWindow.sendApplyArmy = sendApplyArmy;
  unsafeWindow.showSpecialCreatureData = showSpecialCreatureData;
  unsafeWindow.replaceCellListener = replaceCellListener;
  unsafeWindow.removeOverlay = removeOverlay;

  if (/(leader_rogues|leader_winter)/.test(location.href)) {
    if (document.body.innerHTML.includes("leader_rogues.php?action=cancel_merc")) {
      addFilteringArea();
      processFilters();
      return;
    }

    if (location.href.includes("?show_2x2_form=1") || location.href.includes("?show_merc_dialog=1")) {
      return;
    }

    Object(settings["eventHelperSettings"])(document.querySelector('.Global'), function (container) {
      Object(settings["setSettings"])("auto_send_event_lg", "Отправлять бои из ГЛ ивента в сервис автоматически", container);
      Object(settings["setSettings"])("only_clan_visibility", "Мои бои доступны только для клана", container, false);
      Object(settings["setSettings"])("collapse_event_desc", "Всегда сворачивать описания боев", container, false);
      Object(settings["setSettings"])("lg_show_available", "Отображать только доступные наборы", container, false);
      Object(settings["setSettings"])("lg_hide_duplicates", "Скрывать дубликаты наборов", container, false);
    }, "afterend");
    Object(eventUtils["collapseEventDesc"])();
    Object(leaderboard["setLeaderboard"])(document.querySelector('[style="min-width:220px;"]').getElementsByTagName("center")[1]);
    setLoading(Array.from(document.querySelectorAll('[align="left"][valign="top"]')).slice(-1)[0]);
    getResources(getWaveInfo, createLeaderTemplate, Array.from(document.querySelectorAll('[align="left"][valign="top"]')).slice(-1)[0]);
  }

  function createLeaderTemplate() {
    return "\n                    <div class=\"wrapper\">\n                        <div class=\"records-container-body\" id=\"main-data\"></div>\n                    </div>\n                ";
  }

  if (location.href.includes("leader_guild")) {
    //createWelcomeTemplate()
    lg_lvl = document.body.innerHTML.match(/lev=(\d{1,2})/)[1] - 0;
    Object(commonUtils["m" /* set */])("hero_leader_lvl", lg_lvl);
    Object(settings["eventHelperSettings"])(Array.from(document.querySelectorAll('table[class="wb"]')).slice(-1)[0], function (container) {
      Object(settings["setSettings"])("auto_send_lg", "Отправлять бои с опасными бандитами в сервис автоматически", container);
      Object(settings["setSettings"])("only_clan_visibility", "Мои бои доступны только для клана", container, false);
      Object(settings["setSettings"])("lg_show_available", "Отображать только доступные наборы", container, false);
      Object(settings["setSettings"])("lg_hide_duplicates", "Скрывать дубликаты наборов", container, false);
    }, "afterend");

    if (!document.body.innerText.includes("Опасная цель устранена")) {
      setLoading(Array.from(document.querySelectorAll("td[valign=\"top\"][align=\"left\"]")).slice(-1)[0]);
      getResources(getTodayBandits, createBanditsTemplate, Array.from(document.querySelectorAll("td[valign=\"top\"][align=\"left\"]")).slice(-1)[0]);
    }
  }

  function createBanditsTemplate() {
    return "\n                    <div class=\"wrapper\">\n                        <div class=\"records-container-body\" id=\"main-data\"></div>\n                    </div>\n                ";
  }

  function getResources(_x, _x2, _x3) {
    return _getResources.apply(this, arguments);
  }

  function _getResources() {
    _getResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(getExamples, showExamples, target) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([getHeroCreatures(), getExamples()]).then(function () {
                setExampleBattles(showExamples(), target);
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getResources.apply(this, arguments);
  }

  function setLoading() {
    var where = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    where.insertAdjacentHTML("beforeend", "\n                    <div style=\"display: flex; justify-content: center;\"  id=\"loading\" >\n                        <img style=\"margin-top: 20px\" src=\"https://i.imgur.com/4RrPm82.gif\" width=\"400\" alt=\"\">\n                    </div>");
  }

  function getHeroCreatures() {
    return new Promise(function (resolve) {
      Object(networkUtils["b" /* doHWMGet */])('/leader_army.php', function (doc) {
        processLeaderArmyResponse(doc);
        resolve();
      });
    });
  }

  function processLeaderArmyResponse(doc) {
    var bodyHTML = doc.body.innerHTML.toString();
    var matchesId = Object(commonUtils["f" /* findAll */])(/obj\[\d{1,3}]\['monster_id'] = '([a-z0-9_-]+)'/g, bodyHTML);
    var matchesCount = Object(commonUtils["f" /* findAll */])(/obj\[\d{1,3}]\['count'] = (\d+)/g, bodyHTML);
    var matchesCost = Object(commonUtils["f" /* findAll */])(/obj\[\d{1,3}]\['cost'] = (\d+)/g, bodyHTML);
    var matchesName = Object(commonUtils["f" /* findAll */])(/obj\[\d{1,3}]\['name'] = '([А-Яа-яёЁa-zA-Z`_ -]+)'/g, bodyHTML);
    var matchesPortrait = Object(commonUtils["f" /* findAll */])(/obj\[\d{1,3}]\['lname'] = '([a-z0-9_-]+)'/g, bodyHTML);
    var matchesVersion = Object(commonUtils["f" /* findAll */])(/obj\[\d{1,3}]\['version'] = '(\d{1,3})'/g, bodyHTML);
    var matchesRarity = Object(commonUtils["f" /* findAll */])(/obj\[\d{1,3}]\['rarity'] = (\d{1,3})/g, bodyHTML);
    var matchesRace = Object(commonUtils["f" /* findAll */])(/obj\[\d{1,3}]\['race'] = (\d{1,3})/g, bodyHTML);
    matchesPortrait.forEach(function (id, index) {
      commonUtils["h" /* heroCreatures */][id[1]] = {
        'count': matchesCount[index][1],
        'cost': matchesCost[index][1],
        'name': matchesName[index][1],
        'id': matchesId[index][1],
        'version': matchesVersion[index][1],
        'rarity': matchesRarity[index][1],
        'race': matchesRace[index][1]
      };
    });
  }

  function getWaveInfo() {
    return new Promise(function (resolve) {
      Object(networkUtils["a" /* doGet */])("getEventLeaderBattles?wave=".concat(Object(eventUtils["getCurrentLevel"])(), "&token=").concat(Object(commonUtils["g" /* get */])("hwm_events_token", "")), function (doc) {
        battles = doc;

        if (battles.length > 0) {
          battles.sort(function (a, b) {
            a = parseFloat(a.cost);
            b = parseFloat(b.cost);

            if (a < 0 || b < 0) {
              return b - a;
            } else {
              return a - b;
            }
          });
          resolve();
        } else {
          Object(networkUtils["a" /* doGet */])("getEventLeaderFailedBattles?wave=".concat(Object(eventUtils["getCurrentLevel"])(), "&token=").concat(Object(commonUtils["g" /* get */])("hwm_events_token", "")), function (doc) {
            battles = doc;
            isLostBattles = true;
            resolve();
          }, false);
        }
      }, false);
    });
  }

  function getTodayBandits() {
    return new Promise(function (resolve) {
      Object(networkUtils["a" /* doGet */])("getDbBattles?lg_lvl=".concat(lg_lvl, "&token=").concat(Object(commonUtils["g" /* get */])("hwm_events_token", "")), function (doc) {
        battles = doc;
        battles.sort(function (a, b) {
          return parseFloat(b.survived) - parseFloat(a.survived);
        });
        resolve();
      }, false);
    });
  }

  function setExampleBattles(template) {
    var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
    Object(commonUtils["a" /* $ */])('loading').remove();
    where.insertAdjacentHTML("beforeend", template);

    if (!isLostBattles) {
      processRecords(battles);
    } else {
      processFailedRecords(battles);
    }
  }

  function processFailedRecords(failedEventBattles) {
    var allRecords = failedEventBattles.reduce(function (prev, curr, index) {
      return prev + "\n                                <div style=\"display: flex; justify-content: space-between; padding: 1px;\">\n                                    <div>".concat(index + 1, ".\xA0</div>\n                                    <div style=\"text-align: center\">").concat(getRecordPlayersTemplate(curr.nicknames), "</div>\n                                    <div>\xA0<a target=\"_blank\" href=\"/warlog.php?warid=").concat(curr["battle_id"], "&show_for_all=").concat(curr["battle_secret"], "&lt=-1\">\u0411\u043E\u0439</a></div>\n                                </div>");
    }, "");
    var result = "<div class=\"failed-records-wrapper\">\n                                <div class=\"failed-records-container\">\n                                    <div style=\"text-align: center;\">\n                                        <h3>\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u043F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0439</h3>\n                                    </div>\n                                    ".concat(allRecords, "\n                                </div>\n                            </div>");
    Object(commonUtils["a" /* $ */])('main-data').insertAdjacentHTML("beforeend", result);
  }

  var processedBattleCreatures = [];
  var rowDatas = {};

  function processRecords(records) {
    console.log(commonUtils["h" /* heroCreatures */]);
    var allRecords = records.reduce(function (prev, curr, index) {
      return prev + addRecord(curr, index);
    }, "");
    Object(commonUtils["a" /* $ */])('main-data').insertAdjacentHTML("beforeend", allRecords);
  }

  function addRecord(record, index) {
    var playersCreaturesInfo = [];
    record.creatures.forEach(function (playerCreatures, playerId) {
      var rowData = [];
      Object.entries(playerCreatures).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            creaturePortrait = _ref2[0],
            creatureAmount = _ref2[1];

        processRecordHeroCreatures(rowData, creatureAmount, creaturePortrait);
      });
      playersCreaturesInfo.push(rowData);
      rowDatas["".concat(index, ":").concat(playerId)] = rowData;
    });
    var isAllCreaturesAvailable = isAllPresent(playersCreaturesInfo[0]);
    var recordLeadership = getLeadership(playersCreaturesInfo[0]);

    if (!Object(commonUtils["g" /* get */])("lg_show_available", false) || isAllCreaturesAvailable && recordLeadership > (lg_lvl + 9) * 1000 && recordLeadership <= (lg_lvl + 10) * 1000) {
      var recordCreatureIds = Object.keys(record.creatures[0]);
      recordCreatureIds.sort(function (a, b) {
        return a.localeCompare(b);
      });

      if (!Object(commonUtils["g" /* get */])("lg_hide_duplicates", false) || !processedBattleCreatures.includes(recordCreatureIds.join(":"))) {
        var playersCreatures = record.creatures.map(function (playerCreatures, playerId) {
          var playerCreaturesHTML = "";
          var rowData = [];
          Object.entries(playerCreatures).forEach(function (_ref3, cellId) {
            var _ref4 = _slicedToArray(_ref3, 2),
                creaturePortrait = _ref4[0],
                creatureAmount = _ref4[1];

            processRecordHeroCreatures(rowData, creatureAmount, creaturePortrait);
            playerCreaturesHTML += "<div id=\"creature-".concat(index, "-").concat(playerId, "-").concat(cellId, "\">").concat(Object(templates["a" /* getNewCreatureIcon */])(creaturePortrait, creatureAmount), "</div>");
          });
          return "\n                        <div class=\"record-player-creatures\" id=\"creatures-".concat(index, "-").concat(playerId, "\">\n                            <div id=\"creatures-").concat(index, "-").concat(playerId, "-apply\" class=\"creatures-apply\">\n                                <div id=\"creatures-").concat(index, "-").concat(playerId, "-apply-button\" class=\"home_button2 btn_hover2\" onclick=\"sendApplyArmy('").concat(index, ":").concat(playerId, "')\">\u041D\u0430\u0431\u0440\u0430\u0442\u044C</div>\n                                <div id=\"creatures-").concat(index, "-").concat(playerId, "-leadership\" class=\"player-leadership\">\n                                    ").concat(getRecordPlayerLeadershipTemplate(index, playerId, getLeadership(rowData), isAllCreaturesAvailable), "\n                                </div>\n                            </div>\n                            <div id=\"creatures-").concat(index, "-").concat(playerId, "-creatures\" class=\"player-creatures-row\">").concat(playerCreaturesHTML, "</div>\n                        </div>");
        }).join("<img src=\"https://i.imgur.com/Y3sbLcM.png\" alt=\"\" class=\"record-players-arms\">"); //onwheel="if(this.scrollWidth > this.clientWidth){ if (event.deltaY > 0) {this.scrollLeft += 100;} else {this.scrollLeft -= 100;}; event.preventDefault()}"

        var recordContainer = "\n                    <div class=\"record-wrapper\" id=\"record-".concat(index, "\">\n                        <div class=\"record-container\">\n                            <div class=\"record-number\"><div>").concat(index + 1, "</div></div>\n                            <div class=\"record-players\" id=\"record-").concat(index, "-players\">\n                                <div>").concat(getRecordPlayersTemplate(record.nicknames), "</div>\n                                <div>").concat(getRecordResultTemplate(record), "</div>\n                            </div>\n                            <div class=\"record-players-creatures\" id=\"record-").concat(index, "-creatures\">").concat(playersCreatures, "</div>\n                            ").concat(record.special_creature ? getSpecialCreatureTemplate(record.special_creature, index) : "", "\n                        </div>\n                        <div class=\"special-creature-extended\" id=\"special-creature-extended-").concat(index, "\">\n                            ").concat(record.special_creature ? getSpecialCreatureExtraData(record.special_creature) : "", "\n                        </div>\n                    </div>");
        processedBattleCreatures.push(recordCreatureIds.join(":"));
        return recordContainer;
      }
    }

    return "";
  }

  function processRecordHeroCreatures(rowData, creatureAmount, creaturePortrait) {
    if (commonUtils["h" /* heroCreatures */].hasOwnProperty(creaturePortrait)) {
      if (creatureAmount - 0 <= commonUtils["h" /* heroCreatures */][creaturePortrait]['count'] - 0) {
        rowData.push([creaturePortrait, creatureAmount, true]);
      } else {
        rowData.push([creaturePortrait, creatureAmount, false]);
      }
    } else {
      rowData.push([creaturePortrait, creatureAmount, false]);
    }
  }

  function getSpecialCreatureTemplate(creatureData, index) {
    return "\n                <div class=\"special-creature\">\n                    <div class=\"special-creature-info\">\n                        ".concat(Object(templates["a" /* getNewCreatureIcon */])(creatureData.portrait, ""), "\n                        <div class=\"special-creature-info-button\" onclick=\"showSpecialCreatureData('").concat(index, "')\">\n                            <img src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/combat/btn_info.png\" alt=\"creature info\" height=\"50\">\n                        </div>\n                    </div>\n                    <div class=\"special-creature-stats\">\n                        <div>\n                            <div>\n                                <div><img class=\"special-creature-stat-icon\" src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/icons/attr_attack.png?v=1\" alt=\"attack\"></div>\n                                <div class=\"special-creature-stat-value\">").concat(creatureData.attack.toFixed(), "</div>\n                            </div>\n                            <div>\n                                <div><img class=\"special-creature-stat-icon\" src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/icons/attr_speed.png?v=1\" alt=\"attack\"></div>\n                                <div class=\"special-creature-stat-value\">").concat(creatureData.speed.toFixed(), "</div>\n                            </div>\n                            <div>\n                                <div><img class=\"special-creature-stat-icon\" src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/icons/attr_initiative.png?v=1\" alt=\"attack\"></div>\n                                <div class=\"special-creature-stat-value\">").concat(creatureData.maxinit, "</div>\n                            </div>\n                            <div>\n                                <div><img class=\"special-creature-stat-icon\" src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/icons/attr_hit_points.png?v=1\" alt=\"attack\"></div>\n                                <div class=\"special-creature-stat-value\">").concat(creatureData.health.toFixed(), "</div>\n                            </div>\n                        </div>\n                        <div>\n                            <div>\n                                <div><img class=\"special-creature-stat-icon\" src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/icons/attr_defense.png?v=1\" alt=\"attack\"></div>\n                                <div class=\"special-creature-stat-value\">").concat(creatureData.defence.toFixed(), "</div>\n                            </div>\n                            <div>\n                                <div><img class=\"special-creature-stat-icon\" src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/icons/attr_shoots.png?v=1\" alt=\"attack\"></div>\n                                <div class=\"special-creature-stat-value\">").concat(creatureData.shots.toFixed(), "</div>\n                            </div>\n                            <div>\n                                <div><img class=\"special-creature-stat-icon\" src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/icons/attr_damage.png?v=1\" alt=\"attack\"></div>\n                                <div class=\"special-creature-stat-value\">").concat(creatureData.mindam.toFixed(), "-").concat(creatureData.maxdam.toFixed(), "</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                ");
  }

  function showSpecialCreatureData(index) {
    Object(commonUtils["a" /* $ */])("special-creature-extended-".concat(index)).classList.toggle("visible");
  }

  function getSpecialCreatureExtraData(creatureData) {
    return "\n                <b>\u041D\u0430\u0432\u044B\u043A\u0438</b>: ".concat(creatureData.skills.map(function (skill) {
      return skill.replace(". ", "").replace(".", "");
    }).join(", "), ".<br>\n                <b>\u0417\u0430\u043A\u043B\u0438\u043D\u0430\u043D\u0438\u044F</b>: ").concat(creatureData.casts.map(function (cast, index) {
      if (creatureData.casts_effects) {
        return "".concat(cast, " (").concat(creatureData.casts_effects[index], ")");
      }

      return cast;
    }).join(", "), ".\n                        ");
  }

  function isAllPresent(rowData) {
    var isAllPresent = true;
    rowData.forEach(function (cre) {
      if (!cre[2]) {
        isAllPresent = false;
      }
    });
    return isAllPresent;
  }

  function getRecordPlayersTemplate(nicknames) {
    return nicknames.map(function (nickname) {
      return "<a href=\"/search.php?key=".concat(nickname, "\">").concat(nickname, "</a>");
    }).join("<br>+<br>");
  }

  function getRecordResultTemplate(record) {
    return "\n            <div class=\"record-result\">\n                <div><img src=\"https://".concat(commonUtils["d" /* cdnHost */], "/i/r/48/gold.png?v=3.23de65\" title=\"\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u043D\u0430 \u0432\u043E\u0441\u043A\u0440\u0435\u0448\u0435\u043D\u0438\u0435\" alt=\"gold\"><span>\xA0").concat(record.cost, "</span></div>\n                <div><a href=\"/war.php?lt=-1&warid=").concat(record.battle_id, "&show_for_all=").concat(record.battle_secret, "\" target=\"_blank\">\u0411\u043E\u0439</a></div>\n                ").concat(record.survived === undefined ? "" : "<div>".concat(record.survived, "%</div>"), "\n            </div>");
  }

  function replaceCellListener(rowDataId, recordId, playerId, cellId) {
    var rowData = rowDatas[rowDataId];
    setSelectNewCreatureTemplate(rowData, recordId, playerId, cellId);
  }

  function setSelectNewCreatureTemplate(rowData, recordId, playerId, cellId) {
    var replaceCreatureTarget = Object(commonUtils["a" /* $ */])("replace-creature-".concat(recordId, "-").concat(playerId, "-").concat(cellId)).parentElement;
    var newCreatureTemplate = "\n               <div style=\"position: absolute; width: 100%; height: ".concat(getScrollHeight() + 500, "px; background: rgba(0,0,0,0.22); z-index: 1000000\" onclick=\"removeOverlay()\">\n                   <div id=\"select-new-creature\" style=\"position: absolute; background: #608FBF; border: 3px solid cyan;  width: 300px; height: 400px; z-index: 4; display: flex; flex-direction: column\" onclick=\"event.stopPropagation()\">\n                        <div id=\"select-new-creature-faction\" style=\"display: flex; flex-direction: row; flex-wrap: wrap\"></div>\n                        <div id=\"new-creatures\" style=\"overflow-y: auto; display: flex; flex-direction: column\"></div>\n                    </div>\n               </div>");
    var android = Object(commonUtils["a" /* $ */])("android_container");
    var container = android ? android : document.body;
    container.insertAdjacentHTML('afterbegin', newCreatureTemplate);
    var newCreatureElement = Object(commonUtils["a" /* $ */])("select-new-creature");
    newCreatureElement.style.left = replaceCreatureTarget.offsetLeft + 60;
    newCreatureElement.style.top = replaceCreatureTarget.offsetTop;
    fillNewCreatures(-1, rowData, recordId, playerId, cellId);
    commonUtils["c" /* allFactions */].forEach(function (faction) {
      Object(commonUtils["a" /* $ */])("select-new-creature-faction").insertAdjacentHTML('beforeend', getHTMLFactionSelect(faction));
      Object(commonUtils["a" /* $ */])("faction-select".concat(faction[0])).addEventListener('click', function () {
        Object(commonUtils["a" /* $ */])("new-creatures").innerHTML = '';
        fillNewCreatures(faction[0], rowData, recordId, playerId, cellId);
      });
    });
  }

  function fillNewCreatures(constraint, rowData, recordId, playerId, cellId) {
    var remainingLeadership = getRemainingLeadership(rowData, cellId);
    Object.entries(commonUtils["h" /* heroCreatures */]).forEach(function (_ref5, index) {
      var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];

      if (!checkExistingInRowData(key, rowData) && (constraint === -1 ? true : value['race'] - 0 === constraint)) {
        var newAmount = Math.min(Math.floor(Math.min(remainingLeadership, (10 + lg_lvl) * 400) / (value['cost'] - 0)), value['count'] - 0);

        if (newAmount > 0) {
          Object(commonUtils["a" /* $ */])('new-creatures').insertAdjacentHTML('beforeend', "\n                                <div id=\"new-creature-".concat(index, "\" style=\"display: flex; flex-direction: row;\">\n                                    ").concat(Object(templates["a" /* getNewCreatureIcon */])(key, newAmount), "\n                                    <div style=\"margin: auto\">\n                                        <p style=\"text-decoration: underline; cursor: pointer\">").concat(value['name'], "</p>\n                                    </div>\n                                </div>"));
          Object(commonUtils["a" /* $ */])("new-creature-".concat(index)).addEventListener('click', function () {
            var replaceTarget = Object(commonUtils["a" /* $ */])("creature-".concat(recordId, "-").concat(playerId, "-").concat(cellId));
            replaceTarget.innerHTML = Object(templates["a" /* getNewCreatureIcon */])(key, newAmount);
            rowData[cellId] = [key, newAmount, true];
            setLeaderShip(recordId, playerId, rowData);
            removeOverlay();
          });
        }
      }
    });
  }

  function getHTMLFactionSelect(faction) {
    var factionSelectBody;

    if (faction[0] === -1) {
      factionSelectBody = "<b>All</b>";
    } else {
      factionSelectBody = "<img src=\"https://".concat(commonUtils["d" /* cdnHost */], "/i/f/").concat(faction[2], "\" alt=\"").concat(faction[1], "\" title=\"").concat(faction[1], "\" style=\"width: 30px; height: 30px\">");
    }

    return "\n            <div id=\"faction-select".concat(faction[0], "\" style=\"justify-content: center; display: flex; align-items: center; width: 50px; height: 50px; cursor: pointer\">\n                ").concat(factionSelectBody, "\n            </div>\n            ");
  }

  function checkExistingInRowData(name, rowData) {
    var isExist = false;
    rowData.forEach(function (cre) {
      if (name === cre[0]) {
        isExist = true;
      }
    });
    return isExist;
  }

  function setLeaderShip(recordId, playerId, rowData) {
    var allPresent = isAllPresent(rowData);
    Object(commonUtils["a" /* $ */])("creatures-".concat(recordId, "-").concat(playerId, "-apply-button")).innerText = "Набрать";
    Object(commonUtils["a" /* $ */])("creatures-".concat(recordId, "-").concat(playerId, "-leadership")).innerHTML = getRecordPlayerLeadershipTemplate(recordId, playerId, getLeadership(rowData), allPresent);
  }

  function getRecordPlayerLeadershipTemplate(recordId, playerId, leadership, allPresent) {
    return "\n                <img height=\"24\" src=\"https://".concat(commonUtils["d" /* cdnHost */], "/i/icons/attr_leadership.png?v=1\" alt=\"\" title=\"\u041B\u0438\u0434\u0435\u0440\u0441\u0442\u0432\u043E \u0441\u0431\u043E\u0440\u043A\u0438\">\n                <span id=\"leadership-number-").concat(recordId, "-").concat(playerId, "\" style=\"color: ").concat(allPresent ? "green" : "red", "\">\n                    ").concat(leadership, "\n                </span>");
  }

  function getLeadership(rowData) {
    return rowData.filter(function (cre) {
      return cre[2];
    }).reduce(function (leadership, cre) {
      return leadership + (commonUtils["h" /* heroCreatures */][cre[0]]['cost'] - 0) * (cre[1] - 0);
    }, 0);
  }

  function getRemainingLeadership(rowData, cellId) {
    return (10 + lg_lvl) * 1000 - getLeadership(rowData) + (rowData[cellId][1] - 0) * (commonUtils["h" /* heroCreatures */].hasOwnProperty(rowData[cellId][0]) && commonUtils["h" /* heroCreatures */][rowData[cellId][0]]['count'] >= rowData[cellId][1] - 0 ? commonUtils["h" /* heroCreatures */][rowData[cellId][0]]['cost'] - 0 : 0);
  }

  function sendApplyArmy(rowDataId) {
    Object(networkUtils["c" /* doHWMPost */])("/leader_army_apply.php", getApplyArmyForm(rowDatas[rowDataId]), function () {
      location.reload();
    });
  }

  function getApplyArmyForm(rowData) {
    var formData = new FormData();
    formData.append('idx', "0");
    rowData.filter(function (cre) {
      return cre[2];
    }).forEach(function (creData, index) {
      formData.append("countv".concat(index + 1), creData[1]);
      formData.append("mon_id".concat(index + 1), commonUtils["h" /* heroCreatures */][creData[0]]['id']);
    });
    return formData;
  }

  function removeOverlay() {
    Object(commonUtils["a" /* $ */])("select-new-creature").parentElement.remove();
  }
}
// CONCATENATED MODULE: ./src/events/adventure.js
var _require = __webpack_require__(4),
    setLeaderboard = _require.setLeaderboard;

var _require2 = __webpack_require__(7),
    setGlobalStyles = _require2.setGlobalStyles;

var _require3 = __webpack_require__(3),
    collapseEventDesc = _require3.collapseEventDesc;

var _require4 = __webpack_require__(1),
    eventHelperSettings = _require4.eventHelperSettings,
    setSettings = _require4.setSettings;

var _require5 = __webpack_require__(5),
    getEventBattles = _require5.getEventBattles;

function adventureEvent() {
  if (/adventure_event\.php$/.test(location.href)) {
    setLeaderboard(document.querySelector('[style="min-width:250px;"]').getElementsByTagName("center")[0]);
  }

  if (location.href.includes("adventure_event.php?map=1")) {
    setGlobalStyles();
    collapseEventDesc();
    eventHelperSettings(document.querySelector('.Global'), function (container) {
      setSettings("auto_send_ffa_event", "Отправлять бои из КБО ивента в сервис автоматически", container);
      setSettings("only_clan_visibility", "Мои бои доступны только для клана", container, false);
      setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false);
    }, "afterend");
    getEventBattles(document.querySelectorAll('[align="left"][valign="top"]')[1]);
  }
}
// CONCATENATED MODULE: ./src/events/faction.js




function factionEvent() {
  var battles = [];

  if (location.href.includes("faction_event")) {
    Object(leaderboard["setLeaderboard"])(document.querySelector("#hwm_for_zoom > div > div:nth-child(1) > div > div:nth-child(2) > center"));
    Object(settings["eventHelperSettings"])(document.querySelector("#hwm_for_zoom > div > div.frac_event_right_block > div > div:nth-child(2)"), function (container) {
      Object(settings["setSettings"])("hide_faction_event_enemies", "Показывать противников только с максимальной мощностью", container, false);
      Object(settings["setSettings"])("auto_send_faction_event_battles", "Отправлять бои из фрак. ивента в сервис автоматически", container, true);
    }, "beforeend");
    var enemies = getEnemies();
    var maxPower = getMaxPower(enemies);

    if (Object(commonUtils["g" /* get */])("hide_faction_event_enemies", false)) {
      filterFactionEventEnemies(enemies, maxPower);
    }

    enemies = getEnemies();
    setShowExampleListeners(enemies);
  }

  function getEnemies() {
    return Array.from(document.getElementsByClassName("frac_enemy_block"));
  }

  function getMaxPower(enemies) {
    return enemies.reduce(function (prev, curr) {
      var power = curr.children[3].innerText.split(": ")[1] - 0;
      return power > prev ? power : prev;
    }, 0);
  }

  function filterFactionEventEnemies(enemies, maxPower) {
    enemies.forEach(function (enemy) {
      var power = enemy.children[3].innerText.split(": ")[1] - 0;

      if (power < maxPower) {
        enemy.remove();
      }
    });
  }

  function setShowExampleListeners(enemies) {
    enemies.forEach(function (enemy, index) {
      var enemyTable = enemy.querySelector("table[cellpadding=\"0\"]");
      var portraits = Object(commonUtils["f" /* findAll */])(/portraits\/([a-zA-Z0-9_-]+)p40/, enemyTable.innerHTML).map(function (item) {
        return item[1];
      });
      var amounts = Array.from(enemyTable.querySelectorAll("#add_now_count")).map(function (elem) {
        return parseInt(elem.innerText);
      });

      if (amounts.length < portraits.length) {
        amounts.unshift(1);
      }

      portraits.sort(function (a, b) {
        return a.localeCompare(b);
      });
      amounts.sort(function (a, b) {
        return a - b;
      });
      enemy.insertAdjacentHTML("beforeend", "\n                <div style=\"margin-top: 10px\"><div id=\"load_examples_".concat(index, "\" class=\"home_button2 btn_hover2\" style=\"padding: 2px 4px\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440\u044B</div></div>\n                "));
      Object(commonUtils["a" /* $ */])("load_examples_".concat(index)).addEventListener("click", function (e) {
        e.target.remove();
        var request = [portraits.join("|"), amounts.join("|")].join("~");
        var dlgUrl = "getFactionEventBattles?enemy_id=".concat(encodeURIComponent(request), "&token=").concat(Object(commonUtils["g" /* get */])("hwm_events_token", ""));
        Object(networkUtils["a" /* doGet */])(dlgUrl, function (doc) {
          battles = doc;
          processFactionEventBattles(enemy);
        }, false);
      });
    });
  }

  function processFactionEventBattles() {
    var where = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    where.insertAdjacentHTML("beforeend", getBattlesTemplate(battles));
  }

  function getBattlesTemplate(battles) {
    var result = "";
    result += "<div style=\"text-align: center; font-size: 14px; margin-top: 10px\"><b>\u0422\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C</b></div>";
    var my_lvl_battles = battles.filter(function (battle) {
      return battle["hero_lvl"] === commonUtils["l" /* pl_lvl */];
    });
    result += factionBattlesToHTML(my_lvl_battles);
    result += "<div style=\"text-align: center; font-size: 14px\"><b>\u0414\u0440\u0443\u0433\u0438\u0435 \u0443\u0440\u043E\u0432\u043D\u0438</b></div>";
    var not_my_lvl_battles = battles.filter(function (battle) {
      return battle["hero_lvl"] !== commonUtils["l" /* pl_lvl */];
    });
    result += factionBattlesToHTML(not_my_lvl_battles);
    return result;
  }

  function factionBattlesToHTML(battles) {
    if (battles.length > 0) {
      battles.sort(function (a, b) {
        return a.nickname.localeCompare(b.nickname);
      });
      return battles.reduce(function (prev, curr, index) {
        return prev + "\n                    <div style=\"display: flex; justify-content: space-between; padding: 1px;\">\n                        <div>".concat(index + 1, ".\xA0</div>\n                        <div style=\"text-align: center\"> ").concat(curr["nickname"], " [").concat(curr["hero_lvl"], "]</div>\n                        <div>\xA0<a target=\"_blank\" href=\"/warlog.php?warid=").concat(curr["battle_id"], "&show_for_all=").concat(curr["battle_secret"], "\">\u0411\u043E\u0439</a></div>\n                    </div>\n                    ");
      }, "");
    } else {
      return "<div style=\"text-align: center;\"><b>\u043F\u0443\u0441\u0442\u043E</b></div>";
    }
  }
}
// EXTERNAL MODULE: ./src/battles.js
var src_battles = __webpack_require__(5);

// CONCATENATED MODULE: ./src/events/hire.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || hire_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function hire_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return hire_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return hire_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return hire_arrayLikeToArray(arr); }

function hire_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







function hireEvent() {
  if (location.href.includes("naym_event.")) {
    // addFilteringArea()
    // processFilters()
    Object(leaderboard["setLeaderboard"])(Array.from(document.querySelectorAll('[align="left"][valign="top"]')[0].getElementsByTagName("center")).slice(-1)[0]);
    Object(settings["eventHelperSettings"])(document.querySelector('.Global'), function (container) {
      Object(settings["setSettings"])("auto_send_rogues_event", "Отправлять бои из разбойничьего ивента в сервис автоматически", container);
      Object(settings["setSettings"])("collapse_event_desc", "Всегда сворачивать описания боев", container, false);
      Object(settings["setSettings"])("hide_rogues_event_enemies", "Показывать статистику цен", container);
      Object(settings["setSettings"])("return_to_prev_level", "Возвращать на незавершенный уровень", container, false);
    }, "afterend");
    Object(commonUtils["m" /* set */])("eh_current_level", null);
    Object(eventUtils["collapseEventDesc"])();
    interceptButtons();
    Object(src_battles["getEventBattles"])(document.querySelector(".Global").parentElement, "getRoguesEventBattles", 1);
  }

  if (location.href.includes("naym_event_set")) {
    var drawChart = function drawChart(prices, index, elem) {
      elem.insertAdjacentHTML("afterend", "\n                    <tr>\n                        <td colspan=\"3\">\n                            <div style=\"height: 100px; overflow: hidden\">\n                                <div id=\"chart".concat(index, "\"></div>\n                            </div>\n                        </td>\n                    </tr>"));
      var options = {
        series: [{
          name: "Price",
          data: prices
        }],
        chart: {
          height: 128,
          width: 480,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight',
          width: 2
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: Array.from(' '.repeat(prices.length))
        },
        yaxis: [{
          labels: {
            formatter: function formatter(val) {
              return val.toFixed(0);
            }
          }
        }]
      };
      var chart = new ApexCharts($("chart".concat(index)), options);
      chart.render();
    };

    var showPriceChange = function showPriceChange() {
      Object(networkUtils["a" /* doGet */])("getRoguesCreaturesPrices", function (doc) {
        Array.from(Array.from(document.querySelectorAll('td[class="wbwhite"][valign="top"]')).slice(-1)[0].getElementsByTagName("tr")).filter(function (elem) {
          return elem.innerHTML.includes("cre_creature");
        }).forEach(function (elem, index) {
          var creatureName = elem.innerHTML.match(/name=([a-zA-Z0-9]+)/)[1];
          var prices = doc[creatureName].map(function (price) {
            return price - 0;
          });
          var priceElem = elem.querySelector(".txt_with_icons");

          if (prices[prices.length - 1] > prices[prices.length - 2]) {
            elem.style.background = "#ff9e9e";
          } else if (prices[prices.length - 1] < prices[prices.length - 2]) {
            elem.style.background = "#9eff98";
          }

          priceElem.insertAdjacentHTML("beforeend", " (".concat((prices[prices.length - 1] / Math.max.apply(Math, _toConsumableArray(prices)) * 100).toFixed(), "%)"));
          Array.from(elem.querySelectorAll('input[type="submit"]')).forEach(function (input) {
            input.classList.add("btn_hover2", "home_button2");
          });

          if (Object(commonUtils["g" /* get */])("hide_rogues_event_enemies", true)) {
            drawChart(prices, index, elem);
          }
        });
      }, false);
    };

    if (Object(commonUtils["g" /* get */])("hide_rogues_event_enemies", true)) {
      var newScript = document.createElement('script');
      newScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/apexcharts');
      document.head.appendChild(newScript);

      newScript.onload = function () {
        showPriceChange();
      };
    } else {
      showPriceChange();
    }
  }

  function interceptButtons() {
    var buttons = Array.from(document.querySelectorAll("#close-image"));

    if (buttons.length === 2) {
      var available = 2 - buttons.filter(function (x) {
        return x.disabled;
      }).length;
      buttons.forEach(function (button, index) {
        button.addEventListener("click", function () {
          Object(commonUtils["m" /* set */])("event_battle_side", index % 2);
          Object(commonUtils["m" /* set */])("eh_current_level", [Object(eventUtils["getCurrentLevel"])(), available]);
        });
      });
    }
  }
}
// CONCATENATED MODULE: ./src/events/pirate.js




function pirateEvent() {
  if (location.href.includes("pirate_event.")) {
    var trs = document.querySelectorAll("#tableDiv")[2].querySelector("table > tbody").childNodes;
    var items = [];

    for (var i = 1; i < trs.length; i++) {
      var item_info = {};
      item_info.name = trs[i].querySelector("td:nth-child(1) > img").src;
      item_info.weight = trs[i].querySelector("td:nth-child(2)").innerText - 0;
      item_info.buy_price = trs[i].querySelector("td:nth-child(3) table > tbody > tr > td:nth-child(2)").innerText.replace(/,/g, "") - 0;
      item_info.sell_price = trs[i].querySelector("td:nth-child(4) table > tbody > tr > td:nth-child(2)").innerText.replace(/,/g, "") - 0;
      item_info.buy_form = trs[i].querySelector("td:nth-child(5)").innerHTML;
      item_info.opt_price = (item_info.sell_price - item_info.buy_price) / item_info.weight;

      if (item_info.buy_form.toString().length > 100) {
        items.push(item_info);
      }
    }

    items = Object(commonUtils["n" /* sortByKey */])(items, "opt_price").reverse();
    var template = getPirateEventTemplate(items);
    var target_td = document.querySelectorAll("#tableDiv")[2];
    target_td.removeChild(target_td.childNodes[0]);
    target_td.insertAdjacentHTML("beforeend", template);
  }

  function getPirateEventTemplate(items) {
    var final_str = "\n                <style>\n                    .items-container {\n                        display: flex;\n                        flex-direction: column;\n                    }\n                    .items-row {\n                        display: flex;\n                    }\n                    .item-itself {\n                        display: flex;\n                        justify-content: center;\n                        align-items: center;\n                    }\n                    .item-itself:nth-child(1) {\n                        width: 15%;\n                    }\n                    .item-itself:nth-child(2) {\n                        width: 20%;\n                    }\n                    .item-itself:nth-child(3) {\n                        width: 11%;\n                    }\n                    .item-itself:nth-child(4) {\n                        width: 27%;\n                    }\n                    .item-itself:nth-child(5) {\n                        width: 27%;\n                    }\n    \n                </style>\n                <div class=\"items-container\">\n                    <div class=\"items-row\">\n                        <div class=\"item-itself\">\u0422\u043E\u0432\u0430\u0440</div>\n                        <div class=\"item-itself\">\u041F\u0440\u0438\u0431\u044B\u043B\u044C</div>\n                        <div class=\"item-itself\">\u0412\u0435\u0441</div>\n                        <div class=\"item-itself\">\u0426\u0435\u043D\u044B</div>\n                        <div class=\"item-itself\">\u041A\u0443\u043F\u0438\u0442\u044C</div>\n                    </div>";
    items.forEach(function (item) {
      final_str += "\n                    <div class=\"items-row\">\n                        <div class=\"item-itself\"><img src=\"".concat(item.name, "\" height=\"48\" alt=\"icon\"></div>\n                        <div class=\"item-itself\">").concat(item.opt_price.toFixed(2), "</div>\n                        <div class=\"item-itself\">").concat(item.weight, "</div>\n                        <div class=\"item-itself\">").concat(item.buy_price, "->").concat(item.sell_price, "</div>\n                        <div class=\"item-itself\">").concat(item.buy_form.toString().replaceAll("Погрузить", "Купить"), "</div>\n                    </div>");
    });
    return final_str + "</div>";
  }

  if (location.href.includes("pirate_self_event.")) {
    Object(leaderboard["setLeaderboard"])(Array.from(document.querySelectorAll('table[width="100%"][align="left"]')).slice(-1)[0].previousElementSibling);
  }

  if (location.href.includes("pirate_land")) {
    document.querySelector("input[type=submit]").click();
  }

  if (location.href.includes("pirate_self_event_set")) {
    Object(settings["eventHelperSettings"])(document.querySelector(".pirate_self_top_block"), function (container) {
      Object(settings["setSettings"])("hide_solo_pirate_event_enemies", "Показывать статистику цен", container, false);
    }, "beforeend");

    if (Object(commonUtils["g" /* get */])("hide_solo_pirate_event_enemies", true)) {
      var newScript = document.createElement('script');
      newScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/apexcharts');
      document.head.appendChild(newScript);

      newScript.onload = function () {
        document.querySelector("#global_table_div2").style.overflow = "auto";
        document.querySelector("#global_table_div2").style.overflowX = "hidden";
        document.querySelector("#global_table_div2").style.maxHeight = "60vh";
        Object(networkUtils["a" /* doGet */])("getSoloPirateCreaturesPrices", function (doc) {
          Array.from(document.getElementsByClassName("pirate_self_table_padding")[1].getElementsByTagName("tr")).filter(function (elem) {
            return elem.innerHTML.includes("cre_creature");
          }).forEach(function (elem, index) {
            var creatureName = elem.innerHTML.match(/name=([a-zA-Z0-9]+)/)[1];
            var prices = doc[creatureName];
            elem.insertAdjacentHTML("afterend", "\n                                    <tr>\n                                        <td colspan=\"3\">\n                                            <div style=\"height: 100px; overflow: hidden\">\n                                                <div id=\"chart".concat(index, "\"></div>\n                                            </div>\n                                        </td>\n                                    </tr>"));
            var options = {
              series: [{
                name: "Price",
                data: prices.map(function (price) {
                  return price - 0;
                })
              }],
              chart: {
                height: 128,
                width: 432,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight',
                width: 2
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'],
                  // takes an array which will be repeated on columns
                  opacity: 0.5
                }
              },
              xaxis: {
                categories: Array.from(' '.repeat(prices.length))
              },
              yaxis: [{
                labels: {
                  formatter: function formatter(val) {
                    return val.toFixed(0);
                  }
                }
              }]
            };
            var chart = new ApexCharts($("chart".concat(index)), options);
            chart.render();
          });
        }, false);
      };
    }
  }
}
// CONCATENATED MODULE: ./src/events/portalCouple.js


function portalCoupleEvent() {
  if (location.href.includes("tj_event2")) {
    Object(leaderboard["setLeaderboard"])(document.querySelectorAll('[width="50%"]')[0]);
    var myEventPosition = parseInt(Array.from(document.querySelectorAll('[width="50%"]')[0].getElementsByTagName("tr")).find(function (elem) {
      return elem.innerHTML.includes(commonUtils["k" /* pl_id */]);
    }).firstElementChild.innerText);
    document.querySelectorAll('[width="400"]')[0].insertAdjacentHTML("beforeend", "<br><b>\u041C\u0435\u0441\u0442\u043E: ".concat(myEventPosition, "</b>"));
  }
}
// CONCATENATED MODULE: ./src/events/portalSolo.js


function portalSoloEvent() {
  var loadStarted = false;
  var maxPages = 50;
  var pageCount = 0;
  var battleCount = 0;

  if (location.href.includes("tj_single")) {
    mainTJSolo();
  }

  function mainTJSolo() {
    Array.from(document.querySelectorAll('center')).slice(-1)[0].insertAdjacentHTML("beforeend", createTJSoloTemplate());
    Object(commonUtils["a" /* $ */])("statbut").addEventListener('click', function () {
      processCollectBattles();
    });
  }

  function createTJSoloTemplate() {
    return "\n                    <div class=\"wrapperStat\">\n                        <div style=\"width: 33%\"><div id=\"statbut\" class=\"home_button2 btn_hover2\">\u041F\u043E\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0431\u043E\u0438 \u0441 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0430\u043C\u0438</div></div>\n                        <div id=\"progress\" class=\"progress\"></div>\n                    </div>\n                ";
  }

  function processCollectBattles() {
    if (!loadStarted) {
      collectBattles();
      loadStarted = true;
      document.getElementById("statbut").innerHTML = "Поиск боев...";
    }
  }

  function collectBattles() {
    if (pageCount < maxPages) {
      Object(networkUtils["b" /* doHWMGet */])("/pl_warlog.php?id=".concat(commonUtils["k" /* pl_id */], "&page=").concat(pageCount), processResponse);
      pageCount++;
    }
  }

  function processResponse(doc) {
    var arr = Array.from(doc.querySelectorAll('.global_a_hover')).slice(-1)[0].innerHTML.toString().split("\n");
    arr = arr.slice(2, 42);

    for (var i = 0; i < arr.length; i++) {
      var currwarid = arr[i].match(/warid=\d{10}/g)[0].match(/\d{10}/g)[0] - 0;

      if (/--117--/.test(arr[i])) {
        if (/<b>/.test(arr[i].split("vs")[1])) {
          continue;
        }

        battleCount++;
        document.getElementById("progress").innerHTML = "Найдено боев: " + battleCount.toString();
      }

      if (currwarid <= 1246241450) {
        var wins = Array.from(document.querySelectorAll('.wbwhite')).slice(-4)[0].querySelector("b:nth-child(6)").textContent - 0;
        document.getElementById("progress").innerHTML = "Найдено боев: " + battleCount.toString() + " Осталось боев:" + (wins * 7 + 20 - battleCount).toString();
        document.getElementById("statbut").innerHTML = "Готово";
        return;
      }
    }

    collectBattles();
  }
}
// CONCATENATED MODULE: ./src/events/ambushOrMapHero.js







function thiefEvent() {
  if (/(ambush_single_event|map_hero_event)/.test(location.href)) {
    Object(commonUtils["m" /* set */])("eh_current_level", null);
    Object(eventUtils["collapseEventDesc"])();
    interceptButtons();
    Object(src_battles["getEventBattles"])(document.querySelectorAll('[align="left"][valign="top"]')[1]);
    Object(leaderboard["setLeaderboard"])(Array.from(document.querySelectorAll('[align="left"][valign="top"]')[0].getElementsByTagName("center")).slice(-1)[0]);
    Object(networkUtils["b" /* doHWMGet */])("/pl_info.php?id=".concat(commonUtils["k" /* pl_id */]), processPlInfoTroopsResponse);
  }

  function interceptButtons() {
    var buttons = Array.from(document.querySelectorAll("#close-image"));

    if (buttons.length === 4) {
      var available = 4 - buttons.filter(function (x) {
        return x.disabled;
      }).length;
      buttons.forEach(function (button, index) {
        button.addEventListener("click", function () {
          Object(commonUtils["m" /* set */])("event_battle_side", index % 2);
          Object(commonUtils["m" /* set */])("eh_current_level", [Object(eventUtils["getCurrentLevel"])(), available]);
        });
      });
    }
  }

  function processPlInfoTroopsResponse(doc) {
    var creaturesData = [];
    Array.from(doc.getElementsByClassName("cre_creature72")).forEach(function (creature) {
      var creatureInfo = {
        "rarity": "1"
      };

      if (creature.getElementsByTagName('img')[0].src.includes("empty")) {
        return;
      }

      creatureInfo.portrait = creature.getElementsByTagName('img')[0].src.match(/portraits\/(\w+)_?anip40/)[1] + "ani";
      creatureInfo.amount = creature.getElementsByClassName('cre_amount72')[0].innerText;
      creaturesData.push(creatureInfo);
    });
    showAmbushCreatures(creaturesData);
  }

  function showAmbushCreatures(creaturesData) {
    var creaturesMultiplier = document.querySelector(" div.TextBlock.TextBlockTOP > div > table > tbody > tr:nth-child(3) > td:nth-child(8) > b").innerText;
    creaturesMultiplier = creaturesMultiplier.match(/\d{1,3}/)[0] - 0;
    document.querySelector('.Global').insertAdjacentHTML("afterend", "\n                <div id=\"ambush-creatures\" style=\"display: flex; flex-direction: column; align-items: center\">\n                    <div>\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0443\u0449\u0435\u0441\u0442\u0432 (\u0441 \u0443\u0447\u0435\u0442\u043E\u043C \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 % \u0447\u0438\u0441\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u0438)</div><div id=\"current-ambush-creatures\"></div><br>\n                    <div>\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0443\u0449\u0435\u0441\u0442\u0432 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 +<input type=\"text\" id=\"your-creatures-multiplier\" style=\"width: 30px;\" value=\"1\">% <div class=\"btn-gradient blue\" id=\"add_percent\">+1%</div></div>\n                    <div id=\"future-ambush-creatures\"></div><br>\n                </div>");
    Object(commonUtils["a" /* $ */])("add_percent").addEventListener("click", function () {
      var currentMultiplierElement = Object(commonUtils["a" /* $ */])("your-creatures-multiplier");
      var currentMultiplier = currentMultiplierElement.value - 0;
      currentMultiplierElement.value = currentMultiplier + 1;
      applyMultiplier(creaturesData, creaturesMultiplier);
    });
    creaturesData.forEach(function (creature) {
      var defaultAmount = creature.amount;
      Object(commonUtils["a" /* $ */])("current-ambush-creatures").insertAdjacentHTML("beforeend", Object(templates["a" /* getNewCreatureIcon */])(creature.portrait, Math.round(defaultAmount * (1 + 0.01 * creaturesMultiplier))));
      Object(commonUtils["a" /* $ */])("future-ambush-creatures").insertAdjacentHTML("beforeend", Object(templates["a" /* getNewCreatureIcon */])(creature.portrait, Math.round(defaultAmount * (1 + 0.01 * (creaturesMultiplier + 1)))));
    });
    Object(commonUtils["a" /* $ */])("your-creatures-multiplier").addEventListener('input', function () {
      applyMultiplier(creaturesData, creaturesMultiplier);
    });
    Object(settings["eventHelperSettings"])(document.querySelector('.Global'), function (container) {
      Object(settings["setSettings"])("auto_send_ffa_event", "Отправлять бои из КБО ивента в сервис автоматически", container);
      Object(settings["setSettings"])("collapse_event_desc", "Всегда сворачивать описания боев", container, false);
      Object(settings["setSettings"])("return_to_prev_level", "Возвращать на незавершенный уровень", container, false);
    }, "afterend");
  }

  function applyMultiplier(creaturesData, creaturesMultiplier) {
    Object(commonUtils["a" /* $ */])("future-ambush-creatures").innerHTML = "";
    var newMultiplier = Object(commonUtils["a" /* $ */])("your-creatures-multiplier").value - 0;
    creaturesData.forEach(function (creature) {
      Object(commonUtils["a" /* $ */])("future-ambush-creatures").insertAdjacentHTML("beforeend", Object(templates["a" /* getNewCreatureIcon */])(creature.portrait, Math.round(creature.amount * (1 + 0.01 * (creaturesMultiplier + newMultiplier)))));
    });
  }
}
// CONCATENATED MODULE: ./src/events/hunt.js




function huntEvent() {
  var battles = [];
  var currentHeroFaction;
  var classCounter = 0;
  var result = "";
  var isForStat = true;

  if (location.href.includes("hunting_event")) {
    Object(settings["setSettings"])("auto_send_hunt_event_battles", "Отправлять бои из сезона охоты в сервис автоматически", Array.from(document.querySelectorAll("td[valign=\"top\"][align=\"center\"]")).slice(-1)[0]);
    Array.from(document.querySelectorAll("td[width=\"300\"]")).slice(-1)[0].insertAdjacentHTML("beforeend", "<div style=\"max-width: 240px\">\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0440\u0438\u043F\u0442\u0430 <a href=\"/pl_info.php?id=7197821\"><b>\u0413\u0440\u043E\u0437\u0430_\u0413\u0412\u0414</b></a> \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0434 \u043F\u043E\u0434\u0430\u0440\u043A\u0443 \u0432 \u0432\u0438\u0434\u0435 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u0430 \u043B\u0435\u0441\u0430 \uD83D\uDE0A</div>");
    mainHuntEvent();
    getCurrentFaction();
    var huntlvlinfo = localStorage.getItem('huntlvl' + Object(eventUtils["getCurrentLevel"])());

    if (huntlvlinfo) {
      result = huntlvlinfo;
      updateHuntStatBody();
      setShowExampleListeners();
      commonUtils["b" /* allClasses */].forEach(function (clazz) {
        document.getElementById("fc".concat(clazz[0], "-").concat(clazz[2])).getElementsByTagName("img")[0].addEventListener("click", function () {
          isForStat = false;
          changeFactionAndClass(clazz[4]);
        });
      });
    }
  }

  function setShowExampleListeners() {
    Array.from(document.getElementsByClassName("faction-hunt-data")).forEach(function (enemy, index) {
      var portraits = Object(commonUtils["f" /* findAll */])(/portraits\/([a-zA-Z0-9_-]+)p33/, enemy.innerHTML).map(function (item) {
        return item[1];
      });
      var amounts = Array.from(enemy.querySelectorAll("#add_now_count")).map(function (elem) {
        return parseInt(elem.innerText);
      });

      if (amounts.length < portraits.length) {
        amounts.unshift(1);
      }

      portraits.sort(function (a, b) {
        return a.localeCompare(b);
      });
      amounts.sort(function (a, b) {
        return a - b;
      });
      enemy.insertAdjacentHTML("beforeend", "\n                <div style=\"margin: 10px\"><div id=\"load_examples_".concat(index, "\" class=\"home_button2 btn_hover2\" style=\"padding: 2px 4px\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440\u044B</div></div>\n                "));
      Object(commonUtils["a" /* $ */])("load_examples_".concat(index)).addEventListener("click", function (e) {
        e.target.remove();
        var request = [portraits.join("|"), amounts.join("|")].join("~");
        var dlgUrl = "getFactionEventBattles?enemy_id=".concat(encodeURIComponent(request), "&token=").concat(Object(commonUtils["g" /* get */])("hwm_events_token", ""));
        Object(networkUtils["a" /* doGet */])(dlgUrl, function (doc) {
          battles = doc;
          processFactionEventBattles(enemy);
        }, false);
      });
    });
  }

  function processFactionEventBattles() {
    var where = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    where.insertAdjacentHTML("afterend", "<div>".concat(getBattlesTemplate(battles), "</div>"));
  }

  function getBattlesTemplate(battles) {
    var result = "";
    result += "<div style=\"text-align: center; font-size: 14px; margin-top: 10px\"><b>\u0422\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C</b></div>";
    var my_lvl_battles = battles.filter(function (battle) {
      return battle["hero_lvl"] === commonUtils["l" /* pl_lvl */];
    });
    result += factionBattlesToHTML(my_lvl_battles);
    result += "<div style=\"text-align: center; font-size: 14px\"><b>\u0414\u0440\u0443\u0433\u0438\u0435 \u0443\u0440\u043E\u0432\u043D\u0438</b></div>";
    var not_my_lvl_battles = battles.filter(function (battle) {
      return battle["hero_lvl"] !== commonUtils["l" /* pl_lvl */];
    });
    result += factionBattlesToHTML(not_my_lvl_battles);
    return result;
  }

  function factionBattlesToHTML(battles) {
    if (battles.length > 0) {
      battles.sort(function (a, b) {
        return a.nickname.localeCompare(b.nickname);
      });
      return battles.reduce(function (prev, curr, index) {
        return prev + "\n                            <div style=\"display: flex; justify-content: center; padding: 1px;\">\n                                <div>".concat(index + 1, ".\xA0</div>\n                                <div style=\"text-align: center\"> ").concat(curr["nickname"], " [").concat(curr["hero_lvl"], "]</div>\n                                <div>\xA0<a target=\"_blank\" href=\"/warlog.php?warid=").concat(curr["battle_id"], "&show_for_all=").concat(curr["battle_secret"], "\">\u0411\u043E\u0439</a></div>\n                                <div>\xA0\xA0(").concat(curr["enemy_id"].split("~")[1], ")</div>\n                            </div>\n                        ");
      }, "");
    } else {
      return "<div style=\"text-align: center;\"><b>\u043F\u0443\u0441\u0442\u043E</b></div>";
    }
  }

  function getCurrentFaction() {
    Object(networkUtils["b" /* doHWMGet */])("/pl_info.php?id=".concat(commonUtils["k" /* pl_id */]), processPlInfoResponse);
  }

  function mainHuntEvent() {
    Array.from(document.getElementsByClassName("Global")).slice(-1)[0].insertAdjacentHTML("afterend", createHuntTemplate());
    Object(commonUtils["a" /* $ */])("statbut").addEventListener('click', function () {
      processCollectHunts();
    });
  }

  function createHuntTemplate() {
    return "\n                    <div class=\"wrapper\">\n                        <div style=\"width: 75%\">\n                            <div class=\"wrapperStat\">\n                                <div><button id=\"statbut\" class=\"home_button2 btn_hover2\">\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0445\u043E\u0442\u044B<br>\u0434\u0440\u0443\u0433\u0438\u0445 \u043A\u043B\u0430\u0441\u0441\u043E\u0432</button></div>\n                                <div id=\"progress\" class=\"progress\"></div>\n                            </div>\n                            <div id=\"statbody\">\n                            </div>\n                        </div>\n                    </div>\n                ";
  }

  function processPlInfoResponse(doc) {
    var factionImg = null;
    Array.from(doc.getElementsByTagName("img")).forEach(function (img) {
      if (img.src.includes("i/f/")) {
        factionImg = img.src;
      }
    });
    setCurrentFactionAndClass(factionImg);
  }

  function setCurrentFactionAndClass(imgLink) {
    for (var i = 0; i < commonUtils["b" /* allClasses */].length; i++) {
      if (imgLink.indexOf(commonUtils["b" /* allClasses */][i][3]) > 0) {
        currentHeroFaction = commonUtils["b" /* allClasses */][i][4];
        break;
      }
    }
  }

  function getFactionName(fr) {
    for (var i = 0; i < commonUtils["b" /* allClasses */].length; i++) {
      if (commonUtils["b" /* allClasses */][i][4] === fr) {
        return commonUtils["b" /* allClasses */][i][1];
      }
    }
  }

  function changeFactionAndClass(fr) {
    Object(networkUtils["b" /* doHWMGet */])("/castle.php?change_clr_to=".concat(fr, "&sign=").concat(commonUtils["j" /* my_sign */]), function () {
      if (isForStat) {
        Object(networkUtils["b" /* doHWMGet */])("/hunting_event.php?sel_level=".concat(Object(eventUtils["getCurrentLevel"])()), processHuntResponse);
      } else {
        setTimeout(function () {
          location.reload();
        }, 300);
      }
    });
  }

  function processCollectHunts() {
    result = '';
    getClassHuntData();
  }

  function getClassHuntData() {
    if (classCounter === commonUtils["b" /* allClasses */].length) {
      classCounter = 0;
      document.getElementById("statbut").innerHTML = "Done";
      isForStat = false;
      localStorage.setItem('huntlvl' + Object(eventUtils["getCurrentLevel"])(), result);
      changeFactionAndClass(currentHeroFaction);
      return;
    }

    document.getElementById("statbut").innerHTML = "Processing...";
    document.getElementById("progress").innerHTML = "Текущая фракция - " + getFactionName(commonUtils["b" /* allClasses */][classCounter][4]);
    changeFactionAndClass(commonUtils["b" /* allClasses */][classCounter][4]);
  }

  function processHuntResponse(doc) {
    result += "<div class=\"faction-hunt-data\">\n                <div class=\"cre_creature\" id=\"fc".concat(commonUtils["b" /* allClasses */][classCounter][0], "-").concat(commonUtils["b" /* allClasses */][classCounter][2], "\">\n                <img style=\"padding: 10px 0; cursor:pointer;\" src=\"https://").concat(commonUtils["d" /* cdnHost */], "/i/f/").concat(commonUtils["b" /* allClasses */][classCounter][3], "?v=1.1\" alt=\"\">\n                </div>") + Array.from(Array.from(doc.querySelectorAll("table[border=\"0\"][cellspacing=\"0\"][cellpadding=\"0\"]")).slice(-1)[0].querySelectorAll("div.cre_creature")).reduce(function (result, current) {
      return result + current.outerHTML;
    }, "") + "</div><br>";
    updateHuntStatBody();
    window.scrollTo(0, document.body.scrollHeight);
    classCounter++;
    getClassHuntData();
  }

  function updateHuntStatBody() {
    document.getElementById("statbody").innerHTML = result;
  }
}
// CONCATENATED MODULE: ./src/events/customIns.js

function customIns_customInsertion() {
  if (location.href.includes("war.") && (Object(commonUtils["g" /* get */])("pirate_hunt_custom_ins", false) || Object(commonUtils["g" /* get */])("village_custom_ins", false))) {
    var waitForBattleLoad = function waitForBattleLoad() {
      if (!stage[war_scr].setted_atb) {
        return;
      } else {
        window.clearInterval(loadId);
      }

      if (btype === 115 || btype === 119) {
        var _customInsertion = Object(commonUtils["g" /* get */])("insertionData_".concat(btype), null);

        createSaveInsButton();

        if (_customInsertion) {
          if (Object(commonUtils["g" /* get */])("custom_ins_auto", false)) {
            makeIns(_customInsertion);
          } else {
            createMakeInsButton(_customInsertion);
          }
        }

        startId = setInterval(waitForBattleStart, 200);
      }
    };

    var waitForBattleStart = function waitForBattleStart() {
      if (lastturn > -1) {
        window.clearInterval(startId);
        removeSaveInsButton();
        removeMakeInsButton();
      }
    };

    var createMakeInsButton = function createMakeInsButton(customInsertion) {
      Object(commonUtils["a" /* $ */])("right_button").insertAdjacentHTML("beforeend", "\n                        <div id=\"custom_make_ins\" class=\"toolbars_img\" style=\"width: 47px;\"><img src=\"https://".concat(commonUtils["d" /* cdnHost */], "/i/combat/btn_autoalignment.png?v=6\" alt=\"\"></div>\n                    "));
      Object(commonUtils["a" /* $ */])("custom_make_ins").addEventListener("click", function () {
        makeIns(customInsertion);
      });
    };

    var makeIns = function makeIns(customInsertion) {
      var currentCreatures = stekid.slice(1, stackcount + 1).filter(function (cre) {
        return cre !== 0;
      });
      var filteredInsertion = customInsertion.filter(function (cre) {
        return currentCreatures.includes(cre[0]);
      });
      currentCreatures.forEach(function (cre, index) {
        if (!filteredInsertion.some(function (customInsCre) {
          return customInsCre[0] === cre;
        })) {
          filteredInsertion.push([cre, steknumber[index + 1], 1, 1]);
        }
      });
      var insStr = filteredInsertion.map(function (cre) {
        return cre.join("#");
      }).join("^") + "^";
      stage[war_scr].useinsertion_cre(insStr);
      removeMakeInsButton();
    };

    var createSaveInsButton = function createSaveInsButton() {
      Object(commonUtils["a" /* $ */])("right_button").insertAdjacentHTML("beforeend", "\n                <div id=\"custom_save_ins\" class=\"toolbars_img\" style=\"width: 47px; border-radius: 50%; background: #dcc287;\"><img src=\"https://i.imgur.com/08mNun9.png\" alt=\"\"></div>\n            ");
      Object(commonUtils["a" /* $ */])("custom_save_ins").addEventListener("click", function () {
        var insertionData = [];

        for (var i = 1; i <= stackcount; i++) {
          if (stekx[i] !== -10 && steknumber[i] > 0 && steknumber[i] !== undefined && stekid[i] !== 0 && stekid[i] !== undefined) {
            insertionData.push([stekid[i], stage[war_scr].obj[i].nownumber, stekx[i], steky[i]]);
          }
        }

        Object(commonUtils["m" /* set */])("insertionData_".concat(btype), insertionData);
        Object(commonUtils["a" /* $ */])("custom_save_ins").innerHTML = "<img src=\"https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-512.png\" alt=\"\"></div>";
        setTimeout(function () {
          Object(commonUtils["a" /* $ */])("custom_save_ins").innerHTML = "<img src=\"https://i.imgur.com/08mNun9.png\" alt=\"\"></div>";
        }, 1000);
      });
    };

    var removeSaveInsButton = function removeSaveInsButton() {
      var button = Object(commonUtils["a" /* $ */])("custom_save_ins");

      if (button) {
        button.remove();
      }
    };

    var removeMakeInsButton = function removeMakeInsButton() {
      var button = Object(commonUtils["a" /* $ */])("custom_make_ins");

      if (button) {
        button.remove();
      }
    };

    var loadId = setInterval(waitForBattleLoad, 200);
    var startId;
  }
}
// CONCATENATED MODULE: ./src/events/pirateHunt.js


function pirateHuntEvent() {
  if (location.href.includes("pirate_hunt")) {
    Object(settings["eventHelperSettings"])(document.querySelectorAll("td[align=left][valign=top]")[0], function (container) {
      Object(settings["setSettings"])("pirate_hunt_event_filter", "Только с напарником", container);
      Object(settings["setSettings"])("pirate_hunt_custom_ins", "Возможность автоматической расстановки", container, false);
      Object(settings["setSettings"])("custom_ins_auto", "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0442\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u0443\u044E \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0443", container, false);
    }, "beforeend");
    var partner = Object(commonUtils["g" /* get */])("partners", null);

    if (Object(commonUtils["g" /* get */])("pirate_hunt_event_filter", true) && partner != null) {
      print_friends();
      Array.from(Array.from(document.querySelectorAll("select")).slice(-1)[0].getElementsByTagName("option")).forEach(function (options) {
        if (options.value === partner) {
          options.selected = true;
        }
      });
      var inputs = Array.from(document.querySelectorAll("input[type=submit]")).slice(-3);
      inputs[0].disabled = true;
      inputs[2].disabled = true;
      Array.from(Array.from(document.querySelectorAll('table[width="100%"][border="0"]')).slice(-3, -2)[0].getElementsByTagName("tr")).forEach(function (tr) {
        if (!tr.innerHTML.includes(partner) && (tr.innerText.includes("[Вступить]") || tr.innerText.includes("[Вступить к клану]"))) {
          tr.remove();
        }
      });
    }
  }
}
// CONCATENATED MODULE: ./src/events/player.js

function processHeroPage() {
  var partners = Object(commonUtils["g" /* get */])("partners", null);

  if (location.href.includes("pl_info")) {
    var target = document.querySelectorAll("td[align=right]")[1].parentElement;
    var heroId = new URLSearchParams(window.location.search).get("id");
    target.insertAdjacentHTML('afterend', "<tr><td id=\"partner-target\" colspan=\"2\" style=\"text-align: center;\"></td></tr>");

    if (!partners || partners !== heroId) {
      setPartner(heroId);
    } else {
      removePartner(heroId);
    }
  }

  function setPartner(heroId) {
    Object(commonUtils["a" /* $ */])('partner-target').innerHTML = "\xA0\xA0<span id=\"partner-1\" style=\"cursor: pointer; text-decoration: underline\">\u041F\u043E\u043C\u0435\u0442\u0438\u0442\u044C \u043D\u0430\u043F\u0430\u0440\u043D\u0438\u043A\u043E\u043C</span>";
    Object(commonUtils["a" /* $ */])('partner-1').addEventListener('click', function () {
      partners = heroId;
      Object(commonUtils["m" /* set */])('partners', partners);
      removePartner(heroId);
    });
  }

  function removePartner(heroId) {
    Object(commonUtils["a" /* $ */])('partner-target').innerHTML = "\xA0\xA0<span id=\"partner-1\" style=\"cursor: pointer; text-decoration: underline\">\u0423\u0431\u0440\u0430\u0442\u044C \u0438\u0437 \u043D\u0430\u043F\u0430\u0440\u043D\u0438\u043A\u043E\u0432</span>";
    Object(commonUtils["a" /* $ */])('partner-1').addEventListener('click', function () {
      partners = null;
      Object(commonUtils["m" /* set */])('partners', partners);
      setPartner(heroId);
    });
  }
}
// CONCATENATED MODULE: ./src/events/war.js



function processBattlePage() {
  if (location.href.includes("war.php") && (Object(commonUtils["g" /* get */])("auto_send_lg", true) || Object(commonUtils["g" /* get */])("auto_send_event_lg", true) || Object(commonUtils["g" /* get */])("auto_send_ffa_event", true) || Object(commonUtils["g" /* get */])("auto_send_faction_event_battles", true) || Object(commonUtils["g" /* get */])("auto_send_rogues_event", true) || Object(commonUtils["g" /* get */])("auto_send_hunt_event_battles", true))) {
    var battleData = unsafeWindow.run_all.toString();
    var battleType = battleData.match(/btype\|(\d{1,10})/)[1];

    if (["133", "135", "138", "139", "140", "142", "143", "144", "148"].includes(battleType)) {
      var main = function main() {
        if (typeof finished !== "undefined" && finished || typeof battle_ended !== "undefined" && battle_ended) {
          window.clearInterval(startId);

          if (Object(commonUtils["g" /* get */])("return_to_prev_level")) {
            var eh_current_level = Object(commonUtils["g" /* get */])("eh_current_level");

            if (eh_current_level) {
              var leaveBattleButton = $("btn_continue_WatchBattle");
              leaveBattleButton.removeEventListener("mouseup", btn_continue_WatchBattle_onRelease);
              leaveBattleButton.addEventListener("mouseup", function () {
                if (eh_current_level[1] === 2 && eh_current_level[0] < 51) {
                  location.href = "".concat(document.referrer.split("?")[0], "?sel_level=").concat(eh_current_level[0]);
                } else {
                  location.href = "".concat(document.referrer.split("?")[0]);
                }
              });
            }
          }

          if (battleType === "135" && Object(commonUtils["g" /* get */])("auto_send_lg", true)) {
            Object(src_battles["sendBattle"])(battle_id, battle_secret, "0");
          } else if ((battleType === "142" || battleType === "143" || battleType === "138" || battleType === "148") && Object(commonUtils["g" /* get */])("auto_send_ffa_event", true)) {
            var battle_side = Object(commonUtils["g" /* get */])("event_battle_side", -1);
            Object(commonUtils["m" /* set */])("event_battle_side", -1);
            Object(src_battles["sendBattle"])(battle_id, battle_secret, "2", null, battle_side);
          } else if (battleType === "139" && Object(commonUtils["g" /* get */])("auto_send_event_lg", true)) {
            Object(src_battles["sendBattle"])(battle_id, battle_secret, "1");
          } else if (battleType === "144" && Object(commonUtils["g" /* get */])("auto_send_faction_event_battles", true) || battleType === "140" && Object(commonUtils["g" /* get */])("auto_send_hunt_event_battles", true)) {
            Object(src_battles["sendBattle"])(battle_id, battle_secret, "3");
          } else if (battleType === "133" && Object(commonUtils["g" /* get */])("auto_send_rogues_event", true)) {
            var _battle_side = Object(commonUtils["g" /* get */])("event_battle_side", -1);

            Object(commonUtils["m" /* set */])("event_battle_side", -1);
            Object(src_battles["sendBattle"])(battle_id, battle_secret, "4", null, _battle_side);
          }
        }
      };

      var battle_id = new URLSearchParams(window.location.search).get("warid");
      var battle_secret = new URLSearchParams(window.location.search).get("show_for_all");

      if (battle_secret == null) {
        Object(networkUtils["b" /* doHWMGet */])("/pl_info.php?id=".concat(commonUtils["k" /* pl_id */]), function (doc) {
          var match = doc.body.innerHTML.match(/show_for_all=(\w[0-9a-f]{10})/);

          if (match) {
            battle_secret = match[1];
          }
        });
      }

      var startId;
      startId = setInterval(main, 10);
    }
  }
}
// CONCATENATED MODULE: ./src/events/warLog.js



function processBattleLogPage() {
  unsafeWindow.sendBattle = src_battles["sendBattle"];

  if (location.href.includes("pl_warlog.php?id=".concat(commonUtils["k" /* pl_id */]))) {
    Object(settings["eventHelperSettings"])(document.querySelector("[class=\"global_container_block\"]"), function (container) {
      Object(settings["setSettings"])("only_clan_visibility", "Мои бои доступны только для клана", container, false);
      Object(settings["setSettings"])("auto_send_rogues_event", "Отправлять бои из разбойничьего ивента в сервис автоматически", container);
      Object(settings["setSettings"])("auto_send_ffa_event", "Отправлять бои из КБО ивента в сервис автоматически", container);
      Object(settings["setSettings"])("auto_send_event_lg", "Отправлять бои из ГЛ ивента в сервис автоматически", container);
      Object(settings["setSettings"])("auto_send_lg", "Отправлять бои с опасными бандитами в сервис автоматически", container);
      Object(settings["setSettings"])("auto_send_faction_event_battles", "Отправлять бои из фрак. ивента в сервис автоматически", container);
      Object(settings["setSettings"])("auto_send_hunt_event_battles", "Отправлять бои из сезона охоты в сервис автоматически", container);
    });
    Array.from(document.getElementsByTagName("i")).forEach(function (tag, index) {
      var type;
      var isOk;

      if (tag.innerText === "Опасные бандиты" || tag.innerText === "Dangerous bandits") {
        type = "0";
        isOk = true;
      }

      if (tag.innerText.includes("Враждебный отряд") || tag.innerText.includes("Hostile squad")) {
        type = "1";
        isOk = true;
      }

      if (tag.innerText.includes("Похитители зимы") || tag.innerText.includes("Snatchers of winter") || tag.innerText.includes("Военная экспедиция") || tag.innerText.includes("Military expedition") || tag.innerText.includes("Бандиты пустошей") || tag.innerText.includes("Обитатели пустошей") || tag.innerText.includes("Wasteland bandits") || tag.innerText.includes("Wasteland dwellers") || tag.innerText.includes("Контрабандисты") || tag.innerText.includes("Smugglers")) {
        type = "2";
        isOk = true;
      }

      if (tag.innerText.includes("Отряды бандитов") || tag.innerText.includes("Bandits squads") || tag.innerText.includes("Цель") || tag.innerText.includes("Target")) {
        type = "3";
        isOk = true;
      }

      if (tag.innerText.includes("Отряд врага") || tag.innerText.includes("Enemy squad")) {
        type = "4";
        isOk = true;
      }

      if (isOk) {
        var maxTries = 5;
        var sibling = tag.previousElementSibling;

        for (var i = 0; i < maxTries; i++) {
          if (sibling.tagName === "A" && sibling.href.includes("show_for_all")) {
            var params = new URLSearchParams("?" + sibling.href.split("?")[1]);

            if (!tag.innerHTML.includes("<b>")) {
              tag.insertAdjacentHTML("afterend", "\xA0\xA0<span><a id=\"send_battle_".concat(index, "\" style=\"cursor: pointer; text-decoration: underline\" onclick=\"sendBattle('").concat(params.get("warid"), "', '").concat(params.get("show_for_all"), "', '").concat(type, "', '").concat(index, "')\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432 \u0441\u0435\u0440\u0432\u0438\u0441</a></span>"));
            }

            break;
          } else {
            sibling = sibling.previousElementSibling;
          }
        }
      }
    });
  }
}
// CONCATENATED MODULE: ./src/events/village.js



function villageEvent() {
  if (/(village_def)/.test(location.href)) {
    var villageElem = $("set_mobile_max_width");
    villageElem.style.flexWrap = "nowrap";

    if (Object(commonUtils["g" /* get */])("village_remove_confirm", true)) {
      Array.from(document.querySelectorAll("input[type=submit]")).forEach(function (input) {
        return input.onclick = function () {
          return true;
        };
      });
    }

    if (Object(commonUtils["g" /* get */])("village_auto_repair", false)) {
      Array.from(document.querySelectorAll("input[type=submit]")).forEach(function (input) {
        if (input.value.includes("Восстановить") || input.value.includes("Ремонт")) {
          input.click();
        }
      });
    }

    Object(leaderboard["setLeaderboard"])(document.querySelector('#global_table_div3'), "beforebegin");
    Object(settings["eventHelperSettings"])(document.querySelector('#global_table_div4'), function (container) {
      Object(settings["setSettings"])("village_custom_ins", "\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \n                        <a href='https://www.youtube.com/watch?v=NNwCBnOuoYQ' target='_blank' onclick='event.stopPropagation()'>\u0412\u0438\u0434\u0435\u043E-\u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F</a>\n                        (\u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u043F\u043E\u0441\u043B\u0435 \"\u0437\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F\" \u043A\u0440\u0435\u0441\u0442\u044C\u044F\u043D \u0431\u0430\u0448\u043D\u044F\u043C\u0438)\n                    ", container, false);
      Object(settings["setSettings"])("village_remove_confirm", "\u0423\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u0442\u0440\u043E\u0439\u043A\u0438/\u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0439", container);
      Object(settings["setSettings"])("custom_ins_auto", "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0442\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u0443\u044E \u0440\u0430\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0443", container, false);
      Object(settings["setSettings"])("village_auto_repair", "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0440\u0435\u043C\u043E\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0439\u043A\u0438", container, false);
    }, "afterend");
  }
}
// CONCATENATED MODULE: ./src/index.js



















if (!commonUtils["l" /* pl_lvl */]) {
  Object(networkUtils["b" /* doHWMGet */])("/pl_info.php?id=".concat(commonUtils["k" /* pl_id */]), function (doc) {
    Object(commonUtils["m" /* set */])("hero_combat_lvl", doc.body.innerText.match(/(Боевой уровень|Combat level): (\d{1,2})/)[2] - 0);
    location.reload();
  });
}

if (!commonUtils["j" /* my_sign */]) {
  Object(networkUtils["b" /* doHWMGet */])("/shop.php", function (doc) {
    Object(commonUtils["m" /* set */])("my_sign", doc.body.innerHTML.match(/sign=([a-z0-9]+)/)[1]);
    location.reload();
  });
}

Object(styles["setGlobalStyles"])(); // EVENTS

leaderEvent();
adventureEvent();
factionEvent();
hireEvent();
pirateEvent();
pirateHuntEvent();
portalCoupleEvent();
portalSoloEvent();
thiefEvent();
huntEvent();
villageEvent();
customIns_customInsertion();
processHeroPage();
processBattlePage();
processBattleLogPage();

/***/ })
/******/ ]);