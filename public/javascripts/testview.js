function GPIOOut() {
    var obj = new Object();
    obj.pin = parseInt($("#Pin").val());
    var test = $("#Status").val();
    if (test === '1') {
        obj.status = true;
    } else {
        obj.status = false;
    }
    $.ajax({
        type: "POST",
        url: "/set_gpio_out",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
        },
        error: function (results) {
        }
    });
}