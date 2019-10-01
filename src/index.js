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
	}

}

new Game();
