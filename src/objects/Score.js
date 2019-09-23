class Score extends Phaser.Text {

	constructor(game, x, y, text) {

		super(game, x, y, text, { font: "18px Fredoka One", fill: "#0095DD" });

		this.game.stage.addChild(this);

	}
	

    updateScore() {
        game.score += 10;
        console.log(this.game);
    }

}

export default Score;