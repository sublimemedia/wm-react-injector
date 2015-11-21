import React, { Component } from 'react';
import { extend } from '@sublimemedia/wicker-man-utilities';


class WMInjector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.getDefaultData()
    };
  }

  getDefaultData(data) {
    data = data || this.props.data;

    return Object.keys(data)
    .reduce((prev, curr) => {
      if (typeof prev !== 'object') {
        prev = this.truthify(prev, data);
      }
      return curr ? extend(prev, this.truthify(curr, data)) : prev;
    }, {});
  }

  componentWillReceiveProps(newProps) {
    this.setState(extend(true, {}, this.state, { data: this.getDefaultData(newProps.data) }));
  }

  truthify(key, data) {
    let
      temp = {},
      truth = data[key];

    truth.source.observe(truth.path)
    .onValue(val => {
      let temp = { data: (this.state.data || {}) };
      temp.data[key] = val;
      
      this.setState(temp);
    });

    temp[key] = truth.source.get(truth.path);
    return temp;
  }

  render() {
    const {data, persist, ...rest} = this.props;

    return (
      <div {...rest}>
      {React.Children.map(this.props.children,
        (child =>
          React.cloneElement(child, extend({}, this.state.data, { persist: persist }, child.props))),
        this)}
      </div>
    );
  }

}

WMInjector.propTypes = {
  data: React.PropTypes.object.isRequired,
  persist: React.PropTypes.object
};

export default WMInjector;
