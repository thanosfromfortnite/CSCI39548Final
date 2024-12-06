import React from 'react';
import Plot from 'react-plotly.js';

const Graph = ({datas}) => {
	console.log("boo" + datas.timestamps);
	return (
		<div id='graph'>
			<Plot
				data={[
				  { // Main price graph
					x: datas.timestamps,
					y: datas.prices,
					type: 'scatter'
				  }
				]}
				layout={{
					width: 1000,
					height: 540,
					title: {text: 'Recent Prices for ' + datas.name},
					xaxis: {title: {text: 'Date'}, tickmode: 'linear'},
					yaxis: {title: {text: 'Price'}}
				}}
			/>
			<Plot
				data={[
				  { // Trade volume graph
					x: datas.timestamps,
					y: datas.volumes,
					type: 'bar'
				  }
				]}
				layout={{
					width: 1000,
					height: 300,
					title: {text: 'Recent Trade Volume'},
					xaxis: {tickmode: 'linear'}
				}}
			/>
		</div>
	);
}

export default Graph;