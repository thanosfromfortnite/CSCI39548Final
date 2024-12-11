import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import Graph from './components/Graph';
import Item from './components/Item';

function App() {
	const [search, setSearch] = useState([]);
	const [results, setResults] = useState([]);
	const [graph, setGraph] = useState([]);
	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState([]);
	
	// Populate list with available items
	useEffect(() => {
		fetch('http://localhost:3001/ge-items/')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			setItems(data);
		})
		.catch(e => console.error());
	}, []);
	
	useEffect(() => {
		if (typeof search == 'string') {
			setResults(items.filter((item) => {return item.name.toLowerCase().includes(search.toLowerCase())}));
		}
	}, [search, items]);
	
	const searchHandler = (e) => {
		setSearch(e.target.value);
	};
	
	// When user selects an item from the live search results.
	const selectHandler = async (e) => {
		console.log(e);
		setSearch('');
		let response = await fetch('http://localhost:3001/item/' + e.target.id);
		let data = await response.json();
		setCurrentItem(data);
		
		response = await fetch('http://localhost:3001/pricehistory/' + e.target.id);
		data = await response.json();
		setGraph(data);
	}
  
	return (
		<div className="App">
			<div className='search'>
				<input value={search} onChange={(e) => searchHandler(e)} placeholder='Search...' />
				<ul className='results'>
					{search.length > 0? results.slice(0, 5).map((e) => (
						<li key={'result_' + e.id} id={e.id} className='result' name={e.name} onClick={(e) => selectHandler(e)}>{e.name}</li>
					)) : <div></div>}
				</ul>
			</div>
			
			<Item props={
				currentItem
			}/>
			
			<Graph datas={{
				name: graph.name,
				timestamps: graph.timestamps,
				prices: graph.prices,
				volumes: graph.volumes
			}}/>
	   </div>
	);
}

export default App;
