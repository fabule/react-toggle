'use strict';

import React from 'react';
import classNames from 'classnames';
import Check from './check';
import X from './x';
import {addons} from 'react/addons';

var PureRenderMixin = addons.PureRenderMixin;

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Toggle',

  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    id: React.PropTypes.string,
    hasFeedback: React.PropTypes.bool,
    'aria-labelledby': React.PropTypes.string,
    'aria-label': React.PropTypes.string,
    checkedLabel: React.PropTypes.string,
    uncheckedLabel: React.PropTypes.string
  },

  getInitialState() {
    var checked = false;
    if ('checked' in this.props) {
      checked = this.props.checked;
    } else if ('defaultChecked' in this.props) {
      checked = this.props.defaultChecked;
    }
    return {
      checked: !!checked,
      hasFocus: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({checked: !!nextProps.checked});
    }
  },

  handleClick(event) {
    var checkbox = React.findDOMNode(this.refs.input);
    if (event.target !== checkbox)
    {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    if (!('checked' in this.props)) {
      this.setState({checked: checkbox.checked});
    }
  },

  handleFocus() {
    this.setState({hasFocus: true});
  },

  handleBlur() {
    this.setState({hasFocus: false});
  },

  render() {
    var classes = classNames('react-toggle', {
      'react-toggle--checked': this.state.checked,
      'react-toggle--success': this.state.checked && this.props.hasFeedback,
      'react-toggle--focus': this.state.hasFocus,
      'react-toggle--disabled': this.props.disabled
    });

    return (
      <div className={classes} onClick={this.handleClick}>
        <div className='react-toggle-track'>
          <div className='react-toggle-track-check'>
            {this.renderCheckedLabel()}
          </div>
          <div className='react-toggle-track-x'>
            {this.renderUncheckedLabel()}
          </div>
        </div>
        <div className='react-toggle-thumb'></div>

        <input
          ref='input'
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className='react-toggle-screenreader-only'
          type='checkbox'
          {...this.props} />
      </div>
    )
  },

  renderCheckedLabel() {
    return this.props.checkedLabel ? <label>{this.props.checkedLabel}</label> : <Check />;
  },

  renderUncheckedLabel() {
    return this.props.uncheckedLabel ? <label>{this.props.uncheckedLabel}</label> : <X />;
  }
})
