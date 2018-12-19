$(function(){
	//Drop zone
	$(".drop-row-1").droppable({
		drop:function( event, ui ) {
			$(this).addClass("dropped").find("p").html("Element was dropped!");
			//console.log(event," Dropped");
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
		//revert:true
	});
});