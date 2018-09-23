// <!-- production version, optimized for size and speed -->
// <script src="https://cdn.jsdelivr.net/npm/vue"></script>
// include is managed in html file, outside the javascript
const POMODORO_STATES = {
    WORK: "work",
    REST: "rest"
};

const STATES = {
  STARTED : "started",
  STOPPED : "stopped",
  PAUSED : "paused"
};

const WORKING_TIME_LENGTH_IN_MINUTES=2; //25
const RESTING_TIME_LENGTH_IN_MINUTES=1; //5



new Vue ({
  el: "#app",
  data: {
    minute: WORKING_TIME_LENGTH_IN_MINUTES,
    second: 0,
    pomodoroState: POMODORO_STATES.WORK,
    // timestamp: 0,
    state: STATES.STOPPED
  }, //end of data obect
  computed: {
    title: function() {
      return (this.pomodoroState===POMODORO_STATES.WORK)?"Work":"Rest"
    }, //end of title function
    min: function() {
      return this.minute>10?this.minute:"0"+this.minute
    }, //end of min function
    sec: function() {
      return this.second>10?this.second:"0"+this.second
    } //end of sec function
  }, //end of computed object
  methods: {
    start: function(){
      this.state=STATES.STARTED;
      this._tick();
      this.interval= setInterval(this._tick,100); //1000
    },
    pause: function() {
      this.state = STATES.PAUSED;
      clearInterval(this.interval);
    },
    stop: function () {
      this.state=STATES.STOPPED;
      clearInterval(this.interval);
      this.pomodoroState=POMODORO_STATES.WORK;
      this.minute=WORKING_TIME_LENGTH_IN_MINUTES;
      this.second=0;
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
