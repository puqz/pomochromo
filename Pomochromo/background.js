var minutes;
var seconds;
var reps;
var curAction;
var secondsInterval;
var visible;
var curAction;
var workTime;
var breakTime;
var longBreakTime;
const loop = ["work", "break", "work", "break", "work", "longbreak"];



chrome.alarms.onAlarm.addListener(alarm => {
    chrome.storage.local.get(['minutes', 'seconds', 'reps', 'curAction', 'secondsInterval', 'visible',], function(data){
        minutes = data.minutes;
        seconds = data.seconds;
        reps = data.reps;
        curAction = data.curAction;
        secondsInterval = data.secondsInterval;
        visible = data.visible;
    });
    if (alarm.name === "myTimer" && curAction === "Pause") {
        if (seconds <= 0){
            if (minutes <= 0){
                if (reps == 5) {
                    reps = 0;
                } else {
                reps += 1;
                }
                if (loop[reps] === "work"){
                    chrome.notifications.create(
                        "work",
                        {
                          type: "basic",
                          iconUrl: "images/PEEPEEPOOPOO.png",
                          title: 'Period Over',
                          message: 'Get to Work!'
                        }
                      );
                      chrome.notifications.clear("work");
                } else {
                    chrome.notifications.create(
                        "break",
                        {
                          type: "basic",
                          iconUrl: "images/PEEPEEPOOPOO.png",
                          title: 'Period Over',
                          message: 'Take a rest!'
                        }
                      );
                    chrome.notifications.clear("break");
                    chrome.notifications.clear("work");
                }
                chrome.storage.local.set({'reps': reps});
            } else {
              seconds = 59;
              minutes -= 1;  
            }
        } else {
          seconds -= 2;
        }
        chrome.storage.local.set({'minutes': minutes, 'seconds': seconds}, function(){
        console.log(minutes+":"+seconds);
        });
        /*
        if (seconds <= 0) {
            if (minutes <= 0) {
              if (reps == 5) {
                reps = 0;
              } else {
                reps += 1;
              }
              alert("Period is over. Press Resume to continue the timer.");
              chrome.storage.local.set({'reps': reps});
            }
            seconds = 60;
            minutes -=1;
            pomodoro();
        }
        */
        chrome.storage.local.set({'minutes': minutes, 'seconds': seconds, 'reps': reps});

    }
});


chrome.alarms.create("myTimer", {
    periodInMinutes: (1/240),
});

function startTimer() {
    curAction = "Pause";
    chrome.storage.local.set({'curAction': curAction});
}

function pomodoro() {
    //logic to determine pomodoro loop
    if (loop[reps] === "work") {
      minutes = workTime--;
      seconds = 0;
    } else if (loop[reps] === "break") {
      minutes = breakTime;
      seconds = 0;
    } else {
      minutes = longBreakTime--;
      seconds = 0;
    }
  }