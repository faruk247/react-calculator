import { useState } from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';

let base_url = process.env.REACT_APP_URL;

function Calculator() {
	let [result, setResult] = useState('');
	let [dataStore, setDataStore] = useState({});
	let [buttonText, setButtonText] = useState('Select Operator');
	let [details, setDetails] = useState(false);

	let symbolItems = [
		{symbol:'+', title: '👽 Addition'},
		{symbol:'-', title: '💀 Subtraction'},
		{symbol:'*', title: '👻 Multiplication'},
		{symbol:'/', title: '😱 Division'}
	];

	let handler = (e, symbol) => {
		let element = e.target, store = dataStore;

		if(symbol) {
			store.symbol = symbol;
			setButtonText(element.innerHTML);
            for (let item of element.parentElement.children) {
                element === item ? item.classList.add('active'):item.classList.remove('active');
            }
		}else {
			store[element.name] = element.value;
		}
        setDataStore(store);

		if(Object.values(dataStore).length === 3) {
			axios.get(`${base_url}calculate`, {params:dataStore}).then(response => {
				let {answer} = response.data;
				setResult(answer);
				setDetails(response.data);
			})
		}
	}

	return (
		<div className="App">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="calculator">
							<div className="card">
								<h2>Calculator</h2>
								<div className="card-body">
									<div className="input-group mb-3 d-flex">
										<input onChange={ (input) => handler(input)} name="first" type="number" className="form-control" placeholder="First Number" aria-label="First Number"/>
										<div className="input-group-text">
											<DropdownButton id="symbol_dropdown" variant="default" title={buttonText}>
												{symbolItems.map((item, i) => (
													<Dropdown.Item onClick={ (el) => handler(el, item.symbol) } key={i} title={item.symbol}>{item.title}</Dropdown.Item>
												))}
											</DropdownButton>
										</div>
										<input onChange={ (input) => handler(input)} name="second" type="number" className="form-control" placeholder="Second Number" aria-label="Second Number"/>
									</div>
										<h4> = {result}</h4>
									<p>{details ? JSON.stringify(details):''}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Calculator;
