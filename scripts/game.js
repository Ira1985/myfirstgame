(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _GameState = require('states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 480, 380, Phaser.CANVAS, null, null));

		_this.state.add('GameState', _GameState2.default, false);
		_this.state.start('GameState');
		_this.donats;
		_this.newDonat;
		_this.donatInfo;
		_this.timer;
		_this.scoreText;
		_this.score = 0;
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/GameState":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () {
        function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
        }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
}();

function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
        }
}

function _possibleConstructorReturn(self, call) {
        if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Donats = function (_Phaser$Sprite) {
        _inherits(Donats, _Phaser$Sprite);

        function Donats(game) {
                _classCallCheck(this, Donats);

                var _this = _possibleConstructorReturn(this, (Donats.__proto__ || Object.getPrototypeOf(Donats)).call(this, game, 0, 0));

                game.donatInfo = {
                        width: 20,
                        height: 20,
                        count: {
                                row: 11,
                                col: 13
                        },
                        offset: {
                                top: 10,
                                left: 60
                        },
                        padding: 10
                };
                game.donats = game.add.group();
                for (var i = 0; i < game.donatInfo.count.col; i++) {
                        for (var j = 0; j < game.donatInfo.count.row; j++) {
                                var donatX = i * (game.donatInfo.width + game.donatInfo.padding) + game.donatInfo.offset.left;
                                var donatY = j * (game.donatInfo.height + game.donatInfo.padding) + game.donatInfo.offset.top;
                                game.newDonat = game.add.sprite(donatX, donatY, 'gem' + game.rnd.integerInRange(1, 7));
                                game.newDonat.scale.setTo(0.3, 0.3);
                                game.physics.enable(game.newDonat, Phaser.Physics.ARCADE);
                                game.newDonat.body.collideWorldBounds = true;
                                game.newDonat.body.gravity.y = 1000;
                                game.newDonat.body.immovable = false;
                                game.newDonat.inputEnabled = true;
                                game.newDonat.input.enableDrag();
                                game.donats.add(game.newDonat);
                        }
                }
                return _this;
        }

        _createClass(Donats, [{
                key: "moveLeftAndCheckMatch",
                value: function moveLeftAndCheckMatch(item, game, index, startPointX, startPointY) {
                        var key1 = item.key;
                        var key2 = game.donats.children[index - 11].key;
                        game.donats.children[index - 11].loadTexture(key1);
                        item.loadTexture(key2);
                        item.input.draggable = false;
                        item.x = startPointX;
                        var objOfMatches = {};
                        var idOfMatches = [];
                        for (var i = 0; i < 6; i++) {
                                idOfMatches = [];
                                for (var j = 0; j < 12; j++) {
                                        if (i == 0) {
                                                if (game.donats.children[index - 11].key == game.donats.children[index - 11 - 11 * j].key) {
                                                        idOfMatches.push(index - 11 - 11 * j);
                                                        objOfMatches[game.donats.children[index - 11].key + " 0"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 1) {
                                                if (game.donats.children[index].key == game.donats.children[index + 11 * j].key) {
                                                        idOfMatches.push(index + 11 * j);
                                                        objOfMatches[game.donats.children[index].key + " 1"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 2) {
                                                if (game.donats.children[index - 11].key == game.donats.children[index - 11 - j].key) {
                                                        idOfMatches.push(index - 11 - j);
                                                        objOfMatches[game.donats.children[index - 11].key + " 2"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 3) {
                                                if (game.donats.children[index - 11].key == game.donats.children[index - 11 + j].key) {
                                                        idOfMatches.push(index - 11 + j);
                                                        objOfMatches[game.donats.children[index - 11].key + " 3"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 4) {
                                                if (game.donats.children[index].key == game.donats.children[index - j].key) {
                                                        idOfMatches.push(index - j);
                                                        objOfMatches[game.donats.children[index].key + " 4"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 5) {
                                                if (game.donats.children[index].key == game.donats.children[index + j].key) {
                                                        idOfMatches.push(index + j);
                                                        objOfMatches[game.donats.children[index].key + " 5"] = idOfMatches;
                                                } else break;
                                        }
                                }
                        }
                        var arrOfDelete = Object.values(objOfMatches);
                        this.deleteDonats(arrOfDelete, game);
                }
        }, {
                key: "moveRightAndCheckMatch",
                value: function moveRightAndCheckMatch(item, game, index, startPointX, startPointY) {
                        var key1 = item.key;
                        var key2 = game.donats.children[index + 11].key;
                        game.donats.children[index + 11].loadTexture(key1);
                        item.loadTexture(key2);
                        item.input.draggable = false;
                        item.x = startPointX;
                        var objOfMatches = {};
                        var idOfMatches = [];
                        for (var i = 0; i < 6; i++) {
                                idOfMatches = [];
                                for (var j = 0; j < 12; j++) {
                                        if (i == 0) {
                                                if (game.donats.children[index].key == game.donats.children[index - 11 * j].key) {
                                                        idOfMatches.push(index - 11 * j);
                                                        objOfMatches[game.donats.children[index].key + " 0"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 1) {
                                                if (game.donats.children[index + 11].key == game.donats.children[index + 11 + 11 * j].key) {
                                                        idOfMatches.push(index + 11 + 11 * j);
                                                        objOfMatches[game.donats.children[index + 11].key + " 1"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 2) {
                                                if (game.donats.children[index + 11].key == game.donats.children[index + 11 - j].key) {
                                                        idOfMatches.push(index + 11 - j);
                                                        objOfMatches[game.donats.children[index + 11].key + " 2"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 3) {
                                                if (game.donats.children[index + 11].key == game.donats.children[index + 11 + j].key) {
                                                        idOfMatches.push(index + 11 + j);
                                                        objOfMatches[game.donats.children[index + 11].key + " 3"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 4) {
                                                if (game.donats.children[index].key == game.donats.children[index - j].key) {
                                                        idOfMatches.push(index - j);
                                                        objOfMatches[game.donats.children[index].key + " 4"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 5) {
                                                if (game.donats.children[index].key == game.donats.children[index + j].key) {
                                                        idOfMatches.push(index + j);
                                                        objOfMatches[game.donats.children[index].key + " 5"] = idOfMatches;
                                                } else break;
                                        }
                                }
                        }
                        var arrOfDelete = Object.values(objOfMatches);
                        this.deleteDonats(arrOfDelete, game);
                }
        }, {
                key: "moveUpAndCheckMatch",
                value: function moveUpAndCheckMatch(item, game, index, startPointX, startPointY) {
                        var key1 = item.key;
                        var key2 = game.donats.children[index - 1].key;
                        game.donats.children[index - 1].loadTexture(key1);
                        item.loadTexture(key2);
                        item.input.draggable = false;
                        item.y = startPointY;
                        var objOfMatches = {};
                        var idOfMatches = [];
                        for (var i = 0; i < 6; i++) {
                                idOfMatches = [];
                                for (var j = 0; j < 12; j++) {
                                        if (i == 0) {
                                                if (game.donats.children[index].key == game.donats.children[index + 1 * j].key) {
                                                        idOfMatches.push(index + 1 * j);
                                                        objOfMatches[game.donats.children[index].key + " 0"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 1) {
                                                if (game.donats.children[index - 1].key == game.donats.children[index - 1 - 1 * j].key) {
                                                        idOfMatches.push(index - 1 - 1 * j);
                                                        objOfMatches[game.donats.children[index - 1].key + " 1"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 2) {
                                                if (game.donats.children[index - 1].key == game.donats.children[index - 1 - 11 * j].key) {
                                                        idOfMatches.push(index - 1 - 11 * j);
                                                        objOfMatches[game.donats.children[index - 1].key + " 2"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 3) {
                                                if (game.donats.children[index - 1].key == game.donats.children[index - 1 + 11 * j].key) {
                                                        idOfMatches.push(index - 1 + 11 * j);
                                                        objOfMatches[game.donats.children[index - 1].key + " 3"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 4) {
                                                if (game.donats.children[index].key == game.donats.children[index - 11 * j].key) {
                                                        idOfMatches.push(index - 11 * j);
                                                        objOfMatches[game.donats.children[index].key + " 4"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 5) {
                                                if (game.donats.children[index].key == game.donats.children[index + 11 * j].key) {
                                                        idOfMatches.push(index + 11 * j);
                                                        objOfMatches[game.donats.children[index].key + " 5"] = idOfMatches;
                                                } else break;
                                        }
                                }
                        }
                        var arrOfDelete = Object.values(objOfMatches);
                        arrOfDelete.forEach(function (item) {
                                return console.log(item);
                        });
                        this.deleteDonats(arrOfDelete, game);
                }
        }, {
                key: "moveDownAndCheckMatch",
                value: function moveDownAndCheckMatch(item, game, index, startPointX, startPointY) {
                        var key1 = item.key;
                        var key2 = game.donats.children[index + 1].key;
                        game.donats.children[index + 1].loadTexture(key1);
                        item.loadTexture(key2);
                        item.input.draggable = false;
                        item.y = startPointY;
                        var objOfMatches = {};
                        var idOfMatches = [];
                        for (var i = 0; i < 6; i++) {
                                idOfMatches = [];
                                for (var j = 0; j < 12; j++) {
                                        if (i == 0) {
                                                if (game.donats.children[index].key == game.donats.children[index - 1 * j].key) {
                                                        idOfMatches.push(index - 1 * j);
                                                        objOfMatches[game.donats.children[index].key + " 0"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 1) {
                                                if (game.donats.children[index + 1].key == game.donats.children[index + 1 + 1 * j].key) {
                                                        idOfMatches.push(index + 1 + 1 * j);
                                                        objOfMatches[game.donats.children[index + 1].key + " 1"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 2) {
                                                if (game.donats.children[index + 1].key == game.donats.children[index + 1 - 11 * j].key) {
                                                        idOfMatches.push(index + 1 - 11 * j);
                                                        objOfMatches[game.donats.children[index + 1].key + " 2"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 3) {
                                                if (game.donats.children[index + 1].key == game.donats.children[index + 1 + 11 * j].key) {
                                                        idOfMatches.push(index + 1 + 11 * j);
                                                        objOfMatches[game.donats.children[index + 1].key + " 3"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 4) {
                                                if (game.donats.children[index].key == game.donats.children[index - 11 * j].key) {
                                                        idOfMatches.push(index - 11 * j);
                                                        objOfMatches[game.donats.children[index].key + " 4"] = idOfMatches;
                                                } else break;
                                        }
                                        if (i == 5) {
                                                if (game.donats.children[index].key == game.donats.children[index + 11 * j].key) {
                                                        idOfMatches.push(index + 11 * j);
                                                        objOfMatches[game.donats.children[index].key + " 5"] = idOfMatches;
                                                } else break;
                                        }
                                }
                        }
                        var arrOfDelete = Object.values(objOfMatches);
                        arrOfDelete.forEach(function (item) {
                                return console.log(item);
                        });
                        this.deleteDonats(arrOfDelete, game);
                }
        }, {
                key: "deleteDonats",
                value: function deleteDonats(arrOfDelete, game) {
                        var _this2 = this;

                        arrOfDelete.forEach(function (item) {
                                if (item.length >= 3) {
                                        item.forEach(function (elem) {
                                                var row = Math.ceil(elem / 11);
                                                var minRow = row * 11 - 11;
                                                for (var i = elem; i > minRow; i--) {
                                                        game.donats.children[i].loadTexture(game.donats.children[i - 1].key);
                                                }
                                                game.donats.children[minRow].loadTexture('gem' + game.rnd.integerInRange(1, 7));
                                                game.score += 10;
                                                game.scoreText.setText('Points: ' + game.score);
                                                _this2.gameOver(game.score);
                                        });
                                }
                        });
                }
        }, {
                key: "gameOver",
                value: function gameOver(score) {
                        if (score > 100) {
                                alert('Game over');
                                location.reload();
                        }
                }
        }]);

        return Donats;
}(Phaser.Sprite);

exports.default = Donats;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Score = function (_Phaser$Text) {
	_inherits(Score, _Phaser$Text);

	function Score(game, x, y, text) {
		_classCallCheck(this, Score);

		var _this = _possibleConstructorReturn(this, (Score.__proto__ || Object.getPrototypeOf(Score)).call(this, game, x, y, text, { font: "18px Fredoka One", fill: "#0095DD" }));

		_this.game.stage.addChild(_this);

		return _this;
	}

	_createClass(Score, [{
		key: "updateScore",
		value: function updateScore() {
			game.score += 10;
			console.log(this.game);
		}
	}]);

	return Score;
}(Phaser.Text);

exports.default = Score;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Score = require('objects/Score');

var _Score2 = _interopRequireDefault(_Score);

var _Donats = require('objects/Donats');

var _Donats2 = _interopRequireDefault(_Donats);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'preload',
    value: function preload() {
      var img = 'img/';
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.stage.backgroundColor = "#eee";
      this.load.image('gem1', img + 'gem-01.png');
      this.load.image('gem2', img + 'gem-02.png');
      this.load.image('gem3', img + 'gem-03.png');
      this.load.image('gem4', img + 'gem-04.png');
      this.load.image('gem5', img + 'gem-05.png');
      this.load.image('gem6', img + 'gem-06.png');
      this.load.image('gem7', img + 'gem-07.png');
      this.load.image('background', img + 'background.jpg');
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.physics.startSystem(Phaser.Physics.ARCADE);
      var back = this.add.sprite(62.5, 50, "background");
      back.scale.setTo(0.3, 0.345);
      this.score = 0;
      this.scoreText = new _Score2.default(this.game, 340, 10, "Points: " + this.game.score);
      this.timeInSeconds = 120;
      this.timeText = this.game.add.text(60, 30, "0:00", { font: '18px Fredoka One', fill: '#0095DD' });
      this.timeText.anchor.set(0.5, 0.5);

      var donats = this.add.existing(new _Donats2.default(this));
      this.donats.children.forEach(function (item, index) {
        var startPointX = 0;
        var startPointY = 0;
        item.events.onInputDown.add(function () {
          item.input.draggable = true;
        });
        item.events.onDragStart.add(function () {
          startPointX = item.x;
          startPointY = item.y;
        }, _this2);
        item.events.onDragUpdate.add(function () {
          var differenceX = startPointX - item.x;
          var differenceY = startPointY - item.y;

          if (differenceX > 10 && differenceY < 2 && differenceY > -2) {
            donats.moveLeftAndCheckMatch(item, _this2, index, startPointX, startPointY);
          } else if (differenceX < -10 && differenceY < 2 && differenceY > -2) {
            donats.moveRightAndCheckMatch(item, _this2, index, startPointX, startPointY);
          } else if (differenceY > 10 && differenceX < 2 && differenceX > -2) {
            donats.moveUpAndCheckMatch(item, _this2, index, startPointX, startPointY);
          } else if (differenceY < -10 && differenceX < 2 && differenceX > -2) {
            donats.moveDownAndCheckMatch(item, _this2, index, startPointX, startPointY);
          }
        });
      });
    }
  }, {
    key: 'update',
    value: function update() {
      this.physics.arcade.collide(this.donats, this.donats, function br(donat1, donat2) {
        donat1.body.allowGravity = false;
        donat2.body.allowGravity = false;
      });
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"objects/Donats":2,"objects/Score":3}]},{},[1])
//# sourceMappingURL=game.js.map
