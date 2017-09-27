function fetchData() {
	return fetch('https://dog.ceo/api/breeds/list')
		.then(function(response) {  
			if (response.status !== 200) {  
				console.log('Looks like there was a problem. Status Code: ' +  response.status);  
				return;  
			}

			return response.json().then(function(json) {
				return json.message;
			});
		}  
	)  
	.catch(function(err) {  
		console.log('Error:', err);  
	});
}

function filterMatchingResults(input, data) {
	return data.filter(function(word) {
		return word.toLowerCase().includes(input.value.toLowerCase());
	})
}

function generateSuggestions(matches) {
	return matches.map(function(match) {return '<div class="searchSuggestion">' + match + '</div>'});
}

function getResults(event, input, data) {
	var matches = filterMatchingResults(input, data);
	var suggestions = generateSuggestions(matches);

    if(input.value.length > 0) {
		$('.searchSuggestions').addClass('visible');
		$('.searchSuggestions').html(suggestions);
		$('.searchSuggestions').children('.searchSuggestion').first().addClass('active');
    } else {
        $('.searchSuggestions').html('');
        $('.searchSuggestions').removeClass('visible');
    }
}

function addSearchTerm(term) {
	if(term.length > 0) {
		$('.previousSearches').addClass('visible');
		$('.previousSearches').append(
			'<div class="previousSearch"><div class="previousSearchTerm"><p>' + term + '</p><p>' + moment().format('YYYY-MM-DD hh:mm') + '</p></div><div class="removeSearch"><div class="removeCircle">x</div></div></div>'
		);
	}

	resetSearchField();
}

function resetSearchField() {
	$('#searchField').val('');
	$('.searchSuggestions').html('');
	$('.searchSuggestions').removeClass('visible');
}

function removeSearchTerm(search) {
	$(search).remove();
}

$(document).ready(function() {
	fetchData()
		.then(function(searchData) {
			$('#searchField').on('input', function(event) {
				getResults(event, this, searchData)
			});
			
			$('#searchField').on('keydown', function(event) {
				if(event.keyCode === 40) {
					var currentSuggestions = $('.searchSuggestions').children('.searchSuggestion');
					var activeIndex = $('.active').index('.searchSuggestion');

					if(activeIndex < 0) {
						currentSuggestions.first().addClass('active');
					} else if(activeIndex !== (currentSuggestions.length - 1)) {
						$(currentSuggestions[activeIndex]).removeClass('active');
						$(currentSuggestions[activeIndex + 1]).addClass('active');
					}
				} else if(event.keyCode === 38) {
					var currentSuggestions = $('.searchSuggestions').children('.searchSuggestion');
					var activeIndex = $('.active').index('.searchSuggestion');

					if(activeIndex > 0) {
						$(currentSuggestions[activeIndex]).removeClass('active');
						$(currentSuggestions[activeIndex - 1]).addClass('active');
					}
				} else if(event.keyCode === 13) {
					var currentSuggestions = $('.searchSuggestions').children('.searchSuggestion');
					var activeIndex = $('.active').index('.searchSuggestion');

					addSearchTerm($(currentSuggestions[activeIndex]).text());
				}
			});

			$('.searchSuggestions').on('mouseenter', '.searchSuggestion', function(event) {
				$('.searchSuggestion').removeClass('active');
				$(this).addClass('active');
			});

			$('.searchSuggestions').on('click', '.searchSuggestion', function(event) {
				addSearchTerm($(this).text());
				resetSearchField();
			})

			$('.previousSearches').on('click', '.removeSearch', function(event) {
				removeSearchTerm($(this).closest('.previousSearch'));
			});
		});
});