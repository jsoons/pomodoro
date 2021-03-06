// <!-- production version, optimized for size and speed -->
// <script src="https://cdn.jsdelivr.net/npm/vue"></script>
// include is managed in html file, outside the javascript
const POMODORO_STATES = {
    WORK: "work",
    REST: "rest"
};
const WORKING_TIME_LENGTH_IN_MINUTES= 25;
const RESTING_TIME_LENGTH_IN_MINUTES=5;


new Vue ({
  el: "#app",
  data: {
    minute: WORKING_TIME_LENGTH_IN_MINUTES,
    second: 0,
    pomodoroState: POMODORO_STATES.WORK,
    timestamp: 0
  }, //end of data obect
  methods: {
    start: function(){
      this._tick();
      this.setInterval(this._tick,1000);
    },
    _tick: function() {
      if (this.second !== 0) {
        this.second--;
        return; //jump out of the _tick function
      } //end of if second
      if (this.minute !==0) {
        this.second+=59;
        this.minute--;
        return; //jump ouf of the _tick function
      } //end of if minute
      //if minute and second are 0
      this.pomodoroState = (this.pomodoroState === POMODORO_STATES.WORK) ? POMODORO_STATES.REST:POMODORO_STATES.WORK;
      this.minute = (this.pomodoroState===POMODORO_STATES.WORK)?WORKING_TIME_LENGTH_IN_MINUTES:RESTING_TIME_LENGTH_IN_MINUTES;
    }  //end of function tick

  } //end of methods object
});
