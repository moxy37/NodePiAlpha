function ShowTestResults() {
    var seconds = parseFloat($("#RefSecondsText").val());
    var duration = parseFloat($("#RefDuration").val());
    var minCount = parseInt($("#MinCount").val());
    var data = new Object();
    data.seconds = seconds;
    data.duration = duration;
    data.minCount = minCount;
    $.ajax({
        type: "GET",
        url: "/get_vector_tag_results",
        data: data,
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '';
            for (var i = 0; i < results.length; i++) {
                var c0 = Math.round(results[i].c0 * 100) / 100;
                var c1 = Math.round(results[i].c1 * 100) / 100;
                var c2 = Math.round(results[i].c2 * 100) / 100;
                var d0 = Math.round(results[i].d0 * 100) / 100;
                var R0 = Math.round(results[i].R0 * 100) / 100;
                var n = Math.round(results[i].n * 100) / 100;
                var totalErrN = 0;
                var totalCount = results[i].tags.length;
                totalCount = 0;
                var totalErrP = 0;
                html += '<table><tr><th colspan="2">' + results[i].name + '</th><tr>';
                html += '<tr><th>Stat</th><th>Value</th></tr>';
                html += '<tr><th>C0</th><td>' + results[i].c0 + '</td></tr>';
                html += '<tr><th>C1</th><td>' + results[i].c1 + '</td></tr>';
                html += '<tr><th>C2</th><td>' + results[i].c2 + '</td></tr>';
                html += '<tr><th>Max N</th><td>' + results[i].maxN + '</td></tr>';
                html += '<tr><th>n</th><td>' + results[i].n + '</td></tr>';
                html += '<tr><th>R0</th><td>' + results[i].R0 + '</td></tr>';
                html += '<tr><th>d0</th><td>' + results[i].d0 + '</td></tr>';
                html += '</table>';

                html += '<table><tr><th>Tag</th><th>d</th><th>dr</th><th>Err</th><th>dr*dr</th><th>Min</th><th>Max</th><th>p</th><th>n</th></tr>';
                for (var j = 0; j < results[i].tags.length; j++) {

                    var d = Math.round(results[i].tags[j].d * 100) / 100;
                    var d1 = Math.round(results[i].tags[j].d1 * 100) / 100;
                    var dr = Math.round(results[i].tags[j].dr * 100) / 100;
                    var drp = Math.round(results[i].tags[j].drp * 100) / 100;
                    var R = Math.round(results[i].tags[j].R * 100) / 100;
                    var p = Math.round(results[i].tags[j].p * 100) / 100;
                    var n = Math.round(results[i].tags[j].n);
                    var errP = Math.abs(Math.round(((d - d1) * 100) / d1) / 100);
                    var errN = Math.abs(Math.round(((dr - d1) * 100) / d1) / 100);
                    var errNP = Math.round(((drp - d1) * 100) / d1) / 100;
                    var drdr = dr * dr;
                    var min = drdr - errN * dr;
                    var max = drdr + errN * dr;
                    totalErrN = totalErrN + errN * errN * n;
                    totalErrP = totalErrP + errP * errP * n;
                    totalCount = totalCount + n;
                    if (p < 0.999) {
                        html += '<tr><th>' + results[i].tags[j].name + '</th>';
                        html += '<td>' + d1 + '</td>';
                        html += '<td>' + dr + '</td>';
                        html += '<td>' + errN + '</td>';
                        html += '<td>' + drdr + '</td>';
                        html += '<td>' + min + '</td>';


                        html += '<td>' + max + '</td>';
                        html += '<td>' + p + '</td>';

                        html += '<td>' + n + '</td>';

                        html += '</tr>';
                    }
                }
                var tErrP = Math.round(100 * totalErrP / totalCount) / 100;
                var tErrN = Math.round(100 * totalErrN / totalCount) / 100;
                html += '<tr><th colspan="2">Errors</th><th>N</th><td>' + tErrN + '</td><th>P</th><td>' + tErrP + '</td><td colspan="3"></td></tr>';
                html += '</table>';
            }
            $("#TestResults").empty();
            $("#TestResults").append(html);
        },
        error: function (results) { }
    });
}


