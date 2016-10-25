var gQualificationZone = new Object();
var gAntennaZone = new Object();

function GetDisplayDropDown() {
    $.ajax({
        type: "GET",
        url: "/displays/",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<select id="DisplaySelect">';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].id + '">' + results[i].name + '</option>';
            }
            html += '</select>';
            $("#DisplaySelectDiv").empty();
            $("#DisplaySelectDiv").append(html);
        },
        error: function (results) { }
    });
}

function GetAntennaDropDown() {
    $.ajax({
        type: "GET",
        url: "/get_all_antennas/",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<select id="AntennaSelect">';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].antennaId + '">' + results[i].ipAddress + ' - ' + results[i].port + '</option>';
            }
            html += '</select>';
            $("#AntennaSelectDiv").empty();
            $("#AntennaSelectDiv").append(html);
        },
        error: function (results) { }
    });
}



function GetAllQualificationZones() {
    $.ajax({
        type: "GET",
        url: "/qualificationzones/",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<table><thead><tr><th colspan="3">All Qualification Zones</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].name + '</td>';
                html += '<td><input type="button" class="btn" onclick="GetQualificationZone(\'' + results[i].id + '\')" value="Load" /></td>';
                html += '<td><input type="button" class="btn" onclick="DeleteQualificationZone(\'' + results[i].id + '\')" value="Delete" /></td>';
                html += '</tr>';
            }
            html += '</tbody><tfoot>';
            html += '<tr><td colspan="3" style="text-align: right;"><input type="button" class="btn btn-primary" value="Create New Zone" onclick="CreateQualificationZone();" /></td></tr>';
            html += '</tfoot></table>';
            $("#QualificationZoneList").empty();
            $("#QualificationZoneList").append(html);
            $("#AntennaZoneInformation").hide();
            $("#QualificationZoneInformation").hide();
            $("#AntennaZoneList").hide();
        },
        error: function (results) { }
    });
}

function DeleteQualificationZone(id) {
    $("#MessageDiv").empty();
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        $.ajax({
            type: "GET",
            url: "/delete_qualificationzone/" + id,
            cache: false,
            dataType: "json",
            success: function (results) {
                var html = '<table><thead><tr><th colspan="3">All Qualification Zones</th></tr></thead><tbody>';
                for (var i = 0; i < results.length; i++) {
                    html += '<tr><td>' + results[i].name + '</td>';
                    html += '<td><input type="button" class="btn" onclick="GetQualificationZone(\'' + results[i].id + '\')" value="Load" /></td>';
                    html += '<td><input type="button" class="btn" onclick="DeleteQualificationZone(\'' + results[i].id + '\')" value="Delete" /></td>';
                    html += '</tr>';
                }
                html += '</tbody><tfoot>';
                html += '<tr><td colspan="3" style="text-align: right;"><input type="button" class="btn btn-primary" value="Create New Zone" onclick="CreateQualificationZone();" /></td></tr>';
                html += '</tfoot></table>';
                $("#QualificationZoneList").empty();
                $("#QualificationZoneList").append(html);
                $("#AntennaZoneInformation").hide();
                $("#QualificationZoneInformation").hide();
                $("#AntennaZoneList").hide();
                $("#MessageDiv").empty();
                $("#MessageDiv").append('<h2>Qualification Zone Deleted</h2>');
            },
            error: function (results) {
                $("#MessageDiv").empty();
                $("#MessageDiv").append('<h2 style="color: red;">Error Deleting Qualification Zone</h2>');
            }
        });
    }
}
function CreateQualificationZone() {
    $.ajax({
        type: "GET",
        url: "/create_qualificationzone",
        cache: false,
        dataType: "json",
        success: function (results) {
            gQualificationZone = ShowQualificationZoneHTML(results);
        },
        error: function (results) { }
    });
}

function GetQualificationZone(id) {

    $.ajax({
        type: "GET",
        url: "/get_qualificationzone/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gQualificationZone = ShowQualificationZoneHTML(results);
        },
        error: function (results) { }
    });
}

