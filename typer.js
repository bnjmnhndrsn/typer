var typer = (function(){
		var
			$typer,
			init
		;
		
		init = function(){
			
			$typer = $('#typer');
			
			typer.input.init( $('#typer-input') );
			typer.pad.init( $('#typer-pad') );
			typer.listeners.init( $('body') );
			typer.stats.init( $('#typer-stats') );
		}
		
		return {
			init: init
		}
})();

typer.input = (function(){
	var 
		$input,
		$textarea,
		init
	;
	
	init = function($container){
		$input = $container;
		$textarea = $input.find('textarea');
		
		//change size off text input based on focus
		$input.find('button').click(function(){
			$textarea.height(50);
			typer.pad.load( $input.find('textarea').val().replace(/\t/, " ") );
		});
		
		$textarea.focus(function(){
			$textarea.height(300);
		});
	};
	
	
	return {
		init: init
	}
})();

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
		end
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
		typer.stats.hide();
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
			if (stateMap.running){
				end();
			}
			
		});
		
		start();
	};
	
	//turns on keyboard listeners and refreshes start 
	start = function(){
		typer.listeners.on();
		stateMap.running = true;
		stateMap.curIndex = 0;
		stateMap.startTime = new Date();
		stateMap.accuracy = [];
	};
	
	//takes input to update typed text. triggered by keyboard listeners. either checks single character or takes special input, e.g. backspace
	update = function(input){
	
	//helper method to get current letter	
		var $cur = function(){
			return $( $pre[0].children[stateMap.curIndex] )
		};
		
		//backspace
		if(input === "backspace"){
			console.log(stateMap.curIndex);
			$cur().removeClass("typer-correct typer-incorrect typer-current");
			stateMap.accuracy.pop();
			--stateMap.curIndex;
		}
		else if (stateMap.curIndex < stateMap.textLength)  {
			//correct
			if ($cur().text().valueOf() === input){
				$cur().addClass("typer-correct");
				stateMap.accuracy.push(true);
			}
			//incorrect key press
			else {
				$cur().addClass("typer-incorrect");
				stateMap.accuracy.push(false);
			}
					
			stateMap.curIndex = Math.min(stateMap.curIndex + 1, stateMap.textLength);
			
			if (stateMap.curIndex == stateMap.textLength && stateMap.accuracy[stateMap.accuracy.length - 1]){
				end();
			}
		}
						
		$cur().removeClass("typer-incorrect typer-correct").addClass("typer-current");
			
	};
	
	//ends counter, turns off listeners and reveals stats
	end = function(){
		stateMap.running = false;
		typer.listeners.off();
		console.log("It's over!");
	
		var acc = Math.round( (stateMap.accuracy.filter(function(a){ return a }).length
		/ stateMap.accuracy.length) * 100 ) + "%",
		wpm = Math.round( (stateMap.curIndex / 5) / ( ((new Date()) - stateMap.startTime) / (1000 * 60) ) )
	
	
		typer.stats.update({
			"Accuracy" : acc,
			"WPM" : wpm
		});
	};
	
	return {
		init: init,
		load: load,
		update: update
	}

})();

//keyboard listeners
typer.listeners = (function(){
	var
		$target,
		$buttons,
		buttonBlur,
		init,
		on,
		off
	;
	
	init = function($container){
		$target = $container
		$buttons = $container.find("button");
	};
	
	
		
	
	//turns on keyboard listeners
	on = function(){
		$target.keydown(function(e){
			$buttons.blur();
			//detect backspace
			if (e.keyCode == 8){
				typer.pad.update("backspace");	
				return false;
			}
			if (e.keyCode == 9){
				typer.pad.update("\t");
				return false;
			}
			if (e.keyCode == 32){
				typer.pad.update(" ");
				return false;
			}
			
		});
		
		$target.keypress(function(e){
			$buttons.blur();
			var key = e.keyCode || e.charCode,
			c = String.fromCharCode(key); 
			
			if (c.length > 0){
				typer.pad.update(c);
			}
		});
			
	};
	
	//turns off keyboard listeners
	off = function(){
		$target.off();
	};
	
	
	return {
		init: init,
		on: on,
		off: off
	};
})();


typer.stats = (function(){
	var
		$stats,
		init,
		update,
		hide
	;
	
	init = function( $container ){
		$stats = $container
	}
	
	//Takes data in the form of object literal. Prints as form "Key: Value".
	update = function(data){
		$stats.empty();
		
		for (var field in data){
			$("<div />").text(field + ": " + data[field]).appendTo($stats);
		}
		
		$stats.show(500);
	};
	
	hide = function(){
		$stats.hide();
	}
	
	return{
		init: init,
		update: update,
		hide: hide
	}
})();
