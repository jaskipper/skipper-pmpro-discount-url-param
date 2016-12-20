<?php
/*
Plugin Name:  Skipper PMPRO Discount Applied from URL Param MU-Plugin
Plugin URI:   https://skipperinnovations.com
Description:  Custom Plugin from the man himself... Jason Skipper
Version:      1.0.0
Author:       Jason Skipper
Author URI:   https://skipperinnovations.com
License:      MIT License
*/

// register jquery and style on initialization
add_action('init', 'register_skipper_pmpro_url_includes');
function register_skipper_pmpro_url_includes() {
    wp_register_script( 'pmprojs', plugins_url('includes/skipper-pmpro.js', __FILE__), array('jquery') );
    wp_register_style( 'pmprocss', plugins_url('includes/skipper-pmpro.css', __FILE__), false, '1.0.0', 'all');
}

// use the registered jquery and style above
add_action('wp_enqueue_scripts', 'enqueue_skipper_pmpro_url_includes');
function enqueue_skipper_pmpro_url_includes(){
   wp_enqueue_script('pmprojs');
   wp_enqueue_style( 'pmprocss' );
}

function removeDiscountCode($discount_code) {
    if ( pmpro_checkDiscountCode($discount_code) ) {
      ?>
        </script>
        <script>
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
          jQuery(function($) {
              // If this was successful, let's add our own message to #pmpro_message
              $('#pmpro_message').addClass('replace-pmpro-message');
              // Let's get the expires cookie so that we can tell the user how long they have
              var expires = getCookie("discountexpires");
              // Using moment.js to figure out how long we have until the cookie expires
              expires = moment(expires).fromNow();
              // Replacing the default message with one explaining how long we have left
              $('head').append("<style>.replace-pmpro-message:after{ content:'Your discount has been applied! It will expire " + expires + ", or until you exit your browser.' }</style>");
              // Clearing and Hiding the Discount Code Fields
              console.log('Discount Code Check Passed');
              $('#other_discount_code, #discount_code').val( "" );
              $('#pmpro_level_cost p:first-of-type, #other_discount_code_p, .pmpro_payment-discount-code').hide();
          });
        </script>
      <?php
    } else {
      ?>
      <script>
        jQuery(function($) {
            $('#pmpro_message').removeClass('replace-pmpro-message');
              console.log('Discount Code Check Failed');
        });
      </script>
      <?php
    }

}
add_action( 'pmpro_applydiscountcode_return_js', 'removeDiscountCode' );