//get_vector_tag_results
function ShowVectorResults() {
    var seconds = parseFloat($("#SecondsText").val());
    $.ajax({
        type: "GET",
        url: "/get_vector_tag_results/" + seconds,
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<h3>Tracking Tags</h3>';
            // html += '<table><tr><th>Tag</th><th>X</th><th>Y</th><th>Z</th></tr>';
            // for (var i = 0; i < results.length; i++) {
            //     html += '<tr><td>' + results[i].name + '</td>';
            //     html += '<td>' + results[i].x + '</td>';
            //     html += '<td>' + results[i].y + '</td>';
            //     html += '<td>' + results[i].z + '</td>';
            //     html += '</tr>';
            // }
            // html += '</table>';
            $("#TestResults").empty();
            $("#TestResults").append(html);
        },
        error: function (results) { }
    });
}



//get_vector_tag_results
function ShowVectorReferenceResults() {
    var seconds = parseFloat($("#RefSecondsText").val());
    $.ajax({
        type: "GET",
        url: "/get_vector_reference_tags/" + seconds,
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<h3>All Tags Tags</h3>';
            html += '<table><tr><th>Tag Name</th><th>X</th><th>X-Act</th><th>X-Err</th><th>Y</th><th>Y-Act</th><th>Y-Err</th><th>P</th></tr>';
            for (var i = 0; i < results.length; i++) {
                var x = results[i].x * 100;
                var x2 = Math.round(x);
                var x3 = x2 / 100;
                var y = results[i].y * 100;
                var y2 = Math.round(y);
                var y3 = y2 / 100;
                html += '<tr>';
                html += '<td>' + results[i].label + '</td>';
                html += '<td>' + x3 + '</td>';
                html += '<td>' + results[i].xAct + '</td>';
                var eX = (x3 - results[i].xAct) / results[i].xAct;
                var eX2 = Math.round(eX * 100);
                var eX3 = eX2 / 100;
                html += '<td>' + eX3 + '</td>';
                html += '<td>' + y3 + '</td>';

                html += '<td>' + results[i].yAct + '</td>';
                var err = (y3 - results[i].yAct) / results[i].yAct;
                var err2 = err * 100;
                var err3 = Math.round(err2);
                var err4 = err3 / 100;
                html += '<td>' + err4 + '</td>';
                html += '<td>';
                for (var j = 0; j < results[i].p.length; j++) {
                    if (j > 0) {
                        html += ', ';
                    }
                    var p = results[i].p[j] * 100;
                    var p2 = Math.round(p);
                    var p3 = p2 / 100;
                    html += p3;
                }
                html += '</td></tr>';
            }
            html += '</table>';
            $("#TestResults").empty();
            $("#TestResults").append(html);
        },
        error: function (results) { }
    });
}

function ShowLabEnterTest() {
    var seconds = 10;
    $.ajax({
        type: "GET",
        url: "/lab_enter_test/" + seconds,
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '';
            // html += '<h3>In Lab</h3>';
            // for (var i = 0; i < results.labIn.length; i++) {
            //     if (i > 0) { html += '<br />'; }
            //     html += results.labIn[i];
            // }
            // html += '<h3>Out of Lab</h3>';
            // for (var i = 0; i < results.labOut.length; i++) {
            //     if (i > 0) { html += '<br />'; }
            //     html += results.labOut[i];
            // }
            html += '<h3>Entering In Last 10 Seconds</h3>';
            for (var i = 0; i < results.entering.length; i++) {
                if (i > 0) { html += '<br />'; }
                html += results.entering[i];
            }
            html += '<h3>Leaving In Last 10 Seconds</h3>';
            for (var i = 0; i < results.leaving.length; i++) {
                if (i > 0) { html += '<br />'; }
                html += results.leaving[i];
            }
            // var data = new Object();
            // var url = 'http://10.192.5.58/api/OHq6E99GR3tygUKTuSBEwgqrjxhXiRQWKLThNWiC/lights/4/state';
            // if (results.leaving.length > 0) {
            //     data.on = true;
            //     data.alert = "lselect";
            //     data.colormode = "xy";
            //     var tempArray = [0.6679, 0.3181];
            //     data.xy = tempArray;
            // } else if (results.entering.length > 0) {
            //     data.on = true;
            //     data.alert = "none";
            //     data.colormode = "xy";
            //     var tempArray = [0.139, 0.081];
            //     data.xy = tempArray;
            // } else {
            //     data.on = false;
            //     // data.alert = "none";
            //     // data.colormode = "xy";
            //     // var tempArray = [0.17, 0.3403];
            //     // data.xy = tempArray;
            // }
            // $.ajax({
            //     type: "PUT",
            //     url: url,
            //     data: JSON.stringify(data),
            //     cache: false,
            //     contentType: "application/json",
            //     success: function (results) {
            //         //alert("Sent");
            //         // var html = '<h3>Color Set</h3>';

            //         // $("#TestResults").empty();
            //         // $("#TestResults").append(html);
            //     },
            //     error: function (results) { }
            // });
            $("#TestResults").empty();
            $("#TestResults").append(html);
        },
        error: function (results) { }
    });
}

