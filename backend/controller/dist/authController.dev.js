"use strict";

var formidable = require('formidable');

var validator = require('validator');

var registerModel = require('../models/authModel');

var fs = require('fs');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

module.exports.userRegister = function (req, res) {
  var form = formidable();
  form.parse(req, function _callee2(err, fields, files) {
    var userName, email, password, confirmPassword, image, error, getImageName, randNumber, newImagename, newPath, checkUser;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userName = fields.userName, email = fields.email, password = fields.password, confirmPassword = fields.confirmPassword;
            image = files.image;
            error = [];

            if (!userName) {
              error.push('please provide your user name');
            }

            if (!email) {
              error.push('please provide your email');
            }

            if (email && !validator.isEmail(email)) {
              error.push('please provide your valid email');
            }

            if (!password) {
              error.push('please provide your password');
            }

            if (!confirmPassword) {
              error.push('please provide user confirm password');
            }

            if (password && confirmPassword && password !== confirmPassword) {
              error.push('your password and confirm password not same');
            }

            if (password && password.length < 6) {
              error.push('please provide password must be 6 charecter');
            }

            if (Object.keys(files).length === 0) {
              error.push('please provide user image');
            }

            if (!(error.length > 0)) {
              _context2.next = 15;
              break;
            }

            res.status(400).json({
              error: {
                errorMessage: error
              }
            });
            _context2.next = 30;
            break;

          case 15:
            getImageName = files.image.name;
            randNumber = Math.floor(Math.random() * 99999);
            newImagename = randNumber + getImageName;
            files.image.name = newImagename;
            newPath = __dirname + "../../../frontend/public/image/".concat(files.image.name);
            _context2.prev = 20;
            _context2.next = 23;
            return regeneratorRuntime.awrap(registerModel.findOne({
              email: email
            }));

          case 23:
            checkUser = _context2.sent;

            if (checkUser) {
              res.status(404).json({
                error: {
                  errorMessage: ['Your Email allready exited']
                }
              });
            } else {
              fs.copyFile(files.image.path, newPath, function _callee(error) {
                var userCreate, token, options;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (error) {
                          _context.next = 19;
                          break;
                        }

                        _context.t0 = regeneratorRuntime;
                        _context.t1 = registerModel;
                        _context.t2 = userName;
                        _context.t3 = email;
                        _context.next = 7;
                        return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

                      case 7:
                        _context.t4 = _context.sent;
                        _context.t5 = files.image.name;
                        _context.t6 = {
                          userName: _context.t2,
                          email: _context.t3,
                          password: _context.t4,
                          image: _context.t5
                        };
                        _context.t7 = _context.t1.create.call(_context.t1, _context.t6);
                        _context.next = 13;
                        return _context.t0.awrap.call(_context.t0, _context.t7);

                      case 13:
                        userCreate = _context.sent;
                        token = jwt.sign({
                          id: userCreate._id,
                          email: userCreate.email,
                          userName: userCreate.userName,
                          image: userCreate.image,
                          registerTime: userCreate.createAt
                        }, process.env.SECRET, {
                          expiresIn: process.env.TOKEN_EXP
                        });
                        options = {
                          expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)
                        };
                        res.status(201).cookie('authToken', token, options).json({
                          successMessage: 'Your Register successfull',
                          token: token
                        });
                        _context.next = 20;
                        break;

                      case 19:
                        res.status(404).json({
                          error: {
                            errorMessage: ['Internal server error']
                          }
                        });

                      case 20:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              });
            }

            _context2.next = 30;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t0 = _context2["catch"](20);
            res.status(404).json({
              error: {
                errorMessage: ['Internal server error']
              }
            });

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[20, 27]]);
  });
};

module.exports.userLogin = function _callee3(req, res) {
  var error, _req$body, email, password, checkUser, matchPassword, token, options;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          error = [];
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!email) {
            error.push('Please provide your email');
          }

          if (!password) {
            error.push('Please provide your password');
          }

          if (email && !validator.isEmail(email)) {
            error.push('Please provide your valid email');
          }

          if (!(error.length > 0)) {
            _context3.next = 9;
            break;
          }

          res.status(400).json({
            error: {
              errorMessage: error
            }
          });
          _context3.next = 26;
          break;

        case 9:
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(registerModel.findOne({
            email: email
          }).select('+password'));

        case 12:
          checkUser = _context3.sent;

          if (!checkUser) {
            _context3.next = 20;
            break;
          }

          _context3.next = 16;
          return regeneratorRuntime.awrap(bcrypt.compare(password, checkUser.password));

        case 16:
          matchPassword = _context3.sent;

          if (matchPassword) {
            token = jwt.sign({
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createAt
            }, process.env.SECRET, {
              expiresIn: process.env.TOKEN_EXP
            });
            options = {
              expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)
            };
            res.status(200).cookie('authToken', token, options).json({
              successMessage: 'Your login successfull',
              token: token
            });
          } else {
            res.status(400).json({
              error: {
                errorMessage: ['your password not valid']
              }
            });
          }

          _context3.next = 21;
          break;

        case 20:
          res.status(400).json({
            error: {
              errorMessage: ['your email not found']
            }
          });

        case 21:
          _context3.next = 26;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](9);
          res.status(404).json({
            error: {
              errorMessage: ['Internal server error']
            }
          });

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[9, 23]]);
};

module.exports.userLogout = function (req, res) {
  res.status(200).cookie('authToken', '').json({
    success: true
  });
};