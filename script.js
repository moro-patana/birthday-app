const basepoint = './people.json';
function wait(ms = 0) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const tbody = document.querySelector('tbody');
async function destroyPopup(popup) {
	popup.classList.remove('open');
	await wait(1000);
	popup.remove();
	popup = null;
}
const addBtn = document.querySelector(`.add`);
async function fetchPerson() {
    const response = await fetch(basepoint);
    let data = await response.json();
    const storedHTML = (personList) => {
        // console.log(personList)
        return personList
        .map(person => {
                function nth(day) {
                    if (day > 3 && day < 21) return 'th';
                    switch (day % 10) {
                      case 1:  return "st";
                      case 2:  return "nd";
                      case 3:  return "rd";
                      default: return "th";
                    }
                  }
                  let current_datetime = new Date(person.birthday);
                  let date = current_datetime.getDate();
                  let year = current_datetime.getFullYear();
                  let month = current_datetime.getMonth();
                  let birthMonth = month + 1;
                  let day = current_datetime.getDay();
                  let fullDate = year + "/" + birthMonth + "/" + day;
                  let YearMonth = ["January", "February", "March", "April", "May", "June", "Jolay", "August", "September", "October", "November", "December"][current_datetime.getMonth()];
                  let today = new Date();
                  let age = today.getFullYear() - year;

                  let yearNow = today.getFullYear();
                  let birthdayYear = new Date(yearNow, month, day);
                  let aDay = 1000*60*60*24;
                  let countDay = Math.ceil((birthdayYear.getTime() - today.getTime())/ aDay)
                return `<tr data-id="${person.id}">
                    <th scope="row"><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></th>
                    <td class="text-white">${person.lastName}</td>
                    <td class="text-white">${person.firstName}</td>
                    <td class="text-white">${fullDate}</td>
                    <td class="text-white">Turns ${age} on ${YearMonth} ${day}<sup>${nth(day)}</sup></td>
                    <td class="text-white"> ${countDay < 0 ? countDay *  -1 + " " + "days ago" : countDay + " " + "days"}</td>
                    <td class="text-white">
                        <button type="button" class="edit btn bg-warning" value="${person.id}">
                          Edit
                        </button>
                    </td>
                    <td class="text-white">
                        <button type="button" class="delete btn bg-warning" data-id="${person.id}">
                            Delete
                        </button>
                    </td>
                </tr>`
        })
        .join('');
    }
     function displayList(){
         const html = storedHTML(data);
        tbody.innerHTML = html;
    };
    displayList();

    const editPerson = (e) => {
        const editBtn = e.target.closest('button.edit');
        if (editBtn) {
            e.preventDefault();
            const findTr = e.target.closest('tr');
            const btn = findTr.querySelector('.edit')
            const id = btn.value;
            editPopup(id);
            // tbody.dispatchEvent(new CustomEvent('listUpdated'));
            
        }
    }
    // Create an form html to edit the parteners profile
    const editPopup = (id) => {
        console.log(id);
        return new Promise(async function (resolve, reject) {
            const person = data.find(person => person.id == id);
            console.log(person);
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
                    <button type="submit" class="btn btn-danger save">Save</button>
                    <button type="button" class="btn btn-danger cancel">Cancel</button>
                    </div>
                </div>
`;

            // Create skip button and appendchild it to the popup
            window.addEventListener('click', e => {
                if (e.target.closest('button.cancel')) {
                    destroyPopup(popup);
                    // tbody.dispatchEvent(new CustomEvent('listUpdated'));
                }
            })
    
            // Listen to the submit button to save the changes
            popup.addEventListener('submit', (e) => {
                e.preventDefault();
                // const form = e.target;
                person.picture = popup.picture.value;
                person.lastName = popup.lastName.value;
                person.firstName = popup.firstName.value,
                person.birthday = popup.birthday.value,
                person.id = popup.id.value,

                destroyPopup(popup);
                // resolve(e.currentTarget.remove());
                displayList(person);
                tbody.dispatchEvent(new CustomEvent('listUpdated'));

            },
                { once: true }
            )
            document.body.appendChild(popup);
            await wait(50);
            popup.classList.add('open');
        })
    }
    
    const deletePerson = (e) => {
        if (e.target.closest('button.delete')) {
          const tableRow = e.target.closest('tr');
          const id = tableRow.dataset.id;
          deletePopup(id);
        }

    };
    
    
const deletePopup = (id) => {
        // create confirmation popup here
        return new Promise(async function (resolve) {
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.innerHTML = `
                <p class="confirm">Do you want to delete?</p>
                <div class="confirm-btn">
                    <button class="btn btn-primary yes">Yes</buton>
                    <button class="btn btn-primary no">No</buton>
                </div>
                `;
                document.body.appendChild(modal);
                modal.classList.add('open');

                window.addEventListener('click', (e) => {
                    if (e.target.closest('button.yes')) {
                        const personToDelete = data.filter(person => person.id != id);
                        data = personToDelete;
                        displayList(personToDelete);
                        destroyPopup(modal);
                        tbody.dispatchEvent(new CustomEvent('listUpdated'));
                        // tbody.dispatchEvent(new CustomEvent('listUpdated'));
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
            // tbody.dispatchEvent(new CustomEvent('listUpdated'));
        }
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
                placeholder="url"
            />
            </fieldset>

                <fieldset>
                    <label for="lastname">Lastname</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="lastname"
                    />
                </fieldset>
                <fieldset>
                <label for="firstname">Firstname</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="firstname"
                />
                </fieldset>
                <fieldset>
                <label for="birthdate">Birthday</label>
                <input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    placeholder="birthday"
                />
                </fieldset>
                <div class="button">
                <button type="submit" class="btn btn-danger save">Save</button>
                <button type="button" class="btn btn-danger cancel">Cancel</button>
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
    tbody.dispatchEvent(new CustomEvent('listUpdated'));
})
    }

const initLocalStorage = () => {
    const dataList = JSON.parse(localStorage.getItem('data'));
    if (dataList) {
        data = dataList;
        displayList();
    }
    tbody.dispatchEvent(new CustomEvent('listUpdated'));
}
const updateLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(data))
}

 tbody.addEventListener('click', editPerson);
 tbody.addEventListener('click', deletePerson);
 addBtn.addEventListener('click', addList);
 tbody.addEventListener('listUpdated', updateLocalStorage);
 initLocalStorage();

 }
 
fetchPerson();
