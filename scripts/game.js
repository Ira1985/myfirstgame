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

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 1280, 960, Phaser.CANVAS, null, null));

		_this.state.add('GameState', _GameState2.default, false);
		_this.state.start('GameState');
		_this.donat;
		_this.donat1;
		_this.donat2;
		_this.newDonat;
		_this.donatInfo;
		_this.timer;
		_this.scoreText;
		_this.score;
		_this.startPointX;
		_this.startPointY;
		_this.donats;
		_this.timer;
		_this.count;
		_this.timer1;
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
			//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			//this.scale.pageAlignHorizontally = true;
			//this.scale.pageAlignVertically = true;
			//this.stage.backgroundColor = "#eee";
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
			var back = this.add.sprite(0, 0, "background");
			this.donats = this.add.group();
			/*for(let i = 0; i < 13; i++) {
   	for(let j = 0; j < 11; j++) {
   		this.donat = this.add.sprite(i*98.5, j*87.3, 'gem' + this.rnd.integerInRange(1, 7));
   		this.physics.enable(this.donat, Phaser.Physics.ARCADE);
   		this.donat.body.collideWorldBounds = true;
   		this.donat.scale.setTo(0.9, 0.9);
   		this.donat.inputEnabled = true;
   		this.donats.add(this.donat);
   	}
   };*/
			for (var i = 0; i < 143; i++) {
				this.donat = this.add.sprite(0, 0, 'gem' + this.rnd.integerInRange(1, 7));
				this.physics.enable(this.donat, Phaser.Physics.ARCADE);
				this.donat.body.collideWorldBounds = true;
				this.donat.scale.setTo(0.9, 0.9);
				this.donat.inputEnabled = true;
				this.donats.add(this.donat);
			}
			this.donats.align(13, 11, 98.5, 87.3);
			//this.donats.alignIn(back, Phaser.TOP_LEFT, 98.5, 87.3);

			this.timer = this.time.create(false);
			this.count = 0;
			this.timer1 = this.time.create(false);

			this.donats.children.forEach(function (item, index) {

				item.events.onInputDown.add(function (s, i) {
					_this2.startPointX = i.x;
					_this2.startPointY = i.y;
					index = _this2.donats.getIndex(item);

					_this2.input.addMoveCallback(function (pointer, x, y) {
						if (Math.abs(_this2.startPointX - x) > item.width / 2 - 10) {
							/*if(this.startPointX - x > 0) {
       	this.add.tween(item).to( { x: '-98.5'}, 1000, Phaser.Easing.Linear.None, true);
                             this.add.tween(this.donats.children[index - 1]).to( { x: '+98.5'}, 1000, Phaser.Easing.Linear.None, true);
       	let donat1 = this.donats.getAt(index);
       	let donat2 = this.donats.getAt(index - 1);
       	this.donats.swap(donat1, donat2);
                             this.input.moveCallbacks = [];
       }
       if(this.startPointX - x < 0) {
       	//item.body.velocity.set(100, 0);
       	//this.donats.children[index + 11].body.velocity.set(-100, 0);
       	//this.add.tween(item).to( { x: item.x + item.width}, 4000, Phaser.Easing.Bounce.Out, true);
                             //let d = this.donats.children[index + 11];
                             //this.donats.children[index + 11] = this.donats.children[index];
       	//this.donats.children[index] = d;
       	//this.donats.swap(this.donats.children[index + 11], item);
       	//this.donats.updateZ();
       	//this.donats.replace(this.donats.getAt(index), donat2);
       	//this.donats.add(donat1, null, index + 1);
       	//this.donats.update();
       	//this.donats.reverse();
       	//this.donats.replace(this.donats.children[index + 11], donat1);
                             //item = d;
                             //item.x = donats.children[index + 11].x;
       	//console.log(this.donats.getIndex(item));
       	//this.donats.setChildIndex(item, index + 1);
       	this.add.tween(this.donats.getAt(index)).to( { x: '+98.5'}, 1000, Phaser.Easing.Linear.None, true);
       	this.add.tween(this.donats.getAt(index + 1)).to( { x: '-98.5'}, 1000, Phaser.Easing.Linear.None, true);
       	let donat1 = this.donats.getAt(index);
       	let donat2 = this.donats.getAt(index + 1);
       	this.donats.swap(donat1, donat2);
       	this.input.moveCallbacks = [];
       }*/
							_this2.move1(_this2.startPointX - x, item, index);
						} else if (Math.abs(_this2.startPointY - y) > _this2.donat.height / 2 - 10) {
							/*if(this.startPointY - y > 0) {
                             this.add.tween(item).to( { y: '-87.3'}, 1000, Phaser.Easing.Linear.None, true);
                             this.add.tween(this.donats.children[index - 13]).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
       	let donat1 = this.donats.getAt(index);
       	let donat2 = this.donats.getAt(index - 13);
       	this.donats.swap(donat1, donat2);
                             this.input.moveCallbacks = [];
       }
       if(this.startPointY - y < 0) {
                             this.add.tween(item).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
                             this.add.tween(this.donats.children[index + 13]).to( { y: '-87.3'}, 1000, Phaser.Easing.Linear.None, true);
       	let donat1 = this.donats.getAt(index);
       	let donat2 = this.donats.getAt(index + 13);
       	this.donats.swap(donat1, donat2);
                             this.input.moveCallbacks = [];
       }*/
							_this2.move2(_this2.startPointY - y, item, index);
						}
						console.log("addMoveCallback");
					});
					//let timer = this.time.create(false);
					//let s1 = timer.loop(2000, this.move3, this, this.donats);
					//timer.start();
					//let result = this.move3(this.donats);
					//this.deleteArr(result, this.donats)
					//let timer = this.time.create(false);
					//timer.add(1000, this.deleteArr, this, this.move3(this.donats), this.donats);
					//timer.start();
				});
				item.events.onInputUp.add(function () {
					//this.donats.children.forEach((item, index) => {
					//console.log(index, item.key);
					//});
					var first = void 0;
					var count = 0;
					var arr = [];
					/* for(let i = 0; i < this.donats.length; i++) {
          if(i%13 == 0 || first.key != this.donats.getAt(i).key) {
              first = this.donats.getAt(i);
              if(count > 1) {
                  //console.log(arr);
                  arr.forEach(item => {
                      this.donats.getAt(item).kill();
                      while(item > 12) {
                          let next =this.donats.getAt(item - 13);
                          this.add.tween(this.donats.getAt(item - 13)).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
                          let item1 = this.donats.getAt(item);
                          item1.x = this.donats.getAt(item).x;
                          item1.y = 0;
                          this.add.tween(item1).from( { y: '-200'}, 1000, Phaser.Easing.Bounce.Out, true);
                          this.donats.swap(this.donats.getAt(item), next);
                          item -= 13;
                      }
                      this.donats.getAt(item).loadTexture('gem' + this.rnd.integerInRange(1, 7));
                      this.donats.getAt(item).visible = true;
                    });
     this.input.moveCallbacks = [];
                  //return true;
              }
              count = 0;
              arr = [];
              arr.push(i);
              continue;
          } else {
              count++;
              arr.push(i);
          }
      }*/
					var first1 = void 0;
					var arr1 = [];
					/*for(let i = 0; i < 13; i++) {
     	first1 = this.donats.getAt(i);
     	let j = i + 13;
     	arr1.push(i);
     	while(j < this.donats.length + 13) {
     if(first1.key == this.donats.getAt(j).key) {
     arr1.push(j);
     } else {
     if(arr1.length > 2) {
     let it = arr1[0] - 13;
     console.log(arr1);
     arr1.forEach((item, index) => {
     let don = this.donats.getAt(item).kill();
     don.loadTexture('gem' + this.rnd.integerInRange(1, 7));
     don.visible = true;
     don.x = this.donats.getAt(item).x;
     don.y = 0 + index*87.3;
     //this.add.tween(item).from( { y: '-200'}, 1000, Phaser.Easing.Bounce.Out, true);
     })
     while(it > 0){
     this.add.tween(this.donats.getAt(it)).to( { y: '+' + 87.3 * arr1.length}, 1000, Phaser.Easing.Linear.None, true);
     arr1.forEach((item, index) => {
     this.donats.swap(this.donats.getAt(it + 13*index), this.donats.getAt(item));
     arr1.splice(index, 1, item-13);
     })
     //this.donats.swap(this.donats.getAt(it), this.donats.getAt(it1));
     it -= 13;
     }
     //this.input.moveCallbacks = [];
     //return true;
     }
     first1 = this.donats.getAt(j);
     arr1 = [];
     arr1.push(j);
     }
     j += 13;
     }
     arr1 = [];
     }*/
					_this2.input.moveCallbacks = [];
				});
			});

			/*this.donat.events.onDragUpdate.add(() => {
   	console.log(startPointX, startPointY, x, y);
   	if(Math.abs(startPointX - x) > Math.abs(startPointY - y)) {
   		console.log('aaaaaa');
   		this.donat.input.allowVerticalDrag = true;
   		this.donat.input.allowHorizontalDrag = false;
   			} else if(Math.abs(startPointX - x) < Math.abs(startPointY - y)) {
   		console.log('bbbbbb');
   		this.donat.input.allowVerticalDrag = false;
   		this.donat.input.allowHorizontalDrag = true;
   	}
   });*/
			/*this.physics.startSystem(Phaser.Physics.ARCADE);
   let back = this.add.sprite(62.5, 50, "background");
   back.scale.setTo(0.3,0.345);
   this.score = 0;
   this.scoreText = new Score(this.game, 340, 10, "Points: " + this.game.score);
   this.timeInSeconds = 120;
   this.timeText = this.game.add.text(60, 30, "0:00",{font: '18px Fredoka One', fill: '#0095DD'});
   this.timeText.anchor.set(0.5, 0.5);
     let donats = this.add.existing( new Donats(this) );
   this.donats.children.forEach((item, index) => {
   let startPointX = 0;
   let startPointY = 0;
   item.events.onInputDown.add(() => {
   item.input.draggable = true;
   });
   item.events.onDragStart.add(() => {
   startPointX = item.x;
   startPointY = item.y;
   }, this);
   item.events.onDragUpdate.add(() => {
   let differenceX = startPointX - item.x;
   let differenceY = startPointY - item.y;
                 if(differenceX > 10 && differenceY < 2 && differenceY > -2) {
       donats.moveLeftAndCheckMatch(item, this, index, startPointX, startPointY);
   } else if(differenceX < -10 && differenceY < 2 && differenceY > -2) {
       donats.moveRightAndCheckMatch(item, this, index, startPointX, startPointY);
   } else if(differenceY > 10 && differenceX < 2 && differenceX > -2) {
       donats.moveUpAndCheckMatch(item, this, index, startPointX, startPointY);
   } else if(differenceY < -10 && differenceX < 2 && differenceX > -2) {
       donats.moveDownAndCheckMatch(item, this, index, startPointX, startPointY);
   }
   });
   })*/
		}
	}, {
		key: 'update',
		value: function update() {
			var _this3 = this;

			this.donats.children.forEach(function (item, index) {
				_this3.physics.arcade.collide(item, [_this3.donats.children[index + 22], _this3.donats.children[index - 22], _this3.donats.children[index + 2], _this3.donats.children[index - 2]], function collide(donat1, donat2) {
					donat1.body.allowGravity = false;
					this.startPointX = undefined;
					this.startPointY = undefined;
				});
				_this3.timer.add(1000, _this3.deleteArr, _this3, _this3.move3(_this3.donats), _this3.move4(_this3.donats), _this3.donats);
				_this3.timer.start();
				//this.timer.add(1000, this.deleteArr1, this, this.move4(this.donats), this.donats);
				//this.timer.start();
				//let timer = this.time.create(false);
				//timer.add(1000, this.deleteArr, this, this.move3(this.donats), this.donats);
				//timer.start();
			});
		}
	}, {
		key: 'move1',
		value: function move1(a, item, index) {
			if (a > 0) {
				this.add.tween(item).to({ x: '-98.5' }, 1000, Phaser.Easing.Linear.None, true);
				this.add.tween(this.donats.children[index - 1]).to({ x: '+98.5' }, 1000, Phaser.Easing.Linear.None, true);
				var donat1 = this.donats.getAt(index);
				var donat2 = this.donats.getAt(index - 1);
				this.donats.swap(donat1, donat2);
				this.input.moveCallbacks = [];
			}
			if (a < 0) {
				this.add.tween(this.donats.getAt(index)).to({ x: '+98.5' }, 1000, Phaser.Easing.Linear.None, true);
				this.add.tween(this.donats.getAt(index + 1)).to({ x: '-98.5' }, 1000, Phaser.Easing.Linear.None, true);
				var _donat = this.donats.getAt(index);
				var _donat2 = this.donats.getAt(index + 1);
				this.donats.swap(_donat, _donat2);
				this.input.moveCallbacks = [];
			}
		}
	}, {
		key: 'move2',
		value: function move2(a, item, index) {
			if (a > 0) {
				this.add.tween(item).to({ y: '-87.3' }, 1000, Phaser.Easing.Linear.None, true);
				this.add.tween(this.donats.children[index - 13]).to({ y: '+87.3' }, 1000, Phaser.Easing.Linear.None, true);
				var donat1 = this.donats.getAt(index);
				var donat2 = this.donats.getAt(index - 13);
				this.donats.swap(donat1, donat2);
				this.input.moveCallbacks = [];
			}
			if (a < 0) {
				this.add.tween(item).to({ y: '+87.3' }, 1000, Phaser.Easing.Linear.None, true);
				this.add.tween(this.donats.children[index + 13]).to({ y: '-87.3' }, 1000, Phaser.Easing.Linear.None, true);
				var _donat3 = this.donats.getAt(index);
				var _donat4 = this.donats.getAt(index + 13);
				this.donats.swap(_donat3, _donat4);
				this.input.moveCallbacks = [];
			}
		}
	}, {
		key: 'move3',
		value: function move3(a) {
			var first1 = void 0;
			var arr1 = [];
			for (var i = 0; i < 13; i++) {
				first1 = a.getAt(i);
				var j = i + 13;
				arr1.push(i);
				while (j < a.length + 13) {
					if (first1.key == a.getAt(j).key) {
						arr1.push(j);
					} else {
						if (arr1.length > 2) {
							//console.log("move3", arr1);
							return arr1;
						}
						first1 = a.getAt(j);
						arr1 = [];
						arr1.push(j);
					}
					j += 13;
				}
				arr1 = [];
			}
			return arr1;
		}
	}, {
		key: 'deleteArr',
		value: function deleteArr(arr1, arr, a) {
			var _this4 = this;

			console.log(arr1, arr);
			var it = arr1[0] - 13;
			arr1.forEach(function (item, index) {
				var don = a.getAt(item).kill();
				don.loadTexture('gem' + _this4.rnd.integerInRange(1, 7));
				don.visible = true;
				don.x = _this4.donats.getAt(item).x;
				don.y = 0 + index * 87.3;
				_this4.add.tween(don).from({ y: '-200' }, 1000, Phaser.Easing.Bounce.Out, true);
			});
			this.timer.destroy();
			while (it > 0) {
				console.log(it);
				var str = 87.3 * arr1.length;
				this.add.tween(a.getAt(it)).to({ y: '+' + str }, 1000, Phaser.Easing.Linear.None, true);
				arr1.forEach(function (item, index) {
					a.swap(a.getAt(it + 13 * index), a.getAt(item));
					arr1.splice(index, 1, item - 13);
				});
				//this.donats.swap(this.donats.getAt(it), this.donats.getAt(it1));
				it -= 13;
			}
			this.count++;
			if (this.count > 1) {
				this.timer.destroy();
				this.count = 0;
			}

			if (arr.length < 3) {
				arr = [];
			}
			arr.forEach(function (item) {
				a.getAt(item).kill();
				while (item > 12) {
					var next = a.getAt(item - 13);
					_this4.add.tween(a.getAt(item - 13)).to({ y: '+87.3' }, 1000, Phaser.Easing.Linear.None, true);
					var item1 = a.getAt(item);
					item1.x = a.getAt(item).x;
					item1.y = 0;
					_this4.add.tween(item1).from({ y: '-200' }, 1000, Phaser.Easing.Bounce.Out, true);
					a.swap(a.getAt(item), next);
					item -= 13;
				}

				a.getAt(item).loadTexture('gem' + _this4.rnd.integerInRange(1, 7));
				a.getAt(item).visible = true;
				_this4.timer.destroy();
			});
		}
	}, {
		key: 'move4',
		value: function move4(a) {
			var first = void 0;
			var count = 0;
			var arr = [];
			for (var i = 0; i < a.length; i++) {
				if (i % 13 == 0 || first.key != a.getAt(i).key) {
					first = a.getAt(i);
					if (count > 1) {
						return arr;
					}
					count = 0;
					arr = [];
					arr.push(i);
					continue;
				} else {
					count++;
					arr.push(i);
				}
			}
			return arr;
		}
	}, {
		key: 'deleteArr1',
		value: function deleteArr1(arr, a) {
			var _this5 = this;

			if (arr.length < 3) {
				arr = [];
			}
			arr.forEach(function (item) {
				a.getAt(item).kill();
				while (item > 12) {
					var next = a.getAt(item - 13);
					_this5.add.tween(a.getAt(item - 13)).to({ y: '+87.3' }, 1000, Phaser.Easing.Linear.None, true);
					var item1 = a.getAt(item);
					item1.x = a.getAt(item).x;
					item1.y = 0;
					_this5.add.tween(item1).from({ y: '-200' }, 1000, Phaser.Easing.Bounce.Out, true);
					a.swap(a.getAt(item), next);
					item -= 13;
				}

				a.getAt(item).loadTexture('gem' + _this5.rnd.integerInRange(1, 7));
				a.getAt(item).visible = true;
				_this5.timer.destroy();
			});
			//this.input.moveCallbacks = [];
		}
	}]);

	return GameState;
}(Phaser.State);

exports.default = GameState;

},{"objects/Donats":2,"objects/Score":3}]},{},[1])
//# sourceMappingURL=game.js.map
