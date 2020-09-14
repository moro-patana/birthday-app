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
                const tableRow = e.target.closest('tr');
                const btn = tableRow.querySelector('.edit')
                const id = btn.value
                editPersonPopup(id);
            }
        }
    const editPersonPopup = (e) => {
        return new Promise(async function (resolve, reject) {
            const person = people.find(person => person.id === id);
            console.log(id);
            const popup = document.createElement(`form`);
            popup.classList.add('popup');
            popup.innerHTML = `
            <div.form-input>
                <fieldset>
                    <label for="lastname">Lastname</label>
                    <input
                        type="text"
                        required
                        name="lastname"
                        id="lastname"
                        value
                        ="${person.lastName}"
                    />
                </fieldset>
                <fieldset>
				<label for="firstname">Firstname</label>
				<input
					type="text"
					required
					name="firstname"
					id="firstname"
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
                <button type="submit" class="save">Save</button>
                <button type="button" class="cancel">Cancel</button>
            </div>
            `;
            popup.addEventListener('submit', (e) => {
                e.preventDefault();
                // resolve(e.target.input.value);
                const form = e.target;
                person.lastName = form.lastname.value;
                person.firstName = form.firstName.value;
                person.jobTitle = form.birthday.value;
                person.id = form.id.value;
        
                displayList();
                destroyPopup(popup);
            },
                { once: true }
            )
            document.body.appendChild(popup);
            await wait(50);
            popup.classList.add('open');
        })
}

tbody.addEventListener('click', editPerson);

    displayList()
    fetchPerson();
