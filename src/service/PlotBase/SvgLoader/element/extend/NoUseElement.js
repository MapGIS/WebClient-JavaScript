import Element from ".."

export default class NoUseElement extends Element {
  constructor() {
    super();
    this.type = 'nouse';
  }
}