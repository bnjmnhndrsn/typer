var typer = (function(){
		var
			$typer,
			init
		;
		
		init = function(){
			
			$typer = $('#typer');
			
			typer.input.init( $('#typer-input') );
			typer.pad.init( $('#typer-pad') );
			typer.listeners.init( $('body'), $typer );
			typer.stats.init( $('#typer-stats') );
			
			
			//CUSTOM EVENT HANDLERS
			$typer.on("inputSelect", function(){
				typer.pad.end();
			})
			
			$typer.on("inputSumbit", function(event, text){
				typer.pad.load(text);
			});
			
			$typer.on("typingStart", function(){
				typer.stats.hide();
				typer.listeners.on();
				typer.pad.start();
			});
			
			$typer.on("typingUpdate", function(event, key){
				typer.pad.update(key);
			})
			
			$typer.on("typingEnd", function(event, stats){
				typer.listeners.off();
				typer.stats.update(stats);
			})
		}
		
		return {
			init: init
		};
})();