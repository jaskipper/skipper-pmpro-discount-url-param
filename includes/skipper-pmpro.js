jQuery(function($) {

  //Get discount code from url paramater
  function urlParam(name){
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results==null){
         return null;
      }
      else {
         return results[1] || 0;
      }
  };
  //Check to see if a discount cookie exists, and if so, apply it to the page.
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

  function checkCookie() {
      var discount = getCookie("discount");
      if (discount != "") {
        if ( $('#other_discount_code').val() == "") {
          $('#other_discount_code').val( discount );
          $('#other_discount_code_button').click();
        }
      }
  }

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

  $( document ).ready(function() {

      if ($('body').is('.pmpro-checkout, .pmpro-level')){
          //If there is a discount code in the URL, reset the cookie and set a new one
          if ( urlParam('disc') ) {
              // If there is a urlParam disc, let's refresh the cookie and set a new expires time
              document.cookie = "discount=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
              document.cookie = "discountexpires=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
              // Get the URL Parameter disc
              var disc = urlParam('disc');
              // Set the Expires time to Midnight
              var midnight = new Date();
              midnight.setHours(23,59,59,0);
              // Set the new cookies
              document.cookie = "discount=" + disc + "; expires=" + midnight + "; path=/";
              //Make an Expires Cookie too
              document.cookie = "discountexpires=" + midnight + "; expires=" + midnight + "; path=/";
              // Remove the URL Parameter
              removeParam('disc');
          }
          checkCookie();

      } // pmpro pages

    }); // Document Ready

}); // jQuery
