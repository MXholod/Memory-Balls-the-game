$(function(){
		let cl1 = document.querySelector(".memory-balls__drop-row-1");
		let el1 =  cl1.children[0];
	//Drop zone
	//$(".memory-balls__drop-box-1").droppable({
	$(el1).droppable({
		drop:function( event, ui ) {
			//$(this).addClass("dropped").find("p").html("Element was dropped!");
		},
		accept: function(drag) {
			var dropId = $(this).attr('data-id');
			var dragId = $(drag).attr('data-id');
			return dropId === dragId;
			//console.log("Drag ",$(drag));
			//console.log("Drop ",$(this));
		} 
    });
	$(".memory-balls__drop-box-2").droppable({
		drop:function( event, ui ) {
			//$(this).addClass("dropped").find("p").html("Element was dropped!");
		},
		accept: function(drag) {
			var dropId = $(this).attr('data-id');
			var dragId = $(drag).attr('data-id');
			return dropId === dragId;
			//console.log("Drag ",$(drag));
			//console.log("Drop ",$(this));
		} 
    });
	//Drag elements
	$("#jar1").draggable({
		start:function(event,ui){
			//event.clientX;
			//event.clientY;
		},
		drag:function(event,ui){
			//$(this).attr("transform",'matrix(1 0 0 1)'+x+' '+y+')');
		},
		revert: 'invalid'
	});
	//Drag elements
	$("#jar2").draggable({
		start:function(event,ui){
			//event.clientX;
			//event.clientY;
		},
		drag:function(event,ui){
			//$(this).attr("transform",'matrix(1 0 0 1)'+x+' '+y+')');
		},
		revert: 'invalid'
	});
});