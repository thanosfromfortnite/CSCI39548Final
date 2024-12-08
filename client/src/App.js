import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import Graph from './components/Graph';
import Search from './components/Search';

function App() {
	const [search, setSearch] = useState([]);
  const [graph, setGraph] = useState([]);
  
  useEffect(() => {

	}, []);
	
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
  
  return (
	<div className="App">
		<div className='search'>
			<form onSubmit={submitHandler}>
				<input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
				<input type='submit' />
			</form>
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
