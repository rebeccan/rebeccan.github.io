function onload() {
  //decrypt obfuscated email
  initMail();

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
  const dateMonth = document.getElementById(prefix + "date-month");
  const dateDay = document.getElementById(prefix + "date-day");
  const dateTime = document.getElementById(prefix + "date-time");

  dateMonth.innerHTML = now.format("MMMM");
  dateDay.innerHTML = now.format("DD");
  dateTime.innerHTML = now.format("HH:mm:ss ZZ");
}

function displayTimes() {
  const titleClock = document.getElementById("titleClock");

  if (titleClock) {
    //only on main page
    const nowUser = moment();
    const nowRebecca = moment().tz("Europe/Berlin");
    // const nowRebecca = moment().tz("Europe/Berlin");

    //only display two times if the user has a different time zone than rebecca
    if (nowUser.utcOffset() === nowRebecca.utcOffset()) {
      titleClock.innerHTML = "You live in the same timezone as Rebecca";
      setMonthDayTime("user", nowUser);
      document.getElementById("rebeccasTime").innerHTML = "";
    } else {
      setMonthDayTime("user", nowUser);
      setMonthDayTime("rebecca", nowRebecca);
    }
  }
}

/**
Fill the level bars according to skill percentage
*/
function setLevels() {
  const allLevelBars = document.querySelectorAll(".level-bar-inner");
  allLevelBars.forEach(function(levelBar) {
    levelBar.style.width = levelBar.dataset.level;
  });
}

function initMail() {
  const allMailTos = document.querySelectorAll("a.email");
  allMailTos.forEach(mailTo => {
    mailTo.addEventListener("mousedown", mailAction);
    mailTo.addEventListener("keydown", mailAction);
  });
}

function mailAction() {
  // Inspired by Email obfuscator script 2.1 http://www.jottings.com/obfuscator/
  const encrypted = "2fAfDDvqfrkf28@kpvrQ.DSp";
  const secret = "WfjQT249zp51AgaPR38iqZuLHU7coMxKhsVJdkveFlNrBIYmw0bDSX6OtGnyCE";
  let mail = "";
  for (i = 0; i < encrypted.length; i++) {
    if (secret.indexOf(encrypted.charAt(i)) == -1) {
      mail += encrypted.charAt(i);
    } else {
      let ltr = (secret.indexOf(encrypted.charAt(i)) - encrypted.length + secret.length) % secret.length;
      mail += secret.charAt(ltr);
    }
  }
  this.href = "mailto:" + mail;
  this.removeEventListener("mousedown", mailAction); //once set no need to do this again
  this.removeEventListener("keydown", mailAction);
}

document.addEventListener("DOMContentLoaded", onload);
