Cmsify.util = {
  filter: function(arr, cb) {
    var returnArray = [];
    arr.forEach(function(element) {
      if (cb(element)) returnArray.push(element);
    });
    return returnArray;
  },
  filterAuthenticityToken: function(arr) {
    return Cmsify.util.filter(arr, function(element) {
      return element.name !== "authenticity_token";
    });
  }
}
