"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const el = {
        addBtn: document.getElementById('Addbtn'),
        article: document.getElementById('Article'),
        quit: document.getElementById('Quit'),
        min: document.getElementById('Min'),
        max: document.getElementById('Max'),
        closePopup: document.getElementById('closePopup'),
        hour: document.getElementById('Hour'),
        minute: document.getElementById('Minute'),
        week: document.getElementsByClassName('week'),
        name: document.getElementById('name'),
    };
    let y = -1;
    let hour = 0;
    let minutes = 0;
    (_a = el.name) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', (event) => {
        if (event.key === 'Enter')
            return false;
    });
    (_b = el.max) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        electron_1.ipcRenderer.send('MaxTheWindow');
    });
    (_c = el.min) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        electron_1.ipcRenderer.send('MinTheWindow');
    });
    (_d = el.quit) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        electron_1.ipcRenderer.send('CloseTheWindow');
    });
    class Div {
        constructor(index) {
            this.weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'];
            this.audio = new Audio('Alarm.wav');
            this.hour = 0;
            this.minutes = 0;
            this.name = '';
            this.day = [];
            this.Index = index;
            this.div = document.createElement('div');
            this.div.className = `rappel change${this.Index}`;
            this.div.id = `text${this.Index}`;
            this.ID = `close${index}`;
            this.lhs = document.createElement('div');
            this.lhs.className = 'lhs';
            this.div.innerHTML =
                `<span class="subGrid1">
                    <label class="AlarmSlider">
                        <input type="checkbox" id="check${this.Index}" checked>
                        <span class="AlarmSliderSpan"></span>
                    </label>
                    <h1 id="divTitle${this.Index}" class="divTitle"></h1>
                    <button id="close${this.Index}" class="btnSlider">X</button>
                </span>       
                <h1 id="hour${this.Index}" class="clock"></h1>`;
        }
        getDay() {
            let str = [];
            for (let i of this.weekday) {
                if (document.getElementById(i).
                    checked === true) {
                    str.push(i);
                }
            }
            return str;
        }
        setTitle() {
            var _a, _b;
            let title = document.getElementById(`divTitle${this.Index}`);
            if (title != null) {
                title.innerHTML = this.name = (((_a = el.name) === null || _a === void 0 ? void 0 : _a.value.length) === 0) ?
                    'Alarm' : (_b = el.name) === null || _b === void 0 ? void 0 : _b.value;
            }
        }
        setTime() {
            let hourTitle = document.getElementById(`hour${this.Index}`);
            if (hourTitle != null) {
                hourTitle.innerHTML = (hour < 10) ?
                    '0' + hour.toString() : hour.toString();
                this.hour = hour;
                hourTitle.innerHTML += ':';
                hourTitle.innerHTML += (minutes < 10) ?
                    '0' + minutes.toString() : minutes.toString();
                this.minutes = minutes;
            }
        }
        setBackground() {
            let getElement = document.getElementById(`check${this.Index}`);
            getElement === null || getElement === void 0 ? void 0 : getElement.addEventListener('click', () => {
                if (getElement === null || getElement === void 0 ? void 0 : getElement.checked) {
                    this.div.style.background =
                        'linear-gradient(80deg, rgba(0, 208, 255, 0.772), \
                        rgba(0, 0, 255, 0.458) 130%)';
                }
                else {
                    this.div.style.background = 'linear-gradient \
                    (80deg, #BEBEBE, #4D4D4D 130%)';
                    this.stop();
                }
            });
        }
        /*When it's time, show app (use ipcRenderer.send)
         keep it run in background
        */
        setAlarm() {
            const checkDays = (index) => {
                for (let i of this.day) {
                    if (this.weekday[index] === i) {
                        return true;
                    }
                }
                return false;
            };
            let counter = setInterval(() => {
                var _a;
                let now = new Date();
                if (now.getHours() === this.hour &&
                    now.getMinutes() == this.minutes &&
                    checkDays(now.getDay()) &&
                    ((_a = document.getElementById(`check${this.Index}`)) === null || _a === void 0 ? void 0 : _a.checked)) {
                    clearInterval(counter);
                    this.div.style.background = 'linear-gradient(80deg, \
                    rgba(0, 255, 98, 0.772), rgba(255, 255, 255, 0.458) 130%)';
                    new Notification(`${this.name}`, { body: 'It\'s time!' });
                    this.stop();
                    this.audio.play();
                    this.audio.addEventListener('ended', () => {
                        let getElement = document.getElementById(`check${this.Index}`);
                        if (getElement === null || getElement === void 0 ? void 0 : getElement.checked) {
                            this.div.style.background =
                                'linear-gradient(80deg, rgba(0, 208, 255, 0.772),\
                                 rgba(0, 0, 255, 0.458) 130%)';
                        }
                        else {
                            this.div.style.background = 'linear-gradient(80deg, #BEBEBE, #4D4D4D 130%)';
                            this.stop();
                        }
                    });
                }
            }, 1000);
        }
        stop() {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        create() {
            var _a;
            if (!document.body.contains(document.getElementById(this.div.id))) {
                (_a = el.article) === null || _a === void 0 ? void 0 : _a.appendChild(this.div);
                this.setTitle();
                this.setTime();
                this.day = this.getDay();
                for (let i of this.day) {
                    this.lhs.innerHTML += `<div class="day">${i}</div>`;
                }
                this.div.appendChild(this.lhs);
                this.setBackground();
                this.setAlarm();
                return true;
            }
            else {
                return false;
            }
        }
        delete() {
            var _a;
            (_a = document.getElementById(this.ID)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.div.remove();
                this.lhs.innerHTML = '';
                this.stop();
                y = (y < 0) ? -1 : y - 1;
            });
        }
    }
    (_e = el.hour) === null || _e === void 0 ? void 0 : _e.addEventListener('wheel', (e) => {
        if (el.hour != null) {
            if (e.deltaY < 0) {
                hour = (hour > 22) ? 0 : hour + 1;
            }
            else if (e.deltaY > 0) {
                hour = (hour < 1) ? 23 : hour - 1;
            }
            el.hour.innerHTML = (hour < 10) ?
                '0' + hour.toString() : hour.toString();
        }
    });
    (_f = el.minute) === null || _f === void 0 ? void 0 : _f.addEventListener('wheel', (e) => {
        if (el.minute != null) {
            if (e.deltaY < 0) {
                minutes = (minutes > 58) ? 0 : minutes + 1;
            }
            else if (e.deltaY > 0) {
                minutes = (minutes < 1) ? 59 : minutes - 1;
            }
            el.minute.innerHTML = (minutes < 10) ?
                '0' + minutes.toString() : minutes.toString();
        }
    });
    const divTab = [
        new Div(0),
        new Div(1),
        new Div(2),
        new Div(3),
        new Div(4),
        new Div(5),
        new Div(6),
        new Div(7),
        new Div(8),
        new Div(9),
        new Div(10),
        new Div(11),
        new Div(12),
        new Div(13),
        new Div(14),
        new Div(15),
    ];
    (_g = el.addBtn) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => {
        while (y != 15) {
            y = (y > 15) ? -1 : y + 1;
            if (divTab[y].create() === true) {
                break;
            }
            else {
                continue;
            }
        }
        for (let i of divTab) {
            i.delete();
        }
    });
});
