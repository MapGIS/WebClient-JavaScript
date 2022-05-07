function getCurTime() {
  const date = new Date(Date.now());
  return date.toLocaleString() + ":" + date.getMilliseconds();
}
export default class LogBase {
  log() {
    console.log(getCurTime(), ...arguments);
  }

  error() {
    console.error(getCurTime(), ...arguments);
  }

  warn() {
    console.warn(getCurTime(), ...arguments);
  }

  info() {
    console.log(getCurTime(), ...arguments);
  }

  debug()
  {
    console.log(getCurTime(), ...arguments);
  }
}
