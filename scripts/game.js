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
		_this.set = new Set();
		_this.item;
		_this.donats1;
		_this.hoverPosX;
		_this.hoverPosY;
		_this.up;
		_this.matches;
		_this.canMove;
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/GameState":2}],2:[function(require,module,exports){
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

			this.add.sprite(0, 0, "background");
			this.donats = this.add.group();
			this.donats1 = [];
			this.canMove = false;
			for (var i = 0; i < 13; i++) {
				this.donats1.push([]);
				for (var j = 0; j < 11; j++) {
					var donat = this.donats.create(i * 98.5, 0, 'gem' + this.rnd.integerInRange(1, 7));
					this.add.tween(donat).to({ y: j * 87.3 }, 500, Phaser.Easing.Linear.In, true);
					donat.scale.setTo(0.9, 0.9);
					donat.inputEnabled = true;
					donat.events.onInputDown.add(function (donat) {
						_this2.canMove = true;
						console.log('create onInputDown', donat.inputEnabled);
						_this2.donat1 = donat;
						_this2.startPointX = Math.floor(donat.x / 98.5);
						_this2.startPointY = Math.floor(donat.y / 87.3);
					});
					donat.events.onInputUp.add(function () {
						_this2.canMove = false;
						if (_this2.donat2 == null) {
							_this2.updateVar();
						}
						console.log('create onInputUp', _this2.canMove, _this2.donat2, _this2.startPointX, _this2.startPointY);
					});
					this.donats1[i].push(donat);
				}
			}
			this.game.time.events.add(600, function () {
				_this2.checkMatches();
			});
		}
	}, {
		key: 'update',
		value: function update() {
			var _this3 = this;

			var pointX = this.input.x;
			var pointY = this.input.y;
			this.hoverPosX = Math.floor(pointX / 98.5);
			this.hoverPosY = Math.floor(pointY / 87.3);
			var difX = this.hoverPosX - this.startPointX;
			var difY = this.hoverPosY - this.startPointY;

			if (!isNaN(difX) && !isNaN(difY)) {
				if (Math.abs(difX) == 1 && difY == 0 || Math.abs(difY) == 1 && difX == 0) {
					this.donat2 = this.donats1[this.hoverPosX][this.hoverPosY];
					if (this.canMove) {
						console.log('update', this.canMove, this.donat2.events.onInputDown);
						this.swap();
						this.game.time.events.add(500, function () {
							_this3.checkMatches();
						});
					}
				}
			}
		}
	}, {
		key: 'swap',
		value: function swap() {
			if (this.donat1 && this.donat2) {
				this.canMove = false;
				this.donats1[this.startPointX][this.startPointY] = this.donat2;

				this.donats1[this.hoverPosX][this.hoverPosY] = this.donat1;
				this.add.tween(this.donat1).to({ x: this.hoverPosX * 98.5, y: this.hoverPosY * 87.3 }, 200, Phaser.Easing.Linear.In, true);
				this.add.tween(this.donat2).to({ x: this.startPointX * 98.5, y: this.startPointY * 87.3 }, 200, Phaser.Easing.Linear.In, true);

				this.donat1 = this.donats1[this.startPointX][this.startPointY];
				this.donat2 = this.donats1[this.hoverPosX][this.hoverPosY];
				console.log("swap", this.canMove, this.donat2);
			}
		}
	}, {
		key: 'updateVar',
		value: function updateVar() {
			this.donat1 = null;
			this.donat2 = null;
			this.startPointX = undefined;
			this.startPointY = undefined;
		}
	}, {
		key: 'checkMatches',
		value: function checkMatches() {
			var _this4 = this;

			this.canMove = false;
			var matches = this.getMatches(this.donats1);
			if (matches.length > 0) {
				this.updateVar();
				this.removeDonatGroup(matches);
				this.resetDonat();
				this.fillNull();
				console.log("checkMatches", this.canMove, this.donat2);
				this.game.time.events.add(600, function () {
					_this4.checkMatches();
				});
			} else {
				if (this.startPointX && this.startPointY) {
					this.canMove = true;
					console.log("checkMatches111", this.canMove, this.donat2);
					this.swap();
				}
				this.updateVar();
			}
		}
	}, {
		key: 'fillNull',
		value: function fillNull() {
			var _this5 = this;

			for (var i = 0; i < 13; i++) {
				for (var j = 0; j < 11; j++) {
					if (this.donats1[i][j] == null) {
						var donat = this.donats.create(i * 98.5, 0, 'gem' + this.rnd.integerInRange(1, 7));
						this.add.tween(donat).to({ y: j * 87.3 }, 500, Phaser.Easing.Linear.In, true);
						donat.scale.setTo(0.9, 0.9);
						donat.inputEnabled = true;
						donat.events.onInputDown.add(function (donat) {
							_this5.canMove = true;
							console.log('create onInputDown', donat.inputEnabled);
							_this5.donat1 = donat;
							_this5.startPointX = Math.floor(donat.x / 98.5);
							_this5.startPointY = Math.floor(donat.y / 87.3);
						});
						donat.events.onInputUp.add(function () {
							_this5.canMove = false;
							if (_this5.donat2 == null) {
								_this5.updateVar();
							}
							console.log('create onInputUp', _this5.canMove, _this5.donat2, _this5.startPointX, _this5.startPointY);
						});
						this.donats1[i][j] = donat;
					}
				}
			}
		}
	}, {
		key: 'resetDonat',
		value: function resetDonat() {
			for (var i = 0; i < 13; i++) {
				for (var j = this.donats1[i].length - 1; j > 0; j--) {
					if (this.donats1[i][j] == null && this.donats1[i][j - 1] != null) {
						var don = this.donats1[i][j - 1];
						this.donats1[i][j] = don;
						this.donats1[i][j - 1] = null;

						this.add.tween(don).to({ y: 87.3 * j }, 200, Phaser.Easing.Linear.In, true);
						j = this.donats1[i].length;
					}
				}
			}
		}
	}, {
		key: 'getMatches',
		value: function getMatches(donats) {
			var matches = [];
			var groups = [];

			for (var j = 0; j < 11; j++) {
				var k = j;
				for (var i = 0; i < 13; i++) {
					matches.push({
						donat: donats[i][j],
						i: i,
						j: j
					});
					if (j < 9) {
						if (donats[i][j] && donats[i][j + 1] && donats[i][j + 2]) {
							if (donats[i][j].key === donats[i][j + 1].key && donats[i][j + 1].key == donats[i][j + 2].key) {
								matches.push({
									donat: donats[i][j + 1],
									i: i,
									j: j + 1
								});
								matches.push({
									donat: donats[i][j + 2],
									i: i,
									j: j + 2
								});
							} else {
								matches = [];
								j = k;
							}
							if (matches.length != 0) {
								j += 2;
								while (j < 10) {
									if (donats[i][j].key === donats[i][j + 1].key) {
										matches.push({
											donat: donats[i][j + 1],
											i: i,
											j: j + 1
										});
									} else break;
									j++;
								}
								groups.push(matches);
								j = k;
								matches = [];
							}
						}
					}
				}
			}
			matches = [];

			for (var _i = 0; _i < 11; _i++) {
				var _k = _i;
				var arr = donats[_i];
				for (var _j = 0; _j < arr.length; _j++) {
					matches.push({
						donat: donats[_i][_j],
						i: _i,
						j: _j
					});
					if (_i < 11) {
						if (donats[_i][_j] && donats[_i + 1][_j] && donats[_i + 2][_j]) {
							if (donats[_i][_j].key === donats[_i + 1][_j].key && donats[_i + 1][_j].key == donats[_i + 2][_j].key) {
								matches.push({
									donat: donats[_i + 1][_j],
									i: _i + 1,
									j: _j
								});
								matches.push({
									donat: donats[_i + 2][_j],
									i: _i + 2,
									j: _j
								});
							} else {
								matches = [];
								_i = _k;
							}
							if (matches.length != 0) {
								_i += 2;
								while (_i < 12) {
									if (donats[_i][_j].key === donats[_i + 1][_j].key) {
										matches.push({
											donat: donats[_i + 1][_j],
											i: _i + 1,
											j: _j
										});
									} else break;
									_i++;
								}
								groups.push(matches);
								_i = _k;
								matches = [];
							}
						}
					}
				}
			}
			matches = [];
			return groups;
		}
	}, {
		key: 'removeDonatGroup',
		value: function removeDonatGroup(donats) {
			for (var i = 0; i < donats.length; i++) {
				var arr = donats[i];
				for (var j = 0; j < arr.length; j++) {
					this.donats.remove(arr[j].donat);
					this.donats1[arr[j].i][arr[j].j] = null;
				}
			}
		}
	}]);

	return GameState;
}(Phaser.State);

exports.default = GameState;

},{}]},{},[1])
//# sourceMappingURL=game.js.map
