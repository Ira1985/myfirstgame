import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(1280, 960, Phaser.CANVAS, null, null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
        this.donat;
        this.newDonat;
        this.donatInfo;
        this.timer;
        this.scoreText;
        this.score;
	}

}

new Game();
