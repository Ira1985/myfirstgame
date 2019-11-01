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
		this.add.sprite(0, 0, "background");
		this.donats = this.add.group();
		this.donats1 = [];
		for(let i = 0; i < 13; i++) {
			this.donats1.push([])
			for(let j = 0; j < 11; j++) {
				let donat = this.donats.create(i*98.5, 0, 'gem' + this.rnd.integerInRange(1, 7));
				this.add.tween(donat).to({y: j*87.3}, 500, Phaser.Easing.Linear.In, true);
				donat.scale.setTo(0.9, 0.9);
				donat.inputEnabled = true;
				donat.events.onInputDown.add((donat) => {
					this.donat1 = donat;
					this.startPointX = Math.floor(donat.x/98.5);
					this.startPointY = Math.floor(donat.y/87.3);
				})
				donat.events.onInputUp.add(() => {
					this.donats1[this.startPointX][this.startPointY] = this.donat2;
					this.donats1[this.hoverPosX][this.hoverPosY] = this.donat1;
				
					this.startPointX = undefined;
					this.startPointY = undefined;
				})
				this.donats1[i].push(donat);
			}
		}		
	}
    update() {
		/*this.donats.children.forEach((item, index) => {
			this.physics.arcade.collide(item, [this.donats.children[index + 22], this.donats.children[index - 22], this.donats.children[index + 2], this.donats.children[index - 2]], function collide(donat1, donat2) {
				donat1.body.allowGravity = false;
				this.startPointX = undefined;
				this.startPointY = undefined;
			});
		});*/
		/*if(this.move3(this.donats).length != 0 && this.move4(this.donats).length > 2) {
				this.timer.add(1000, this.deleteArr, this, [], this.move4(this.donats), this.donats);
				this.timer.start();
			}
		this.timer.add(1000, this.deleteArr, this, this.move3(this.donats), this.move4(this.donats), this.donats);
		this.timer.start();*/
		let pointX = this.input.x;
		let pointY = this.input.y;
		this.hoverPosX = Math.floor(pointX/98.5);
		this.hoverPosY = Math.floor(pointY/87.3);
		let difX = this.hoverPosX - this.startPointX;
		let difY = this.hoverPosY - this.startPointY;
		if(!isNaN(difX) && !isNaN(difY)) {
			if((Math.abs(difX) == 1 && difY == 0) || (Math.abs(difY) == 1 && difX == 0)) {
				this.donat2 = this.donats1[this.hoverPosX][this.hoverPosY];
				this.add.tween(this.donat1).to({x: this.hoverPosX*98.5, y: this.hoverPosY*87.3}, 200, Phaser.Easing.Linear.In, true);
				this.add.tween(this.donat2).to({x: this.startPointX*98.5, y: this.startPointY*87.3}, 200, Phaser.Easing.Linear.In, true);
				//this.donats1[this.startPointX][this.startPointY] = this.donat2;
				//this.donats1[this.hoverPosX][this.hoverPosY] = this.donat1;
			}
		}
	}
