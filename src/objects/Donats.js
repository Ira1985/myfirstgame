class Donats extends Phaser.Sprite {
  constructor (game)
  {
      super(game, 0, 0);
      game.donatInfo = {
        width: 20,
        height: 20,
        count: {
            row: 11,
            col: 13
        },
        offset: {
            top: 10,
            left: 60
        },
        padding: 10
    }
    game.donats = game.add.group();
    for(let i = 0; i < game.donatInfo.count.col; i++) {
        for(let j = 0; j < game.donatInfo.count.row; j++) {
            let donatX = (i*(game.donatInfo.width+game.donatInfo.padding))+game.donatInfo.offset.left;
            let donatY = (j*(game.donatInfo.height+game.donatInfo.padding))+game.donatInfo.offset.top;
            game.newDonat = game.add.sprite(donatX, donatY, 'gem' + game.rnd.integerInRange(1, 7));
            game.newDonat.scale.setTo(0.3,0.3);
            game.physics.enable(game.newDonat, Phaser.Physics.ARCADE);
            game.newDonat.body.collideWorldBounds = true;
            game.newDonat.body.gravity.y = 1000;
            game.newDonat.body.immovable = false;
            game.newDonat.inputEnabled = true;
            game.newDonat.input.enableDrag();
            game.donats.add(game.newDonat);
        }
    }
  }
    moveLeftAndCheckMatch(item, game, index, startPointX, startPointY) {
        let key1 = item.key;
        let key2 = game.donats.children[index - 11].key;
        game.donats.children[index - 11].loadTexture(key1);
        item.loadTexture(key2);
        item.input.draggable = false;
        item.x = startPointX;
        let objOfMatches = {};
        let idOfMatches = [];
        for(let i = 0; i < 6; i++) {
            idOfMatches = [];
            for(let j = 0; j < 12; j++) {
                if(i == 0){
                    if(game.donats.children[index - 11].key == game.donats.children[index - 11 - 11*j].key) {
                        idOfMatches.push(index - 11 - 11*j);
                        objOfMatches[game.donats.children[index - 11].key + " 0"] = idOfMatches;
                    } else break;
                }
                if(i == 1) {
                    if(game.donats.children[index].key == game.donats.children[index + 11*j].key) {
                        idOfMatches.push(index + 11*j);
                        objOfMatches[game.donats.children[index].key  + " 1"] = idOfMatches;
                    } else break;
                }
                if(i == 2) {
                    if(game.donats.children[index - 11].key == game.donats.children[index - 11 - j].key) {
                        idOfMatches.push(index - 11 - j);
                        objOfMatches[game.donats.children[index - 11].key + " 2"] = idOfMatches;
                    } else break;
                }
                if(i == 3){
                    if(game.donats.children[index - 11].key == game.donats.children[index - 11 + j].key) {
                        idOfMatches.push(index - 11 + j);
                        objOfMatches[game.donats.children[index - 11].key + " 3"] = idOfMatches;
                    } else break;
                }
                if(i == 4) {
                    if(game.donats.children[index].key == game.donats.children[index - j].key) {
                        idOfMatches.push(index - j);
                        objOfMatches[game.donats.children[index].key + " 4"] = idOfMatches;
                    } else break;
                }
                if(i == 5) {
                    if(game.donats.children[index].key == game.donats.children[index + j].key) {
                        idOfMatches.push(index + j);
                        objOfMatches[game.donats.children[index].key + " 5"] = idOfMatches;
                    } else break;
                }
            }
        }
        let arrOfDelete = Object.values(objOfMatches);
        this.deleteDonats(arrOfDelete, game);
    }
    moveRightAndCheckMatch(item, game, index, startPointX, startPointY) {
        let key1 = item.key;
        let key2 = game.donats.children[index + 11].key;
        game.donats.children[index + 11].loadTexture(key1);
        item.loadTexture(key2);
        item.input.draggable = false;
        item.x = startPointX;
        let objOfMatches = {};
        let idOfMatches = [];
        for(let i = 0; i < 6; i++) {
            idOfMatches = [];
            for(let j = 0; j < 12; j++) {
                if(i == 0){
                    if(game.donats.children[index].key == game.donats.children[index - 11*j].key) {
                        idOfMatches.push(index - 11*j);
                        objOfMatches[game.donats.children[index].key + " 0"] = idOfMatches;
                    } else break;
                }
                if(i == 1) {
                    if(game.donats.children[index + 11].key == game.donats.children[index + 11 + 11*j].key) {
                        idOfMatches.push(index + 11 + 11*j);
                        objOfMatches[game.donats.children[index + 11].key  + " 1"] = idOfMatches;
                    } else break;
                }
                if(i == 2) {
                    if(game.donats.children[index + 11].key == game.donats.children[index + 11 - j].key) {
                        idOfMatches.push(index + 11 - j);
                        objOfMatches[game.donats.children[index + 11].key + " 2"] = idOfMatches;
                    } else break;
                }
                if(i == 3){
                    if(game.donats.children[index + 11].key == game.donats.children[index + 11 + j].key) {
                        idOfMatches.push(index + 11 + j);
                        objOfMatches[game.donats.children[index + 11].key + " 3"] = idOfMatches;
                    } else break;
                }
                if(i == 4) {
                    if(game.donats.children[index].key == game.donats.children[index - j].key) {
                        idOfMatches.push(index - j);
                        objOfMatches[game.donats.children[index].key + " 4"] = idOfMatches;
                    } else break;
                }
                if(i == 5) {
                    if(game.donats.children[index].key == game.donats.children[index + j].key) {
                        idOfMatches.push(index + j);
                        objOfMatches[game.donats.children[index].key + " 5"] = idOfMatches;
                    } else break;
                }
            }
        }
        let arrOfDelete = Object.values(objOfMatches);
        this.deleteDonats(arrOfDelete, game);
    }
    moveUpAndCheckMatch(item, game, index, startPointX, startPointY) {
        let key1 = item.key;
        let key2 = game.donats.children[index - 1].key;
        game.donats.children[index - 1].loadTexture(key1);
        item.loadTexture(key2);
        item.input.draggable = false;
        item.y = startPointY;
        let objOfMatches = {};
        let idOfMatches = [];
        for(let i = 0; i < 6; i++) {
            idOfMatches = [];
            for(let j = 0; j < 12; j++) {
                if(i == 0){
                    if(game.donats.children[index].key == game.donats.children[index + 1*j].key) {
                        idOfMatches.push(index + 1*j);
                        objOfMatches[game.donats.children[index].key + " 0"] = idOfMatches;
                    } else break;
                }
                if(i == 1) {
                    if(game.donats.children[index - 1].key == game.donats.children[index - 1 - 1*j].key) {
                        idOfMatches.push(index - 1 - 1*j);
                        objOfMatches[game.donats.children[index - 1].key  + " 1"] = idOfMatches;
                    } else break;
                }
                if(i == 2) {
                    if(game.donats.children[index - 1].key == game.donats.children[index - 1 - 11*j].key) {
                        idOfMatches.push(index - 1 - 11*j);
                        objOfMatches[game.donats.children[index - 1].key + " 2"] = idOfMatches;
                    } else break;
                }
                if(i == 3){
                    if(game.donats.children[index - 1].key == game.donats.children[index - 1 + 11*j].key) {
                        idOfMatches.push(index - 1 + 11*j);
                        objOfMatches[game.donats.children[index - 1].key + " 3"] = idOfMatches;
                    } else break;
                }
                if(i == 4) {
                    if(game.donats.children[index].key == game.donats.children[index - 11*j].key) {
                        idOfMatches.push(index - 11*j);
                        objOfMatches[game.donats.children[index].key + " 4"] = idOfMatches;
                    } else break;
                }
                if(i == 5) {
                    if(game.donats.children[index].key == game.donats.children[index + 11*j].key) {
                        idOfMatches.push(index + 11*j);
                        objOfMatches[game.donats.children[index].key + " 5"] = idOfMatches;
                    } else break;
                }
            }
        }
        let arrOfDelete = Object.values(objOfMatches);
        arrOfDelete.forEach(item => console.log(item));
        this.deleteDonats(arrOfDelete, game);
    }
    moveDownAndCheckMatch(item, game, index, startPointX, startPointY) {
        let key1 = item.key;
        let key2 = game.donats.children[index + 1].key;
        game.donats.children[index + 1].loadTexture(key1);
        item.loadTexture(key2);
        item.input.draggable = false;
        item.y = startPointY;
        let objOfMatches = {};
        let idOfMatches = [];
        for(let i = 0; i < 6; i++) {
            idOfMatches = [];
            for(let j = 0; j < 12; j++) {
                if(i == 0){
                    if(game.donats.children[index].key == game.donats.children[index - 1*j].key) {
                        idOfMatches.push(index - 1*j);
                        objOfMatches[game.donats.children[index].key + " 0"] = idOfMatches;
                    } else break;
                }
                if(i == 1) {
                    if(game.donats.children[index + 1].key == game.donats.children[index + 1 + 1*j].key) {
                        idOfMatches.push(index + 1 + 1*j);
                        objOfMatches[game.donats.children[index + 1].key  + " 1"] = idOfMatches;
                    } else break;
                }
                if(i == 2) {
                    if(game.donats.children[index + 1].key == game.donats.children[index + 1 - 11*j].key) {
                        idOfMatches.push(index + 1 - 11*j);
                        objOfMatches[game.donats.children[index + 1].key + " 2"] = idOfMatches;
                    } else break;
                }
                if(i == 3){
                    if(game.donats.children[index + 1].key == game.donats.children[index + 1 + 11*j].key) {
                        idOfMatches.push(index + 1 + 11*j);
                        objOfMatches[game.donats.children[index + 1].key + " 3"] = idOfMatches;
                    } else break;
                }
                if(i == 4) {
                    if(game.donats.children[index].key == game.donats.children[index - 11*j].key) {
                        idOfMatches.push(index - 11*j);
                        objOfMatches[game.donats.children[index].key + " 4"] = idOfMatches;
                    } else break;
                }
                if(i == 5) {
                    if(game.donats.children[index].key == game.donats.children[index + 11*j].key) {
                        idOfMatches.push(index + 11*j);
                        objOfMatches[game.donats.children[index].key + " 5"] = idOfMatches;
                    } else break;
                }
            }
        }
        let arrOfDelete = Object.values(objOfMatches);
        arrOfDelete.forEach(item => console.log(item));
        this.deleteDonats(arrOfDelete, game);
    }
    deleteDonats(arrOfDelete, game) {
        arrOfDelete.forEach(item => {
            if(item.length >= 3) {
                item.forEach(elem => {
                    let row = Math.ceil(elem/11);
                    let minRow = row * 11 - 11;
                    for(let i = elem; i > minRow; i--) {
                        game.donats.children[i].loadTexture(game.donats.children[i - 1].key);
                    }
                    game.donats.children[minRow].loadTexture('gem' + game.rnd.integerInRange(1, 7));
                    game.score += 10;
                    game.scoreText.setText('Points: ' + game.score);
                    this.gameOver(game.score);
                })
            }
        })
    }
    gameOver(score) {
        if(score > 100) {
            alert('Game over');
            location.reload();
        }
    }

  
}

export default Donats;