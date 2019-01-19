import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './header';
import { Footer } from './footer';


import 'whatwg-fetch';


const API = 'http://modernacodechallenge.azurewebsites.net/api/insurances';

export class Moderna extends React.Component {
	constructor(props){
		super(props);

		this.state={
		   insurances: [],
		   isLoading: false,
		   error: null
	    };
	}
	componentDidMount(){
		this.setState({ isLoading: true});
		fetch(API)
		.then(response => {
			if (response.ok){
				return response.json();
			}else {
				throw new Error('Something went wrong');
			}
		})
		.then(data => this.setState({insurances: data.insurances, isLoading:false}))
		.catch (error => this.setState({error, isLoading: false}));
	}
    
	render(){
		const {insurance, isLoading, error}= this.state;

		let style = {
                 display: 'inline-block',
                 margin: '5px',
		}
		

		if (error){
			return<p>{error.message}</p>
		}
		if (isLoading){
			return<p>Loading...</p>
		}

		let insurances = this.state.insurances.map((insurance)=>( 
			    <div key={insurance.name} className="card" style={style}>
	 
				  <div className="card-body"><a href={insurance.url}><img src={insurance.image} className="rounded" width="300" height="250" /></a></div>
				  <div className="card-body"><a href={insurance.url}>{insurance.name}</a></div>
			
				</div>	
			));
		return(
			<div>
				<Header />
				{insurances}
				<Footer />
			</div>
		);
	}
}