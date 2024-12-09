import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import Graph from './components/Graph';
import Search from './components/Search';

function App() {
	const [search, setSearch] = useState([]);
	const [results, setResults] = useState([]);
	const [graph, setGraph] = useState([]);
	const [items, setItems] = useState([]);
  
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
	
	const submitHandler = (e) => {
		e.preventDefault();
		fetch('http://localhost:3001/pricehistory/' + search)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			setGraph(data);
		})
		.catch(e => console.error(e));
	};
	
	const selectHandler = (e) => {
		setSearch('');
		fetch('http://localhost:3001/pricehistory/' + e.target.innerText)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			setGraph(data);
		})
		.catch(e => console.error(e));
	}
  
	return (
		<div className="App">
			<div className='search'>
				<form onSubmit={submitHandler}>
					<input type='text' value={search} onChange={(e) => searchHandler(e)} placeholder='Search...' />
					<input type='submit' />
				</form>
				<ul className='results'>
					{results.slice(0, 5).map((e) => (
						<li key={'result_' + e.id} className='result' name={e.name} onClick={(e) => selectHandler(e)}>{e.name}</li>
					))}
				</ul>
			</div>
			
		<Graph datas={{
			name: graph.name,
			timestamps: graph.timestamps,
			prices: graph.prices,
			volumes: graph.volumes
		}}
		/>
	   </div>
	);
}

export default App;
