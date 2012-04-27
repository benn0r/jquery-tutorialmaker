(function($)
{
	
	$.fn.tm = function(options, step)
	{
		var elem = step.elem;
		
		if ($('.tm-bracket').size() > 0) {
			// create new bracket element
			if ($('.tm-bracket').data('popover') &&
				$('.tm-bracket').data('popover').$tip) {
				$($('.tm-bracket').data('popover').$tip).remove();
			} else {
				$('.tm-popover').remove();
			}
			$('.tm-bracket').remove();
		}
		$('body').append('<div class="tm-bracket"></div>');
		
		// overlay top
		$('.tm-otop').animate({
			height: elem.offset().top - 5
		}, options.speed);
		
		// overlay bottom
		$('.tm-obottom').animate({
			height: $(window).height() - 
				elem.offset().top - elem.outerHeight() - 5
		}, options.speed);
		
		// overlay left
		$('.tm-oleft').animate({
			top: elem.offset().top - 5,
			bottom: $(window).height() - 
				elem.offset().top - elem.outerHeight() - 5,
			width: elem.offset().left - 5
		}, options.speed);
		
		// overlay right
		$('.tm-oright').animate({
			top: elem.offset().top - 5,
			bottom: $(window).height() - 
				elem.offset().top - elem.outerHeight() - 5,
			width: $(document).width() - 
				elem.offset().left - elem.outerWidth() - 5
		}, options.speed);
		
		setTimeout(function() {
			// display bracket
			switch (step.position) {
				case 'top':
					$('.tm-bracket').addClass('tm-btop');
					$('.tm-bracket').css('top', elem.offset().top - 15);
					$('.tm-bracket').css('left', elem.offset().left - 15);
					$('.tm-bracket').width(elem.outerWidth() + 20);
					break;
				case 'right':
					$('.tm-bracket').addClass('tm-bright');
					$('.tm-bracket').css('top', elem.offset().top - 15);
					$('.tm-bracket').css('left', elem.offset().left + elem.outerWidth());
					$('.tm-bracket').height(elem.outerHeight() + 20);
					break;
				case 'bottom':
					$('.tm-bracket').addClass('tm-bbottom');
					$('.tm-bracket').css('top', elem.offset().top + elem.outerHeight());
					$('.tm-bracket').css('left', elem.offset().left - 15);
					$('.tm-bracket').width(elem.outerWidth() + 20);
					break;
				case 'left':
					$('.tm-bracket').addClass('tm-bleft');
					$('.tm-bracket').css('top', elem.offset().top - 15);
					$('.tm-bracket').css('left', elem.offset().left - 15);
					$('.tm-bracket').height(elem.outerHeight() + 20);
					break;
			}
			
			if (options.popover) {
				options.popover(options, step);
			} else if ($('.tm-bracket').popover) {
				// do the help text thing with bootstrap
				var nextbtn = $('<a href="" class="btn btn-success btn-mini pull-right">' + 
					step.button + '</a>');
				
				nextbtn.data('options', options);
				nextbtn.click(function() {
					$(this).data('options').next();
					return false;
				});
				
				$('.tm-bracket').popover({
					title: step.title,
					content: step.body,
					placement: step.position,
					trigger: 'manual'
				});
				$('.tm-bracket').popover('show');
				
				if (step.button) {
					$($('.tm-bracket').data('popover').$tip)
						.find('.popover-title')
						.append(nextbtn);
				}
			}
		}, options.speed);
	};

	$.tm = function(options)
	{
		var settings = $.extend({
			steps: [],
			speed: 200,
			step: -1,
		}, options);
		
		// go to next step
		settings.next = function() {
			settings.step++;
			if (settings.steps[settings.step]) {
				settings.steps[settings.step].elem.tm(settings, 
						settings.steps[settings.step]);
			}
		};
		
		settings.stepname = function() {
			if (settings.steps[settings.step]) {
				return settings.steps[settings.step].step;
			}
			return null;
		}
		
		$('body').append('<div class="tm-overlay tm-otop"></div>');
		$('body').append('<div class="tm-overlay tm-oright"></div>');
		$('body').append('<div class="tm-overlay tm-obottom"></div>');
		$('body').append('<div class="tm-overlay tm-oleft"></div>');
		
//		settings.steps[0].elem.tm(settings, settings.steps[0]);
		
		return settings;
	};
	
})(jQuery);