// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetBtn = exports.filterForm = exports.filterMonthInput = exports.filterLastNameInput = exports.addBtn = exports.tbody = void 0;
// Grab elements
var tbody = document.querySelector('tbody');
exports.tbody = tbody;
var addBtn = document.querySelector(".add");
exports.addBtn = addBtn;
var filterLastNameInput = document.querySelector('#filter-lastname');
exports.filterLastNameInput = filterLastNameInput;
var filterMonthInput = document.querySelector('#filter-month');
exports.filterMonthInput = filterMonthInput;
var filterForm = document.querySelector('.filter-person');
exports.filterForm = filterForm;
var resetBtn = document.querySelector('.reset');
exports.resetBtn = resetBtn;
},{}],"lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
exports.destroyPopup = destroyPopup;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function wait() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
} // Async function to destroy popup


function destroyPopup(_x) {
  return _destroyPopup.apply(this, arguments);
}

function _destroyPopup() {
  _destroyPopup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(popup) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            popup.classList.remove('open');
            _context.next = 3;
            return wait(200);

          case 3:
            popup.remove();
            popup = null;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _destroyPopup.apply(this, arguments);
}
},{}],"lib/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nth = nth;

function nth(day) {
  if (day > 3 && day < 21) return 'th';

  switch (day % 10) {
    case 1:
      return "st";

    case 2:
      return "nd";

    case 3:
      return "rd";

    default:
      return "th";
  }
}
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _element = require("./lib/element.js");

var _index = require("./lib/index.js");

