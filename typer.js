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
			
			
			//CUSTOM EVENT HANDLERS
			$typer.on("inputSelect", function(){
				typer.pad.end();
			})
			
			$typer.on("inputSumbit", function(event, text){
				typer.pad.load(text);
			});
		}
		
		return {
			init: init
		};
})();