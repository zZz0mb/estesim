$(document).ready(function() {
	//slow scroll to generator
	$('a[href=\\#generator]').on('click',function(e){e.preventDefault();$('body,html').animate({scrollTop:$($(this).attr('href')).offset().top-12},600);});
	//textin standard shit
	var starttext = $('#textin').attr('data-value');
	$('#textin').text(starttext);
	$('#textin').on('click', function(e){if($(this).text() == starttext){$(this).text('')};}).blur(function(){if($(this).text() == ''){$(this).text(starttext)};});
	$('#empty').on('click', function(){$('#textin,#textout').text('');$('body,html').animate({scrollTop:$('#generator').offset().top-12},600);$('#textin').focus();});
	//select text within non-input elements (the nasty but nifty contenteditable divs)
	function selectText( containerid ) {var node = document.getElementById(containerid);if(document.selection){var range = document.body.createTextRange();range.moveToElementText(node);range.select();}else if(window.getSelection){var range = document.createRange();range.selectNodeContents(node);window.getSelection().removeAllRanges();window.getSelection().addRange(range);}}
	$('#textout').click(function() {selectText($(this).attr('id'));});
	//iniate min-height equalling both input and output height
	$('#textin,#textout').css({'min-height': $('#textin').height()});
	//main function starter
	$('#textin').bind('input',function(){$(this).unbind('keyup');starter();}).bind('keyup',function(){starter();});
	$('#position,#strength').change(function(){starter();});
	$('#generate span').click(function(e){e.preventDefault();starter();});
	//random number function
	function rand(min,max){return Math.floor(Math.random()*(max-min+1)+min);}	
	//main function
		//zalgos
		var zalgo_up = ['\u0291','\u019F','\u1E43','\u0299'];
		var zalgo_mid = ['\u0291','\u019F','\u1E43','\u0299'];
		var zalgo_down = ['\u0291','\u019F','\u1E43','\u0299'];
		function starter(){
			// replace html linebreaks by javascript linebreaks
			var textin = $("<div/>").html($('#textin').html().replace(/<br\s*[\/]?>/gi, "\n")).text();
			// create array, loop through and add zalgo
			var textinArray = textin.split('');
			var tmp = [];
			for(var i in textinArray){
				var char = textinArray[i];
				if(char != "\n"){
					//strength
					if($("#mini").is(':checked')){smax = 3;mmax = 1;}
					else if($("#maxi").is(':checked')){smax = 15;mmax = 3;}
					else{smax = 7;mmax = 1;}
					loop = rand(0,smax);midloop = rand(0,mmax);
					//treat every char to a nice bunch of crap
					if($("#up").is(':checked') && rand(0,10) > 2){for(var i = 1; i <= loop; i++) {char = char+zalgo_up[rand(0,zalgo_up.length-1)];}}
					if($("#middle").is(':checked') && rand(0,10) > 2){for(var i = 1; i <= midloop; i++) {char = char+zalgo_mid[rand(0,zalgo_mid.length-1)];}}
					if($("#down").is(':checked') && rand(0,10) > 2){for(var i = 1; i <= loop; i++) {char = char+zalgo_down[rand(0,zalgo_down.length-1)];}}
				}
				tmp.push(char);
			}
			// join array, replace linebreaks by <br />, trim whitespace and spit out to output div
			//data = tmp.join("").replace(/(?:\r\n|\r|\n)/g, '<br />').trim();
			
			/*$('#textout').text('').animate('opacity:0', function() {
				$('#textout').html(data).animate({
					opacity: 1
				});
			});*/			
			
			$('#textout').html('');
			
			$('#textout').html(tmp.join("").replace(/(?:\r\n|\r|\n)/g, '<br />').trim());
		}
});