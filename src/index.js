import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

// API link for the quotes
const quoteLink = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

// default quote
let quoteArray = [{
    "quote": "Life isn’t about getting and having, it’s about giving and being.",
    "author": "Kevin Kruse"
	}
];

// background colors to cycle through when a new quote is asked for
var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];


// retrieves the quotes 
async function getQuotes() {
	try {
		const res = await fetch(quoteLink);
		const data = await res.json();
		quoteArray = data.quotes;	
	} catch (err) {
		console.log(err);
	}
	
}

// API trigger
getQuotes();


class App extends React.Component {
	constructor(props){
		super(props);
		
		// states to change styles of elements
		this.state = {
			backgroundColor: colors[0],
			color: colors[0]
		}
		
		this.changeColor = this.changeColor.bind(this);
	}
	
	// picks random colour
	changeColor() {
		const color = Math.floor(Math.random() * colors.length);
		this.setState({
			backgroundColor: colors[color],
			color: colors[color]
		});
		console.log(this.state.backgroundColor);
	}
	
	render() {
		return (
		<div style={{backgroundColor: this.state.backgroundColor,
					color: this.state.color}} id="wrapper">
			<QuoteBox changeColor={this.changeColor} backgroundColor={this.state.backgroundColor}/>
			<Footer />
		</div>
		)
	}	
}

class QuoteBox extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			currentQuote: quoteArray[0].quote,
			currentAuthor: quoteArray[0].author
		};
		
		this.handleNewQuote = this.handleNewQuote.bind(this);
	}
	
	
	// gets a random number, then sets current qoute (and associated author) to states.
	handleNewQuote() {		
		const number = Math.floor(Math.random() * quoteArray.length);
		this.setState({
			currentQuote: quoteArray[number].quote,
			currentAuthor: quoteArray[number].author
		});
		// trigger changecolor when new quote is pressed
		this.props.changeColor();
	}
	
	render() {		
		return (
			<div id="quote-box">				
				<Quote quoteValue={this.state.currentQuote}/>
				<Author authorValue={this.state.currentAuthor}/>
				<Buttons parentCallback={this.handleNewQuote} authorValue={this.state.currentAuthor} quoteValue={this.state.currentQuote} backgroundColor={this.props.backgroundColor}/>
			</div>
		)
	}
}

class Buttons extends React.Component {
	constructor(props){
		super(props);
		
		this.handleNewQuote = this.handleNewQuote.bind(this);
	}
	
	// in this function we call up to quotebox for handleNewQuote
	handleNewQuote(event) {
		this.props.parentCallback();
		event.preventDefault();
	}
	
	render(){
		return (
			<div class="buttons">
				<a id="tweet-quote" class="button" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
						encodeURIComponent('"' + this.props.quoteValue + '" ' + this.props.authorValue)} style={{backgroundColor: this.props.backgroundColor}} target="_top" >Tweet</a>
				<button class="button" id="new-quote" onClick={this.handleNewQuote} style={{backgroundColor: this.props.backgroundColor}}>New Quote</button>
			</div>
		)
	}
}

class Quote extends React.Component {
	render(){
		return (
			<div class="quote-text">
			<span id="text">{this.props.quoteValue}</span>
			</div>
		)
	}
}

class Author extends React.Component {
	render() {
		return (
			<div class="quote-author">
				- <span id="author">{this.props.authorValue}</span>
			</div>
		)
	}
}

function Footer() {
	return (
		<div class="footer">
		</div>
	);
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

