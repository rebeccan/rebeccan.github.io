function onload() {
  //display time zones and update every second
  displayTimes();
  setInterval(displayTimes, 1000);

  //set level bars according to skills
  setTimeout(setLevels, 0);
}

/**
  set the moment now to the corresponding HTML element
  id prefix: 'user' or 'rebecca'
*/
function setMonthDayTime(prefix, now) {
  const dateMonth = document.getElementById(prefix + 'date-month');
  const dateDay = document.getElementById(prefix + 'date-day');
  const dateTime = document.getElementById(prefix + 'date-time');

  dateMonth.innerHTML = now.format("MMMM");
  dateDay.innerHTML = now.format("DD");
  dateTime.innerHTML = now.format("HH:mm:ss ZZ");
}

function displayTimes() {
  const nowUser = moment();
  const nowRebecca = moment().tz("Pacific/Auckland");
  //const nowRebecca = moment().tz("Europe/Amsterdam");

  //only display two times if the user has a different time zone than rebecca
  if(nowUser.utcOffset() === nowRebecca.utcOffset()) {
    document.getElementById('titleClock').innerHTML = "You live in the same timezone as Rebecca";
    setMonthDayTime('user', nowUser);
    document.getElementById('rebeccasTime').innerHTML = "";
  } else {
    setMonthDayTime('user', nowUser);
    setMonthDayTime('rebecca', nowRebecca);
  }
}


/**
Fill the level bars according to skill percentage
*/
function setLevels() {
  const allLevelBars = document.querySelectorAll('.level-bar-inner');
  allLevelBars.forEach(function(levelBar) {
    levelBar.style.width = levelBar.dataset.level;
  });
}



document.addEventListener("DOMContentLoaded", onload);
