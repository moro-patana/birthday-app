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
})({"script.js":[function(require,module,exports) {
const basepoint = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json";

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
} // Grab elements


const birthdayList = document.querySelector('.birthday-list');
const addBtn = document.querySelector(`.add`);
const filterLastNameInput = document.querySelector('#filter-lastname');
const filterMonthInput = document.querySelector('#filter-month');
const filterForm = document.querySelector('.filter-person');
const resetBtn = document.querySelector('.reset'); // Async function to destroy popup

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(200);
  popup.remove();
  popup = null;
} // Fetch data from people.json


async function fetchPerson() {
  const response = await fetch(basepoint);
  let data = await response.json();

  const storedHTML = personList => {
    data.sort((a, b) => {
      if (a === b) {
        return 0;
      }

      return a.lastName < b.lastName ? -1 : 1;
    });
    data; // Map through the data

    return personList.map(person => {
      // Condition to check if the day should take th, st, nd, or rd
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
      } // Take the birthday date from the data


      let current_datetime = new Date(person.birthday);
      let date = current_datetime.getDate();
      let year = current_datetime.getFullYear();
      let month = current_datetime.getMonth(); // Add 1 to the month so that the array will not start at 0

      let birthMonth = month + 1;
      let day = current_datetime.getDay();
      let fullDate = year + "/" + birthMonth + "/" + date;
      let YearMonth = ["January", "February", "March", "April", "May", "June", "Jolay", "August", "September", "October", "November", "December"][current_datetime.getMonth()]; // Calculate ages based on the birthday year

      let today = new Date();
      let age = today.getFullYear() - year; // Calculate days number between Date.now() and the birthday months and day

      let yearNow = today.getFullYear();
      let birthdayYear = new Date(yearNow, month, date);
      let aDay = 1000 * 60 * 60 * 24;
      let countDay = Math.ceil((birthdayYear.getTime() - today.getTime()) / aDay); // Create table row

      return `<article data-id="${person.id}">
                    <img class="profile" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/>
                    <div>
                        <p class="name">${person.lastName} ${person.firstName}</td>
                        <p>Turns <b>${age}</b> on ${YearMonth} ${date}<sup>${nth(date)}</sup></p>
                    </div>
                    <span>${fullDate}</span>
                    <span> ${countDay < 0 ? countDay * -1 + " " + "day(s) ago" : "after" + " " + countDay + " " + "day(s)"}</span>
                    <div>
                        <button type="button" class="btn edit" value="${person.id}">
                        <img class="icon" src="./img/edit.svg" alt="edit">
                        </button>
                    </div>
                    <div class="text-white">
                        <button type="button" class="btn delete" data-id="${person.id}">
                        <img class="icon" src="./img/delete.svg" alt="delete">
                        </button>
                    </div>
                </article>`;
    }).join('');
  };

  function displayList() {
    const html = storedHTML(data);
    birthdayList.innerHTML = html;
  }

  ;
  displayList();

  const resetFilters = e => {
    filterForm.reset();
    displayList();
  };

  const searchPerson = e => {
    const searchInput = filterLastNameInput.value;
    const lowerCaseFilter = searchInput.toLowerCase(); // Filter the data to get the lastname and turn them into lowercase

    const filterLastName = data.filter(person => person.lastName.toLowerCase().includes(lowerCaseFilter));
    const filterHTML = storedHTML(filterLastName);
    birthdayList.innerHTML = filterHTML;
  };

  const searchByBirthMonth = e => {
    const searchMonth = filterMonthInput.value;
    const lowerCaseMonth = searchMonth.toLowerCase(); // Filter the data to get the birthday and turn them into lowercase

    const filterBirthMonth = data.filter(person => {
      const birthdayMonth = new Date(person.birthday); // stringify the birthdate

      const stringDate = birthdayMonth.toLocaleString('USA', {
        month: 'long'
      });
      return stringDate.toLowerCase().includes(lowerCaseMonth);
    });
    const filterMonthHTML = storedHTML(filterBirthMonth);
    birthdayList.innerHTML = filterMonthHTML;
  }; // Grab the edit button


  const editPerson = e => {
    const editBtn = e.target.closest('button.edit');

    if (editBtn) {
      e.preventDefault();
      const findTr = e.target.closest('tr');
      const btn = document.querySelector('.edit');
      const id = btn.value;
      editPopup(id); // tbody.dispatchEvent(new CustomEvent('listUpdated'));
    }
  }; // Create an form html to edit the list 


  const editPopup = id => {
    console.log(id);
    return new Promise(async function (resolve, reject) {
      const person = data.find(person => person.id == id); // Create form element to edit the list

      const popup = document.createElement(`form`);
      popup.classList.add('popup');
      popup.innerHTML = `
                <div class="form-input">
                <fieldset>
                <label for="picture">Picture</label>
                <input
                    type="url"
                    name="picture"
                    id="picture"
                    value
                    ="${person.picture}"
                />
                </fieldset>
                    <fieldset>
                        <label for="lastName">Lastname</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value
                            ="${person.lastName}"
                        />
                    </fieldset>
                    <fieldset>
                    <label for="firstName">Firstname</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value
                        ="${person.firstName}"
                    />
                    </fieldset>
                    <fieldset>
                    <label for="birthday">Birthday</label>
                    <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        value
                        ="${person.birthday}"
                    />
                    </fieldset>
                    <div class="button">
                    <button type="submit" class="save">Save</button>
                    <button type="button" class="cancel">Cancel</button>
                    </div>
                </div>
`; // listen to the window and the cancel button

      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          destroyPopup(popup);
        }
      }); // Listen to the submit button to save the changes

      popup.addEventListener('submit', e => {
        e.preventDefault();
        person.picture = popup.picture.value;
        person.lastName = popup.lastName.value;
        person.firstName = popup.firstName.value, person.birthday = popup.birthday.value, person.id = popup.id.value, destroyPopup(popup);
        displayList(person);
        birthdayList.dispatchEvent(new CustomEvent('listUpdated'));
      }, {
        once: true
      });
      document.body.appendChild(popup);
      await wait(50);
      popup.classList.add('open');
    });
  }; // Find the delete button and the table row


  const deletePerson = e => {
    if (e.target.closest('button.delete')) {
      const article = e.target.closest('article');
      const id = article.dataset.id;
      deletePopup(id);
      birthdayList.dispatchEvent(new CustomEvent('listUpdated'));
    }
  };

  const deletePopup = id => {
    // create confirmation popup here
    return new Promise(async function (resolve) {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
                <div class="delete-popup">
                    <p class="confirm">Do you want to delete?</p>
                    <div class="confirm-btn">
                        <button class="yes">Yes</buton>
                        <button class="no">No</buton>
                    </div>
                </div>
                `;
      document.body.appendChild(modal);
      modal.classList.add('open'); // Listen to the yes button and the no button

      window.addEventListener('click', e => {
        if (e.target.closest('button.yes')) {
          const personToDelete = data.filter(person => person.id != id);
          data = personToDelete;
          displayList(personToDelete);
          destroyPopup(modal);
        }
      });
      window.addEventListener('click', e => {
        if (e.target.closest('button.no')) {
          destroyPopup(modal);
        }
      });
    });
  };

  const addList = e => {
    if (e.target.closest('button.add')) {
      addListPopup();
    }
  };

  const addListPopup = e => {
    const newPopupList = document.createElement(`form`);
    newPopupList.classList.add('AddListPopup');
    newPopupList.innerHTML = `
            <div class="form-input">
            <fieldset>
            <label for="profile">Picture</label>
            <input
                type="url"
                name="profile"
                id="profile"
                value="https://bit.ly/3mxlBiG"
            />
            </fieldset>
                <fieldset>
                    <label for="lastname">Lastname</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value="Manjaka"
                    />
                </fieldset>
                <fieldset>
                <label for="firstname">Firstname</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value="Delancy"
                />
                </fieldset>
                <fieldset>
                <label for="birthdate">Birthday</label>
                <input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                />
                </fieldset>
                <div class="button">
                <button type="submit" class="save">Save</button>
                <button type="button" class="cancel">Cancel</button>
                </div>
            </div>
`;
    window.addEventListener('click', e => {
      if (e.target.closest('button.cancel')) {
        destroyPopup(newPopupList);
      }
    });
    document.body.appendChild(newPopupList);
    newPopupList.classList.add('open');
    newPopupList.addEventListener('submit', e => {
      e.preventDefault();
      const form = e.currentTarget;
      const newList = {
        picture: form.profile.value,
        lastName: form.lastname.value,
        firstName: form.firstname.value,
        birthday: form.birthdate.value,
        id: Date.now()
      };
      data.push(newList);
      displayList(data);
      destroyPopup(newPopupList);
      birthdayList.dispatchEvent(new CustomEvent('listUpdated'));
    });
  };

  const initLocalStorage = () => {
    const dataList = JSON.parse(localStorage.getItem('data'));

    if (dataList) {
      data = dataList;
      displayList();
    }

    birthdayList.dispatchEvent(new CustomEvent('listUpdated'));
  }; // set the data in the local storage and stringify it


  const updateLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(data));
  }; // Envent listners


  birthdayList.addEventListener('click', editPerson);
  birthdayList.addEventListener('click', deletePerson);
  addBtn.addEventListener('click', addList);
  birthdayList.addEventListener('listUpdated', updateLocalStorage);
  filterLastNameInput.addEventListener('input', searchPerson);
  filterMonthInput.addEventListener('input', searchByBirthMonth);
  resetBtn.addEventListener('click', resetFilters);
  initLocalStorage();
}

fetchPerson();
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49345" + '/');

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