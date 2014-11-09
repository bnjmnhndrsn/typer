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