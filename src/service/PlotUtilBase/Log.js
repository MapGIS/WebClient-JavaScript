function getCurTime() {
  const date = new Date(Date.now());
  return date.toLocaleString() + ":" + date.getMilliseconds();
}

export function log() {
  console.log(getCurTime(), ...arguments);
}

export function err(){
  console.error(getCurTime(),...arguments);
}

export function warn(){
  console.warn(getCurTime(),...arguments);
}

export default class TimeCounter {
  constructor() {
    this.total = 0;
  }

  start() {
    this._start = new Date().getTime();
  }

  end() {
    this._end = new Date().getTime();

    this.total += this._end - this._start;
  }
}
