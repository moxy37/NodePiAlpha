var gReader = new Object();
var gAntenna = new Object();
var gDistance = new Object();

function UpdateTagDistances() {
    var id = gReader.id;
}
function GetDistanceForTagAndAntenna() {
    var tagId = $("#AntennaReferenceTagSelect option:selected").val();
    var antennaId = $("#CurrentAntennaId").val();
    var data = new Object();
    data.antennaId = antennaId;
    data.tagId = tagId;
    //alert("TagID: " + tagId + ", antennaId: " + antennaId);
    if (antennaId !== undefined) {
        $.ajax({
            type: "POST",
            url: "/get_tag_distance_by_tag_antenna",
            data: data,
            cache: false,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded", //This is what made the difference.
            success: function (results) {
                gDistance = results;
                $("#TagDistance").val(results.distance);
            },
            error: function (results) { }
        });
    }
}

function SaveDistance() {
    gDistance.distance = parseFloat($("#TagDistance").val());
    $.ajax({
        type: "POST",
        url: "/save_distance",
        data: gDistance,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            $("#TagDistance").val(results.distance);
            gDistance = results;
        },
        error: function (results) {
            alert("Error Saving Camera");
        }
    });
}

function GetAllReferenceTagList() {
    var tagType = 0;
    $.ajax({
        type: "GET",
        url: "/get_tags_by_type/" + tagType,
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<select id="AntennaReferenceTagSelect" onchange="GetDistanceForTagAndAntenna();">';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].id + '">' + results[i].label + '</option>';
            }
            html += '</select>';
            $("#ReferenceTagDiv").empty();
            $("#ReferenceTagDiv").append(html);
        },
        error: function (results) { }
    });
}
function GetAllReadersList() {
    $("#MessageDiv").empty();
    $.ajax({
        type: "GET",
        url: "/readers/",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<table id="AllReaderTable"><thead><tr><th colspan="4">All Readers</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr id="Row_' + results[i].id + '"><td>' + results[i].ipAddress + '</td>';
                html += '<td><input type="button" class="btn" onclick="GetReader(\'' + results[i].id + '\')" value="Load" />';
                html += '</td><td><input type="button" class="btn" onclick="StartReader(\'' + results[i].id + '\')" value="Start" />';
                html += '</td><td><input type="button" class="btn" onclick="DeleteReader(\'' + results[i].id + '\')" value="Delete" /></td></tr>';
            }
            html += '</tbody><tfoot><tr><td colspan="4" style="text-align: right;"><input type="button" class="btn btn-primary" value="Add New Reader" onclick="CreateReader();" /></td></tr>';

            html += '<tr><td colspan="2"><input type="button" class="btn" value="Stop All Readers" onclick="StopAllReaders();" /></td>';

            html += '<td colspan="2"><input type="button" class="btn" value="Start All Readers" onclick="StartAllReaders();" /></td></tr></tfoot></table>';
            $("#ReaderList").empty();
            $("#ReaderList").append(html);
        },
        error: function (results) { }
    });
}
function StartReader(id) {
    $("#MessageDiv").empty();
    $.ajax({
        type: "GET",
        url: "/start_reader/" + id,
        cache: false,
        dataType: "json",
        success: function () {
            $("#ReaderInformation").empty();
            $("#ReaderInformation").append('<h2 style="color: blue;">Reader Started</h2>');
            // alert("Reader Started");
            //gReader = ShowReaderHTML(results);
        },
        error: function () { }
    });
}

