'use strict';
class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;   
  }
  
  plus(vector) {
    if (vector instanceof Vector) {
      let plusVector = new Vector((this.x + vector.x), (this.y + vector.y));
//      let dx = this.x + vector.x;
//      let dy = this.y + vector.y
//      let plusVector = new Vector(dx, dy);
      return plusVector;
    } else {
      throw "Можно прибавлять к вектору только вектор типа Vector.";
    }
  }
  
  times(n) {
    let timesVector = new Vector(this.x * n, this.y * n);
    return timesVector;
  }
}

class Actor {
  constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed = new Vector(0, 0)) {
    if ((pos instanceof Vector) && (size instanceof Vector) && (speed instanceof Vector)) {
      this.pos = pos;
      this.size = size;
      this.speed = speed;
//      left, top, right, bottom
        
    } else {
      throw "Можно передать только векторы";
    }
  }
  
  get left() {
    return this.pos.x;
  }
  
  get top() {
    return this.pos.y;
  }
  
  get right() {
    return this.pos.x + this.size.x;
  }
  
  get bottom() {
    return this.pos.y + this.size.y;
  }
  
  act() {
    
  }
  
//  isIntersect(actor) {
//    if (actor instanceof Actor) {
//      if (actor === this) {
//        return false;
//      } else {
//        // if (
//        //   (((actor.top > this.top) && (actor.top < this.bottom)) || ((actor.bottom > this.top) && (actor.bottom < this.bottom))) && (((actor.top > this.top) && (actor.top < this.bottom)) || ((actor.bottom > this.top) && (actor.bottom < this.bottom))) || 
//        //   (((actor.top < this.top) && (actor.bottom > this.top)) || ((actor.top < this.bottom) && (actor.bottom > this.top))) &&
//        //   (this.top > actor.top && this.top < actor.bottom)||(this.bottom > actor.top && this.bottom < actor.bottom)) {
//        //   return true;
//        // } else 
//        if (actor.bottom > this.top && actor.top < this.bottom && actor.left < this.right && actor.right > this.left) {
//          return true;
//        } else {
//          return false; 
//        }
//      }
//    } else {
//      throw "Можно передать только Actor";
//    }
//  } 
//}
  
isIntersect(actor){
  if(!(actor instanceof Actor) || (!actor)){
    throw (`Не является экземпляром Actor или не передано аргументов`);
  }
  if(actor === this) {
    return false;
  }
  if  (this.right > actor.left && this.left < actor.right &&
       this.top < actor.bottom && this.bottom > actor.top) {
    return true;
  }
  return false;
}
}
class Level {
  constructor(gridArray, actors) {
    this.grid = grid;
    this.actors = actors;
    for (let obj of actors) {
      if (obj.type === 'player') {
        this.player = obj;
      }
    }
    this.length = grid.length;
    this.status = null;
    this.finishDelay = 1;
  }
  
  get width() {//максимальная ширина строки
    let length = grid[0].length;
    for (let i = 1; i < grid.length; i++) {
      if (grid[i].length > length) {
        length = grid[i].length;
      }
    }
    return length;
  }
  
  isFinished() {
    if (this.status !== null && this.finishDelay < 0) {
      return true;
    }
    return false;
  }
  
  actorAt(actor) {
    if (actor instanceof Actor) {
      for (let obj of this.actors) {
        if (actor.isIntersect(obj)) {
          return obj;
        }
      } 
      return undefined;    
  } else {
    throw "Можно передать только Actor";
  } 
}
  
  obstacleAt(pos, size){
    if (!(pos instanceof Vector) || !(size instanceof Vector)) {
      throw "Можно передать только Vector";
    } else {
      let place = new Actor(new Vector(pos.x, pos.y), new Vector(size.x, size.y));
      
      for (let i = place.top; i < place.bottom; i++) {
        for (let j = place.left; j < place.right; j++) {
          if(this.grid[i][j] === undefined) {
            return undefined;
          } else {
            return grid[i][j];
          }    
        }
      }
      if (place.left < 0 || place.right > this.width) {
        return 'wall';
      }
      
      if (place.bottom > this.length) {
        return 'lava';
      }
    }
  }
  
  removeActor(actor) {//нужно ли проходить весь цикл или сделать кeturn после 1-го удаления?
    for (let obj in this.actors) {
      if (obj === actor) {
        this.actors.splice(obj, 1);
      }
    }
  }
  
  noMoreActors(type) {
    for (let obj of this.actors) {
      if (obj.type === type) {
       return false;
      }
    }
    return true;
  }
  playerTouched(type, actor) {
    if (type ==='lava' || type === 'fireball') {
      this.status = 'lost';
    } else if ((type === 'coin') && (actor instanceof MyCoin))  {
      this.removeActor(actor);
      if (this.noMoreActors('coin')) {
        this.status = 'won';  
      }         
    }
  }
}

class LevelParser {
  constructor(dict) { 
  }
  
  actorFromSymbol(symbol) {
    if(symbol in dict) {
      return dict[symbol];
    } else {
      return undefined;
    }
  }
  obstacleFromSymbol(symbol) {
    switch(symbol) {
      case 'x': 
        return 'wall';
      break;
      case !:
        return 'lava';
      break;
      default: 
        return undefined;
    }  
}
createGrid(mas) {
  
}
 
createActors(mas) {
  for (let )
}

parse(mas) {
  }

class Fireball extends Actor {
  constructor(coord = new Vector(0,0), speed= new Vector(0,0)) {
    super(coord, speed);
    this.type = 'fireball';
  }
}
































