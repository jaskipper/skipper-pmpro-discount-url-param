//Get discount code from url parameter
function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else {
       return results[1] || 0;
    }
};
// Get the cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//Check to see if a cookie exists
function checkCookie(cname) {
    var name = getCookie(cname);
    if (name != "") {
      return name;
    }
    return "";
}
// Remove the parameter from the URL
function removeParam(parameter) {
    var url=document.location.href;
    var urlparts= url.split('?');

    if (urlparts.length>=2) {
        var urlBase=urlparts.shift();
        var queryString=urlparts.join("?");

        var prefix = encodeURIComponent(parameter)+'=';
        var pars = queryString.split(/[&;]/g);
        for (var i= pars.length; i-->0;)
            if (pars[i].lastIndexOf(prefix, 0)!==-1)
                pars.splice(i, 1);
        url = urlBase+'?'+pars.join('&');
        window.history.pushState('',document.title,url); // added this line to push the new url directly to url bar .
    }
    return url;
}

function set_cookie(name, value, expires) {
  document.cookie = name +'='+ value +'; expires=' + expires + '; Path=/;';
  console.log(name +'='+ value +'; expires=' + expires + '; Path=/;');
}
function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

jQuery(function($) {
  $( document ).ready(function() {

      if ($('body').is('.membership-checkout, .pmpro-level')){

          // Check URL for the disc Parameter
          if ( urlParam('disc') ) {

              // Get the URL Parameter disc
              var disc = urlParam('disc');
              console.log(disc);

              // Set the Expires time to 4 hours ahead
              var cookieDate = moment().add(4, 'hours');
              var cookieDateUTC = cookieDate.toDate().toUTCString();
              var cookieDateISO = cookieDate.toISOString();
              console.log(cookieDate);

              // Set the new cookies
              delete_cookie('discount');
              delete_cookie('discountexpires');
              set_cookie('discount', disc, cookieDateUTC);
              set_cookie('discountexpires', cookieDateISO, cookieDateUTC);

              // Remove the URL Parameter
              removeParam('disc');


          }

          console.log(document.cookie);
          if ( checkCookie('discount') && $('#other_discount_code').val() == "" ) {
              var discount = checkCookie('discount');
              $('#other_discount_code').val( discount );
              $('#other_discount_code_button').click();
          }

      } // pmpro pages
      console.log('working');

    }); // Document Ready

}); // jQuery