function StartAllReaders() {
    $("#MessageDiv").empty();
    $.ajax({
        type: "GET",
        url: "/start_all_readers/",
        cache: false,
        dataType: "json",
        success: function () {
            $("#ReaderInformation").empty();
            $("#ReaderInformation").append('<h2 style="color: blue;">All Readers Started</h2>');
        },
        error: function () {
            $("#ReaderInformation").empty();
            $("#ReaderInformation").append('<h2 style="color: blue;">All Readers Started</h2>');
            //alert("Error stopping Readers");
        }
    });
}
function StopAllReaders() {
    $("#MessageDiv").empty();
    $.ajax({
        type: "GET",
        url: "/stop_readers/",
        cache: false,
        dataType: "json",
        success: function () {
            //alert("All Readers Stopped");
        },
        error: function () {
            $("#ReaderInformation").empty();
            $("#ReaderInformation").append('<h2 style="color: blue;">All Readers Stopped</h2>');
            //alert("Error stopping Readers");
        }
    });
}
function DeleteReader(id) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        $.ajax({
            type: "GET",
            url: "/delete_readers/" + id,
            cache: false,
            dataType: "json",
            success: function (results) {
                var html = '<table id="AllReaderTable"><thead><tr><th colspan="4">All Readers</th></tr></thead><tbody>';
                for (var i = 0; i < results.length; i++) {
                    html += '<tr id="Row_' + results[i].id + '"><td>' + results[i].ipAddress + '</td>';
                    html += '<td><input type="button" class="btn" onclick="GetReader(\'' + results[i].id + '\')" value="Load" />';
                    html += '</td><td><input type="button" class="btn" onclick="StartReader(\'' + results[i].id + '\')" value="Start" />';
                    html += '</td><td><input type="button" class="btn" onclick="DeleteReader(\'' + results[i].id + '\')" value="Delete" /></td></tr>';
                }
                html += '</tbody><tfoot><tr><td colspan="4" style="text-align: right;"><input type="button" class="btn btn-primary" value="Add New Reader" onclick="CreateReader();" /></td></tr>';

                html += '<tr><td colspan="2"><input type="button" class="btn" value="Stop All Readers" onclick="StopAllReaders();" /></td>';

                html += '<td colspan="2"><input type="button" class="btn" value="Start All Readers" onclick="StartAllReaders();" /></td></tr></tfoot></table>';
                $("#ReaderList").empty();
                $("#ReaderList").append(html);

                $("#ReaderInformation").empty();
                $("#ReaderInformation").append('<h2>Reader Deleted</h2>');
            },
            error: function (results) { }
        });
    }
}
function CreateReader() {
    $.ajax({
        type: "GET",
        url: "/create_reader",
        cache: false,
        dataType: "json",
        success: function (results) {
            gReader = results;
            ShowReaderHTML(results);
        },
        error: function (results) { }
    });
}
function ShowReaderHTML(reader) {
    $("#MessageDiv").empty();
    $("#CurrentReaderId").val(reader.id);
    var html = '<div id="ReaderInfoEdit"><table><thead><tr><th colspan="2">Reader Information</th></tr></thead><tbody>';
    html += '<tr><td>IP Address:</td>';
    html += '<td><input type="text" id="ReaderIpAddressTextbox" class="container_text" value="' + reader.ipAddress + '" /></td></tr>';
    html += '<tr><td>Port:</td>';
    html += '<td><input type="text" id="ReaderPortTextbox" class="container_text" value="' + reader.port + '" /></td></tr></tbody>';
    html += '<tfoot>';
    html += '<tr><td><input type="button" class="btn" value="Antennas" onclick="GetAntennaListByReaderId(\'' + reader.id + '\')" /></td>';

    html += '<td style="text-align:right;"><input type="button" class="btn btn-primary" value="Save Reader" onclick="SaveReader()" /></td></tr>';

    html += '</table></div><div id="AntennaInformation"></div><div id="ReaderAntennas"></div><div id="MessageDiv"></div>';
    $("#ReaderInformation").empty();
    $("#ReaderInformation").append(html);
    $("#ReaderInfoEdit").show();
    $("#AntennaInformation").hide();
    $("#ReaderAntennas").hide();
    return reader;
}

function GetAntennaListByReaderId(id) {
    $("#MessageDiv").empty();
    $("#ReaderAntennas").empty();
    $.ajax({
        type: "GET",
        url: "/get_reader_antennas/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            var readerId = $("#CurrentReaderId").val();
            var html = '<table id="ReaderAntennaTable"><thead><tr><th colspan="3">Antennas</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr id="AntennaRow_' + results[i].id + '"><td>' + results[i].port + '</td>';
                html += '<td><input type="button" class="btn" value="Load" onclick="GetAntenna(\'' + results[i].id + '\')" /></td>';
                html += '<td><input type="button" class="btn" value="Delete" onclick="DeleteAntenna(\'' + results[i].id + '\')" /></td>';
                html += '</tr>';
            }
            html += '</tbody><tfoot><tr><td><input type="button" class="btn" value="Back" onclick="ShowDiv(\'ReaderInfoEdit\')"</td>';
            html += '<td><input type="button" class="btn btn-primary" value="Add Antenna" onclick="CreateAntenna(\'' + readerId + '\')" /></td></tr></tfoot></table>';

            $("#ReaderInfoEdit").css("display", "none");
            $("#AntennaInformation").css("display", "none");
            $("#ReaderAntennas").css("display", "block");
            $("#ReaderAntennas").empty();
            $("#ReaderAntennas").append(html);

        },
        error: function (results) { }
    });

}

