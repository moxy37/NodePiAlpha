function UpdateNotes() {

    var notes = $("#NotesText").val();
    $.ajax({
        type: "GET",
        url: "/api/cow/update/" + notes,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            $("#TestResults").empty();
            $("#TestResults").append('<h3>' + notes + ' added to system</h3>');
        },
        error: function (results) { }
    });
}

function StartListening() {
    $.ajax({
        type: "GET",
        url: "/api/cow/start",
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            $("#TestResults").empty();
            $("#TestResults").append('<h3>Listener started</h3>');
            $("#ListenButton").hide();
        },
        error: function (results) { }
    });
}