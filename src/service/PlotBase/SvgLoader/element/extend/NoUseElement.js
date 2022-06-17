import Element from "../Element"

export default class NoUseElement extends Element {
  constructor(node) {
    super(node);
    this.type = 'nouse';
  }
}