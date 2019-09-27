/**
 * Fetch name of institution from fedrowanie by regon.
 *
 * @param {string} input The value or range of cells to multiply.
 * @return The input multiplied by 2.
 * @customfunction
 */

var ALLOWED_PROPS = [
  'name',
  'nip',
  'regon14',
  'regon9',
  'regon',
  'postal_code',
  'city',
  'voivodeship',
  'community',
  'county',
  'street',
  'house_no',
  'flat_no',
  'teryt',
];

/**
 * Fetch property about institution from Fedrowanie by REGON.
 *
 * @param {string} input REGON
 * @param {string} input Property name eg. name, REGON
 * @return Property value
 * @customfunction
 */

function FederByRegon(input,property) {
  if(!property){
    property = 'name';
  }
  var url = "https://fedrowanie.siecobywatelska.pl/api/institutions/?regon=" + encodeURIComponent(input);
  var response = UrlFetchApp.fetch(url);
  var resp = JSON.parse(response.getContentText());
  if (resp.count === 0) {
    return "Nie znaleziono";
  } else if (resp.count > 1) {
    return "Wieloznaczny REGON";
  } else {
    return resp.results[0][property];
  }
}

function lookupBir(field, input, property) {
  if (!input || input.length === 0) {
    return "Parametr pierwszy wymagany";
  };
  if (!property) {
    property = 'name';
  } else if(ALLOWED_PROPS.indexOf(property) < 0 ) {
    return "Niedopuszczalna wartość dla drugiego parametru. Dopuszczalne to :" + ALLOWED_PROPS.join(", ");
  }

  if (!input || input.length === 0) {
    return "Parametr drugi wymagany";
  };

  var url = 'https://' + API_HOST + '/' + field + '/' + encodeURIComponent(input) + '?auth-token=' + encodeURIComponent(TOKEN);
  var response = UrlFetchApp.fetch(url);
  var resp = JSON.parse(response.getContentText());
  if (resp.count === 0) {
    return "Nie znaleziono " + field + ": " + input;
  } else if (resp.count > 1) {
    return "Wieloznaczna wartosc " + field + ": " + input;
  } else {
    return resp[property];
  };
}

/**
 * Fetch property of official institution data by REGON.
 * Data fetched from BIR API (GUS)
 *
 * @param {string} input REGON
 * @param {string} input Property name eg. name, REGON
 * @return Property value
 * @customfunction
 */

function GovDataByRegon(input, property) {
  return lookupBir('regon', input, property)
}

/**
 * Fetch property of official institution data by REGON.
 * Data fetched from BIR API (GUS)
 *
 * @param {string} input REGON
 * @param {string} input Property name eg. name, REGON
 * @return Property value
 */

function GovDataByNip(input, property) {
  return lookupBir('nip', input, property)
}

