class GameState extends Phaser.State {
    preload() {
        const img = 'img/';
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
		this.up = 1;
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
					this.up = 1;
				})
				this.donats1[i].push(donat);
			}
		}
		this.game.time.events.add(5600, () => {
			console.log('checkMatches in create');
			this.checkMatches();
		})		
	}
    update() {
		let pointX = this.input.x;
		let pointY = this.input.y;
		this.hoverPosX = Math.floor(pointX/98.5);
		this.hoverPosY = Math.floor(pointY/87.3);
		let difX = this.hoverPosX - this.startPointX;
		let difY = this.hoverPosY - this.startPointY;
		if(!isNaN(difX) && !isNaN(difY)) {
			if((Math.abs(difX) == 1 && difY == 0) || (Math.abs(difY) == 1 && difX == 0)) {
				this.donat2 = this.donats1[this.hoverPosX][this.hoverPosY];

				if(this.up == 1) {
					this.swap();
					this.game.time.events.add(500, () => {
						console.log('checkMatches in update');
						this.checkMatches();
					})
				}
			}
		}
	}

swap() {
	this.up = 2;
	this.donats1[this.startPointX][this.startPointY] = this.donat2;
	this.donats1[this.hoverPosX][this.hoverPosY] = this.donat1;
				
	this.add.tween(this.donat1).to({x: this.hoverPosX*98.5, y: this.hoverPosY*87.3}, 200, Phaser.Easing.Linear.In, true);
	this.add.tween(this.donat2).to({x: this.startPointX*98.5, y: this.startPointY*87.3}, 200, Phaser.Easing.Linear.In, true);

	this.donat1 = this.donats1[this.startPointX][this.startPointY];
	this.donat2 = this.donats1[this.hoverPosX][this.hoverPosY];
}
updateVar() {
	this.startPointX = undefined;
	this.startPointY = undefined;
}
checkMatches() {
	let matches = this.getMatches(this.donats1);
	console.log(matches);
	if(matches.length > 0) {
		console.log('do not swap');
		this.removeDonatGroup(matches);
	} else {
		console.log('do swap');
		this.swap();
	}
	this.updateVar();
}
getMatches(donats) {
	let matches = [];
	let groups = [];

	for (let j = 0; j < 11; j++) {
		let k = j;
		for(let i = 0; i < 13; i++) {
			matches.push({
				donat: donats[i][j],
				i: i,
				j: j
			});
			if(j < 9) {
				if(donats[i][j] && donats[i][j + 1] && donats[i][j + 2]) {
					if(donats[i][j].key === donats[i][j + 1].key && donats[i][j + 1].key == donats[i][j + 2].key) {
						matches.push({
							donat: donats[i][j + 1],
							i: i,
							j: j+1
						});
						matches.push({
							donat: donats[i][j + 2],
							i: i,
							j: j+2
						});
					} else {
						matches = [];
						j = k;
					}
					if(matches.length != 0) {
						j += 2;
						while(j < 10) {
							if(donats[i][j].key === donats[i][j + 1].key) {
								matches.push({
									donat: donats[i][j + 1],
									i: i,
									j: j+1
								});
							} else break;
							j++;
						}
						groups.push(matches);
						j = k;
						matches = [];
					}
				}
			}
		}
	}
	matches = [];
	console.log(matches);
	
	for(let i = 0; i < 11; i++) {
		let k = i;
		let arr = donats[i];
		for(let j = 0; j < arr.length; j++){
			matches.push({
				donat: donats[i][j],
				i: i,
				j: j
			});
			if(i < 11) {
				if(donats[i][j] && donats[i + 1][j] && donats[i + 2][j]) {
					if(donats[i][j].key === donats[i + 1][j].key && donats[i + 1][j].key == donats[i + 2][j].key) {
						matches.push({
							donat: donats[i + 1][j],
							i: i+1,
							j: j
						});
						matches.push({
							donat: donats[i + 2][j],
							i: i+2,
							j: j
						});
					} else {
						matches = [];
						i = k;
					}
					if(matches.length != 0) {
						i += 2;
						while(i < 12) {
							if(donats[i][j].key === donats[i + 1][j].key) {
								matches.push({
									donat: donats[i + 1][j],
									i: i + 1,
									j: j
								});
							} else break;
							i++;
						}
						groups.push(matches);
						i = k;
						matches = [];
					}
				}
			}
		}
	 }
	 matches = [];
	return groups;
}
removeDonatGroup(donats) {
	for(let i = 0; i < donats.length; i++) {
		let arr = donats[i];
		for(let j = 0; j < arr.length; j++) {
			this.donats.remove(arr[j].donat);
			this.donats1[arr[j].i][arr[j].j] = null;
		}
	}
}

}

export default GameState;