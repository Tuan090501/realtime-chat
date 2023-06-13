"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _authReducer = require("./reducers/authReducer");

var _messengerReducer = require("./reducers/messengerReducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  auth: _authReducer.authReducer,
  messenger: _messengerReducer.messengerReducer
});
var middleware = [_reduxThunk["default"]];
var store = (0, _redux.createStore)(rootReducer, (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, middleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
  return f;
}));
var _default = store;
exports["default"] = _default;