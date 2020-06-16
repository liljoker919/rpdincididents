const fields = document.getElementById('fields');


const newUrl = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Police_Incidents/FeatureServer/0/query?where=1%3D1&outFields=crime_description,district,reported_date,reported_year,reported_month,reported_day,latitude,longitude,reported_dayofwk&outSR=4326&f=json';

function createTR(attributes) {
  const tr = document.createElement('tr');
  const td_crime_description = document.createElement('td');
  const td_district = document.createElement('td');
  const td_reported_year = document.createElement('td');
  const td_reported_month = document.createElement('td');
  const td_reported_day = document.createElement('td');

  const text_crime_description = document.createTextNode(attributes.crime_description);
  const text_district = document.createTextNode(attributes.district);
  const text_reported_year = document.createTextNode(attributes.reported_year);
  const text_reported_month = document.createTextNode(attributes.reported_month);
  const text_reported_day = document.createTextNode(attributes.reported_day);

  td_crime_description.appendChild(text_crime_description);
  td_district.appendChild(text_district);
  td_reported_year.appendChild(text_reported_year);
  td_reported_month.appendChild(text_reported_month);
  td_reported_day.appendChild(text_reported_day);
  
  tr.appendChild(td_crime_description);
  tr.appendChild(td_district);
  tr.appendChild(td_reported_year);
  tr.appendChild(td_reported_month);
  tr.appendChild(td_reported_day);

  fields.appendChild(tr);

  return tr;
}


function getData(url) {
  fetch(url)
    .then( response => response.json())
    .then( data => {
      for( let field of data.features) {
        if(field.attributes.reported_year == 2018) {
          // console.log(field.attributes)
          const attributes = field.attributes;
          fields.appendChild(createTR(attributes));
        }
      }
    })
}

getData(newUrl);
