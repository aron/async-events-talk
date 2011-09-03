(function ($, window, undefined) {
  var $overlay  = $('.overlay');

  function showLogin() {
    $overlay.addClass('show');
  }

  function hideLogin() {
    $overlay.removeClass('show');
  }

  // Code to handle updating user info block.
  function createUserInfo(user) {
    return $([
      '<div class="user column span6">',
      '<img src="' + user.avatar + '" />',
      '<h3>Logged in as ' + user.firstname + ' ' + user.surname + '</h3>',
      '<p>',
      'Speaking at <b>' + user.speaking.length  + '</b> and ',
      'attending <b>' + user.attending.length  + '</b> events',
      '</p>',
      '<div>'
    ].join(''));
  }

  $('[href="/login/"]').click(function (event) {
    event.preventDefault();
    showLogin();
  });

  $('.close').click(function (event) {
    event.preventDefault();
    hideLogin();
  });





  $('#login').submit(function (event) {
    event.preventDefault();

    var $submit = $('.primary', this).text('Loading…');

    $.get('ajax/login.json', function (user) {
      // Hide the overlay.
      hideLogin();

      // Reset the login text.
      $submit.text('Login');

      // Update logout button.
      $('.menu .login').text('Logout');

      // Create a block for the logged in user.
      var $info = createUserInfo(user);

      // Add a logged in user badge to the page.
      $info.hide().appendTo('#intro').fadeIn();

      // Update the events with an attendance class.
      $('.event').each(function () {
        var $event = $(this),
            id = parseInt(this.id.substr(6), 10);

        $.each(['speaking', 'attending'], function (index, category) {
          var $badge = $('<span class="badge" />');

          if ($.inArray(id, user[category]) !== -1) {
            $badge.text('You are ' + category + ' this event').hide();
            $badge.appendTo($event).fadeIn();
            $event.addClass(category);
            return false;
          }
        });
      });
    }, 'json');
  });

})(this.jQuery, this);
