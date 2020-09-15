// import "regenerator-runtime/runtime";

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
    const data = await response.json();
    return data;
    }
async function displayList(){
        const personList = await fetchPerson();
        tbody.innerHTML = personList
            .map(person =>`
                    <tr data-id="${person.id}">
                        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
                        <td class="text-white">${person.lastName}</td>
                        <td class="text-white">${person.firstName}</td>
                        <td class="text-white">Turns to ${person.birthday} on</td>
                        <td class="text-white">Date computaion</td>
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
                    </tr>
    `)
            .join('');
    };

    const editPerson = (e) => {
        const editBtn = e.target.closest('button.edit');
        if (editBtn) {
            e.preventDefault();
            const findTr = e.target.closest('tr');
            const btn = findTr.querySelector('.edit')
            const id = btn.value
            editPopup(id);
        }
    }
    // Create an form html to edit the parteners profile
    const editPopup = (id) => {
        return new Promise(async function (resolve, reject) {
            const personList = await fetchPerson();
            const person = personList.find(person => person.id === id);
            console.log(id);
            const popup = document.createElement(`form`);
            popup.classList.add('popup');
            popup.innerHTML = `
                <div class="form-input">
                    <fieldset>
                        <label for="lastName">Lastname</label>
                        <input
                            type="text"
                            required
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
                        required
                        name="firstName"
                        id="firstName"
                        value
                        ="${person.firstName}"
                    />
                    </fieldset>
                    <fieldset>
                    <label for="birthday">Birthday</label>
                    <input
                        type="text"
                        required
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
                // resolve(e.target.input.value);
                // const form = e.target;
                person.lastName = popup.lastName.value;
                person.firstName = popup.firstName.value;
                person.birthday = popup.birthday.value;
                person.id = popup.id.value;

                destroyPopup(popup);
            },
                { once: true }
            )
            document.body.appendChild(popup);
            await wait(50);
            popup.classList.add('open');
        })
    }
    
    const deletePerson = (e) => {
        const deleteBtn = e.target.closest('button.delete');
        if (deleteBtn) {
            const tableRow = e.target.closest('tr');
            e.preventDefault();
            const id = tableRow.dataset.id;
            deletePopup(id);
        }
    
    };
    
    
const deletePopup = (id) => {
        // create confirmation popup here
        console.log(id);
        return new Promise(async function (resolve) {
            const personList = await fetchPerson();
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
                    const personToDelete = personList.filter(person => person.id !== id);
                    persons = personToDelete;
                    displayList(personToDelete);
                    modal.classList.remove("open");
                    destroyPopup(modal)
    
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
displayList();
