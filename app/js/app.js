$( function() {
    $( "#draggable1" ).draggable();
	$( "#draggable2" ).draggable();
    $( "#droppable1" ).droppable({
      drop:function( event, ui ) {
        $(this).addClass( "dropped-el" ).find( "p" ).html( "Dropped!" );
      }
    });
	 $( "#droppable2" ).droppable({
      drop:function( event, ui ) {
        $(this).css({"background-color":"yellow"}).find( "p" ).html( "Dropped!" );
      }
    });
  } );