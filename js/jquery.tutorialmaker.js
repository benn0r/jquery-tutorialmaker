(function($)
{
	
	$.fn.tm = function(options, step)
	{
		var elem = step.elem;
		
		// overlay top
		$('.tm-otop').animate({
			height: elem.offset().top
		}, options.speed);
		
		// overlay bottom
		$('.tm-obottom').animate({
			height: $(document).height() - 
				elem.offset().top - elem.outerHeight()
		}, options.speed);
		
		// overlay left
		$('.tm-oleft').animate({
			top: elem.offset().top,
			bottom: $(document).height() - 
				elem.offset().top - elem.outerHeight(),
			width: elem.offset().left
		}, options.speed);
		
		// overlay right
		$('.tm-oright').animate({
			top: elem.offset().top,
			bottom: $(document).height() - 
				elem.offset().top - elem.outerHeight(),
			width: $(document).width() - 
				elem.offset().left - elem.outerWidth()
		}, options.speed);
		
		setTimeout(function() {
			options.next();
		}, 1000);
	};

	$.tm = function(options)
	{
		var settings = $.extend({
			steps: [],
			speed: 200,
			step: 0,
		}, options);
		
		settings.next = function() {
			settings.step++;
			settings.steps[settings.step].elem.tm(settings, 
				settings.steps[settings.step]);
		};
		
		$('body').append('<div class="tm-overlay tm-otop"></div>');
		$('body').append('<div class="tm-overlay tm-oright"></div>');
		$('body').append('<div class="tm-overlay tm-obottom"></div>');
		$('body').append('<div class="tm-overlay tm-oleft"></div>');
		
		settings.steps[0].elem.tm(settings, settings.steps[0]);
	};
	
})(jQuery);