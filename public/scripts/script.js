let fields = document.getElementById('fields');
const searchInput = document.getElementById('search');;
const searchButton = document.querySelector('.inputs button');

const currentMonth = `${new Date().getMonth() + 1}`;
const nextMonth = `${new Date().getMonth() + 2}`;
const currentDate = `${new Date().getUTCDate() - 1}`;
 
const newUrl = `https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Police_Incidents/FeatureServer/0/query?where=reported_year%20%3E%3D%202020%20AND%20reported_year%20%3C%3D%202022%20AND%20reported_month%20%3E%3D%20${currentMonth}%20AND%20reported_month%20%3C%3D%20${nextMonth}%20AND%20reported_day%20%3E%3D%20${currentDate}%20AND%20reported_day%20%3C%3D%20${currentDate}&outFields=*&outSR=4326&f=json`;

$("#current_year").text(new Date().getFullYear())

function formatedDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${month}/${day}/${year}`;
}

function formatedTime(timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function changeYearTo2021(date){
  var year = date.substr(date.length - 4);
  return date.replace(year, 2021);
}

function createTR(attributes, values) {
  if(attributes.crime_description.toLowerCase().includes(values.search.toLowerCase().trim())) {
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
    const text_reported_date = document.createTextNode(changeYearTo2021(formatedDate(attributes.reported_date)));
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
    tr.setAttribute('id', 'field');
    fields.appendChild(tr);
  
    return tr;
  } else if (attributes.district.toLowerCase() === (values.search.toLowerCase().trim())){
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
    const text_reported_date = document.createTextNode(changeYearTo2021(formatedDate(attributes.reported_date)));
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
    tr.setAttribute('id', 'field');
  
    fields.appendChild(tr);
  } else if (!values.search.trim()){
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
    const text_reported_date = document.createTextNode(changeYearTo2021(formatedDate(attributes.reported_date)));
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
    tr.setAttribute('id', 'field');
    fields.appendChild(tr);
  }
}

const table = document.querySelector('table');

function getData(url, values) {
  return fetch(url)
    .then( response => response.json())
    .then( data => {
      if(fields.children.length === 0) {
        for( let field of data.features) {
          const attributes = field.attributes;
          if(createTR(attributes, values)) {
            fields.appendChild((createTR(attributes, values)));
          }
        }
      } else {
        let allTrs = document.querySelectorAll('#field');
        for(let i = 0; i < allTrs.length; i++) {
          fields.removeChild(allTrs[i]);
        }
        for( let field of data.features) {
          const attributes = field.attributes;
          if(createTR(attributes, values)) {
            fields.appendChild((createTR(attributes, values)));
          }
        }
      }
    })
}

// searchButton.addEventListener('click', () => {
//   const values = {
//     search: searchInput.value
//   };
//   getData(newUrl, values);
// });



window.addEventListener('load' , () => {
  const values = {
    search: searchInput.value
  };
  getData(newUrl, values).then(res => {
    $(document).ready(function() {
      var data_table = $('#data_table').DataTable({
        ordering: false,
        "oLanguage": {
          "sLengthMenu": "_MENU_ records",
        },
        language: {
          'paginate': {
            'previous': '<i class="fas fa-chevron-left"></i>',
            'next': '<i class="fas fa-chevron-right"></i>'
          }
        },
      });
      $("#find").click(function(){
        data_table.search($("#search").val()).draw();
      });         
    });
  });
});
