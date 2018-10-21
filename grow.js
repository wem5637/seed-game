var plots = {
	plot1: null,
	plot2: new DayFlower(),
	plot3: null,
	plot4: new NightFlower(),
	plot5: null
}

var colorOscillator = function(rgb, key, inbreedBool){
	//ex. rgb(10,20,30)
	var orig = rgb.slice(4,-1).split(',')
	var mult = 1;
	if(inbreedBool){
		mult = 2;
	}

	var mag = mult*(Math.random())*flowerBreedPropDiff[key];
	var colors = {
		red:Math.random(),
		green:Math.random(),
		blue:Math.random(),
	}
	var total = colors.red+colors.green+colors.blue;
	var randSign1 = Math.round(Math.random());
	if(randSign1 === 0){
		randSign1 = -1;
	}
	var randSign2 = Math.round(Math.random());
	if(randSign2 === 0){
		randSign2 =- 1;
	}
	var randSign3 = Math.round(Math.random());
	if(randSign3 === 0){
		randSign3 =- 1;
	}

	return `rgb(${orig[0]+randSign1*mag*colors.red/total},${orig[1]+randSign2*mag*colors.green/total},${orig[2]+randSign3*mag*colors.blue/total})`;
}

var valueOscillator = function(num, key, inbreedBool){
	var mult = 1;
	if(inbreedBool){
		mult = 2;
	}
	var mag = mult*(2*Math.random()-1)*flowerBreedPropDiff[key];
	var randSign1 = Math.round(Math.random());
	if(randSign1===0){
		randSign1=-1;
	}
	return num+randSign1*mag;
}

var flowerBreedPropDiff = {
	stemHeight:.2,
	stemWidth:.2,
	stemColor: 40,
	petalNum:1,
	petalSize:.2,
	petalColor: 40,
	petalVariety:.1,
	bulbSize:.2,
	bulbColor: 40,
}

DayFlower.prototype = new Flower(5, 5, 'green', 4, 5, 'red', 0, 5, 'yellow')

NightFlower.prototype = new Flower(2, 2, 'black', 2, 5, 'purple', 0, 3, 'red')


class Flower(stemHeight, stemWidth, stemColor, petalNum, petalSize, petalColor, petalVariety, bulbSize, bulbColor){
	this.stemHeight = stemHeight; 
	this.stemWidth = stemWidth;
	this.stemColor = stemColor;
	this.petalNum = petalNum;
	this.petalSize = petalSize;
	this.petalColor = petalColor;
	this.petalVariety = petalVariety;
	this.bulbSize = bulbSize;
	this.bulbColor = bulbColor;
	this.breedCounter = 2;
}

Flower.prototype.grow = function(){
	//start grow animation
}

Flower.prototype.plant = function(flower){
	//pick random plot
	//replace flower with seed flower
	var rand4 = Math.floor(Math.random()*4);
	plots[rand4] = new Flower(flower);

}

Flower.prototype.inbreed = function(){
	var keys = Object.keys(flower1)
	var flower = {}
	keys.forEach((key)=>{
		if(flowerBreedPropDiff[key]){
			flower[key] = valueOscillator(flower1[key], key, true)
		}
	})

	flower1.plant(flower);
	flower1.destroy();
}

Flower.prototype.crossbreed = function(flower2){
	var keys = Object.keys(flower1)
	var newFlower = {}
	keys.forEach((key)=>{
		if(flowerBreedPropDiff[key]){
			newFlower[key] = valueOscillator((this[key]+flower2[key]/2)/(this[key]), key)
		}
	})

	this.plant(flower);
	this.degrade();
}

Flower.prototype.decrementBreedCounter = function(flower){
	//decrement breed counter
	flower.breedCounter = flower.breedCounter-1;
	if(flower.breedCounter<=0){
		flower.destroy();
	}
}


Flower.prototype.degrade = function(flower){
	//decrement breed counter
	flower1.decrementBreedCounter();
}



console.log(plots)
