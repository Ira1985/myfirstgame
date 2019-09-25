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
		this.donat = this.add.sprite(0, 0, 'gem4');
		this.donat1 = this.add.sprite(180, 0, 'gem5');
		this.donat2 = this.add.sprite(90, 0, 'gem1');
		this.physics.enable(this.donat, Phaser.Physics.ARCADE);
		this.physics.enable(this.donat1, Phaser.Physics.ARCADE);
		this.physics.enable(this.donat2, Phaser.Physics.ARCADE);
		this.donat.body.collideWorldBounds = true;
		this.donat2.body.collideWorldBounds = true;
		this.donat.scale.setTo(0.9, 0.9);
		this.donat1.scale.setTo(0.9, 0.9);
		this.donat2.scale.setTo(0.9, 0.9);
		this.donat.inputEnabled = true;


		this.startPointX;
		this.startPointY;
		let coordX;
		let coordY;
		this.donat.events.onInputDown.add((s, i) => {
			//console.log(this.donat);
			this.physics.enable(this.donat, Phaser.Physics.ARCADE);
			this.startPointX = i.x;
			this.startPointY = i.y;
			coordX = this.donat.x;
			coordY = this.donat.y;
			this.input.addMoveCallback((pointer, x, y) => {
				console.log(this.startPointX - x, this.startPointX, x);
				if(Math.abs(this.startPointX - x) == this.donat.width/2) {
					if(this.startPointX - x > 0) {
						//this.donat.body.gravity.x = -100;
						this.donat.body.velocity.set(-100, 0);
						//this.donat.body.gravity.y = 100;
						//this.donat.body.moveTo(100, 90, 180);
						//this.physics.arcade.moveToXY(this.donat, this.donat.x + 1, this.donat.y, 100, 500);
					}
					if(this.startPointX - x < 0) {
						this.donat.body.velocity.set(100, 0);
						this.donat2.body.velocity.set(-100, 0);
						//this.donat.body.gravity.y = 0;
						//this.donat.body.moveTo(100, 90, 360);
					}
				} else if(Math.abs(this.startPointY - y) == this.donat.height/2) {
					if(this.startPointY - y > 0) {
						//this.donat.body.gravity.y = -100;
						this.donat.body.velocity.set(0, -100);
						//this.donat.body.moveTo(0, 90, 0);
					}
					if(this.startPointY - y < 0) {
						//this.donat.body.gravity.y = 100;
						this.donat.body.velocity.set(0, 100);
						//this.donat.body.moveTo(0, 90, 90);
					}
				}
				if(this.donat.x > coordX + this.donat.width || this.donat.y > coordY + this.donat.width) {
					//console.log('aaaaaaa');
					this.donat.body.velocity.set(0, 0);
					//this.donat.body.allowGravity = false;
					//this.donat.body.mass = 0;
					//console.log(this.donat.x);
				}
			});
			this.donat1.body.immovable = true;
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
        this.physics.arcade.collide(this.donat, this.donat1, function br(donat1, donat2) {
			donat1.body.allowGravity = false;
			this.startPointX = undefined;
			this.startPointY = undefined;
        });

    }

}

export default GameState;