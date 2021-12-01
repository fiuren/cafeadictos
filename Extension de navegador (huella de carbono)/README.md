// Creamos las variables que vayamos a utilizar a lo largo del programa
const form = document.querySelector('.form-data');
const region = document.querySelector('.region-name');
const apikey = document.querySelector('.api-key');

// Creamos las variables que nos muestren los resultados
const errors = document.querySelector('errors');
const loading = document.querySelector('.loading');
const results = document.querySelector('.result-container');
const usage = document.querySelector('.carbon.usage');
const fossilfuel = document.querySelector('.fossil-fuel');
const myregion = document.querySelector('.my-region');
const clearBtn = document.querySelector('.clear-btn');

//Creacion de la calculadora
function calculateColor(value) {
	let co2Scale = [0, 150, 600, 750, 800];
	let colors = ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'];

	let closestNum = co2Scale.sort((a, b) => {
		return Math.abs(a - value) - Math.abs(b - value);
	})[0];
	console.log(value + ' is closest to ' + closestNum);
	let num = (element) => element > closestNum;
	let scaleIndex = co2Scale.findIndex(num);

	let closestColor = colors[scaleIndex];
	console.log(scaleIndex, closestColor);

	chrome.runtime.sendMessage({ action: 'updateIcon', value: { color: closestColor } });
}

// Creamos una lista de eventos con addEventListener
form.addEventListener('submit', (e) => handleSummit(e));
clearBtn.addEventListener('click', (e) => reset (e));
init();

//Desarrollamos la funcion de iniciacion llamada "init".

function init(){
    //Si algo está almacenado en local, lo coge
    const storedApiKey = localStorage.getItem('apikey');
    const storedRegion = localStorage.getItem('regionName')   

//condicionantes para que se cumpla el programa

if (storedApiKey === null || storedRegion === null) {
    //si no tenemos la key, mostramos el formulario
    form.style.display = 'block'
    results.style.display = 'none';
    loading.style.display = 'none';
    clearBtn.style.display = 'none';
    errors.textContent = ";"
} else {
    //si tenemos la key/regiones en local, mostramos los resultados
    displayCarbonUsage (storedApiKey,storedRegion);
    results.style.display = 'none';
    form.style.display = 'none';
    clearBtn.style.display = 'block';
}
chrome.runtime.sendMessage({
    action: 'updateIcon',
        value: {
            color: 'green';
        },
})
};
//Calcular el CO2...
calculateColor(CO2);

function reset (e) {
    e.preventDefault();
    //limpiamos el almacenamiento local por regiones
    localStorage.removeItem('regionName');
    init();
}

//Manejo del envio del formulario
function handleSummit ( e ) {
    e.preventDefault() ;
    setUpUser (apikey, value, region.value);
}

//Manejo de usuarios
function setUpUser(apiKey, regionName) {
	localStorage.setItem('apiKey', apiKey);
	localStorage.setItem('regionName', regionName);
	loading.style.display = 'block';
	errors.textContent = '';
	clearBtn.style.display = 'block';
	//Llamada  de inicio
	displayCarbonUsage(apiKey, regionName);
}

import axios from '../node_modules/axios';

async function displayCarbonUsage(apiKey, region) {
	try {
		await axios
			.get('https://api.co2signal.com/v1/latest', {
				params: {
					countryCode: region,
				},
				headers: {
					'auth-token': apiKey,
				},
			})
			.then((response) => {
				let CO2 = Math.floor(response.data.data.carbonIntensity);

				//calculateColor(CO2);

				loading.style.display = 'none';
				form.style.display = 'none';
				myregion.textContent = region;
				usage.textContent =
					Math.round(response.data.data.carbonIntensity) + ' grams (grams C02 emitted per kilowatt hour)';
				fossilfuel.textContent =
					response.data.data.fossilFuelPercentage.toFixed(2) +
					'% (percentage of fossil fuels used to generate electricity)';
				results.style.display = 'block';
			});
	} catch (error) {
		console.log(error);
		loading.style.display = 'none';
		results.style.display = 'none';
		errors.textContent = 'Lo siento, no tenemos información sobre la region que ha solicitado.';
	}
}
