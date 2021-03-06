typer.pad = (function(){
	var
		$pad,
		$butttons,
		$start,
		$end,
		$text,
		$pre,
		stateMap = {
			running: null,
			textLength: null,
			startTime: null,
			curIndex: null
		},
		init,
		load,
		start,
		update,
		end,
		getWPM,
		getAcc
	;
	
	init = function( $container ){
		$pad = $container;
		$buttons = $pad.find("#typer-pad-buttons");
		$end = $pad.find("#typer-pad-end");
		$text = $pad.find("#typer-pad-text");
		$buttons.hide();
	}
	
	//loads the text to be typed into the DOM and starts start function
	load = function(input){
	
		$buttons.show();
		
		var sArray = input.split("");
		$pre = $("<pre />");
			
		for (var i = 0; i < sArray.length; i++){
			$("<span>" + sArray[i] + "</span>")
			.addClass(function(){
				return (sArray[i].valueOf() === "\n".valueOf()) ? "typer-new-line" : "typer-character";
			})
			.appendTo($pre);
		}

		$text.html($pre);
			
		stateMap.textLength = input.length;
			
		$end.click(function(){ 
			(stateMap.running) ? end() : null ; 
		});
		
		$pad.trigger("typingStart");
		
	};
	
	//turns on keyboard listeners and refreshes start 
	start = function(){
		stateMap.running = true;
		stateMap.curIndex = 0;
		stateMap.startTime = new Date();
		stateMap.accuracy = [];
	};
	
	//takes input to update typed text. triggered by keyboard listeners. either checks single character or takes special input, e.g. backspace
	update = function(input){
	
	//helper method to get current letter	
		var $cur = function(){
			return $( $pre[0].children[stateMap.curIndex] );
		};
		
		//backspace
		if (input === "backspace") {
			console.log(stateMap.curIndex);
			$cur().removeClass("typer-correct typer-incorrect typer-current");
			--stateMap.curIndex;
		} else if (stateMap.curIndex < stateMap.textLength) {
			//correct
			if ($cur().text().valueOf() === input){
				$cur().addClass("typer-correct");
				stateMap.accuracy.push({
					key: input,
					correct: true
				});
			} else {
			//incorrect key press
				$cur().addClass("typer-incorrect");
				stateMap.accuracy.push({
					key: input,
					correct: false
				});
			}
					
			stateMap.curIndex = Math.min(stateMap.curIndex + 1, stateMap.textLength);
			
			if (stateMap.curIndex == stateMap.textLength && stateMap.accuracy[stateMap.accuracy.length - 1].correct){
				end();
			}
		}
						
		$cur().removeClass("typer-incorrect typer-correct").addClass("typer-current");
			
	};
	
	//ends counter, turns off listeners and reveals stats
	end = function(){
		stateMap.running = false;
		$buttons.hide();
		
		var stats = {
			"Accuracy" : getAcc(),
			"WPM" : getWPM()
		};
		
		$pad.trigger("typingEnd", [stats]);

	};
	
	getWPM = function(){ 
		return Math.round( (stateMap.curIndex / 5) / ( ((new Date()) - stateMap.startTime) / (1000 * 60) ) );
	};
	
	getAcc = function(){
		return Math.round( (stateMap.accuracy.filter(function(a){ return a.correct }).length / stateMap.accuracy.length) * 100 ) + "%";
	};
	
	return {
		init: init,
		load: load,
		start: start,
		update: update,
		end: end
	};

})();
