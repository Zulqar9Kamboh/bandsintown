"use strict";

$(function () {
    //This will show the Artis based on search
    $('#searchArtist').click(function () {
        var artInput = "https://rest.bandsintown.com/artists/" + $('#searchArtistField').val();
        $.ajax({
            method: 'GET',
            url: artInput,
            data: {
                app_id: '123',
            },
            type: 'json',
            beforeSend: function (xhr) {
                //wait for the query results
                $('#searchArtistField').prop('disabled', true);
            },
            success: function (result, status, xhr) {
                $('#searchArtistField').prop('disabled', false);
                $('#artistInfo').show();
                $('#artistThumb').attr("src", result.thumb_url);
                $('#artistName').text(result.name);
                $('#artistFB').attr("href", result.facebook_page_url);
            },
            error: function (xhr, status, error) {
                alert("Status: " + status + ", Error:" + error);
            },
            complete: function (xhr, status) {
                $('#searchArtistField').prop('disabled', false);
            }
        });
    });

});