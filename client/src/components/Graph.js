import React from 'react';
import Plot from 'react-plotly.js';

const Graph = ({datas}) => {
	console.log("boo" + datas.timestamps);
	return (
		<div id='graph'>
			<Plot
				data={[
				  {
					x: datas.timestamps,
					y: datas.prices,
					type: 'scatter'
				  }
				]}
				layout={ {width: 1000, height: 540, title: {text: 'A Fancy Plot'}} }
			/>
		</div>
	);
}

export default Graph;