function ShowQualificationZoneHTML(zone) {
    $("#MessageDiv").empty();
    $("#CurrentQualificationZoneId").val(zone.id);
    $("#MinTagReadsTextbox").val(zone.totalMinReads);
    $("#ZoneNameTextbox").val(zone.name);
    $("#MinAntennaReadsTextbox").val(zone.minAntennaZones);
    $("#DisplaySelect").val(zone.displayId);
    $("#QualificationZoneInformation").show();
    $("#AntennaZoneInformation").hide();
    $("#AntennaZoneList").hide();
    return zone;
}

function UpdateQualificationZone(zone) {
    zone.name = $("#ZoneNameTextbox").val();
    zone.totalMinReads = parseInt($("#MinTagReadsTextbox").val());
    zone.minAntennaZones = parseInt($("#MinAntennaReadsTextbox").val());
    zone.displayId = $("#DisplaySelect option:selected").val();
    return zone;
}

function SaveQualificationZone() {
    var zone = UpdateQualificationZone(gQualificationZone);
    $.ajax({
        type: "POST",
        url: "/save_qualificationzone",
        data: zone,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            var html = '<table><thead><tr><th colspan="3">All Qualification Zones</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].name + '</td>';
                html += '<td><input type="button" class="btn" onclick="GetQualificationZone(\'' + results[i].id + '\')" value="Load" /></td>';
                html += '<td><input type="button" class="btn" onclick="DeleteQualificationZone(\'' + results[i].id + '\')" value="Delete" /></td>';
                html += '</tr>';
            }
            html += '</tbody><tfoot>';
            html += '<tr><td colspan="3" style="text-align: right;"><input type="button" class="btn btn-primary" value="Create New Zone" onclick="CreateQualificationZone();" /></td></tr>';
            html += '</tfoot></table>';
            $("#QualificationZoneList").empty();
            $("#QualificationZoneList").append(html);
            $("#AntennaZoneInformation").hide();
            $("#QualificationZoneInformation").hide();
            $("#AntennaZoneList").hide();
            $("#MessageDiv").empty();
            $("#MessageDiv").append('<h2>Qualification Zone Saved</h2>');
        },
        error: function (results) {
            $("#MessageDiv").empty();
            $("#MessageDiv").append('<h2 style="color: red;">Error Saving Qualification Zone</h2>');
        }
    });
}

function GetAntennaZonesForQualificationZone() {
    $("#MessageDiv").empty();
    var id = $("#CurrentQualificationZoneId").val();
    $("#AntennaZoneList").empty();
    $.ajax({
        type: "GET",
        url: "/get_antennazones_by_qualificationzoneid/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<table><thead><tr><th colspan="3">Antenna Zones</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].name + '</td>';

                html += '<td><input type="button" class="btn" value="Load" onclick="GetAntennaZone(\'' + results[i].id + '\');" /></td>';
                html += '<td><input type="button" class="btn btn-primary" value="Delete" onclick="DeleteAntennaZone(\'' + results[i].id + '\');" /></td>';
                html += '</tr>';
            }
            html += '</tbody><tfoot>';
            html += '<tr><td><input type="button" class="btn" value="Cancel" onclick="CancelViewingAntennaZoneList();" /></td>';
            html += '<td><input type="button" class="btn btn-primary" value="Add Antenna Zone" onclick=" CreateAntennaZone();" /></td>';
            html += '</tr></tfoot></table>';
            $("#AntennaZoneList").empty();
            $("#AntennaZoneList").append(html);
            $("#AntennaZoneList").show();
            $("#QualificationZoneInformation").hide();
            $("#AntennaZoneInformation").hide();
        },
        error: function (results) { }
    });
}

