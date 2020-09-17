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
async function fetchPerson() {
    const response = await fetch(basepoint);
    let data = await response.json();
    const storedHTML = (personList) => {
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
                  let day = current_datetime.getDay();
                  let fullDate = year + "/" + month + "/" + day;
                  let YearMonth = [null, "January", "February", "March", "April", "May", "June", "Jolay", "August", "September", "October", "November", "December"][ current_datetime.getMonth()];
                  let today = new Date();
                  let age = today.getFullYear() - current_datetime.getFullYear();
                
                return `<tr data-id="${person.id}">
                    <th scope="row"><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></th>
                    <td class="text-white">${person.lastName}</td>
                    <td class="text-white">${person.firstName}</td>
                    <td class="text-white">${fullDate}</td>
                    <td class="text-white">Turns ${age} on ${YearMonth} ${day}<sup>${nth(day)}</sup></td>
                    <td class="text-white"> Days</td>
                    <td class="text-white">
                        <button type="button" class="edit btn bg-warning" value="${person.id}">
                          Edit
                        </button>
                    </td>
                    <td class="text-white">
                        <button type="button" class="delete btn bg-warning" value="${person.id}">
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
    displayList(data);

    const editPerson = (e) => {
        const editBtn = e.target.closest('button.edit');
        if (editBtn) {
            e.preventDefault();
            const findTr = e.target.closest('tr');
            const btn = findTr.querySelector('.edit')
            const id = btn.value;
            editPopup(id);
            tbody.dispatchEvent(new CustomEvent('listUpdated'));
        }
    }
    // Create an form html to edit the parteners profile
    const editPopup = (id) => {
        return new Promise(async function (resolve, reject) {
            const person = data.find(person => person.id === id);
            console.log(id);
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
    const initLocalStorage = () => {
        // JSON parse will change a string into an object (if it's well structured)
        const birthdayList = JSON.parse(localStorage.getItem('data'));
        console.log('hello', birthdayList);
        if (birthdayList) {
            data = birthdayList;
            displayList(data);
            
        } 
        tbody.dispatchEvent(new CustomEvent('listUpdated'));
    };
    initLocalStorage();

    const updateLocalStorage = () => {
        console.log('saving books array into local storage');
        localStorage.setItem('data', JSON.stringify(data));
    };
    tbody.addEventListener('listUpdated', updateLocalStorage);
    // updateLocalStorage();
    
    const deletePerson = (e) => {
        const deleteBtn = e.target.closest('button.delete');
        if (deleteBtn) {
            const tableRow = e.target.closest('tr');
            e.preventDefault();
            const id = tableRow.dataset.id;
            deletePopup(id);
            // tbody.dispatchEvent(new CustomEvent('listUpdated'));
        }
    
    };
    
    
const deletePopup = (id) => {
        // create confirmation popup here
        console.log(id);
        return new Promise(async function (resolve) {
            let person = data.filter(person => person.id !== id);
            console.log(id);

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
            await wait(50);
            modal.classList.add('open');
            
            modal.addEventListener('click', (e) => {
                if (e.target.closest('button.yes')) {
                    const personToDelete = data.filter(person => person.id !== id);
                    person = personToDelete;
                    displayList(personToDelete);
                    modal.classList.remove("open");
                    destroyPopup(modal);
    
                }
            });
            window.addEventListener('click', e => {
                if (e.target.closest('button.no')) {
                    destroyPopup(modal);
                }
            })
        })
    }
    
 tbody.addEventListener('click', editPerson);
 tbody.addEventListener('click', deletePerson);
 }
fetchPerson();
