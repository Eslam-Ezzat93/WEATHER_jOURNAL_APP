// Global Variables 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const api = '&appid=963073f85381cc46e5fe8e5394c766e1';
const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// reterive data from open weather map
const getWeather = async (baseURL, zipCode, api) => {
  const req = await fetch (baseURL + zipCode + api);
  const recivedInfo = await req.json();
  return recivedInfo;
}

function getzipWeather() {

  //gets the zip data from the zip text field
  let zipCode = document.getElementById('zip').value;
  console.log(baseURL + zipCode + api);

  let weather = getWeather(baseURL, zipCode, api);

  return weather;

  }

//add EventLisenter to button
button.addEventListener('click', action)
function action() {
  getzipWeather()
  .then(function(data){

    //gets the text from the feelings text box
    let feelings = document.getElementById('feelings').value;
    console.log(feelings);

    //post data to the server
    postData('/weather', {date: d, temp: data.main.temp, feeling: feelings});

    updateUI({date: d, temp: data.main.temp, feeling: feelings});
    
  });
}
// post data to server 
const postData = async(url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: "same-origin",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    let lastInfo = await response.json();
    return lastInfo;
  }
  catch (error) {
    console.log('error', error)
  }
}

// update userInterface 
const updateUI = async (data={}) => {
  const request = await fetch ('/all');
  try {
    const finalData = await request.json();
    // update most recent entry 
    // date
    document.getElementById('date').innerHTML = `Date is : ${data.date}`; 
    // temp
    document.getElementById('temp').innerHTML = `Temprature is : ${data.temp}`
    // content
    document.getElementById('content').innerHTML = `Feelings is : ${data.feeling}`
    //reset zip and feelings for next entry
    document.getElementById('zip').value = "";
    document.getElementById('feelings').value = "";
  }
  catch(error) {
  console.log('error', error);
  }
}