/*---------------
 * jQuery iToggle Plugin by Engage Interactive
 * Examples and documentation at: http://labs.engageinteractive.co.uk/itoggle/
 * Copyright (c) 2009 Engage Interactive
 * Version: 1.0 (10-JUN-2009)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html

 * Version: 1.7 (30-May-2012) by pshiryaev
 * Requires: jQuery v1.7 or later
---------------*/

(function($){
	$.fn.iToggle = function(options) {
		
		clickEnabled = true;
		
		var defaults = {
			type: 'checkbox',
			keepLabel: true,
			easing: false,
			speed: 200,
			onClick: function(){},
			onClickOn: function(){},
			onClickOff: function(){},
			onSlide: function(){},
			onSlideOn: function(){},
			onSlideOff: function(){}
		},
		settings = $.extend({}, defaults, options);
		

		this.each(function(){
			var $this = $(this);
			if ($this.is("input")) {
				var id=$this.attr('id');
				label(settings.keepLabel, id);
				if($this.attr('checked')){
					var lbl = $('<label class="itoggle" for="'+id+'"><span></span></label>');
					$this.addClass('iT_checkbox').before(lbl);
					var h=$(lbl).innerHeight();
					$(lbl).css({'background-position-x': '0%', 'background-position-y': '-'+h+'px'});					
					$this.prev('label').addClass('iTon');
				}else{
					var lbl = $('<label class="itoggle" for="'+id+'"><span></span></label>');
					$this.addClass('iT_checkbox').before(lbl);
					var h=$(lbl).innerHeight();
					$(lbl).css({'background-position-x': '100%', 'background-position-y': '-'+h+'px'});
					$this.prev('label').addClass('iToff');
				}
			}else{
				$this.children('input:'+settings.type).each(function(){
					var id = $(this).attr('id');
					label(settings.keepLabel, id);
					//$(this).addClass('iT_checkbox').before('<label class="itoggle" for="'+id+'"><span></span></label>');
					if($(this).attr('checked')){
						var lbl = $('<label class="itoggle" for="'+id+'"><span></span></label>');
						$(this).addClass('iT_checkbox').before(lbl);
						var h=$(lbl).innerHeight();
						$(lbl).css({'background-position-x': '0%', 'background-position-y': '-'+h+'px'});		
						$(this).prev('label').addClass('iTon');
					}else{
						var lbl = $('<label class="itoggle" for="'+id+'"><span></span></label>');
						$(this).addClass('iT_checkbox').before(lbl);
						var h=$(lbl).innerHeight();
						$(lbl).css({'background-position-x': '100%', 'background-position-y': '-'+h+'px'});
						$(this).prev('label').addClass('iToff');
					}
					if(settings.type == 'radio'){
						$(this).prev('label').addClass('iT_radio');
					}
				});
			}
		});
		
		function label(e, id){
			if(e == true){
				if(settings.type == 'radio'){
					$('label[for='+id+']').addClass('ilabel_radio');
				}else{
					$('label[for='+id+']').addClass('ilabel');
				}
			}else{
				$('label[for='+id+']').remove();
			}
		}

		$('label.itoggle').click(function(){
			if(clickEnabled == true){
				clickEnabled = false;
				if($(this).hasClass('iT_radio')){
					if($(this).hasClass('iTon')){
						clickEnabled = true;
					}else{
						slide($(this), true);
					}
				}else{
					slide($(this));
				}
			}
			return false;
		});
		$('label.ilabel').click(function(){
			if(clickEnabled == true){
				clickEnabled = false;
				slide($('label.itoggle[for='+$(this).attr('for')+']'));
			}
			return false;
		});
		
		function slide($object, radio){
			settings.onClick.call($object); //Generic click callback for click at any state
			h=$object.innerHeight();
			t=$object.prop('for');
			if($object.hasClass('iTon')){
				settings.onClickOff.call($object); //Click that turns the toggle to off position
				$object.animate({ backgroundPositionX: '100%', backgroundPositionY: '-'+h+'px' }, settings.speed, settings.easing, function () {
					$object.removeClass('iTon').addClass('iToff');
					clickEnabled = true;
					settings.onSlide.call(this); //Generic callback after the slide has finnished
					settings.onSlideOff.call(this); //Callback after the slide turns the toggle off
				});
				$('input#'+t).removeAttr('checked');
			}else{
				settings.onClickOn.call($object);
				$object.animate({ backgroundPositionX: '0%', backgroundPositionY: '-'+h+'px' }, settings.speed, settings.easing, function () {
					$object.removeClass('iToff').addClass('iTon');
					clickEnabled = true;
					settings.onSlide.call(this); //Generic callback after the slide has finnished
					settings.onSlideOn.call(this); //Callback after the slide turns the toggle on
				});
				$('input#'+t).prop('checked','checked');
			}
			if(radio == true){
				name = $('#'+t).prop('name');
				slide($object.siblings('label[for]'));
			}
		}

	};
})(jQuery);