import React from 'react';
import {useState} from 'react';

const Search = ({}) => {
	const [search, setSearch] = useState("");
	return (
		<div className='search'>
			<form>
				<input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
			</form>
		</div>
	);
}

export default Search;