var _utils = require("./lib/utils.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var basepoint = './people.json'; // Fetch data from people.json

function fetchPerson() {
  return _fetchPerson.apply(this, arguments);
}

function _fetchPerson() {
  _fetchPerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var response, data, storedHTML, displayList, resetFilters, searchPerson, searchByBirthMonth, editPerson, editPopup, deletePerson, deletePopup, addList, addListPopup, initLocalStorage, updateLocalStorage;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            displayList = function _displayList() {
              var html = storedHTML(data);
              _element.tbody.innerHTML = html;
            };

            _context3.next = 3;
            return fetch(basepoint);

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.json();

          case 6:
            data = _context3.sent;

            storedHTML = function storedHTML(personList) {
              data.sort(function (a, b) {
                if (a === b) {
                  return 0;
                }

                return a.lastName < b.lastName ? -1 : 1;
              });
              data; // Map through the data

              return personList.map(function (person) {
                // Take the birthday date from the data
                var current_datetime = new Date(person.birthday);
                var date = current_datetime.getDate();
                var year = current_datetime.getFullYear();
                var month = current_datetime.getMonth(); // Add 1 to the month so that the array will not start at 0

                var birthMonth = month + 1;
                var day = current_datetime.getDay();
                var fullDate = year + "/" + birthMonth + "/" + date;
                var YearMonth = ["January", "February", "March", "April", "May", "June", "Jolay", "August", "September", "October", "November", "December"][current_datetime.getMonth()]; // Calculate ages based on the birthday year

                var today = new Date();
                var age = today.getFullYear() - year; // Calculate days number between Date.now() and the birthday months and day

                var yearNow = today.getFullYear();
                var birthdayYear = new Date(yearNow, month, date);
                var aDay = 1000 * 60 * 60 * 24;
                var countDay = Math.ceil((birthdayYear.getTime() - today.getTime()) / aDay); // Create table row

                return "<tr data-id=\"".concat(person.id, "\">\n                    <th scope=\"row\"><img src=\"").concat(person.picture, "\" alt=\"").concat(person.firstName + ' ' + person.lastName, "\"/></th>\n                    <td>").concat(person.lastName, "</td>\n                    <td>").concat(person.firstName, "</td>\n                    <td>").concat(fullDate, "</td>\n                    <td>Turns ").concat(age, " on ").concat(YearMonth, " ").concat(date, "<sup>").concat((0, _utils.nth)(date), "</sup></td>\n                    <td> ").concat(countDay < 0 ? countDay * -1 + " " + "day(s) ago" : "after" + " " + countDay + " " + "day(s)", "</td>\n                    <td>\n                        <button type=\"button\" class=\"btn edit\" value=\"").concat(person.id, "\">\n                        <img class=\"icon\" src=\"./img/edit.svg\" alt=\"edit\">\n                        </button>\n                    </td>\n                    <td class=\"text-white\">\n                        <button type=\"button\" class=\"btn delete\" data-id=\"").concat(person.id, "\">\n                        <img class=\"icon\" src=\"./img/delete.svg\" alt=\"delete\">\n                        </button>\n                    </td>\n                </tr>");
              }).join('');
            };

            ;
            displayList();

            resetFilters = function resetFilters(e) {
              _element.filterForm.reset();

              displayList();
            };

            searchPerson = function searchPerson(e) {
              var searchInput = _element.filterLastNameInput.value;
              var lowerCaseFilter = searchInput.toLowerCase(); // Filter the data to get the lastname and turn them into lowercase

              var filterLastName = data.filter(function (person) {
                return person.lastName.toLowerCase().includes(lowerCaseFilter);
              });
              var filterHTML = storedHTML(filterLastName);
              _element.tbody.innerHTML = filterHTML;
            };

            searchByBirthMonth = function searchByBirthMonth(e) {
              var searchMonth = _element.filterMonthInput.value;
              var lowerCaseMonth = searchMonth.toLowerCase(); // Filter the data to get the birthday and turn them into lowercase

              var filterBirthMonth = data.filter(function (person) {
                var birthdayMonth = new Date(person.birthday); // stringify the birthdate

                var stringDate = birthdayMonth.toLocaleString('USA', {
                  month: 'long'
                });
                return stringDate.toLowerCase().includes(lowerCaseMonth);
              });
              var filterMonthHTML = storedHTML(filterBirthMonth);
              _element.tbody.innerHTML = filterMonthHTML;
            }; // Grab the edit button


            editPerson = function editPerson(e) {
              var editBtn = e.target.closest('button.edit');

              if (editBtn) {
                e.preventDefault();
                var findTr = e.target.closest('tr');
                var btn = findTr.querySelector('.edit');
                var id = btn.value;
                editPopup(id); // tbody.dispatchEvent(new CustomEvent('listUpdated'));
              }
            }; // Create an form html to edit the list 


            editPopup = function editPopup(id) {
              console.log(id);
              return new Promise( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                  var person, popup;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          person = data.find(function (person) {
                            return person.id == id;
                          }); // Create form element to edit the list

                          popup = document.createElement("form");
                          popup.classList.add('popup');
                          popup.innerHTML = "\n                <div class=\"form-input\">\n                <fieldset>\n                <label for=\"picture\">Picture</label>\n                <input\n                    type=\"url\"\n                    name=\"picture\"\n                    id=\"picture\"\n                    value\n                    =\"".concat(person.picture, "\"\n                />\n                </fieldset>\n                    <fieldset>\n                        <label for=\"lastName\">Lastname</label>\n                        <input\n                            type=\"text\"\n                            name=\"lastName\"\n                            id=\"lastName\"\n                            value\n                            =\"").concat(person.lastName, "\"\n                        />\n                    </fieldset>\n                    <fieldset>\n                    <label for=\"firstName\">Firstname</label>\n                    <input\n                        type=\"text\"\n                        name=\"firstName\"\n                        id=\"firstName\"\n                        value\n                        =\"").concat(person.firstName, "\"\n                    />\n                    </fieldset>\n                    <fieldset>\n                    <label for=\"birthday\">Birthday</label>\n                    <input\n                        type=\"date\"\n                        name=\"birthday\"\n                        id=\"birthday\"\n                        value\n                        =\"").concat(person.birthday, "\"\n                    />\n                    </fieldset>\n                    <div class=\"button\">\n                    <button type=\"submit\" class=\"save\">Save</button>\n                    <button type=\"button\" class=\"cancel\">Cancel</button>\n                    </div>\n                </div>\n"); // listen to the window and the cancel button

                          window.addEventListener('click', function (e) {
                            if (e.target.closest('button.cancel')) {
                              (0, _index.destroyPopup)(popup);
                            }
                          }); // Listen to the submit button to save the changes

                          popup.addEventListener('submit', function (e) {
                            e.preventDefault();
                            person.picture = popup.picture.value;
                            person.lastName = popup.lastName.value;
                            person.firstName = popup.firstName.value, person.birthday = popup.birthday.value, person.id = popup.id.value, (0, _index.destroyPopup)(popup);
                            displayList(person);

                            _element.tbody.dispatchEvent(new CustomEvent('listUpdated'));
                          }, {
                            once: true
                          });
                          document.body.appendChild(popup);
                          _context.next = 9;
                          return (0, _index.wait)(50);

                        case 9:
                          popup.classList.add('open');

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x, _x2) {
                  return _ref.apply(this, arguments);
                };
              }());
            }; // Find the delete button and the table row


            deletePerson = function deletePerson(e) {
              if (e.target.closest('button.delete')) {
                var tableRow = e.target.closest('tr');
                var id = tableRow.dataset.id;
                deletePopup(id);

                _element.tbody.dispatchEvent(new CustomEvent('listUpdated'));
              }
            };

            deletePopup = function deletePopup(id) {
              // create confirmation popup here
              return new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
                  var modal;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          modal = document.createElement('div');
                          modal.classList.add('modal');
                          modal.innerHTML = "\n                <p class=\"confirm\">Do you want to delete?</p>\n                <div class=\"confirm-btn\">\n                    <button class=\"icon yes\">\n                    <img src=\"./img/yes.svg\" alt=\"yes\">\n                    </buton>\n                    <button class=\"icon no\">\n                    <img src=\"./img/no.svg\" alt=\"no\">\n                    </buton>\n                </div>\n                ";
                          document.body.appendChild(modal);
                          modal.classList.add('open'); // Listen to the yes button and the no button

                          window.addEventListener('click', function (e) {
                            if (e.target.closest('button.yes')) {
                              var personToDelete = data.filter(function (person) {
                                return person.id != id;
                              });
                              data = personToDelete;
                              displayList(personToDelete);
                              (0, _index.destroyPopup)(modal);
                            }
                          });
                          window.addEventListener('click', function (e) {
                            if (e.target.closest('button.no')) {
                              (0, _index.destroyPopup)(modal);
                            }
                          });

                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }());
            };

            addList = function addList(e) {
              if (e.target.closest('button.add')) {
                addListPopup();
              }

              window.addEventListener('click', function (e) {
                if (e.target.closest('button.cancel')) {
                  (0, _index.destroyPopup)(newPopupList);
                }
              });
            };

            addListPopup = function addListPopup(e) {
              var newPopupList = document.createElement("form");
              newPopupList.classList.add('AddListPopup');
              newPopupList.innerHTML = "\n            <div class=\"form-input\">\n            <fieldset>\n            <label for=\"profile\">Picture</label>\n            <input\n                type=\"url\"\n                name=\"profile\"\n                id=\"profile\"\n                value=\"https://bit.ly/3mxlBiG\"\n            />\n            </fieldset>\n                <fieldset>\n                    <label for=\"lastname\">Lastname</label>\n                    <input\n                        type=\"text\"\n                        name=\"lastname\"\n                        id=\"lastname\"\n                        value=\"Manjaka\"\n                    />\n                </fieldset>\n                <fieldset>\n                <label for=\"firstname\">Firstname</label>\n                <input\n                    type=\"text\"\n                    name=\"firstname\"\n                    id=\"firstname\"\n                    value=\"Delancy\"\n                />\n                </fieldset>\n                <fieldset>\n                <label for=\"birthdate\">Birthday</label>\n                <input\n                    type=\"date\"\n                    name=\"birthdate\"\n                    id=\"birthdate\"\n                />\n                </fieldset>\n                <div class=\"button\">\n                <button type=\"submit\" class=\"save\">Save</button>\n                <button type=\"button\" class=\"cancel\">Cancel</button>\n                </div>\n            </div>\n";
              document.body.appendChild(newPopupList);
              newPopupList.classList.add('open');
              newPopupList.addEventListener('submit', function (e) {
                e.preventDefault();
                var form = e.currentTarget;
                var newList = {
                  picture: form.profile.value,
                  lastName: form.lastname.value,
                  firstName: form.firstname.value,
                  birthday: form.birthdate.value,
                  id: Date.now()
                };
                data.push(newList);
                displayList(data);
                (0, _index.destroyPopup)(newPopupList);

                _element.tbody.dispatchEvent(new CustomEvent('listUpdated'));
              });
            };

            initLocalStorage = function initLocalStorage() {
              var dataList = JSON.parse(localStorage.getItem('data'));

              if (dataList) {
                data = dataList;
                displayList();
              }

              _element.tbody.dispatchEvent(new CustomEvent('listUpdated'));
            }; // set the data in the local storage and stringify it


            updateLocalStorage = function updateLocalStorage() {
              localStorage.setItem('data', JSON.stringify(data));
            }; // Envent listners


            _element.tbody.addEventListener('click', editPerson);

            _element.tbody.addEventListener('click', deletePerson);

            _element.addBtn.addEventListener('click', addList);

            _element.tbody.addEventListener('listUpdated', updateLocalStorage);

            _element.filterLastNameInput.addEventListener('input', searchPerson);

            _element.filterMonthInput.addEventListener('input', searchByBirthMonth);

            _element.resetBtn.addEventListener('click', resetFilters);

            initLocalStorage();

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchPerson.apply(this, arguments);
}

fetchPerson();
},{"./lib/element.js":"lib/element.js","./lib/index.js":"lib/index.js","./lib/utils.js":"lib/utils.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58836" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map