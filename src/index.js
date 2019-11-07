import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(1280, 960, Phaser.CANVAS, null, null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
        this.donat;
		this.donat1;
		this.donat2;
        this.newDonat;
        this.donatInfo;
        this.timer;
        this.scoreText;
        this.score;
		this.startPointX;
		this.startPointY;
		this.donats;
		this.timer;
		this.count;
		this.timer1;
		this.set = new Set();
		this.item;
		this.donats1;
		this.hoverPosX;
		this.hoverPosY;
		this.up;
		this.matches;
	}

}

new Game();
