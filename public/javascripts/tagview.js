var gTag = new Object();

function GetAllTags() {
    $.ajax({
        type: "GET",
        url: "/allTags/",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<table><tr><th colspan="3">All Tags</th></tr>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].label + '</td>';
                html += '<td><input type="button" class="btn" value="Load" onclick="GetTag(\'' + results[i].id + '\');"  /></td>';
                html += '<td><input type="button" class="btn btn-primary" value="Delete" onclick="DeleteTag(\'' + results[i].id + '\');"  /></td></tr>';
            }
            html += '<tr><td></td><td colspan="2"><input type="button" class="btn" value="Create New Tag" onclick="CreateTag();" /></td></tr></table>';
            $("#TagList").empty();
            $("#TagList").append(html);
            $("#TagInformation").hide();
        },
        error: function (results) { }
    });
}
function DeleteTag(id) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        $.ajax({
            type: "GET",
            url: "/delete_tag/" + id,
            cache: false,
            dataType: "json",
            success: function (results) {
                var html = '<table><tr><th colspan="3">All Tags</th></tr>';
                for (var i = 0; i < results.length; i++) {
                    html += '<tr><td>' + results[i].label + '</td>';
                    html += '<td><input type="button" class="btn" value="Load" onclick="GetTag(\'' + results[i].id + '\');"  /></td>';
                    html += '<td><input type="button" class="btn btn-primary" value="Delete" onclick="DeleteTag(\'' + results[i].id + '\');"  /></td></tr>';
                }
                html += '<tr><td></td><td colspan="2"><input type="button" class="btn" value="Create New Tag" onclick="CreateTag();" /></td></tr></table>';
                $("#TagList").empty();
                $("#TagList").append(html);
                $("#TagInformation").hide();
            },
            error: function (results) { }
        });
    }
}
function GetTagByType() {
    var tagType = parseInt($("#TagTypeSelect option:selected").val());
    $.ajax({
        type: "GET",
        url: "/get_tags_by_type/" + tagType,
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<table><tr><th colspan="3">All Tags</th></tr>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].label + '</td>';
                html += '<td><input type="button" class="btn" value="Load" onclick="GetTag(\'' + results[i].id + '\');"  /></td>';
                html += '<td><input type="button" class="btn btn-primary" value="Delete" onclick="DeleteTag(\'' + results[i].id + '\');"  /></td></tr>';
            }
            html += '<tr><td></td><td colspan="2"><input type="button" class="btn" value="Create New Tag" onclick="CreateTag();" /></td></tr></table>';
            $("#TagList").empty();
            $("#TagList").append(html);
            $("#TagInformation").hide();
        },
        error: function (results) { }
    });
}
function GetTag(id) {
    $.ajax({
        type: "GET",
        url: "/tag/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gTag = ShowTagHTML(results);
        },
        error: function (results) { }
    });
}

function ShowTagHTML(tag) {
    var html = '<div class="tag_container">';
    html += '<div class="container_label">Label:</div>';
    html += '<input type="text" id="TagLabelTextbox" class="container_text" value="' + tag.label + '" />';
    html += '<br /><div class="container_label">Tag Number:</div>';
    html += '<input type="text" id="TagNumberTextbox" class="container_text" value="' + tag.tagNumber + '" /><br />';
    html += '<br /><div class="container_label">Tag Type:</div>';
    html += '<input type="text" id="TagTypeTextbox" class="container_text" value="' + tag.tagType + '" /><br />';
    html += '<br /><div class="container_label">X:</div>';
    html += '<input type="text" id="TagXTextbox" class="container_text" value="' + tag.x + '" /><br />';
    html += '<br /><div class="container_label">Y:</div>';
    html += '<input type="text" id="TagYTextbox" class="container_text" value="' + tag.y + '" /><br />';
    html += '<br /><div class="container_label">Z:</div>';
    html += '<input type="text" id="TagZTextbox" class="container_text" value="' + tag.z + '" /><br />';
    html += '<input type="button" class="btn" value="Save Tag" onclick="SaveTag()" />';
    html += '</div>';
    $("#TagInformation").empty();
    $("#TagInformation").append(html);
    $("#TagInformation").show();
    return tag;
}

function UpdateTag(tag) {
    tag.label = $("#TagLabelTextbox").val();
    tag.tagNumber = $("#TagNumberTextbox").val();
    tag.tagType = parseInt($("#TagTypeTextbox").val());
    tag.x = parseFloat($("#TagXTextbox").val());
    tag.y = parseFloat($("#TagYTextbox").val());
    tag.z = parseFloat($("#TagZTextbox").val());
    return tag;
}

function CreateTag() {
    $.ajax({
        type: "GET",
        url: "/create_tag",
        cache: false,
        dataType: "json",
        success: function (results) {
            gTag = ShowTagHTML(results);
        },
        error: function (results) { }
    });
}

function SaveTag() {
    var tag = UpdateTag(gTag);
    $.ajax({
        type: "POST",
        url: "/save_tag",
        data: tag,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            var data = results;
            gTag = data;
            return data;
        },
        error: function (results) {
            alert("Error Saving Tag");
        }
    });
}