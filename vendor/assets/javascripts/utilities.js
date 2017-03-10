Cmsify.util = {
  filterAuthenticityToken: function(arr) {
    return arr.filter(function(element) {
      return element.name !== "authenticity_token";
    });
  }
}
