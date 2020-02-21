"use strict";

$(function () {
    //This will show the Artis based on search
    $('#searchArtist').click(function () {
        var artInput = "https://rest.bandsintown.com/artists/" + $('#searchArtistField').val();
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
            },
            success: function (result, status, xhr) {
                // this will execute if correct and fill the data to artist card
                if (result != null && result != "" && result.error != "Not Found") {
                    $('#searchArtistField').prop('disabled', false);
                    $('#artistInfo').show();
                    $('#noArtistFound').hide();
                    $('#artistThumb').attr("src", result.thumb_url);
                    $('#artistName').text(result.name);
                    $('#artistFB').attr("href", result.facebook_page_url);
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
                alert("Status: " + status + ", Error:" + error);
            },
            complete: function (xhr, status) {
                $('#searchArtistField').prop('disabled', false);
            }
        });
    });

    //trigger artist search through enter key
    $('#searchArtistField').keypress(function (e) {
        if (e.which == 13) {
            $('#searchArtist').click();
        }
    });
});

//Upcoming events list
function getUpcomingEvents() {
    var artName = "https://rest.bandsintown.com/artists/" + encodeURIComponent($('#artistName').text()) + "/events?app_id=123&date=upcoming";
    $.ajax({
        method: 'GET',
        url: artName,
        dataType: 'json',
        beforeSend: function (xhr) {

        },
        success: function (result, status, xhr) {
            var artistEventList = '';

            $.each(result, function (key, val) {
                if (key == 0) {}
                artistEventList += '<div class="col-xl-6 mb-3">' +
                    '<div class="artis-details-card">' +
                    '<h5>Event Details</h5>' +
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
                    '<strong class="d-block">' + val.datetime + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            });

            $('#artistEventsContainer').html(artistEventList);

        },
        error: function (xhr, status, error) {

        },
        complete: function (xhr, status) {

        }
    });
}