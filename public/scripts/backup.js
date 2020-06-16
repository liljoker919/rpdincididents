const dataView = document.getElementById('dataView');

// const url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Police_Incidents/FeatureServer/0/query?where=1%3D1&outFields=crime_description,district,reported_date,reported_year,reported_month,reported_day,latitude,longitude,reported_dayofwk&outSR=4326&f=json';

// fetch(url, { 
//   method: 'get' // opcional 
// })
// .then(function(response) { 
//   response.text()
//   .then(function(result){
//     return result;
//   })
//   // use a resposta 
// })
// .catch(function(err) { console.error(err); });

// const newUrl = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Police_Incidents/FeatureServer/0/query?where=1%3D1&outFields=crime_description,reported_block_address,district,reported_date,reported_hour,reported_year,reported_day,reported_month&outSR=4326&f=json';
const newUrl = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Police_Incidents/FeatureServer/0/query?where=1%3D1&outFields=crime_description,district,reported_date,reported_year,reported_month,reported_day,latitude,longitude,reported_dayofwk&outSR=4326&f=json';

function getData(url) {
  fetch(url)
    .then( response => response.json())
    // .then( data => console.log(data.fields))
    .then( data => {
      for( let field of data.features) {
        // console.log(field.attributes)
        if(field.attributes.reported_year == 2018) {
          console.log(field.attributes)
        }
      }
    })
}

getData(newUrl);
