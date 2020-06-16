const urlFiltro = {
  district: 'Downtown',
  crime_description: 'Miscellaneous/All Other Non-Offenses',
  url: `https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Police_Incidents/FeatureServer/0/query?where=district%20%3D%20'${this.dis}'%20AND%20crime_description%20%3D%20'${this.crime_description}'%20AND%20reported_year%20%3E%3D%202017%20AND%20reported_year%20%3C%3D%202018&outFields=*&outSR=4326&f=json`  
}


`https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Police_Incidents/FeatureServer/0/query?where=district%20%3D%20'Downtown'%20AND%20crime_description%20%3D%20'MISCELLANEOUS%2FALL%20OTHER%20LOST%2PROPERTY'%20AND%20reported_year%20%3E%3D%202017%20AND%20reported_year%20%3C%3D%202018&outFields=*&outSR=4326&f=json`  

'LOST%2PROPERTY'

//!Lost Property