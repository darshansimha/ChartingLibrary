var generateGraph = function(dataForChart) {
    this.name = dataForChart.name;
    this.data = dataForChart.data;
    this.arrayLength = dataForChart.data.length;
    this.arrayMax = Math.max.apply(Math, dataForChart.data);
    this.arrayMin = Math.min.apply(Math, dataForChart.data);
	this.legendXAxis = dataForChart.legendXAxis;
	this.legendYAxis = dataForChart.legendYAxis;
};

generateGraph.prototype.createYAxisForGraph = function() {
    $('#myChartContainer').append('<div id="yAxis"></div><div id="tableSection"></div><div id="xAxis"></div>');
    var maxYUnits = this.arrayMax;
    var remVal = (this.arrayMax % 10);
    if (remVal != 0)
        maxYUnits = this.arrayMax + (10 - remVal);
    var units = maxYUnits / 10;
    var yUnits = [];
    var i = 1;
    while (yUnits.length != (10 + 1)) {
        if (yUnits.length == 0)
            yUnits.push(maxYUnits);
        else
            yUnits.push(yUnits[yUnits.length - 1] - units);
    }

    var containerElem = $('#yAxis');
    yUnits.forEach(function(val) {
        containerElem.append('<div class="units">' + val + '</div>');
    });
    //console.log(yUnits);
}
generateGraph.prototype.drawGraph = function() {
    var dataForTable = normalizeValues(this.data);
    var html = '<div class="mainTable"></div>';
    $('#myGraphContainer').append(html);
    var childHtml = '<div class="tableRow">';
    var that = this;
    var widthForBars = (100 / this.data.length);
    for (var index = 0; index < this.arrayLength; index++) {
        childHtml += '<div class="tableColumn" style="width:' + widthForBars + '%"><div class="noFill" style="height:' + (450 - (dataForTable[index] * 450)) + 'px;"></div><div style="height:' + (dataForTable[index] * 450) + 'px;" class="fill"></div></div>';
    }
    childHtml += '</div></div>';
    $('#tableSection').append(childHtml);
	$('.tableColumn').css('width',(widthForBars-2)+'%');
};
generateGraph.prototype.createXAxisForGraph = function() {
    var xAxis = '<div class="xAxis">';
    var that = this;
    for (var index = 0; index < this.arrayLength; index++) {
        xAxis += '<div class="tableColumn">' + that.name[index] + '</div>';
    }
    xAxis += '</div>';
    var containerElem = $('#xAxis');
    this.name.forEach(function(val) {
        containerElem.append('<div style="text-align:center; float: left; width: ' + ($('#xAxis').width() / that.name.length) + '">' + val + '</div>');
    });
}
generateGraph.prototype.legendForYAxis = function() {
	$('body').prepend('<div id="legendYAxis">'+this.legendYAxis+'</div>');
}

generateGraph.prototype.legendForXAxis = function() {
	$('#myChartContainer').append('<div id="legendXAxis">'+this.legendXAxis+'</div>');
}
generateGraph.prototype.createGraph = function() {
	this.legendForYAxis();
	this.createYAxisForGraph();
	this.drawGraph();
	this.createXAxisForGraph();
	this.legendForXAxis();	
}

function sortNumber(a, b) {
    return a - b;
}

function normalizeValues(dataArray) {
    var max_of_array = Math.max.apply(Math, dataArray);
    var arrayLength = dataArray.length;
    for (var index = 0; index < arrayLength; index++) {
        dataArray[index] = parseFloat(dataArray[index] / max_of_array);
    }
    return dataArray;
}