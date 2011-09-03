(function ($, window, undefined) {
  // Store a reference to the jQuery wrapped document. We will use this to
  // broadcast our custom events.
  var $document = $(document), $overlay;




  // Login Code
  function loginUser(username, password) {
    var data = {username: username, password: password};

    // Using a GET request to fetch JSON data without a server for demo. This
    // should _never_ be implemented like this in a real app :)
    return $.get('ajax/login.json', data, function (user) {
      // Broadcast a 'logged-in' topic passing the user data to all callbacks.
      $document.trigger('logged-in', [user]);
    }, 'json');
  }




  // Code to handle show/hide/submission of login form.
  $overlay = $('.overlay');

  function showLogin() {
    $overlay.addClass('show');
    $document.trigger('login-form/show');
  }

  function hideLogin() {
    $overlay.removeClass('show');
    $document.trigger('login-form/hide');
  }

  function showLoginError() {}

  $('#login').submit(function (event) {
    event.preventDefault();

    var $submit = $('.primary', this).text('Loading…'),
        username = $('#login-field-username').val(),
        password = $('#login-field-password').val();

    loginUser(username, password)
    .success(function () {
      // Reset the login text.
      $submit.text('Login');
      hideLogin();
    })
    .error(showLoginError);
  });

  $('[href="/login/"]').live('click', function (event) {
    event.preventDefault();
    showLogin();
  });

  $('.close').click(function (event) {
    event.preventDefault();
    hideLogin();
  });




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

  $document.bind('logged-in', function (event, user) {
    // Create a block for the logged in user.
    var $info = createUserInfo(user);

    // Add a logged in user badge to the page.
    $info.hide().appendTo('#intro').fadeIn();
  });




  // Code to handle updating of event listings.
  function updateEventListing(speaking, attending) {
    // Update the events with an attendance class.
    $('.event').each(function () {
      var $event = $(this),
          id = parseInt(this.id.substr(6), 10);

      $.each({speaking: speaking, attending: attending}, function (category, ids) {
        var $badge = $('<span class="badge" />');

        if ($.inArray(id, ids) !== -1) {
          $badge.text('You are ' + category + ' this event').hide();
          $badge.appendTo($event).fadeIn();
          $event.addClass(category);
          return false;
        }
      });
    });
  }

  $document.bind('logged-in', function (event, user) {
    updateEventListing(user.speaking, user.attending);
  });




  // Handle updating of menu item when logged in.
  $document.bind('logged-in', function (event, user) {
    $('.menu .login').text('Logout').attr('href', '/logout/');
  });




  // Display notifications
  $document.bind('logged-in', function (event, user) {
    var message = 'You are logged in as ' + user.firstname;
    $('.alert-message').show().find('.alert-text').text(message);
  });

})(this.jQuery, this);