function ShowDiv(divId) {
    $("#MessageDiv").empty();
    $("#ReaderInfoEdit").hide();
    $("#ReaderAntennas").hide();
    $("#AntennaInformation").hide();
    $("#" + divId).show();
}
function CancelAntennaEdit() {
    $("#ReaderInfoEdit").hide();
    $("#ReaderAntennas").show();
    var html = '<h2>Antenna Not Saved</h2>';
    $("#MessageDiv").empty();
    $("#MessageDiv").append(html);
    $("#AntennaInformation").empty();
    $("#AntennaInformation").hide();
}
function ShowAntennaHTML(antenna) {
    $("#MessageDiv").empty();
    var html = '<table><tr><th colspan="2">Antenna Information</th></tr>';
    html += '<tr><td>Port:</td>';
    html += '<td><input type="text" id="AntennaPort_' + antenna.id + '" value="' + antenna.port + '" /></td></tr>';
    html += '<tr><td>Attenuation:</td>';
    html += '<td><input type="text" id="AntennaAttenuation_' + antenna.id + '" value="' + antenna.attenuation + '" /></td></tr>';
    html += '<tr><td>X:</td>';
    html += '<td><input type="text" id="AntennaX_' + antenna.id + '" value="' + antenna.x + '" /></td></tr>';
    html += '<tr><td>Y:</td>';
    html += '<td><input type="text" id="AntennaY_' + antenna.id + '" value="' + antenna.y + '" /></td></tr>';
    html += '<tr><td>Z:</td>';
    html += '<td><input type="text" id="AntennaZ_' + antenna.id + '" value="' + antenna.z + '" /></td></tr>';
    html += '<tr><td><input type="button" class="btn" value="Cancel" onclick="CancelAntennaEdit();" /></td>';
    html += '<td><input type="button" class="btn btn-primary" value="Save Antenna" onclick="SaveAntenna()" />';
    html += '<input type="hidden" id="CurrentAntennaId" value="' + antenna.id + '" /></td></tr>';
    html += '</table>';
    $("#AntennaInformation").empty();
    $("#AntennaInformation").append(html);
    $("#ReaderInfoEdit").hide();
    $("#ReaderAntennas").hide();
    $("#AntennaInformation").show();
    return antenna;
}

