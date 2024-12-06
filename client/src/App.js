import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import Graph from './components/Graph';

function App() {
  const [testy, setTesty] = useState([]);
  
  useEffect(() => {
	fetch('http://localhost:3001/pricehistory/Abyssal whip')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		setTesty(data);
	})
	.catch(e => console.error(e));
  }, []);
  
  return (
	<div className="App">
      <Graph datas={{
		  name: testy.name,
		  timestamps: testy.timestamps,
		  prices: testy.prices,
		  volumes: testy.volumes
		  }}
	  />
    </div>
  );
}

export default App;
