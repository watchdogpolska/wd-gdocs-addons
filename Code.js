/**
 * Runs when the add-on is installed.
 */
function onInstall() {
  onOpen();
}

/**
 * Runs when the document is opened, creating the add-on's menu. Custom function
 * add-ons need at least one menu item, since the add-on is only enabled in the
 * current spreadsheet when a function is run.
 */
function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Use in this spreadsheet', 'use')
      .addToUi();
}


/**
 * Enables the add-on on for the current spreadsheet (simply by running) and
 * shows a popup informing the user of the new functions that are available.
 */
function use() {
  var title = 'Watchdog Custom Functions';
  var message = 'The functions FederNameByRegon are now available in ' +
      'this spreadsheet. More information is available in the function help ' +
      'box that appears when you start using them in a forumula.';
  var ui = SpreadsheetApp.getUi();
  ui.alert(title, message, ui.ButtonSet.OK);
}

/**
 * @customFunction
 * Fetch name of institution from feder by regon.
 *
 * @param {Array} arguments Array of REGON numbers
 * @return string
 */
function FederNameByRegon(arguments) {
  var args = toArray(arguments); // eslint-disable-line prefer-rest-params
  return multimap(args, function (regon) {
    var url = "https://fedrowanie.siecobywatelska.pl/api/institutions/?regon=" + encodeURIComponent(regon);
    var response = UrlFetchApp.fetch(url);
    var resp = JSON.parse(response.getContentText());
    if(resp.count === 0){
      return "Nie znaleziono";
    }else if(resp.count > 1){
      return "Wieloznaczny REGON";
    }else{
      return resp.results[0].name;
    }
  });


}


/**
 * Applies a function to a set of arguments, looping over arrays in those
 * arguments. Similar to Array.map, except that it can map the function across
 * multiple arrays, passing forward non-array values.
 * @param {Array} args The arguments to map against.
 * @param {Function} func The function to apply.
 * @return {Array} The results of the mapping.
 */
function multimap(args, func) {
  // Determine the length of the arrays.
  var lengths = args.map(function (arg) {
    if (arg instanceof Array) {
      return arg.length;
    } else {
      return 0;
    }
  });
  var max = Math.max.apply(null, lengths);

  // If there aren't any arrays, just call the function.
  if (max == 0) {
    return func(...args);
  }

  // Ensure all the arrays are the same length.
  // Arrays of length 1 are exempted, since they are assumed to be rows/columns
  // that should apply to each row/column in the other sets.
  lengths.forEach(function (length) {
    if (length != max && length > 1) {
      throw new Error('All input ranges must be the same size: ' + max);
    }
  });

  // Recursively apply the map function to each element in the arrays.
  var result = [];
  for (var i = 0; i < max; i++) {
    var params = args.map(function (arg) {
      if (arg instanceof Array) {
        return arg.length == 1 ? arg[0] : arg[i];
      } else {
        return arg;
      }
    });
    result.push(multimap(params, func));
  }
  return result;
}

/**
 * Convert the array-like arguments object into a real array.
 * @param {Arguments} args The arguments object to convert.
 * @return {Array} The equivalent array.
 */
function toArray(args) {
  return Array.prototype.slice.call(args);
}
