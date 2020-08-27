import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const mapSize = 30;

function LandTile() {
  return <div className='world-tile land-tile'/>
}

function StoneTile() {
  return <div className='world-tile stone-tile'/>
}

function GoldTile() {
  return <div className='world-tile gold-tile'/>
}

function FoodTile() {
  return <div className='world-tile food-tile'/>
}

function WoodTile() {
  return <div className='world-tile wood-tile'/>
}

function WaterTile() {
  return <div className='world-tile water-tile'/>
}

function VillagerTile(unit) {
  return <div className='world-tile villager-tile'><div className="dude">{unit.hp}</div></div>
}


function RenderMap({units}){

  let world = [];
  for (var x = 0; x<= mapSize; x++) {
      world.push(Array(mapSize))
  }

  return Array.from(Array(mapSize)).map((z, x) => {
    const row = Array.from(Array(mapSize)).map((z1, y)=>{
        const unit = units.find(u => u.x === x && u.y === y);
        if (!unit) {
         return LandTile();
        }
        if (unit instanceof Stone) {
          return StoneTile();
        }
        if (unit instanceof Gold) {
          return GoldTile();
        }
        if (unit instanceof Wood) {
          return WoodTile();
        }
        if (unit instanceof Food) {
          return FoodTile();
        }
        if (unit instanceof Water) {
          return WaterTile();
        }
        if (unit instanceof Villager) {
          return VillagerTile(unit);
        }
    })

    return <div className='World'>
      <div className='world-row'>
      {row}
      </div>
    </div>

  })
}

function processTick(units, setUnits) {
  console.log(units.length);
  
  const u = units.map(unit => {
      if(unit instanceof Villager){
        const vel = unit.velocity;

        const newX = unit.x + vel.x;
        const newY = unit.y + vel.y;

        const hasCollision = units.some(u => (u.x) === newX && (u.y) === newY);
        // const hasCollision = units.some(u =>  (u.x + u.velocity.x) === newX && (u.y + u.velocity.y) === newY);

        if (!hasCollision){
          unit.x = newX;
          unit.y = newY;
        }
      }

      return unit;
  });

  console.log(units.length);
  setUnits(u)
}

function App() {

  const [units, setUnits] = useState(initUnits());

  useEffect(() => {
    window.setInterval(function(){
      processTick(units, setUnits)
    }, 1000);
  }, []);



return (
    <div className="App">
      <RenderMap units={units}/>
    </div>
  );
}

export default App;



class Velocity{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

class Unit {

  constructor(hp, x, y, velocity) {
    this.hp = hp;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
  }

  onTick() { };
}

class Person extends Unit {

  constructor(hp, x, y, velocity, strength) {
    super(hp, x, y, velocity);
    this.strength = strength;
  }

  assignment() {
    console.log('do work')
  }
}

class Villager extends Person {
}

class Building extends Unit {

}

class Resource extends Unit {

  constructor(hp, x, y, velocity, amount) {
    super(hp, x, y, velocity);
    this.amount = amount;
  }

}

class Wood extends Resource {
  constructor(hp, x, y, velocity) {
    super(hp, x, y, velocity);
    this.resourceType = "WOOD";
  }
}

class Gold extends Resource {
  constructor(hp, x, y, velocity) {
    super(hp, x, y, velocity);
    this.resourceType = "GOLD";
  }
}

class Food extends Resource {
  constructor(hp, x, y, velocity) {
    super(hp, x, y, velocity);
    this.resourceType = "FOOD";
  }
}

class Stone extends Resource {
  constructor(hp, x, y, velocity) {
    super(hp, x, y, velocity);
    this.resourceType = "STONE";
  }
}

class Water extends Resource {
  constructor(hp, x, y, velocity) {
    super(hp, x, y, velocity);
    this.resourceType = "STONE";
  }
}

function initUnits(){
  let u = [];
  
  for(var x = 0; x<mapSize;x++){
    for(var y = 0; y<mapSize;y++){

      const rType = Math.floor(Math.random() * 100); 

      switch(rType){
        case 0:
          u.push(new Stone(1,x,y,new Velocity(0,0)));
          break;
        case 1:
          u.push(new Gold(1,x,y,new Velocity(0,0)));
          break;
        case 2:
          u.push(new Water(1,x,y,new Velocity(0,0)));
          break;
        case 3:
          u.push(new Wood(1,x,y,new Velocity(0,0)));
          break;
        case 4:
          u.push(new Food(1,x,y,new Velocity(0,0)));
          break;
        case 5:
          u.push(new Villager(1,x,y,new Velocity(Math.floor((Math.random() * 3) - 1),Math.floor((Math.random() * 3) - 1)), 1));
          break;
          break;
        case 6:
          u.push(new Villager(1,x,y,new Velocity(Math.floor((Math.random() * 3) - 1),Math.floor((Math.random() * 3) - 1)), 1));
          break;
          break;
        case 7:
          u.push(new Villager(1,x,y,new Velocity(Math.floor((Math.random() * 3) - 1),Math.floor((Math.random() * 3) - 1)), 1));
          break;
          break;
        case 8:
          u.push(new Villager(1,x,y,new Velocity(Math.floor((Math.random() * 3) - 1),Math.floor((Math.random() * 3) - 1)), 1));
          break;
          break;
        case 9:
          u.push(new Villager(1,x,y,new Velocity(Math.floor((Math.random() * 3) - 1),Math.floor((Math.random() * 3) - 1)), 1));
          break;
          break;
        case 10:
          u.push(new Villager(1,x,y,new Velocity(Math.floor((Math.random() * 3) - 1),Math.floor((Math.random() * 3) - 1)), 1));
          break;
      }

    }
  }
  return u;
}