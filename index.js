"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = _interopRequire(require("react"));

var classNames = _interopRequire(require("classnames"));

var Check = _interopRequire(require("./check"));

var X = _interopRequire(require("./x"));

var addons = require("react/addons").addons;

var PureRenderMixin = addons.PureRenderMixin;

module.exports = React.createClass({
  mixins: [PureRenderMixin],

  displayName: "Toggle",

  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    id: React.PropTypes.string,
    hasFeedback: React.PropTypes.bool,
    "aria-labelledby": React.PropTypes.string,
    "aria-label": React.PropTypes.string,
    checkedLabel: React.PropTypes.string,
    uncheckedLabel: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    var checked = false;
    if ("checked" in this.props) {
      checked = this.props.checked;
    } else if ("defaultChecked" in this.props) {
      checked = this.props.defaultChecked;
    }
    return {
      checked: !!checked,
      hasFocus: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ("checked" in nextProps) {
      this.setState({ checked: !!nextProps.checked });
    }
  },

  handleClick: function handleClick(event) {
    var checkbox = React.findDOMNode(this.refs.input);
    if (event.target !== checkbox) {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    if (!("checked" in this.props)) {
      this.setState({ checked: checkbox.checked });
    }
  },

  handleFocus: function handleFocus() {
    this.setState({ hasFocus: true });
  },

  handleBlur: function handleBlur() {
    this.setState({ hasFocus: false });
  },

  render: function render() {
    var classes = classNames("react-toggle", {
      "react-toggle--checked": this.state.checked,
      "react-toggle--hasFeedback": this.state.checked && this.props.hasFeedback,
      "react-toggle--focus": this.state.hasFocus,
      "react-toggle--disabled": this.props.disabled
    });

    return React.createElement(
      "div",
      { className: classes, onClick: this.handleClick },
      React.createElement(
        "div",
        { className: "react-toggle-track" },
        React.createElement(
          "div",
          { className: "react-toggle-track-check" },
          this.renderCheckedLabel()
        ),
        React.createElement(
          "div",
          { className: "react-toggle-track-x" },
          this.renderUncheckedLabel()
        )
      ),
      React.createElement("div", { className: "react-toggle-thumb" }),
      React.createElement("input", _extends({
        ref: "input",
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        className: "react-toggle-screenreader-only",
        type: "checkbox"
      }, this.props))
    );
  },

  renderCheckedLabel: function renderCheckedLabel() {
    return this.props.checkedLabel ? React.createElement(
      "label",
      null,
      this.props.checkedLabel
    ) : React.createElement(Check, null);
  },

  renderUncheckedLabel: function renderUncheckedLabel() {
    return this.props.uncheckedLabel ? React.createElement(
      "label",
      null,
      this.props.uncheckedLabel
    ) : React.createElement(X, null);
  }
});
