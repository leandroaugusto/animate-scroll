// main.js

$(document).ready(function(){
	var wd = $(window),
		on = {
			prefixProps: function(prop, val){
				var prefixes = [ '-webkit-', '-moz-', '-ms-', '-o-' ],
					arr = [];

				for (var i = 0; i < prefixes.length; i++){
					arr.push([ prefixes[i]+prop, val ].join(':') );
				}
				arr.push([prop, val].join(':'));

				return arr.join(';');
			},
			animationEnd: function(el){
				$(el).attr('style', on.prefixProps('transform', 'translate(0,0)'));
				$(el).css('opacity', '1');
			},
			setCurrSection: function(els, i, curr){
				i != undefined ?
				 curr = '['+els.attributes[0].name+']'+':eq('+i+')' :
				 curr = curr;

				$(els).removeClass('active');
				$(curr).addClass('active');
			},
			setProps: function(el){
				var section = $(el),
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

					$(this).attr('style',
						[on.prefixProps('transform', translate),
						on.prefixProps('transition', time),
						on.prefixProps('transition-timing-function', 'ease-out')]);
				});
			}
		}

	$('[data-section]').each(function(i, e){
		// on.setCurrSection(e, 0);
		on.setProps(this);

		// First case
		// setTimeout(function(){
		// 	$('[data-section]').eq(0).find('[data-intro]').each(function(){
		// 		afterAnimation(this);
		// 	});
		// },1000)

		// wd.scroll(function(){
		// 	var wdTop = wd.scrollTop();

		// 	if ( wdTop > (secTop - (secHeight/4)*3 ) ) {
		// 		$('[data-section]').removeClass('active');
		// 		section.addClass('active');

		// 		if ( section.hasClass('active') ) {
		// 			section.find('[data-intro]').each(function(){
		// 				afterAnimation(this);
		// 			});
		// 		};
		// 	};
		// });
	});

});