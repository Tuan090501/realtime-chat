"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.themeSet = exports.getTheme = exports.updateMessage = exports.seenMessage = exports.ImageMessageSend = exports.getMessage = exports.messageSend = exports.getFriends = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _messengerType = require("../types/messengerType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getFriends = function getFriends() {
    return function _callee(dispatch) {
        var response;
        return regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return regeneratorRuntime.awrap(_axios["default"].get('/api/messenger/get-friends'));

                    case 3:
                        response = _context.sent;
                        dispatch({
                            type: _messengerType.FRIENDS_GET_SUCCESS,
                            payload: {
                                friends: response.data.friends
                            }
                        });
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context["catch"](0);
                        console.log(_context.t0.response.data);

                    case 10:
                    case "end":
                        return _context.stop();
                }
            }
        }, null, null, [
            [0, 7]
        ]);
    };
};

exports.getFriends = getFriends;

var messageSend = function messageSend(data) {
    return function _callee2(dispatch) {
        var response;
        return regeneratorRuntime.async(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return regeneratorRuntime.awrap(_axios["default"].post('/api/messenger/send-message', data));

                    case 3:
                        response = _context2.sent;
                        dispatch({
                            type: _messengerType.MESSAGE_SEND_SUCCESS,
                            payload: {
                                message: response.data.message
                            }
                        });
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);
                        console.log(_context2.t0.response.data);

                    case 10:
                    case "end":
                        return _context2.stop();
                }
            }
        }, null, null, [
            [0, 7]
        ]);
    };
};

exports.messageSend = messageSend;

var getMessage = function getMessage(id) {
    return function _callee3(dispatch) {
        var response;
        return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return regeneratorRuntime.awrap(_axios["default"].get("/api/messenger/get-message/".concat(id)));

                    case 3:
                        response = _context3.sent;
                        dispatch({
                            type: _messengerType.MESSAGE_GET_SUCCESS,
                            payload: {
                                message: response.data.message
                            }
                        });
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3["catch"](0);
                        console.log(_context3.t0.response.data);

                    case 10:
                    case "end":
                        return _context3.stop();
                }
            }
        }, null, null, [
            [0, 7]
        ]);
    };
};

exports.getMessage = getMessage;

var ImageMessageSend = function ImageMessageSend(data) {
    return function _callee4(dispatch) {
        var response;
        return regeneratorRuntime.async(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return regeneratorRuntime.awrap(_axios["default"].post('/api/messenger/image-message-send', data));

                    case 3:
                        response = _context4.sent;
                        dispatch({
                            type: _messengerType.MESSAGE_SEND_SUCCESS,
                            payload: {
                                message: response.data.message
                            }
                        });
                        _context4.next = 10;
                        break;

                    case 7:
                        _context4.prev = 7;
                        _context4.t0 = _context4["catch"](0);
                        console.log(_context4.t0.response.data);

                    case 10:
                    case "end":
                        return _context4.stop();
                }
            }
        }, null, null, [
            [0, 7]
        ]);
    };
};

exports.ImageMessageSend = ImageMessageSend;

var seenMessage = function seenMessage(msg) {
    return function _callee5(dispatch) {
        var response;
        return regeneratorRuntime.async(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return regeneratorRuntime.awrap(_axios["default"].post('/api/messenger/seen-message', msg));

                    case 3:
                        response = _context5.sent;
                        _context5.next = 9;
                        break;

                    case 6:
                        _context5.prev = 6;
                        _context5.t0 = _context5["catch"](0);
                        console.log(_context5.t0.response.message);

                    case 9:
                    case "end":
                        return _context5.stop();
                }
            }
        }, null, null, [
            [0, 6]
        ]);
    };
};

exports.seenMessage = seenMessage;

var updateMessage = function updateMessage(msg) {
    return function _callee6(dispatch) {
        var response;
        return regeneratorRuntime.async(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return regeneratorRuntime.awrap(_axios["default"].post('/api/messenger/delivared-message', msg));

                    case 3:
                        response = _context6.sent;
                        _context6.next = 9;
                        break;

                    case 6:
                        _context6.prev = 6;
                        _context6.t0 = _context6["catch"](0);
                        console.log(_context6.t0.response.message);

                    case 9:
                        console.log(msg);

                    case 10:
                    case "end":
                        return _context6.stop();
                }
            }
        }, null, null, [
            [0, 6]
        ]);
    };
};

exports.updateMessage = updateMessage;

var getTheme = function getTheme() {
    return function _callee7(dispatch) {
        var theme;
        return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        theme = localStorage.getItem('theme');
                        dispatch({
                            type: "THEME_GET_SUCCESS",
                            payload: {
                                theme: theme ? theme : 'white'
                            }
                        });

                    case 2:
                    case "end":
                        return _context7.stop();
                }
            }
        });
    };
};

exports.getTheme = getTheme;

var themeSet = function themeSet(theme) {
    return function _callee8(dispatch) {
        return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        localStorage.setItem('theme', theme);
                        dispatch({
                            type: "THEME_SET_SUCCESS",
                            payload: {
                                theme: theme
                            }
                        });

                    case 2:
                    case "end":
                        return _context8.stop();
                }
            }
        });
    };
};

exports.themeSet = themeSet;