import Score from 'objects/Score';
import Donats from 'objects/Donats';

class GameState extends Phaser.State {
    preload() {
        const img = 'img/';
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        //this.stage.backgroundColor = "#eee";
        this.load.image('gem1', img+'gem-01.png');
        this.load.image('gem2', img+'gem-02.png');
        this.load.image('gem3', img+'gem-03.png');
        this.load.image('gem4', img+'gem-04.png');
        this.load.image('gem5', img+'gem-05.png');
        this.load.image('gem6', img+'gem-06.png');
        this.load.image('gem7', img+'gem-07.png');
        this.load.image('background', img+'background.jpg');
        
    }

	create() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		let back = this.add.sprite(0, 0, "background");
		this.donat = this.add.sprite(60, 60, 'gem4');
		this.physics.enable(this.donat, Phaser.Physics.ARCADE);
		this.donat.scale.setTo(0.9, 0.9);
		this.donat.inputEnabled = true;


		let startPointX;
		let startPointY;
		let coordX;
		let coordY;
		this.donat.events.onInputDown.add((s, i) => {
			startPointX = i.x;
			startPointY = i.y;
			coordX = this.donat.x;
			coordY = this.donat.y;
		});
		this.input.addMoveCallback((pointer, x, y) => {
			console.log(this.donat.x, coordX + this.donat.width);
			if(Math.abs(startPointX - x) == this.donat.width/2) {
				this.donat.body.gravity.x = 100;
			} else if(Math.abs(startPointY - y) == this.donat.height/2) {
				this.donat.body.gravity.y = -100;
			}
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
    update() {
        /*this.physics.arcade.collide(this.donats, this.donats, function br(donat1, donat2) {
            donat1.body.allowGravity = false;
            donat2.body.allowGravity = false;
        });*/
		this.score = this.input.x;
    }

}

export default GameState;