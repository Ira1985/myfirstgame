import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(480, 380, Phaser.CANVAS, null, null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
        this.donats;
        this.newDonat;
        this.donatInfo;
        this.timer;
        this.scoreText;
        this.score = 0;
	}

}

new Game();
