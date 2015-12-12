'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sublimemediaWickerManUtilities = require('@sublimemedia/wicker-man-utilities');

var WMInjector = (function (_Component) {
  _inherits(WMInjector, _Component);

  function WMInjector(props) {
    _classCallCheck(this, WMInjector);

    _get(Object.getPrototypeOf(WMInjector.prototype), 'constructor', this).call(this, props);

    this.state = {
      data: this.getDefaultData()
    };
  }

  _createClass(WMInjector, [{
    key: 'getDefaultData',
    value: function getDefaultData(data) {
      var _this = this;

      data = data || this.props.data;

      return Object.keys(data).reduce(function (prev, curr) {
        if (typeof prev !== 'object') {
          prev = _this.truthify(prev, data);
        }
        return curr ? (0, _sublimemediaWickerManUtilities.extend)(prev, _this.truthify(curr, data)) : prev;
      }, {});
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState((0, _sublimemediaWickerManUtilities.extend)(true, {}, this.state, { data: this.getDefaultData(newProps.data) }));
    }
  }, {
    key: 'truthify',
    value: function truthify(key, data) {
      var _this2 = this;

      var temp = {},
          truth = data[key];

      truth.source.observe(truth.path).onValue(function (val) {
        var temp = { data: _this2.state.data || {} };
        temp.data[key] = val;

        _this2.setState(temp);
      });

      temp[key] = truth.source.get(truth.path);
      return temp;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var data = _props.data;
      var persist = _props.persist;

      var rest = _objectWithoutProperties(_props, ['data', 'persist']);

      return _react2['default'].createElement(
        'div',
        rest,
        _react2['default'].Children.map(this.props.children, function (child) {
          return _react2['default'].cloneElement(child, (0, _sublimemediaWickerManUtilities.extend)({}, _this3.state.data, { persist: persist }, child.props));
        }, this)
      );
    }
  }]);

  return WMInjector;
})(_react.Component);

WMInjector.propTypes = {
  data: _react2['default'].PropTypes.object.isRequired,
  persist: _react2['default'].PropTypes.object
};

exports['default'] = WMInjector;
module.exports = exports['default'];

