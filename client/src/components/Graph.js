import React from 'react';
import Plot from 'react-plotly.js';

const Graph = ({datas}) => {
	return (
		<div className='graph'>
			<Plot
				data={[
				  { // Main price graph
					x: datas.timestamps,
					y: datas.prices,
					type: 'scatter'
				  }
				]}
				layout={{
					paper_bgcolor: "rgba(192,168,134,1)",
					plot_bgcolor: "rgba(226,219,200,1)",
					width: 1000,
					height: 540,
					title: {text: 'Recent Prices for ' + datas.name},
					xaxis: {title: {text: 'Date'}, tickmode: 'auto'},
					yaxis: {title: {text: 'Price'}}
				}}
			/>
			<Plot
				data={[
				  { // Trade volume graph
					x: datas.timestamps,
					y: datas.volumes,
					type: 'scatter'
				  }
				]}
				layout={{
					paper_bgcolor: "rgba(192,168,134,1)",
					plot_bgcolor: "rgba(226,219,200,1)",
					width: 1000,
					height: 300,
					title: {text: 'Recent Trade Volume'},
					xaxis: {title: {text: 'Date'}, tickmode: 'auto'},
					yaxis: {title: {text: 'Quantity of Item Traded'}}
				}}
			/>
		</div>
	);
}

export default Graph;