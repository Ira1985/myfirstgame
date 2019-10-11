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
		for(let i = 0; i < 143; i++) {
			this.donat = this.add.sprite(0, 0, 'gem' + this.rnd.integerInRange(1, 7));
			this.physics.enable(this.donat, Phaser.Physics.ARCADE);
			this.donat.body.collideWorldBounds = true;
			this.donat.scale.setTo(0.9, 0.9);
			this.donat.inputEnabled = true;
			this.donats.add(this.donat);
		}
		this.donats.align(13, 11, 98.5, 87.3);
		//this.donats.alignIn(back, Phaser.TOP_LEFT, 98.5, 87.3);

		this.donats.children.forEach((item, index) => {

			item.events.onInputDown.add((s, i) => {
			    console.log(index);
				this.startPointX = i.x;
				this.startPointY = i.y;
				index = this.donats.getIndex(item);


				this.input.addMoveCallback((pointer, x, y) => {
				    console.log("addMoveCallback");
					if(Math.abs(this.startPointX - x) > item.width/2 - 10) {
						if(this.startPointX - x > 0) {
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
						}
					} else if(Math.abs(this.startPointY - y) > this.donat.height/2 - 10) {
						if(this.startPointY - y > 0) {
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
						}
					}
				});
			});
            item.events.onInputUp.add(() => {
				//this.donats.children.forEach((item, index) => {
					//console.log(index, item.key);
				//});
                let first;
                let count = 0;
                let arr = [];
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
                let first1;
                let arr1 = [];
                for(let i = 0; i < 13; i++) {
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
									this.add.tween(item).from( { y: '-200'}, 1000, Phaser.Easing.Bounce.Out, true);
								})
								while(it > 0){
									this.add.tween(this.donats.getAt(it)).to( { y: '+' + 87.3 * arr1.length}, 1000, Phaser.Easing.Linear.None, true);
									arr1.forEach((item, index) => {
										//this.donats.swap(this.donats.getAt(it), this.donats.getAt(item));
										//arr1.splice(index, 1, item-13);
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
				}
				this.input.moveCallbacks = [];
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
    update() {
		this.donats.children.forEach((item, index) => {
			this.physics.arcade.collide(item, [this.donats.children[index + 22], this.donats.children[index - 22], this.donats.children[index + 2], this.donats.children[index - 2]], function collide(donat1, donat2) {
				donat1.body.allowGravity = false;
				this.startPointX = undefined;
				this.startPointY = undefined;
			});
		});

        }

}

export default GameState;