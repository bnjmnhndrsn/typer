typer.input = (function(){
	var 
		$input,
		$textarea,
		init,
		extend,
		retract
	;
	
	init = function($container){
		$input = $container;
		$textarea = $input.find('textarea');
		
		//trigger textSubmit event and retract input box
		$input.find('button').click(function(){
			retract();
			var text = $input.find('textarea').val().replace(/\t/, " ");
			$container.trigger("inputSubmit", text);
		});
		
		//trigger inputSelect event when it is clicked on and extend the textbox
		$textarea.focus(function(){
			$container.trigger("inputSelect");
			extend();
		});
	};
	
	
	extend = function(){ $textarea.height(300) };
	
	retract = function(){ $textarea.height(50) };
	
	return {
		init: init,
		retract: retract,
		extend: extend
	};
})();