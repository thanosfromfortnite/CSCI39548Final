import React, {useEffect, useState} from 'react';

const Item = ({props}) => {
	return (
		<div className='itemsummary'>
			<div className='itempriceinfo'>
				Current Price: <span className='price'>
					<span className='pricenumber'>{typeof props.price != 'undefined'? props.price.toLocaleString() : 0}</span> gp
				</span>
			</div>
			<div className='highalchemy'>
				Alchemy Value: <span className='alchemy'>
					<span className='alchemynumber'>{typeof props.ha != 'undefined'? props.ha.toLocaleString() : 0}</span> gp
				</span>
			</div>
			<div className='highalchemyprofit'>
				Alchemy Profit: <span className='alchprofit'>
					<span className='ha'>{typeof props.price != 'undefined' && typeof props.ha != 'undefined'? (props.ha - props.price).toLocaleString() : 0}</span> gp
				</span>
			</div>
		</div>
	);
}

export default Item;