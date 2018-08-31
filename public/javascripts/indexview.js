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

function SetLight() {
    var notes = $("#NotesText").val();
    $.ajax({
        type: "GET",
        url: "/api/light/set/" + notes,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            $("#TestResults").empty();
            $("#TestResults").append('<h3>Light set</h3>');
        },
        error: function (results) { }
    });
}

function GetCowResults() {
    $.ajax({
        type: "GET",
        url: "/api/cow/results",
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            $("#TestResults").empty();
            var html = '<h3>Results</h3><table><tr><th>Notes</th><th>Latitude</th><th>Longitude</th><th>RSSI</th><th>Count</th><th>Timestamp</th></tr>';
            for (var i = 0; i < results.length; i++) {
                var r = results[i];
                html += '<tr>';
                html += '<td>' + r.notes + '</td>';
                html += '<td>' + r.latitude + '</td>';
                html += '<td>' + r.longitude + '</td>';
                html += '<td>' + r.rssi + '</td>';
                html += '<td>' + r.total + '</td>';
                html += '<td>' + r.timestamp + '</td>';
                html += '</tr>';
            }
            html += '</table>';
            $("#TestResults").append(html);
        },
        error: function (results) { }
    });
}