move1() {
	let pos1 = {x: this.donat1.x, y: this.donat1.y};
	let pos2 = {x: this.donat2.x, y: this.donat2.y};
	console.log(pos1.x, pos1.y, pos2.x, pos2.y);
	
}
/*move1(a, item, index) {
	if(a > 0) {
		this.add.tween(item).to( { x: '-98.5'}, 1000, Phaser.Easing.Linear.None, true);
		this.add.tween(this.donats.children[index - 1]).to( { x: '+98.5'}, 1000, Phaser.Easing.Linear.None, true);
		let donat1 = this.donats.getAt(index);
		let donat2 = this.donats.getAt(index - 1);
		this.donats.swap(donat1, donat2);
		this.input.moveCallbacks = [];

	}
	if(a < 0) {
		this.add.tween(this.donats.getAt(index)).to( { x: '+98.5'}, 1000, Phaser.Easing.Linear.None, true);
		this.add.tween(this.donats.getAt(index + 1)).to( { x: '-98.5'}, 1000, Phaser.Easing.Linear.None, true);
		let donat1 = this.donats.getAt(index);
		let donat2 = this.donats.getAt(index + 1);
		this.donats.swap(donat1, donat2);
		this.input.moveCallbacks = [];

	}
}*/
move2(a, item, index) {
	if(a > 0) {
		this.add.tween(item).to( { y: '-87.3'}, 1000, Phaser.Easing.Linear.None, true);
		this.add.tween(this.donats.children[index - 13]).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
		let donat1 = this.donats.getAt(index);
		let donat2 = this.donats.getAt(index - 13);
		this.donats.swap(donat1, donat2);
		this.input.moveCallbacks = [];

	}
	if(a < 0) {
		this.add.tween(item).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
		this.add.tween(this.donats.children[index + 13]).to( { y: '-87.3'}, 1000, Phaser.Easing.Linear.None, true);
		let donat1 = this.donats.getAt(index);
		let donat2 = this.donats.getAt(index + 13);
		this.donats.swap(donat1, donat2);
		this.input.moveCallbacks = [];

	}

}
move3(a) {
	let first1;
	let arr1 = [];
	for(let i = 0; i < 13; i++) {
		first1 = a.getAt(i);
		let j = i + 13;
		arr1.push(i);
		while(j < a.length + 13) {
			if(first1.key == a.getAt(j).key) {
				arr1.push(j);
			} else {
				if(arr1.length > 2) {
					return arr1;
				}
				first1 = a.getAt(j);
				arr1 = [];
				arr1.push(j);
			}
			j += 13;
		}
		arr1 = [];
	}
	return arr1;
}
deleteArr(arr1, arr, a) {
	this.input.disabled = false;
	let it = arr1[0] - 13;
	arr1.forEach((item, index) => {
		let don = a.getAt(item).kill();
		don.loadTexture('gem' + this.rnd.integerInRange(1, 7));
		don.visible = true;
		don.x = this.donats.getAt(item).x;
		don.y = 0 + index * 87.3;
		this.add.tween(don).from( { y: '-200'}, 1000, Phaser.Easing.Bounce.Out, true);
	});
	this.timer.destroy();
	while (it >= 0) {
		console.log("it" + it);
		let str = 87.3 * arr1.length;
		this.add.tween(a.getAt(it)).to({y: '+' + str}, 1000, Phaser.Easing.Linear.None, true);
		arr1.forEach((item, index) => {
			a.swap(a.getAt(it + 13 * index), a.getAt(item));
			arr1.splice(index, 1, item - 13);
		})
		//this.donats.swap(this.donats.getAt(it), this.donats.getAt(it1));
		it -= 13;
	}
	this.count++;
	if(this.count > 1) {
		this.timer.destroy();
		this.count = 0;
	}
    
    

	if(arr.length < 3) {
		arr = [];
	}
	arr.forEach(item => {
		a.getAt(item).kill();
		while(item > 12) {
			let next =a.getAt(item - 13);
			this.add.tween(a.getAt(item - 13)).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
			let item1 = a.getAt(item);
			item1.x = a.getAt(item).x;
			item1.y = 0;
			this.add.tween(item1).from( { y: '-200'}, 1000, Phaser.Easing.Bounce.Out, true);
			a.swap(a.getAt(item), next);
			item -= 13;
		}

		a.getAt(item).loadTexture('gem' + this.rnd.integerInRange(1, 7));
		a.getAt(item).visible = true;
		this.timer.destroy();
	});
}
move4(a) {
	let first;
	let count = 0;
	let arr = [];
	for(let i = 0; i < a.length; i++) {
		if(i%13 == 0 || first.key != a.getAt(i).key) {
			first = a.getAt(i);
			if(count > 1) {
				return arr;
			}
			count = 0;
			arr = [];
			arr.push(i);
			continue;
		} else {
			count++;
			arr.push(i);
		}
	}
	return arr;
}
/*deleteArr1(arr, a) {
	if(arr.length < 3) {
		arr = [];
	}
	arr.forEach(item => {
		a.getAt(item).kill();
		while(item > 12) {
			let next =a.getAt(item - 13);
			this.add.tween(a.getAt(item - 13)).to( { y: '+87.3'}, 1000, Phaser.Easing.Linear.None, true);
			let item1 = a.getAt(item);
			item1.x = a.getAt(item).x;
			item1.y = 0;
			this.add.tween(item1).from( { y: '-200'}, 1000, Phaser.Easing.Bounce.Out, true);
			a.swap(a.getAt(item), next);
			item -= 13;
		}

		a.getAt(item).loadTexture('gem' + this.rnd.integerInRange(1, 7));
		a.getAt(item).visible = true;
		this.timer.destroy();
	});
	//this.input.moveCallbacks = [];
}*/

}

export default GameState;