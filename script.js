const basepoint = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json";
function wait(ms = 0) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
// Grab elements
const birthdayList = document.querySelector('.birthday-list');
const addBtn = document.querySelector(`.add`);
const filterLastNameInput = document.querySelector('#filter-lastname');
const filterMonthInput = document.querySelector('#filter-month');
const filterForm = document.querySelector('.filter-person');
const resetBtn = document.querySelector('.reset');

// Async function to destroy popup
async function destroyPopup(popup) {
	popup.classList.remove('open');
	await wait(200);
	popup.remove();
	popup = null;
}

// Fetch data from people.json
async function fetchPerson() {
    const response = await fetch(basepoint);
    let data = await response.json();
    const storedHTML = (personList) => {
        data.sort((a, b) => {
            if (a === b) {
              return 0;
            }
            return a.lastName < b.lastName ? -1 : 1;
          });
          data;

// Map through the data
        return personList
        .map(person => {

// Condition to check if the day should take th, st, nd, or rd
                function nth(day) {
                    if (day > 3 && day < 21) return 'th';
                    switch (day % 10) {
                      case 1:  return "st";
                      case 2:  return "nd";
                      case 3:  return "rd";
                      default: return "th";
                    }
                  }
                // Take the birthday date from the data
                  let current_datetime = new Date(person.birthday);
                  let date = current_datetime.getDate();
                  let year = current_datetime.getFullYear();
                  let month = current_datetime.getMonth();
                // Add 1 to the month so that the array will not start at 0
                  let birthMonth = month + 1;
                  let day = current_datetime.getDay();
                  let fullDate = year + "/" + birthMonth + "/" + date;
                  let YearMonth = ["January", "February", "March", "April", "May", "June", "Jolay", "August", "September", "October", "November", "December"][current_datetime.getMonth()];

                // Calculate ages based on the birthday year
                  let today = new Date();
                  let age = today.getFullYear() - year;

                // Calculate days number between Date.now() and the birthday months and day
                  let yearNow = today.getFullYear();
                  let birthdayYear = new Date(yearNow, month, date);
                  let aDay = 1000*60*60*24;
                  let countDay = Math.ceil((birthdayYear.getTime() - today.getTime()) / aDay);
                
                // Create table row
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
                </article>`
                
        })
        .join('');
    }
     function displayList(){
         const html = storedHTML(data);
        birthdayList.innerHTML = html;
    };
    displayList();
    const resetFilters = e => {
        filterForm.reset();
        displayList();
    };

    const searchPerson = (e) => {
        const searchInput = filterLastNameInput.value;
        const lowerCaseFilter = searchInput.toLowerCase();
    // Filter the data to get the lastname and turn them into lowercase
        const filterLastName = data.filter(person => person.lastName.toLowerCase().includes(lowerCaseFilter));
        const filterHTML = storedHTML(filterLastName);
        birthdayList.innerHTML = filterHTML;
    }
    const searchByBirthMonth = (e) => {
        const searchMonth = filterMonthInput.value;
        const lowerCaseMonth = searchMonth.toLowerCase();
    // Filter the data to get the birthday and turn them into lowercase
        const filterBirthMonth = data.filter(person => {
            const birthdayMonth = new Date(person.birthday);
    // stringify the birthdate
            const stringDate = birthdayMonth
            .toLocaleString('USA', { month: 'long' })
            
            return stringDate.toLowerCase().includes(lowerCaseMonth);
        
        })
        
        const filterMonthHTML = storedHTML(filterBirthMonth)
        birthdayList.innerHTML = filterMonthHTML;

    }


// Grab the edit button
    const editPerson = (e) => {
        const editBtn = e.target.closest('button.edit');
        if (editBtn) {
            e.preventDefault();
            const findTr = e.target.closest('tr');
            const btn = document.querySelector('.edit')
            const id = btn.value;
            editPopup(id);
            // tbody.dispatchEvent(new CustomEvent('listUpdated'));
            
        }
    }
    // Create an form html to edit the list 
    const editPopup = (id) => {
        console.log(id);
        return new Promise(async function (resolve, reject) {
            const person = data.find(person => person.id == id);
// Create form element to edit the list
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
`;

            // listen to the window and the cancel button
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(popup);
                    
                }
            })
    
            // Listen to the submit button to save the changes
            popup.addEventListener('submit', (e) => {
                e.preventDefault();
                person.picture = popup.picture.value;
                person.lastName = popup.lastName.value;
                person.firstName = popup.firstName.value,
                person.birthday = popup.birthday.value,
                person.id = popup.id.value,

                destroyPopup(popup);
                displayList(person);
                birthdayList.dispatchEvent(new CustomEvent('listUpdated'));

            },
                { once: true }
            )
            document.body.appendChild(popup);
            await wait(50);
            popup.classList.add('open');
        })
    }
// Find the delete button and the table row
    const deletePerson = (e) => {
        if (e.target.closest('button.delete')) {
          const article = e.target.closest('article');
          const id = article.dataset.id;
          deletePopup(id);
          birthdayList.dispatchEvent(new CustomEvent('listUpdated'));
          
        }

    };
    
    
const deletePopup = (id) => {
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
                modal.classList.add('open');
// Listen to the yes button and the no button
                window.addEventListener('click', (e) => {
                    if (e.target.closest('button.yes')) {
                        const personToDelete = data.filter(person => person.id != id);
                        data = personToDelete;
                        displayList(personToDelete);
                        destroyPopup(modal);
                    }
                })
                window.addEventListener('click', e => {
                    if (e.target.closest('button.no')) {
                        destroyPopup(modal);
                    }
                })
    
        });

        }
    const addList = (e) => {
        if (e.target.closest('button.add')) {
            addListPopup();
        }
        window.addEventListener('click', e => {
            if (e.target.closest('button.cancel')) {
                destroyPopup(newPopupList);
            }
        })
        
    }
    const addListPopup = (e) => {
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
        id: Date.now(),
    }
    data.push(newList);
    displayList(data);
    destroyPopup(newPopupList);
    birthdayList.dispatchEvent(new CustomEvent('listUpdated'));
})
    }

const initLocalStorage = () => {
    const dataList = JSON.parse(localStorage.getItem('data'));
    if (dataList) {
        data = dataList;
        displayList();
    }
    birthdayList.dispatchEvent(new CustomEvent('listUpdated'));
}
// set the data in the local storage and stringify it
const updateLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(data))
}


// Envent listners
 birthdayList.addEventListener('click', editPerson);
 birthdayList.addEventListener('click', deletePerson);
 addBtn.addEventListener('click', addList);
 birthdayList.addEventListener('listUpdated', updateLocalStorage);
 filterLastNameInput.addEventListener('input', searchPerson);
 filterMonthInput.addEventListener('input', searchByBirthMonth)
 resetBtn.addEventListener('click', resetFilters);


 initLocalStorage();

 }
 
fetchPerson();