function GetReader(id) {
    $("#MessageDiv").empty();
    $.ajax({
        type: "GET",
        url: "/readers/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gReader = ShowReaderHTML(results);
            
        },
        error: function (results) { }
    });
}
function SaveReader() {
    var reader = UpdateReader(gReader);
    $.ajax({
        type: "POST",
        url: "/save_reader",
        data: reader,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            var html = '<table id="AllReaderTable"><thead><tr><th colspan="4">All Readers</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr id="Row_' + results[i].id + '"><td>' + results[i].ipAddress + '</td>';
                html += '<td><input type="button" class="btn" onclick="GetReader(\'' + results[i].id + '\')" value="Load" />';
                html += '</td><td><input type="button" class="btn" onclick="StartReader(\'' + results[i].id + '\')" value="Start" />';
                html += '</td><td><input type="button" class="btn" onclick="DeleteReader(\'' + results[i].id + '\')" value="Delete" /></td></tr>';
            }
            html += '</tbody><tfoot><tr><td colspan="4" style="text-align: right;"><input type="button" class="btn btn-primary" value="Add New Reader" onclick="CreateReader();" /></td></tr>';

            html += '<tr><td colspan="2"><input type="button" class="btn" value="Stop All Readers" onclick="StopAllReaders();" /></td>';

            html += '<td colspan="2"><input type="button" class="btn" value="Start All Readers" onclick="StartAllReaders();" /></td></tr></tfoot></table>';
            $("#ReaderList").empty();
            $("#ReaderList").append(html);

            $("#ReaderInformation").empty();
            $("#ReaderInformation").append('<h2>Reader Saved</h2>');
        },
        error: function (results) {
            alert("Error Saving Camera");
        }
    });
}
function SaveAntenna() {
    var antenna = UpdateAntenna(gAntenna);
    $.ajax({
        type: "POST",
        url: "/save_antenna",
        data: antenna,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            var data = results;
            gAntenna = data;

            var readerId = $("#CurrentReaderId").val();
            var html = '<table id="ReaderAntennaTable"><thead><tr><th colspan="2">Antennas</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr id="AntennaRow_' + results[i].id + '"><td>' + results[i].port + '</td>';
                html += '<td><input type="button" class="btn" value="Load" onclick="GetAntenna(\'' + results[i].id + '\')" /></td></tr>';
            }
            html += '</tbody><tfoot><tr><td><input type="button" class="btn" value="Back" onclick="ShowDiv(\'ReaderInfoEdit\')"</td>';
            html += '<td><input type="button" class="btn btn-primary" value="Add Antenna" onclick="CreateAntenna(\'' + readerId + '\')" /></td></tr></tfoot></table>';

            $("#ReaderInfoEdit").css("display", "none");
            $("#AntennaInformation").css("display", "none");
            $("#AntennaInformation").empty();
            $("#ReaderAntennas").css("display", "block");
            $("#ReaderAntennas").empty();
            $("#ReaderAntennas").append(html);

            html = '<h2>Antenna Saved</h2>';
            $("#MessageDiv").empty();
            $("#MessageDiv").append(html);
            return data;
        },
        error: function (results) {
            alert("Error Saving Camera");
        }
    });
}
function UpdateReader(reader) {
    reader.ipAddress = $("#ReaderIpAddressTextbox").val();
    reader.port = parseInt($("#ReaderPortTextbox").val());
    // for (var i = 0; i < reader.antennas.length; i++) {
    //     reader.antennas[i] = UpdateAntenna(reader.antennas[i]);
    // }
    var readerId = $("#CurrentReaderId").val();
    return reader;
}
function UpdateAntenna(antenna) {
    antenna.port = parseInt($("#AntennaPort_" + antenna.id).val());
    antenna.attenuation = parseInt($("#AntennaAttenuation_" + antenna.id).val());
    antenna.x = parseFloat($("#AntennaX_" + antenna.id).val());
    antenna.y = parseFloat($("#AntennaY_" + antenna.id).val());
    antenna.z = parseFloat($("#AntennaZ_" + antenna.id).val());
    // antenna.tagId = $("#AntennaReferenceTagSelect option:selected").val();
    return antenna;
}
function GetAntenna(id) {
    $.ajax({
        type: "GET",
        url: "/antenna/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gAntenna = results;
            ShowAntennaHTML(results);
        },
        error: function (results) { }
    });
}
function CreateAntenna(readerId) {
    var readerId = $("#CurrentReaderId").val();
    $.ajax({
        type: "GET",
        url: "/create_antenna/" + readerId,
        cache: false,
        dataType: "json",
        success: function (results) {
            gAntenna = results;
            ShowAntennaHTML(results);
        },
        error: function (results) { }
    });
}

function DeleteAntenna(id) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        $.ajax({
            type: "GET",
            url: "/delete_antenna/" + id,
            cache: false,
            dataType: "json",
            success: function (results) {

                var readerId = $("#CurrentReaderId").val();
                var html = '<table id="ReaderAntennaTable"><thead><tr><th colspan="2">Antennas</th></tr></thead><tbody>';
                for (var i = 0; i < results.length; i++) {
                    html += '<tr id="AntennaRow_' + results[i].id + '"><td>' + results[i].port + '</td>';
                    html += '<td><input type="button" class="btn" value="Load" onclick="GetAntenna(\'' + results[i].id + '\')" /></td></tr>';
                }
                html += '</tbody><tfoot><tr><td><input type="button" class="btn" value="Back" onclick="ShowDiv(\'ReaderInfoEdit\')"</td>';
                html += '<td><input type="button" class="btn btn-primary" value="Add Antenna" onclick="CreateAntenna(\'' + readerId + '\')" /></td></tr></tfoot></table>';

                $("#ReaderInfoEdit").css("display", "none");
                $("#AntennaInformation").css("display", "none");
                $("#AntennaInformation").empty();
                $("#ReaderAntennas").css("display", "block");
                $("#ReaderAntennas").empty();
                $("#ReaderAntennas").append(html);

                html = '<h2>Antenna Deleted</h2>';
                $("#MessageDiv").empty();
                $("#MessageDiv").append(html);
            },
            error: function (results) {
                $("#MessageDiv").empty();
                $("#MessageDiv").append('<h2 style="color: red;">Error Deleting Antenna</h2>');
            }
        });
    }
}