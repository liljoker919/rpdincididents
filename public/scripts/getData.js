const fields = document.getElementById('fields');

const currentMonth = `${new Date().getMonth() + 1}`;
const nextMonth = `${new Date().getMonth() + 2}`;

const currentDate = `${new Date().getUTCDate() - 1}`;
 
const newUrl = `https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Police_Incidents/FeatureServer/0/query?where=reported_year%20%3E%3D%202020%20AND%20reported_year%20%3C%3D%202022%20AND%20reported_month%20%3E%3D%20${currentMonth}%20AND%20reported_month%20%3C%3D%20${nextMonth}%20AND%20reported_day%20%3E%3D%20${currentDate}%20AND%20reported_day%20%3C%3D%20${currentDate}&outFields=*&outSR=4326&f=json`;

function formatedDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${month}/${day}/${year}`;
}

function formatedTime(timestamp) {
  const date = new Date(timestamp);
  const minutes = date.getUTCMinutes();
  const hours = date.getUTCHours();
  return `${hours}:${minutes}`;
}


function createTR(attributes) { 
  if(attributes.district === 'North') {

    const tr = document.createElement('tr');
    const td_crime_description = document.createElement('td');
    const td_district = document.createElement('td');
    const td_reported_block_address = document.createElement('td');
    const td_reported_date = document.createElement('td');
    const td_reported_time = document.createElement('td');
  
    let text_reported_block_address = null;
  
    if(!attributes.reported_block_address) {
      text_reported_block_address = document.createTextNode('No Block reported');
    } else {
      text_reported_block_address = document.createTextNode(attributes.reported_block_address);
    }
  
    const text_crime_description = document.createTextNode(attributes.crime_description);
    const text_district = document.createTextNode(attributes.district);
    const text_reported_date = document.createTextNode(formatedDate(attributes.reported_date));
    const text_reported_time = document.createTextNode(formatedTime(attributes.reported_date));
  
  
    td_crime_description.appendChild(text_crime_description);
    td_district.appendChild(text_district);
    td_reported_block_address.appendChild(text_reported_block_address);
    td_reported_date.appendChild(text_reported_date);
    td_reported_time.appendChild(text_reported_time);
    
    tr.appendChild(td_crime_description);
    tr.appendChild(td_district);
    tr.appendChild(td_reported_block_address)
    tr.appendChild(td_reported_date);
    tr.appendChild(td_reported_time);
  
    fields.appendChild(tr);
  
    return tr;
  } else {
    return false;
  }
}


function getData(url) {
  fetch(url)
    .then( response => response.json())
    .then( data => {
      for( let field of data.features) {
        const attributes = field.attributes;
        if(createTR(attributes)) {
          fields.appendChild((createTR(attributes)));
        }
      }
    })
}

getData(newUrl);
