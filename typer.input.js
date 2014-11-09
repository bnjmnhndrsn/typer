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
			typer.pad.end();
		});
	};
	
	
	return {
		init: init
	}
})();