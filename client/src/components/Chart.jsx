import React, { Component } from 'react';
import Chart from 'chart.js'


class PieChart extends Component { 
	
	componentDidUpdate() {
		let poll = this.props.poll;
	        let data = {
	          datasets: [{
	              data: poll.votes,
	              backgroundColor: [ 'rgba(54, 162, 235, 0.8)',
	                                 'rgba(255, 99, 132, 0.8)',
	                                 'rgba(255, 206, 86, 0.8)',
	                                 'rgba(82, 206, 105, 0.8)',
	                                 'rgba(255, 159, 64, 0.8)',
	                                 'rgba(153, 102, 255, 0.8)',
	                                 'rgba(193, 255, 140, 0.8)',
	                                 'rgba(75, 192, 192, 0.8)',
	                                 'rgba(237, 149, 210, 0.8)',
	                                 'rgba(192, 104, 255, 0.8)',
	                                 'rgba(196, 238, 255, 0.8)', ],
	              strokeColor: 'rgba(255, 255, 255, 0.5)'}],
	          labels: poll.answers,
	        };

	        let options = {
	          cutoutPercentage: 60,
	          elements: {center: {
	          text: this.props.poll.votes.reduce((pv, cv) => pv+cv, 0) + " votes"}},
	        };

	        Chart.pluginService.register({  //draw votes sum in center
	          beforeDraw: function (chart) {
	            if (chart.config.options.elements.center) {
	              //Get ctx from string
	              var ctx = chart.chart.ctx;
	              
	              //Get options from the center object in options
	              var centerConfig = chart.config.options.elements.center;
	              var fontStyle = centerConfig.fontStyle || 'Arial';
	              var txt = centerConfig.text;
	              var color = centerConfig.color || '#000';
	              var sidePadding = centerConfig.sidePadding || 20;
	              var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
	              //Start with a base font of 30px
	              ctx.font = "30px " + fontStyle;
	              
	              //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
	              var stringWidth = ctx.measureText(txt).width;
	              var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

	              // Find out how much the font can grow in width.
	              var widthRatio = elementWidth / stringWidth;
	              var newFontSize = Math.floor(30 * widthRatio);
	              var elementHeight = (chart.innerRadius * 2);

	              // Pick a new font size so it will not be larger than the height of label.
	              var fontSizeToUse = Math.min(newFontSize, elementHeight);

	              //Set font settings to draw it correctly.
	              ctx.textAlign = 'center';
	              ctx.textBaseline = 'middle';
	              var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
	              var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
	              ctx.font = fontSizeToUse+"px " + fontStyle;
	              ctx.fillStyle = color;
	              
	              //Draw text in center
	              ctx.fillText(txt, centerX, centerY);
	            }
	          }
	        });

	        var ctx = document.getElementById("myChart");
	        var myPieChart = new Chart( ctx, {
	            type: 'doughnut',
	            data: data,
	            options: options,
	        })
	}

        render() {

        	return(
				<div className="chartContainer">
            		<canvas id="myChart"></canvas>
          		</div>
        	)
        }
}

export default PieChart;

