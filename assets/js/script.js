'use strict';

$(function () {

    //This will show the Artis based on search
    $('#searchArtist').click(function () {
        var artInput = "https://rest.bandsintown.com/artists/" + $('#searchArtistField').val();
        if ($('#searchArtistField').val().length > 0) {
            $.ajax({
                method: 'GET',
                url: artInput,
                data: {
                    app_id: '123'
                },
                dataType: 'json',
                beforeSend: function (xhr) {
                    //wait for the query results
                    $('#searchArtistField').prop('disabled', true);
                    $('#artistEventsContainer').empty();
                },
                success: function (result, status, xhr) {
                    // this will execute if correct and fill the data to artist card
                    if (result != null && result != "" && result.error != "Not Found") {
                        $('#searchArtistField').prop('disabled', false);
                        $('#artistInfo').show();
                        $('#noArtistFound').hide();
                        $('#artistThumb').attr("src", result.thumb_url);
                        $('#artistName').text(result.name);

                        //this check tells us if the artis have or haven't facebook
                        if (result.facebook_page_url == "") {
                            $('#artistFB').attr("href", "");
                            $('#artistFB').html('<i class="fa fa-unlink mr-1"></i> Not have facebook page');
                            $('#artistFB').addClass('disabled');
                        } else {
                            $('#artistFB').removeClass('disabled');
                            $('#artistFB').attr("href", result.facebook_page_url);
                            $('#artistFB').html('<i class="fab fa-facebook-square mr-1"></i>Find on Facebook');

                        }
                        //this check tells us is the artis have upcoming events or not
                        if (result.upcoming_event_count > 0) {
                            $('#upEvents').html('<button class="btn btn-primary mt-1" onclick="getUpcomingEvents()">' + result.upcoming_event_count + ' Upcoming Events</button>');
                        } else {
                            $('#upEvents').html('<b>No Upcoming Events</b>');
                        }
                    } else {
                        $('#artistInfo').hide();
                        $('#searchArtistField').prop('disabled', false);
                        $('#noArtistFound').show().text('No artist found based on your search');
                    }
                },
                error: function (xhr, status, error) {
                    alert("Error Status: " + xhr.status + ", " + xhr.statuText);
                },
                complete: function (xhr, status) {

                }
            });
        }
    });

    //trigger artist search through enter key
    $('#searchArtistField').keypress(function (e) {
        if (e.which == 13) {
            $('#searchArtist').click();
        }
    });

    //Back to Search
    $('#backToSearch').on('click', function () {
        $('header').removeClass('only-header');
        $('#artistEventsContainer').empty();
        $('#artistInfo button').show();
        $(this).hide();
    });

})


//Upcoming events list
function getUpcomingEvents() {
    var artName = "https://rest.bandsintown.com/artists/" + encodeURIComponent($('#artistName').text()) + "/events?app_id=123&date=upcoming";
    $.ajax({
        method: 'GET',
        url: artName,
        dataType: 'json',
        beforeSend: function (xhr) {
            $('#artistInfo').addClass('disabled');

        },
        success: function (result, status, xhr) {
            $('#artistInfo').removeClass('disabled');
            $('#artistInfo button').hide();
            $('header').addClass('only-header');
            $('#backToSearch').show();
            var artistEventList = '';

            // this adds the total upcoming events strip
            artistEventList += '<div class="col-12"><h6 class="up-event-counter">' + result[0].artist.upcoming_event_count + ' Upcoming Events</h6></div>';

            // this loop runs for all upcoming events details
            $.each(result, function (key, val) {
                if (key == 0) { }
                artistEventList += '<div class="col-xl-6 mb-4">' +
                    '<div class="artis-details-card">' +
                    '<h5>' + ++key + ': Event Detail</h5>' +
                    '<div class="row gutters-5">' +
                    '<div class="col-6 mb-2">' +
                    '<span>Country:</span>' +
                    '<strong class="d-block">' + val.venue.country + '</strong>' +
                    '</div>' +
                    '<div class="col-6 mb-2">' +
                    '<span>City:</span>' +
                    '<strong class="d-block">' + val.venue.city + '</strong>' +
                    '</div>' +
                    '<div class="col-6 mb-2">' +
                    '<span>Venue:</span>' +
                    '<strong class="d-block">' + val.venue.name + '</strong>' +
                    '</div>' +
                    '<div class="col-6 mb-2">' +
                    '<span>Date:</span>' +
                    '<strong class="d-block">' + showDate(val.datetime) + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            });

            $('#artistEventsContainer').html(artistEventList);

        },
        error: function (xhr, status, error) {
            alert("Error: " + xhr.status + ", " + xhr.statuText);
        },
        complete: function (xhr, status) {

        }
    });
}


//Date Format
function showDate(dat) {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'AUg', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dat = new Date(dat);
    var m = month[dat.getMonth()];
    var d = dat.getDate();
    var y = dat.getFullYear();

    return d + ' ' + m + ', ' + y;
}
