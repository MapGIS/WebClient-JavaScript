/**
 * Created by PRadostev on 05.06.2015.
 */

L.GML.ParserContainerMixin = {

  parsers: {},

  initializeParserContainer: function () {
    this.parsers = {};
  },

  appendParser: function (parser) {
    this.parsers[parser.elementTag] = parser;
  },

  parseElement: function (element, options) {
    var parser = this.parsers[element.tagName];
    if (!parser) throw('unknown child element ' + element.tagName);

    return parser.parse(element, options);
  }
};
