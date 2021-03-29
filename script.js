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
function calcutateDateToBirthday(personToCalculateBirthdate) {
    let birthdayDateTime = new Date(personToCalculateBirthdate.birthday);
    let birthDate = birthdayDateTime.getDate();
    let birthMonth = birthdayDateTime.getMonth();
    let today = new Date();
    let yearNow = today.getFullYear();
    let birthdayYear = new Date(yearNow, birthMonth, birthDate);
    let aDay = 1000 * 60 * 60 * 24;
    let countDay = Math.ceil((birthdayYear.getTime() - today.getTime()) / aDay);
    return countDay;
}

// Fetch data from people.json
async function fetchPerson() {
    const response = await fetch(basepoint);
    let data = await response.json();
    const storedHTML = (personList) => {
        const sortedPersonList = personList.sort((personA, personB) => {
            const sortedBirthdayA = normalizedBirthday(calcutateDateToBirthday(personA)) 
            const sortedBirthdayB = normalizedBirthday(calcutateDateToBirthday(personB))
            return sortedBirthdayA - sortedBirthdayB
            function normalizedBirthday(numDays) {
             return numDays < 0 ? numDays + 365 : numDays
            }
        }) 

        // Map through the data
        return sortedPersonList
            .map(person => {

                // Condition to check if the day should take th, st, nd, or rd
                function nth(day) {
                    if (day > 3 && day < 21) return 'th';
                    switch (day % 10) {
                        case 1: return "st";
                        case 2: return "nd";
                        case 3: return "rd";
                        default: return "th";
                    }
                }
                // Take the birthday date from the data
                let birthdayDateTime = new Date(person.birthday);
                let birthDate = birthdayDateTime.getDate();
                let birthdateYear = birthdayDateTime.getFullYear();
                let birthMonth = birthdayDateTime.getMonth();
                const monthTable = {
                    0: "January",
                    1: "February",
                    2: "March",
                    3: "April",
                    4: "May",
                    5: "June",
                    6: "July",
                    7: "August",
                    8: "September",
                    9: "October",
                    10: "November",
                    11: "December"
                }
                // Calculate ages based on the birthday year
                let today = new Date();
                let age = (today.getFullYear() - birthdateYear);
                let countDay = calcutateDateToBirthday(person)
                let birthdayInDays = countDay < 0 ? 365 + countDay : countDay
                let upComingBirthdayMessage = birthdayInDays > 1 ? `In ${birthdayInDays} days` : `In ${birthdayInDays} day`
                let happyBirthday = birthdayInDays === 0 ? "Happy birthday!" : upComingBirthdayMessage
                
                return `<article data-id="${person.id}">
                    <div class="profile-container">
                        <figure><img class="profile" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></figure>
                        <div>
                            <p class="name">${person.lastName} ${person.firstName}</td>
                            <p class="age">Turns <b>${countDay < 0 ? age + 1 : age}</b> on ${monthTable[birthMonth]} ${birthDate}<sup>${nth(birthDate)}</sup></p>
                        </div>
                    </div>
                    <div class="days-container">
                        <span class="days">${happyBirthday}</span>
                        <div class="btn-container">
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
                        </div>
                    </div>
                </article>`

            })
            .join('');
    }
    function displayList() {
        const html = storedHTML(data);
        birthdayList.innerHTML = html;
    };
    displayList();

        const filterPeople = () => {
            const nameFilter = filterLastNameInput.value.toLowerCase()
            const monthFilter = Number(filterMonthInput.value)
            console.log(monthFilter);
            const filteredPeople = data.filter(person => (nameFilter
                 ? person.lastName.toLowerCase().includes(nameFilter) 
                 : true)
                  && (monthFilter
                     ? new Date(person.birthday).getMonth() + 1 === monthFilter 
                     : true))
            console.log(filteredPeople);
            birthdayList.innerHTML = storedHTML(filteredPeople)
        }

    // Grab the edit button
    const editPerson = (e) => {
        const editBtn = e.target.closest('button.edit');
        if (editBtn) {
            e.preventDefault();
            const findArticle = e.target.closest('article');
            const btn = findArticle.dataset.id
            editPopup(btn);
            birthdayList.dispatchEvent(new CustomEvent('listUpdated'));

        }
    }
    // Create an form html to edit the list 
    const editPopup = (id) => {
        // const person = data.find(person => person.id == id);
        return new Promise(async function (resolve, reject) {
            const person = data.find(person => person.id == id);
            // Create form element to edit the list
            const maxDate = new Date().toISOString().slice(0, 10)
            const formatDateBirthday = new Date(person?.birthday).toISOString().slice(0, 10)
            const popup = document.createElement(`form`);
            popup.classList.add('popup');
            popup.innerHTML = `
                <div class="form-input">
                <div class="form-close-btn"><button class="close-button"><img src="./img/close-btn.svg" alt="close button icon" /></button></div>
                <h2 class="person-name">Edit ${person.firstName} ${person.lastName}</h2>
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
                        value="${formatDateBirthday}"
                        max="${maxDate}"
                    />
                    </fieldset>
                    <div class="button">
                    <button type="submit" class="save-button">Save changes</button>
                    <button type="button" class="cancel-button">Cancel</button>
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
        const person = data.find(person => person.id == id);
        // create confirmation popup here
        return new Promise(async function (resolve) {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="delete-popup">
                <div class="form-close-btn"><button class="close-button"><img src="./img/close-btn.svg" alt="close button icon" /></button></div>
                    <p class="confirm">Do you want to delete <b>${person.lastName} ${person.firstName}</b>?</p>
                    <div class="confirm-btn">
                        <button class="yes-button">Yes</buton>
                        <button class="no-button">No</buton>
                    </div>
                </div>
                `;
            document.body.appendChild(modal);
            modal.classList.add('open');
            // Listen to the yes button and the no button
            window.addEventListener('click', (e) => {
                if (e.target.closest('button.yes-button')) {
                    const personToDelete = data.filter(person => person.id != id);
                    data = personToDelete;
                    displayList(personToDelete);
                    destroyPopup(modal);
                }
            })
            window.addEventListener('click', e => {
                if (e.target.closest('button.no-button')) {
                    destroyPopup(modal);
                }
            })
            window.addEventListener('click', e => {
                if (e.target.closest('button.close-button')) {
                    destroyPopup(modal);
                }
            })

        });

    }
    const addList = (e) => {
        e.preventDefault()
        if (e.target.closest('button.add')) {
            addListPopup();
        }

    }
    const addListPopup = (e) => {
        // const { v4: uuidv4 } = require('uuid');
        const maxDate = new Date().toISOString().slice(0, 10)
        const newPopupList = document.createElement(`div`);
        newPopupList.classList.add('AddListPopup');
        newPopupList.innerHTML = `
            <form class="form-input">
            <div class="form-close-btn"><button class="close-button"><img src="./img/close-btn.svg" alt="close button icon" /></button></div>
            <fieldset>
            <label for="profile">Picture</label>
            <input
                type="url"
                name="profile"
                id="profile"
                placeholder="Type the image url"
            />
            </fieldset>
                <fieldset>
                    <label for="lastname">Lastname</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Type your lastname"
                    />
                </fieldset>
                <fieldset>
                <label for="firstname">Firstname</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Type your firstname"
                />
                </fieldset>
                <fieldset>
                <label for="birthdate">Birthday</label>
                <input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    max="${maxDate}"
                />
                </fieldset>
                <div class="button">
                <button type="submit" class="save-button">Submit</button>
                <button type="button" class="cancel-button">Cancel</button>
                </div>
            </form>
`;
        window.addEventListener('click', e => {
            if (e.target.closest('button.cancel-button')) {
                destroyPopup(newPopupList);
            }
            if (e.target.closest('button.close-button')) {
                destroyPopup(newPopupList);
            }
        })

        document.body.appendChild(newPopupList);
        newPopupList.classList.add('open');
        newPopupList.addEventListener('submit', e => {
            e.preventDefault();
            const form = e.target;
            const newList = {
                id: Date.now(),
                lastName: form.lastname.value,
                firstName: form.firstname.value,
                birthday: new Date(form.birthdate.value).getTime(),
                picture: form.profile.value,
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
    filterLastNameInput.addEventListener('input', filterPeople);
    filterMonthInput.addEventListener('input', filterPeople)

    initLocalStorage();

}

fetchPerson();