// main.js

$(document).ready(function(){
	var wd = $(window);

	function afterAnimation(el) {
		$(el).css({
			'-webkit-transform': 'translate(0,0)',
			'-moz-transform': 'translate(0,0)',
			'-ms-transform': 'translate(0,0)',
			'-o-transform': 'translate(0,0)',
			'transform': 'translate(0,0)',
			'opacity': '1'
		});
	}

	$('[data-section]').each(function(){
		var section = $(this),
			secTop = section.offset().top,
			secHeight = section.innerHeight();

		section.find('[data-intro]').each(function(){
			var params = $(this).data('intro').split(','),
				direction = params[0],
				time = params[1],
				translate;

			switch(direction) {
				case 'left':
					translate = 'translateX(80px)';
					break;
				case 'right':
					translate = 'translateX(-80px)';
					break;
				case 'top':
					translate = 'translateY(80px)';
					break;
				case 'down':
					translate = 'translateY(-80px)';
					break;
				default:
					translate = 'translateX(-80px)';
			}

			$(this).css({
				'-webkit-transform': translate, '-webkit-transition': time, '-webkit-transition-timing-function': 'ease-out',
				'-moz-transform': translate, '-moz-transition': time, '-moz-transition-timing-function': 'ease-out',
				'-ms-transform': translate, '-ms-transition': time, '-ms-transition-timing-function': 'ease-out',
				'-o-transform': translate, '-o-transition': time, '-o-transition-timing-function': 'ease-out',
				'transform': translate, 'transition': time, 'transition-timing-function': 'ease-out'
			});
		});

		// First case
		setTimeout(function(){
			$('[data-section]').eq(0).find('[data-intro]').each(function(){
				afterAnimation(this);
			});
		},1000)

		wd.scroll(function(){
			var wdTop = wd.scrollTop();

			if ( wdTop > (secTop - (secHeight/4)*3 ) ) {
				$('[data-section]').removeClass('active');
				section.addClass('active');

				if ( section.hasClass('active') ) {
					section.find('[data-intro]').each(function(){
						afterAnimation(this);
					});
				};
			};
		});
	});

});