var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var notes = ["B4","A4","G#4","F#4","E4","D4","C#4"]
// var p = ["needlessly", "naturally","nutritionally", "openly","obscenely","obtusely","optimistically", "hopelessly","inappropriately","impatiently","lazily","luckily","seductively", "tenderly", "shyly", "terribly", "stylishly", "splendidly", "tremendously", "unbelievably", "unthinkably", "usually", "utterly", "vocally", "vulnerably","vicariously","weirdly","warmly","wholeheartedly","wisely","wickedly","wonderfully","yieldingly","zealously","zestfully", "nakedly","nocturnally","naughtily","obviously", "optimistically", "queenly", "queenly", "rascally","heavenly", "menacingly", "musically", "mischievously", "lusciously","lovingly", "loudly", "lazily", "pal", "partner", "pathfinder", "patron", "philosopher", "prisoner", " pioneer","Quadrilateral ", "quack quoter", "queen", "quagmire", "quintuplet", "quackgrass","rain-maker", "reacher", "receiver", "recipient", "reliever", "romeo", "ruler","handyman","honey","india","kitten","kilimanjaro","nirvana", "notification", "nutmeg", "officer", "odyssey", "someone special", "soul mate", "spouse", "sweetheart", "trust", "team", "supporter","wife","warrior","waiter","waitress","youngster","Yoda","yachtsman","zoologist","zombie", "ulcer", "v-neck", "vacation", "vulva", "vanguard", "vaudville", "vault","machine", "mama", "mannequin", "mankind", "magnet", "lemonade", "lingerie", "patronized", "penetrate purified", "piled-up", "punish", "played", "packed","quadrated", "qualified", "quantified", "quarterbacked", "quickened", "quieted", "qualify","radiate","ram", "ransacked", "raving", "realized", "reassemble", " recede","hid","hide","hurt","hold","kept","kneel","knelt","nag", "negotitate", "neglect", "occupy", "optimize","satisfy", "savor", "seduce", "share", "thank", "trust", "treasure","welcome","want","wish","wait","yield","unblock", "understand", "unleash", "vibrated", "vowed", "vivify", "value", "loop", "lose", "long", "linger", "laugh", "lash", "lick", "ladylike", "legendary", "majestic", "multiracial", "lusty", "loopy", "lethal", "palatable", "posh", "pleasant", "purposeful", "primal", "preferable", "pet","quintessential", "quotable", "quick-witted", "qualified", "quick on draw","rational", "razor-sharp", "reasonable", "rich", "renowned", "revived","happy","humorous","hateful","innate", "jolly","jealous","sincere", "sunny", "strong", "selfless", "tender", "serene", "true", "warm", "wealthy", "wild", "witty", "xenial", "young", "youthful", "yucky", "zesty", "unanticipated", "unexpected", "unforeseen", "unbearable", "V-shaped", "valid", "vanilla","dazzling","exquisite","fiery","gorgeous","graceful","divine","fascinating"];
// var socket = io.connect();
//       jQuery(function ($) {
//         socket.on('tweet', function (data) {
         
//         });
//       });

var timer = setInterval(myFunction, 1000);

function myFunction() {
  if($("#tweets").html().length > 0) {
    clearInterval(timer);
    var p = []
	$("#tweets p").each(function() { p.push($(this).text()) });
var synth = new Tone.MembraneSynth({
				"pitchDecay" : 0.03,
				"octaves" : 5,
				"envelope" : {
					"attack" : 0.06,
					"decay" : 0.5,
					"sustain" : 0.9
				}
			}).toMaster();

			// var text;
			var n;

			function Line(num,num2,speed,note,word,fontSize){
				this.x = num;
				this.y = num2;
				this.speed = speed;
				this.note = note
				this.word = word
				this.fontSize = fontSize
				this.draw = function(){
		   		// ctx.fillStyle = 'white';
		    	// 	ctx.beginPath();
		    	// 	ctx.rect(this.x,this.y,100,1);
		    	// 	ctx.fill();
					n = Math.floor(Math.random() * p.length);
					ctx.fillStyle = "white";
  					ctx.font = this.fontSize + "px" + " " + "Helvetica";
  					ctx.textAlign = "center";
  					ctx.fillText(this.word, this.x, this.y);
				}
				this.move = function(){
					this.x+=this.speed;
				}
				this.getNote = function(note){
					this.note = note;
				}
			}
			var shapeArray = []

			for(var i =0;i<50;i++){
				shapeArray.push(new Line( Math.floor((Math.random() * w) + 1), Math.floor((Math.random() * h) + 1),  Math.floor((Math.random() * 4) + 0.5),notes[Math.floor(Math.random() * notes.length)],p[Math.floor(Math.random()*p.length)],Math.floor(Math.random()*40)))
			}
			function update(){
				ctx.clearRect(0, 0, w, h);
				for (var i = 0; i < shapeArray.length; i++) {
					shapeArray[i].draw()
					shapeArray[i].move()
		
					if(shapeArray[i].x > w)
					{
						shapeArray[i].getNote(notes[Math.floor(Math.random() * notes.length)])
						synth.triggerAttackRelease(shapeArray[i].note, "32n");	
						shapeArray[i].x = 0
					}
				n = Math.floor(Math.random() * p.length);
				};
			}
			setInterval(update,1000/60)
    return;
  }


}




