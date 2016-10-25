var gDisplay = new Object();

function GetAllDisplays() {
    $.ajax({
        type: "GET",
        url: "/displays/",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<table id="AllDisplayList"><thead><tr><th colspan="3">All DMPs</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                // if (i > 0) { html += '<br />'; }
                html += '<tr id="Row_' + results[i].id + '"><td>' + results[i].name + '</td><td><input type="button" class="btn" value="Load" onclick="GetDisplay(\'' + results[i].id + '\');"  /></td>';
                html += '<td><input type="button" class="btn" value="Delete" onclick="DeleteDisplay(\'' + results[i].id + '\');"  /></td></tr>';
                // html += '<a onclick="GetDisplay(\'' + results[i].id + '\');">' + results[i].name + '</a>';
                // html += '<input type="button" class="btn" value="' + results[i].name + '" onclick="GetDisplay(\'' + results[i].id + '\');"  />';
            }
            html += '</tbody><tfoot><tr><td></td><td colspan="2"><input type="button" class="btn btn-primary" value="Associate New DMP" onclick="CreateDisplay();" /></td></tr></tfoot></table>';
            $("#DisplayList").empty();
            $("#DisplayList").append(html);
        },
        error: function (results) { }
    });
}


function DeleteDisplay(id) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        $.ajax({
            type: "GET",
            url: "/delete_display/" + id,
            cache: false,
            dataType: "json",
            success: function (results) {
                var html = '<table id="AllDisplayList"><thead><tr><th colspan="3">All DMPs</th></tr></thead><tbody>';
                for (var i = 0; i < results.length; i++) {
                    // if (i > 0) { html += '<br />'; }
                    html += '<tr id="Row_' + results[i].id + '"><td>' + results[i].name + '</td><td><input type="button" class="btn" value="Load" onclick="GetDisplay(\'' + results[i].id + '\');"  /></td>';
                    html += '<td><input type="button" class="btn" value="Delete" onclick="DeleteDisplay(\'' + results[i].id + '\');"  /></td></tr>';
                    // html += '<a onclick="GetDisplay(\'' + results[i].id + '\');">' + results[i].name + '</a>';
                    // html += '<input type="button" class="btn" value="' + results[i].name + '" onclick="GetDisplay(\'' + results[i].id + '\');"  />';
                }
                html += '</tbody><tfoot><tr><td></td><td colspan="2"><input type="button" class="btn btn-primary" value="Create New DMP" onclick="CreateDisplay();" /></td></tr></tfoot></table>';
                $("#DisplayList").empty();
                $("#DisplayInformation").empty();
                $("#DisplayInformation").append('<h2 style="color: blue;">DMP Removed</h2>');
                $("#DisplayList").append(html);
            },
            error: function (results) {
                $("#DisplayInformation").empty();
                $("#DisplayInformation").append('<h2 style="color: red;">Error Deleting DMP</h2>');
            }
        });
    }
}

function GetDisplay(id) {
    $.ajax({
        type: "GET",
        url: "/displays/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gDisplay = ShowDisplayHTML(results);
        },
        error: function (results) { }
    });
}

function ShowDisplayHTML(display) {
    var html = '<table><tr><th colspan="2">DMP Information</th></tr>';
    html += '<tr><td>IP Address:</td>';
    html += '<td><input type="text" id="DisplayIpAddressTextbox" class="container_text" value="' + display.ipAddress + '" /></td></tr>';
    html += '<tr><td>Name:</td>';
    html += '<td><input type="text" id="DisplayNameTextbox" class="container_text" value="' + display.name + '" /></td></tr>';
    html += '<tr><td></td><td style="text-align:right;"><input type="button" class="btn btn-primary" value="Save DMP" onclick="SaveDisplay()" /></td></tr>';
    html += '</table>';
    $("#DisplayInformation").empty();
    $("#DisplayInformation").append(html);
    return display;
}

function UpdateDisplay(display) {
    display.name = $("#DisplayNameTextbox").val();
    display.ipAddress = $("#DisplayIpAddressTextbox").val();
    return display;
}

function CreateDisplay() {
    $.ajax({
        type: "GET",
        url: "/create_display",
        cache: false,
        dataType: "json",
        success: function (results) {
            gDisplay = ShowDisplayHTML(results);
        },
        error: function (results) { }
    });
}

function SaveDisplay() {
    var display = UpdateDisplay(gDisplay);
    $.ajax({
        type: "POST",
        url: "/save_display",
        data: display,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            var data = results;
            gDisplay = data;
            if ($("#Row_" + results.id).val() !== undefined) {
                var html = '<td>' + results.name + '</td><td><input type="button" class="btn" value="Load" onclick="GetDisplay(\'' + results.id + '\');"  /></td>';
                html += '<td><input type="button" class="btn" value="Delete" onclick="DeleteDisplay(\'' + results.id + '\');"  /></td>';
                $("#Row_" + results.id).empty();
                $("#Row_" + results.id).append(html);
            } else {
                var html = '<tr id="Row_' + results.id + '"><td>' + results.name + '</td><td><input type="button" class="btn" value="Load" onclick="GetDisplay(\'' + results.id + '\');"  /></td>';
                html += '<td><input type="button" class="btn" value="Delete" onclick="DeleteDisplay(\'' + results.id + '\');"  /></td></tr>';
                $("#AllDisplayList tbody").append(html);
            }
            $("#DisplayInformation").empty();
            $("#DisplayInformation").append('<h2 style="color: blue;">DMP Saved</h2>');
        },
        error: function (results) {
            $("#DisplayInformation").empty();
            $("#DisplayInformation").append('<h2 style="color: red;">Error Saving DMP</h2>');
        }
    });
}