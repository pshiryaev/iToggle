///////////////////////
//	GLOBAL.JS - REQUIRES JQUERY 3x
//	Please do not steal.
//	Every time you steal, An angry Scotsman punches a puppy in the face! A really cute puppy!

//ChiliBook.recipeFolder = "/global/js/recipes/";
ChiliBook.recipeFolder = "js/";
ChiliBook.lineNumbers = true;
ChiliBook.automatic = false;

//WAIT FOR THE PAGE TO BE READY
$(document).ready(function(){
// Begin jQuery goodness

	// NAV DROP DOWN
	$('#drop_down').hover(function(){
		$(this).children('a.top').addClass('active').next('ul').show();
		$(this).parent('div').css({overflow:'visible'});
	},function(){
		$(this).children('a.top').removeClass('active').next('ul').hide();
		$(this).parent('div').css({overflow:'auto'});
	});

	// CODE VIEWER
	$('a.show_code').click(function(){
		code('show', $(this).next('div.code'));
		return false;
	});
	
	// ONE CLICK THAT WILL ONLY WORK ONCE
	$('a.show_code').one('click', function(){
		$(this).next('div.code').children('pre').children('code').chili(); //Load chili on click
	});
	
	// CLOSE THE VIEWER
	$('div#overlay').click(function(){
		code('hide');
	});
	$(document).on("click", 'div.options a.close', function() {
		code('hide');
		return false;
	});

	// SHOW OR HIDE FUNCTION
	function code(action, object){
		if(action=='show'){
			$(object).show().css({opacity:0}).animate({opacity:1}, 400).addClass('active');
			$('div#overlay').show().css({opacity:0}).animate({opacity:0.8});
			addOptions(object);
		}else{
			$('div#overlay').animate({opacity:0.0}, 400, function(){$(this).hide();});
			$('div.code.active').animate({opacity:0}, 400, function(){
				$(this).hide().removeClass('active');
			});
		}
	}
	
	// ADD IN THE OPTIONS AND PLAIN TEXT VERSION
	function addOptions($this){
		if($this.contents('div').attr('class') != 'options'){
			$this.append('<div class="options"><a href="#" class="close" title="Close code view">Close</a><a href="#" class="plain" title="Show or hide the plain text version.">Show plain text version</a></div>')

			// ADD THE PLAIN TEXT OPTION
			$this.children('pre').after('<textarea cols="50" class="plaintext"></textarea>');
			//write a textarea with the content of the code-box after it
			
			$('a.plain').toggle(function() { //hide code-box and show textarea
				$(this).text('Show highlighted version').addClass('highlighted'); //change text of the link
				$this.children('textarea.plaintext').text(plainText($this)).show().css({display:'block'});
				$this.children('pre').hide();
			}, function() { //hide textarea and show code box
				$(this).text('Show plain text version').removeClass('highlighted');
				$this.children('textarea.plaintext').hide();
				$this.children('pre').show();
			});
		}
	}
	
	// PLAIN TEXTIFY!
	function plainText($this){
		theContent = '';
		$this.children('pre').children('code').children('ol').children('li').each(function(){
			theContent = theContent + ($(this).text() + '\r\n');
		});
		return (theContent);
	}
	
	// HAHA IE JOKE!
	
	$('#ie_message a.hide').toggle(function(){
		$(this).text('Error: Try again...');
		$(this).parent().css({padding:'20px'});
	},function(){
		$(this).text('One more go...');
		$(this).parent().css({padding:'40px'});
	},function(){
		$(this).text("HA! I'm back!");
		$(this).parent().css({opacity:0 ,padding:0, height:0}).animate({opacity:0}, 6000).animate({opacity:1, height:'20px', padding:10}, 400);
	},function(){
		$(this).parent().hide();
	});

// End jQuery goodness
});