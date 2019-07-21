/**
 * Fetch name of institution from feder by regon.
 *
 * @param {string} regon REGON number
 * @return string
 * @lookupFederByRegon
 */
function FederNameByRegon(regon) {
  var response = UrlFetchApp.fetch("https://fedrowanie.siecobywatelska.pl/api/institutions/?regon=" + encodeURIComponent(regon));
  var resp = JSON.parse(response.getContentText());
  if(resp.count === 0){
    return "Nie znaleziono";
  }else if(resp.count > 1){
    return "Wieloznaczny REGON";
  }else{
    return resp.results[0].name;
  }
}