function StartLabTest() {
    setInterval(ShowLabEnterTest, 1000);
}

function TestEmail() {
    $.ajax({
        type: "GET",
        url: "/test_email",
        cache: false,
        dataType: "json",
        success: function (results) {
            alert("Sent");
        },
        error: function (results) { }
    });
}

function MotionTest() {
    var seconds = 60;
    $.ajax({
        type: "GET",
        url: "/motion_test/" + seconds,
        cache: false,
        dataType: "json",
        success: function (results) {
            // Get the keys
            // var keys = Object.keys(results);
            var html = '<h3>Motion RSSI</h3>';
            var html2 = '<h3>Motion Reads</h3>';
            var html3 = '<h3>Motion SD</h3>';
            html += '<table border="1"><tr><th>Time</th><th></th>';
            html2 += '<table border="1"><tr><th>Time</th><th></th>';
            html3 += '<table border="1"><tr><th>Time</th><th></th>';
            for (var i = 0; i < results.tags.length; i++) {
                var tag = results.tags[i].slice(-4);
                html += '<th>' + tag + '</th>'
                html2 += '<th>' + tag + '</th>'
                html3 += '<th>' + tag + '</th>'
            }
            html += '</tr>';
            html2 += '</tr>';
            html3 += '</tr>';
            var key = results.keys;
            var tags = results.tags;
            // alert(key);
            // alert(tags);
            for (var i = 0; i < key.length; i++) {
                html += '<tr><td>' + key[i] + '<td>';
                html2 += '<tr><td>' + key[i] + '<td>';
                html3 += '<tr><td>' + key[i] + '<td>';
                for (var j = 0; j < tags.length; j++) {
                    var text = '';
                    var text2 = '';
                    var text3 = '';
                    if (results[key[i].toString()] !== undefined) {
                        if (results[key[i]][tags[j]] !== undefined) {
                            var min = results[key[i]][tags[j]].rssi - 1.5 * results[key[i]][tags[j]].sd;
                            var max = results[key[i]][tags[j]].rssi + 1.5 * results[key[i]][tags[j]].sd;
                            min = Math.round(min * 100) / 100;
                            max = Math.round(max * 100) / 100;
                            if (i > 0) {
                                if (results[key[i - 1]] !== undefined) {
                                    if (results[key[i - 1]][tags[j]] !== undefined) {
                                        var min1 = results[key[i - 1]][tags[j]].rssi - 1.5 * results[key[i - 1]][tags[j]].sd;
                                        var max1 = results[key[i - 1]][tags[j]].rssi + 1.5 * results[key[i - 1]][tags[j]].sd;
                                        if (results[key[i]][tags[j]].rssi < min1 || results[key[i]][tags[j]].rssi > max1) {
                                            text = '<td bgcolor="#ff3333">' + results[key[i]][tags[j]].rssi + '</td>';
                                        }
                                    }
                                }
                            }
                            if (text === '') {
                                text = '<td>' + results[key[i]][tags[j]].rssi + '</td>';
                            }
                            //text = max + '<br />' + results[key[i]][tags[j]].rssi + '<br />' + min;
                            text2 = results[key[i]][tags[j]].tagReads;
                            text3 = max + '<br />' + results[key[i]][tags[j]].rssi + '<br />' + min;
                        }
                    }
                    if (text === '') {
                        text = '<td></td>';
                    }
                    html += text;
                    html2 += '<td>' + text2 + '</td>';
                    html3 += '<td>' + text3 + '</td>';
                }
                html += '</tr>';
                html2 += '</tr>';
                html3 += '</tr>';
            }
            html += '</table>';
            html2 += '</table>';
            html3 += '</table>';
            var finalHtml = html + html3 + html2;
            $("#TestResults").empty();
            $("#TestResults").append(finalHtml);
        },
        error: function (results) { }
    });
}