var gGpio = new Object();

function CreateGpio() {
    $.ajax({
        type: "GET",
        url: "/create_gpio",
        cache: false,
        dataType: "json",
        success: function (results) {
            gGpio = ShowGpioHTML(results);
        },
        error: function (results) { }
    });
}

function GetGpio(id) {
    $.ajax({
        type: "GET",
        url: "/get_gpio/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gGpio = ShowGpioHTML(results);
        },
        error: function (results) { }
    });
}

function GetGpioList() {
    $.ajax({
        type: "GET",
        url: "/get_gpio_list",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<div id="MessageDiv"></div><table><thead><tr><th colspan="3">Gpio List</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].pin + '</td>';
                html += '<td><input type="button" class="btn" onclick="GetGpio(\'' + results[i].id + '\')" value="Load" /></td>';
                html += '<td><input type="button" class="btn" onclick="DeleteGpio(\'' + results[i].id + '\')" value="Delete" /></td>';
                html += '</tr>';
            }
            html += '</tbody><tfoot>';
            html += '<tr><td colspan="3" style="text-align: right;"><input type="button" class="btn btn-primary" value="Create New Gpio" onclick="CreateGpio();" /></td></tr>';
            html += '</tfoot></table>';
            $("#GpioList").empty();
            $("#GpioList").append(html);
            $("#GpioInformation").hide();
        },
        error: function (results) { }
    });
}

function ShowGpioHTML(gpio) {
    $("#GpioId").val(gpio.id);
    $("#GpioPin").val(gpio.pin);
    $("#GpioPinType").val(gpio.pinType);
    $("#GpioStatusHigh").val(gpio.statusHigh);
    $("#GpioStatusLow").val(gpio.statusLow);
    $("#GpioStatusData").val(gpio.statusData);
    $("#GpioInformation").show();
    return gpio;
}

function UpdateGpio(gpio) {
    gpio.pin = parseInt($("#GpioPin").val());
    gpio.pinType = $("#GpioPinType option:selected").val();
    gpio.statusHigh = $("#GpioStatusHigh").val();
    gpio.statusLow = $("#GpioStatusLow").val();
    gpio.statusData = $("#GpioStatusData").val();
    return gpio;
}

function CancelGpio() {
    gGpio = new Object();
    $("#GpioId").val('');
    $("#GpioPin").val('');
    $("#GpioPinType").val("0");
    $("#GpioStatusHigh").val("");
    $("#GpioStatusLow").val("");
    $("#GpioStatusData").val("");
    $("#GpioInformation").hide();
    $("#MessageDiv").empty();
    $("#MessageDiv").append('<h2>Gpio Editing Cancelled</h2>');
}

function SaveGpio() {
    var gpio = UpdateGpio(gGpio);
    $.ajax({
        type: "POST",
        url: "/save_gpio",
        data: gpio,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            var html = '<div id="MessageDiv"></div><table><thead><tr><th colspan="3">Gpio List</th></tr></thead><tbody>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].pin + '</td>';
                html += '<td><input type="button" class="btn" onclick="GetGpio(\'' + results[i].id + '\')" value="Load" /></td>';
                html += '<td><input type="button" class="btn" onclick="DeleteGpio(\'' + results[i].id + '\')" value="Delete" /></td>';
                html += '</tr>';
            }
            html += '</tbody><tfoot>';
            html += '<tr><td colspan="3" style="text-align: right;"><input type="button" class="btn btn-primary" value="Create New Gpio" onclick="CreateGpio();" /></td></tr>';
            html += '</tfoot></table>';
            $("#GpioList").empty();
            $("#GpioList").append(html);
            $("#GpioInformation").hide();
            $("#MessageDiv").empty();
            $("#MessageDiv").append('<h2>Gpio Saved</h2>');
        },
        error: function (results) {
            $("#MessageDiv").empty();
            $("#MessageDiv").append('<h2 style="color: red;">Error Saving Gpio</h2>');
        }
    });
}

function DeleteGpio(id) {
    $("#MessageDiv").empty();
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        $.ajax({
            type: "GET",
            url: "/delete_gpio/" + id,
            cache: false,
            dataType: "json",
            success: function (results) {
                var html = '<div id="MessageDiv"></div><table><thead><tr><th colspan="3">Gpio List</th></tr></thead><tbody>';
                for (var i = 0; i < results.length; i++) {
                    html += '<tr><td>' + results[i].pin + '</td>';
                    html += '<td><input type="button" class="btn" onclick="GetGpio(\'' + results[i].id + '\')" value="Load" /></td>';
                    html += '<td><input type="button" class="btn" onclick="DeleteGpio(\'' + results[i].id + '\')" value="Delete" /></td>';
                    html += '</tr>';
                }
                html += '</tbody><tfoot>';
                html += '<tr><td colspan="3" style="text-align: right;"><input type="button" class="btn btn-primary" value="Create New Gpio" onclick="CreateGpio();" /></td></tr>';
                html += '</tfoot></table>';
                $("#GpioList").empty();
                $("#GpioList").append(html);
                $("#GpioInformation").hide();
                $("#MessageDiv").empty();
                $("#MessageDiv").append('<h2>Gpio Saved</h2>');
            },
            error: function (results) { }
        });
    }
}