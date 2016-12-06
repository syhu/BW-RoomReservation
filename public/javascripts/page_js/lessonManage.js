var lessonManage = (function(){
	var _const;
	_const = function(){
		
		this._construct();
	}
	_const.prototype = {
		_construct:function(){
			
			
			this._start();
		},
		_start:function(){
			var objThis = this;
			objThis._initialAll();
			
			
		},
		_initialAll:function(){
			//課程拉動選單
			$('#external-events .fc-event').each(function() {
				
				// store data so the calendar knows to render an event upon drop
				$(this).data('event', {
					title: $.trim($(this).text()), // use the element's text as the event title
					stick: true // maintain when user navigates (see docs on the renderEvent method)
				});
				
				// make the event draggable using jQuery UI
				$(this).draggable({
					zIndex: 999,
					revert: true,      // will cause the event to go back to its
					revertDuration: 0  //  original position after the drag
				});
				
			});
			//日曆				
			$('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				editable: true,
				droppable: true, // this allows things to be dropped onto the calendar
				drop: function() {
					// is the "remove after drop" checkbox checked?
					if ($('#drop-remove').is(':checked')) {
						// if so, remove the element from the "Draggable Events" list
						$(this).remove();
					}
				},
				
				events: [
					{	
						id:"11",
						editable : true,
						eventResize : function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
							// 改变某个日程大小，日程结束时间改变，此处可做相关处理
						},
						title: 'All Day Event',
						start: '2016-11-30'
					},
					{
						title: 'Long Event',
						start: '2016-09-07',
						end: '2016-09-10'
					},
					{
						id: 999,
						title: 'Repeating Event',
						start: '2016-09-09T16:00:00'
					},
					{
						id: 999,
						title: 'Repeating Event',
						start: '2016-09-16T16:00:00'
					},
					{
						title: 'Conference',
						start: '2016-09-11',
						end: '2016-09-13'
					},
					{
						title: 'Meeting',
						start: '2016-09-12T10:30:00',
						end: '2016-09-12T12:30:00'
					},
					{
						title: 'Lunch',
						start: '2016-09-12T12:00:00'
					},
					{
						title: 'Meeting',
						start: '2016-09-12T14:30:00'
					},
					{
						title: 'Happy Hour',
						start: '2016-09-12T17:30:00'
					},
					{
						title: 'Dinner',
						start: '2016-09-12T20:00:00'
					},
					{
						title: 'Birthday Party',
						start: '2016-09-13T07:00:00'
					},
					{
						title: 'Click for Google',
						url: 'http://google.com/',
						start: '2016-09-28'
					}
				]
			});
		}
		
		
		
		
	}
	return _const;
}());

var lessonManage;
$(function(){
	lessonManage = new lessonManage();
})	