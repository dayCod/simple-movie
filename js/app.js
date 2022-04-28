function detailMovie() {
  $('#movie-list').html('');
  $.ajax({
    type: 'get',
    url: 'http://www.omdbapi.com',
    data: {
      apikey: 'f37beb06',
      s: $('#search-input').val(),
    },
    dataType: 'json',
    success: function (response) {
      if (response.Response.toLowerCase() == 'true') {
        const getResult = response.Search;

        $.each(getResult, function (indexInArray, valueOfElement) {
          $('#movie-list').append(`     
                  <div class="col-md-3">
                      <div class="card mb-3">
                          <img src="${valueOfElement.Poster}" class="card-img-top" alt="${valueOfElement.Title}" height="525" />
                          <div class="card-body">
                              <h5 class="card-title">${valueOfElement.Title}</h5>
                              <p class="card-text">${valueOfElement.Year}</p>
                              <a href="#" class="btn btn-dark d-block" id="see-detail" data-id="${valueOfElement.imdbID}" data-bs-toggle="modal" data-bs-target="#exampleModal" >See Detail</a>
                          </div>
                      </div>
                  </div>             
              `);
        });

        $('#search-input').val('');
      } else {
        $('#movie-list').html(`
              <div class="col">
                  <h1 class="text-center">${response.Error}</h1>
              </div>
            `);
      }
    },
  });
}

$('#search-button').on('click', function () {
  detailMovie();
});

$('#search-input').on('keyup', function (event) {
  if (event.keyCode === 13) {
    detailMovie();
  }
});

$('#movie-list').on('click', '#see-detail', function () {
  $.ajax({
    type: 'get',
    url: 'http://www.omdbapi.com',
    data: {
      apikey: 'f37beb06',
      i: $(this).data('id'),
    },
    dataType: 'json',
    success: function (movieDetail) {
      if (movieDetail.Response.toLowerCase() === 'true') {
        $('.modal-body').html(`
            <div class="row">
                <div class="col-md-4">
                    <img src="${movieDetail.Poster}" alt="${movieDetail.Title}" class="img-fluid mb-3" width="100%"/>
                </div>
                <div class="col-md-8">
                    <ul class="list-group">
                        <li class="list-group-item">Title : ${movieDetail.Title}</li>
                        <li class="list-group-item">Year : ${movieDetail.Year}</li>
                        <li class="list-group-item">Rated : ${movieDetail.Rated}</li>
                        <li class="list-group-item">Released : ${movieDetail.Released}</li>
                        <li class="list-group-item">Runtime : ${movieDetail.Runtime}</li>
                        <li class="list-group-item">Genre : ${movieDetail.Genre}</li>
                        <li class="list-group-item">Actors : ${movieDetail.Actors}</li>
                    </ul>
                </div>
            </div>`);
      }
    },
  });
});
