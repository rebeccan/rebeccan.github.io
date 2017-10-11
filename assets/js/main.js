function onload() {
  //display time zones and update every second
  displayTime();
  setInterval(displayTime, 1000);

  //set level bars according to skills
  setTimeout(setLevels, 0);
}

function displayTime() {
  const userTime = document.getElementById('usertime');
  const rebeccasTime = document.getElementById('rebeccastime');

  const nowUser = moment().format("DD/MM/YYYY HH:mm:ss ZZ");
  const nowRebecca = moment().tz("Pacific/Auckland").format("DD/MM/YYYY HH:mm:ss ZZ");

  userTime.innerHTML = nowUser;
  rebeccasTime.innerHTML = nowRebecca;
}

function setLevels() {
  const allLevelBars = document.querySelectorAll('.level-bar-inner');
  allLevelBars.forEach(function(levelBar) {
    levelBar.style.width = levelBar.dataset.level;
  });
}



document.addEventListener("DOMContentLoaded", onload);
