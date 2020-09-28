export async function fetchPerson() {
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
                  let fullDate = year + "/" + birthMonth + "/" + day;
                  let YearMonth = ["January", "February", "March", "April", "May", "June", "Jolay", "August", "September", "October", "November", "December"][current_datetime.getMonth()];

                // Calculate ages based on the birthday year
                  let today = new Date();
                  let age = today.getFullYear() - year;

                // Calculate days number between Date.now() and the birthday months and day
                  let yearNow = today.getFullYear();
                  let birthdayYear = new Date(yearNow, month, day);
                  let aDay = 1000*60*60*24;
                  let countDay = Math.ceil((birthdayYear.getTime() - today.getTime())/ aDay);
                
                // Create table row
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
