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
                        $('#upEvents').html('<button class="btn btn-primary mt-1">' + result.upcoming_event_count + ' Upcoming Events</button>');
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