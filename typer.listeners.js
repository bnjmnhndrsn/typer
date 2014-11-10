typer.listeners = (function(){
	var
		$target,
		$typer,
		$buttons,
		//non-keypress keys with values or keys which require preventing bubbling
		specialKeys = {
			8: "backspace",
			9: "\t",
			32: " "
		},
		buttonBlur,
		init,
		on,
		off
	;
	
	init = function($container, _$typer){
		$target = $container;
		$typer = _$typer;
		$buttons = $container.find("button");
	};

	//turns on keyboard listeners
	on = function(){
		
		$target.keydown(function(e){
			$buttons.blur();
			
			if (e.keyCode in specialKeys){
				$typer.trigger( "typingUpdate", specialKeys[e.keyCode] );
				return false;
			}
			
		});
		
		$target.keypress(function(e){
			$buttons.blur();
			var key = e.keyCode || e.charCode,
			c = String.fromCharCode(key); 
			
			if (key in specialKeys){
				return false;	
			}
			
			if (c.length > 0){
				$typer.trigger( "typingUpdate", c );
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
