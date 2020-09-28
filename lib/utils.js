export function nth(day) {
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

