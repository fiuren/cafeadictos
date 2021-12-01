const quotes = [
	'Tener un hijo, plantar un árbol y escribir un libro es fácil. Lo difícil es criar un niño, regar el árbol y que alguien lea el libro.',
	'El día más desaprovechado de todos los días es aquel en que no nos hemos reído.',
	'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
	'Nada en el mundo vale la pena tener o hacer a menos que signifique esfuerzo, dolor, dificultad.',
	'Camina, cada paso tuyo a mi me contamina. Mueve las caderas como gelatina, cintura, divina. Te comería con pan y mantequilla',
	'Elige un trabajo que ames, y no tendrás que trabajar un solo día de tu vida',
	'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// variable para almacenar todas las palabras del desafío
let words = [];

// almacena el inicio de la palabra que el jugador esta tecleando. 
let wordIndex = 0;

// Valor inicial de la variable para iniciar el temporizador. (Empezará cuando comience el juego)
let startTime = Date.now();
// cogemos los elementos de la interfaz de usuario (UI)
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message')
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', function () {
	// coge una frase
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	// Put the quote into an array of words
	words = quote.split(' ');
	// reset the word index for tracking
	wordIndex = 0;

	// UI updates
	// Create an array of span elements so we can set a class
	const spanWords = words.map(function(word) { return `<span>${word} </span>`});
	// Convert into string and set as innerHTML on quote display
	quoteElement.innerHTML = spanWords.join('');
	// Highlight the first word
	quoteElement.childNodes[0].className = 'highlight';
	// Clear any prior messages
	messageElement.innerText = '';

	// Setup the textbox
	// Clear the textbox
	typedValueElement.value = '';
	// set focus
	typedValueElement.focus();
	// set the event handler

	// Start the timer
	startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {
	// Get the current word
	const currentWord = words[wordIndex];
	// get the current value
	const typedValue = typedValueElement.value;

	if (typedValue === currentWord && wordIndex === words.length - 1) {
		// end of quote
		// Display success
		const elapsedTime = new Date().getTime() - startTime;
		const message = `ENHORABUENA! Has acabado en ${elapsedTime / 1000} segundo.`;
		messageElement.innerText = message;
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		// end of word
		// clear the typedValueElement for the new word
		typedValueElement.value = '';
		// move to the next word
		wordIndex++;
		// reset the class name for all elements in quote
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}
		// highlight the new word
		quoteElement.childNodes[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		// currently correct
		// highlight the next word
		typedValueElement.className = '';
	} else {
		// error state
		typedValueElement.className = 'error';
	}
});