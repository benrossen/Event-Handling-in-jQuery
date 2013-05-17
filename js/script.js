$(document).ready(function(){
	/* your code goes here */
	var $slides = $('#slides').find('li');
	var slideCount = $slides.length;
	var nextSlideIndex = 0;
	var page = 0; 
	var $num_items = $('#num-items');
	var numItems = parseInt($num_items.val());
	var html = "";
	setInterval(function(){

		var $activeSlide = $slides.filter('.active');

		if(nextSlideIndex < slideCount - 1) {
			nextSlideIndex++;
		} else {
			nextSlideIndex = 0;
		}

		$slides.eq(nextSlideIndex).show();

		$activeSlide.fadeOut(500, function(){
			$activeSlide.removeClass('active');
			$slides.eq(nextSlideIndex).addClass('active');
		});

	}, 5000);


	// Listings page code

	var listings = [
		{ 
			address: "123 41st St",
			bedrooms: 2,
			bathrooms: 2,
			image: "img/1bdrm_a.jpg"
		},
		{ 
			address: "234 52nd St",
			bedrooms: 1,
			bathrooms: 1,
			image: "img/1bdrm_b.jpg"
		},
		{ 
			address: "345 63rd St",
			bedrooms: 3,
			bathrooms: 2,
			image: "img/1bdrm_c.jpg"
		}
	];
	
	
	
	// generate dummy text for additional listings
	for (var i=0; i < 27; i++) {
		var element = listings[i%3];
		listings.push(element);  
	}

	var pageCount = Math.floor(listings.length / numItems);
	
	// next & previous button controllers 
	$('#next').click(function(e) {
		if (page < pageCount) {
			page++;
			html = generateHTML();
			$('#listings-container').html(html);
		}
	});

	$('#prev').click(function(e) {
		if (page > 0) {
			page--;
			html = generateHTML();
			$('#listings-container').html(html);
		}
	});
	
	// update number of items when selector is changed 
	$num_items.change(function() {
		numItems = parseInt($(this).val()); 
		html = generateHTML();
		$('#listings-container').html(html);
	});

	// create markup for next/prev buttons 
	function generateHTML() {
		var firstEl = (page * numItems);
			html = '';
			for (var i = firstEl; i < firstEl + numItems; i++) {
				if (i < listings.length) {
					html += '<div class="listing"><div class="photo-container"><img src="' + listings[i].image + '"></div>';
					html += '<div class="listing-details clearfix"><div class="address">' + listings[i].address + '</div>'; 
					html += '<div class="bed_bath">' + listings[i].bedrooms + 'BR/' + listings[i].bathrooms + ' Bath</div></div>';
					html += '<a href="#" class="overlay">View Listing</a></div>';
				}		
			}
		return html;
	}


});