var baseURL = 'http://10.192.5.58/api/OHq6E99GR3tygUKTuSBEwgqrjxhXiRQWKLThNWiC/lights/';


function ColorLoop() {
    var light = $("#LightSelect option:selected").val();
    var text = $("#ColorLoopButton").val();
    var url = baseURL + light + '/state';
    var data = new Object();
    data.on = true;
    if (text === "Color Loop On") {
        $("#ColorLoopButton").val("Color Loop Off");
        data.effect = "colorloop";
    } else {
        $("#ColorLoopButton").val("Color Loop On");
        data.effect = "none";
    }
    $.ajax({
        type: "PUT",
        url: url,
        data: JSON.stringify(data),
        cache: false,
        contentType: "application/json",
        success: function (results) {
            var html = '<h3>Color Set</h3>';

            $("#TestResults").empty();
            $("#TestResults").append(html);
        },
        error: function (results) { }
    });
}
function TurnLightOn() {
    var text = $("#PowerButton").val();
    var status = false;
    var data = new Object();
    if (text === "ON") {
        status = true;
        $("#PowerButton").val("OFF");

    } else {
        $("#PowerButton").val("ON");
        data.colormode = "xy";
        var tempArray = [0.3227, 0.329];
        data.xy = tempArray;
    }
    var light = $("#LightSelect option:selected").val();
    var url = baseURL + light + '/state';

    data.on = status;
    $.ajax({
        type: "PUT",
        url: url,
        data: JSON.stringify(data),
        cache: false,
        contentType: "application/json",
        success: function (results) {
            var html = '<h3>Color Set</h3>';

            $("#TestResults").empty();
            $("#TestResults").append(html);
        },
        error: function (results) { }
    });
}
function SetLightColor() {
    var light = $("#LightSelect option:selected").val();
    var url = baseURL + light + '/state';
    var r = parseFloat($("#RedValue").val()) / 255.0;
    var g = parseFloat($("#GreenValue").val()) / 255.0;
    var b = parseFloat($("#BlueValue").val()) / 255.0;
    var red = r / 12.92;
    var green = g / 12.92;
    var blue = b / 12.92;
    if (r > 0.04045) {
        red = Math.pow((r + 0.055) / 1.055, 2.4);
    }
    if (g > 0.04045) {
        green = Math.pow((g + 0.055) / 1.055, 2.4);
    }
    if (b > 0.04045) {
        blue = Math.pow((b + 0.055) / 1.055, 2.4);
    }
    var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
    var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
    var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

    var x = X / (X + Y + Z);
    var y = Y / (X + Y + Z);
    var data = new Object();
    data.on = true;
    data.colormode = "xy";
    var tempArray = [x, y];
    data.xy = tempArray;
    $.ajax({
        type: "PUT",
        url: url,
        data: JSON.stringify(data),
        cache: false,
        contentType: "application/json",
        success: function (results) {
            var html = '<h3>Color Set</h3>';

            $("#TestResults").empty();
            $("#TestResults").append(html);
        },
        error: function (results) { }
    });

}