function CancelViewingAntennaZoneList() {
    $("#QualificationZoneInformation").show();
    $("#AntennaZoneInformation").hide();
    $("#AntennaZoneList").hide();
    $("#MessageDiv").empty();
    // $("#MessageDiv").append('<h2>Antenna Zone Not Changed</h2>');
}
function DeleteAntennaZone(id) {
    $("#MessageDiv").empty();
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        $.ajax({
            type: "GET",
            url: "/delete_antennazone/" + id,
            cache: false,
            dataType: "json",
            success: function (results) {
                var html = '<table><thead><tr><th colspan="3">Antenna Zones</th></tr></thead><tbody>';
                for (var i = 0; i < results.length; i++) {
                    html += '<tr><td>' + results[i].name + '</td>';

                    html += '<td><input type="button" class="btn" value="Load" onclick="GetAntennaZone(\'' + results[i].id + '\');" /></td>';
                    html += '<td><input type="button" class="btn btn-primary" value="Delete" onclick="DeleteAntennaZone(\'' + results[i].id + '\');" /></td>';
                    html += '</tr>';
                }
                html += '</tbody><tfoot>';
                html += '<tr><td><input type="button" class="btn" value="Cancel" onclick="CancelViewingAntennaZoneList();" /></td>';
                html += '<td><input type="button" class="btn btn-primary" value="Add Antenna Zone" onclick="CreateAntennaZone();" /></td>';
                html += '</tr></tfoot></table>';
                $("#AntennaZoneList").empty();
                $("#AntennaZoneList").append(html);
                $("#AntennaZoneList").show();
                $("#QualificationZoneInformation").hide();
                $("#AntennaZoneInformation").hide();
            },
            error: function (results) { }
        });
    }
}
function CreateAntennaZone() {
    $("#MessageDiv").empty();
    var id = $("#CurrentQualificationZoneId").val();
    $.ajax({
        type: "GET",
        url: "/create_antennazone/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gAntennaZone = ShowAntennaZoneHTML(results);
        },
        error: function (results) { }
    });
}

function GetAntennaZone(id) {
    $.ajax({
        type: "GET",
        url: "/get_antennazone/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gAntennaZone = ShowAntennaZoneHTML(results);
        },
        error: function (results) { }
    });
}
function CancelAntennaZoneEdit() {
    $("#QualificationZoneInformation").hide();
    $("#AntennaZoneInformation").hide();
    $("#AntennaZoneList").show();
    $("#MessageDiv").empty();
    $("#MessageDiv").append('<h2>Antenna Zone Not Changed</h2>');
}
function ShowAntennaZoneHTML(zone) {
    $("#MessageDiv").empty();
    $("#CurrentAntennaZoneId").val(zone.id);
    $("#AntennaZoneMinTagReadsTextbox").val(zone.minReads);
    $("#AntennaZoneMinRSSITextbox").val(zone.minRSSI);
    $("#AntennaZoneMaxRSSITextbox").val(zone.maxRSSI);
    $("#AntennaZoneInformation").show();
    $("#AntennaSelect").val(zone.antennaId);
    $("#QualificationZoneInformation").hide();
    $("#AntennaZoneList").hide();
    return zone;
}

function UpdateAntennaZone(zone) {
    // var tempId = $("#AntennaSelect option:selected").val();
    //alert(tempId);
    zone.antennaId = $("#AntennaSelect option:selected").val();
    zone.minReads = parseInt($("#AntennaZoneMinTagReadsTextbox").val());
    zone.minRSSI = parseFloat($("#AntennaZoneMinRSSITextbox").val());
    zone.maxRSSI = parseFloat($("#AntennaZoneMaxRSSITextbox").val());
    return zone;
}

function SaveAntennaZone() {
    var zone = UpdateAntennaZone(gAntennaZone);
    $.ajax({
        type: "POST",
        url: "/save_antennazone",
        data: zone,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            gAntennaZone = results;
            var html = '<table><thead><tr><th colspan="3">Antenna Zones</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].name + '</td>';

                html += '<td><input type="button" class="btn" value="Load" onclick="GetAntennaZone(\'' + results[i].id + '\');" /></td>';
                html += '<td><input type="button" class="btn btn-primary" value="Delete" onclick="DeleteAntennaZone(\'' + results[i].id + '\');" /></td>';
                html += '</tr>';
            }
            html += '</tbody><tfoot>';
            html += '<tr><td><input type="button" class="btn" value="Cancel" onclick="CancelViewingAntennaZoneList();" /></td>';
            html += '<td><input type="button" class="btn btn-primary" value="Add Antenna Zone" onclick=" CreateAntennaZone();" /></td>';
            html += '</tr></tfoot></table>';
            $("#AntennaZoneList").empty();
            $("#AntennaZoneList").append(html);
            $("#AntennaZoneList").show();
            $("#QualificationZoneInformation").hide();
            $("#AntennaZoneInformation").hide();
            $("#MessageDiv").empty();
            $("#MessageDiv").append('<h2>Antenna Zone Saved</h2>');
        },
        error: function (results) {
            $("#MessageDiv").empty();
            $("#MessageDiv").append('<h2>Error Saving Antenna Zone</h2>');
        }
    });
}