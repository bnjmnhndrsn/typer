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