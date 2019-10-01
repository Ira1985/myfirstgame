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
		this.donats = this.add.group();
		for(let i = 0; i < 13; i++) {
			for(let j = 0; j < 11; j++) {
				this.donat = this.add.sprite(i*98.5, j*87.3, 'gem' + this.rnd.integerInRange(1, 7));
				this.physics.enable(this.donat, Phaser.Physics.ARCADE);
				this.donat.body.collideWorldBounds = true;
				this.donat.scale.setTo(0.9, 0.9);
				this.donat.inputEnabled = true;
				this.donats.add(this.donat);
			}
		};

		this.donats.children.forEach((item, index) => {
			let coordX;
			let coordY;

			item.events.onInputDown.add((s, i) => {
			    console.log(item.key, index, item.x, item.y, this.donats.children[index + 11].key, this.donats.children[index + 11].x, this.donats.children[index + 11].y);
				this.startPointX = i.x;
				this.startPointY = i.y;
				coordX = item.x;
				coordY = item.y;
				let tween;
				//this.add.tween(item).to({alpha: -1}, 2000);
				//this.add.tween(item).to( { x: '+98.5'}, 1000, Phaser.Easing.Linear.None, true);

				this.input.addMoveCallback((pointer, x, y) => {
					if(Math.abs(this.startPointX - x) == item.width/2) {
						if(this.startPointX - x > 0) {
							//item.body.velocity.set(-100, 0);
							//this.donats.children[index - 11].body.velocity.set(100, 0);
							//let t = this.add.tween(item).to( { alpha: -1}, 2000, "Linear", true, 0, 1);
							this.add.tween(item).to( { x: '-98.5'}, 1000, Phaser.Easing.Linear.None, true);
                            this.add.tween(this.donats.children[index - 11]).to( { x: '+98.5'}, 1000, Phaser.Easing.Linear.None, true);
                            this.input.moveCallbacks = [];
							//t.yoyo(true, 3000);
						}
						if(this.startPointX - x < 0) {
							//item.body.velocity.set(100, 0);
							//this.donats.children[index + 11].body.velocity.set(-100, 0);
							//this.add.tween(item).to( { x: item.x + item.width}, 4000, Phaser.Easing.Bounce.Out, true);
                            this.add.tween(item).to( { x: '+98.5'}, 1000, Phaser.Easing.Linear.None, true);
                            this.add.tween(this.donats.children[index + 11]).to( { x: '-98.5'}, 1000, Phaser.Easing.Linear.None, true);
                            //let d = this.donats.children[index + 11];
                            //this.donats.children[index + 11] = item;
                            //item = d;
                            //item.x = donats.children[index + 11].x;
                            this.input.moveCallbacks = [];
						}
					} else if(Math.abs(this.startPointY - y) == this.donat.height/2) {
						if(this.startPointY - y > 0) {
							//item.body.velocity.set(0, -100);
							//this.donats.children[index - 1].body.velocity.set(0, 100);
							//this.add.tween(item).to( { y: item.y - item.height}, 4000, Phaser.Easing.Bounce.Out, true);
                            this.add.tween(item).to( { y: '-87.3'}, 1000, Phaser.Easing.Linear.None, true);
                            this.add.tween(this.donats.children[index - 1]).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
                            this.input.moveCallbacks = [];
						}
						if(this.startPointY - y < 0) {
							//item.body.velocity.set(0, 100);
							//this.donats.children[index + 1].body.velocity.set(0, -100);
							//this.add.tween(item).to( { y: item.y + item.height}, 4000, Phaser.Easing.Bounce.Out, true);
                            this.add.tween(item).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
                            this.add.tween(this.donats.children[index + 1]).to( { y: '-87.3'}, 1000, Phaser.Easing.Linear.None, true);
                            this.input.moveCallbacks = [];
						}
					}
					if(item.x > coordX + item.width || item.y > coordY + item.width) {
						//item.body.velocity.set(0, 0);
						//item.events.destroy();
					}
				});
				this.donats.children[index + 2].body.immovable = true;
				this.donats.children[index + 22].body.immovable = true;
				this.donats.children[index - 2].body.immovable = true;
				this.donats.children[index - 22].body.immovable = true;
			});
            item.events.onInputUp.add(() => this.input.moveCallbacks = []);

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
		this.donats.children.forEach((item, index) => {
			this.physics.arcade.collide(item, [this.donats.children[index + 22], this.donats.children[index - 22], this.donats.children[index + 2], this.donats.children[index - 2]], function collide(donat1, donat2) {
				donat1.body.allowGravity = false;
				this.startPointX = undefined;
				this.startPointY = undefined;
			});
		})

    }

}

export default GameState;