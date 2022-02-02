document.querySelector('.hamburger-menu').addEventListener('click', () => {
  document.querySelector('.container').classList.toggle('change');
});

const menuLinks = document.getElementsByClassName('menu-link');
for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener('click', () => {
    document.querySelector('.container').classList.remove('change');
  });
}

// hide scroll button when page is at the top
const scrollBtn = document.querySelector('.scroll-btn');

var scrollObject = {};
window.onscroll = getScrollPosition;

function getScrollPosition() {
  scrollObject = {
    x: window.pageXOffset,
    y: window.pageYOffset,
  };
  if (scrollObject.y > 200) {
    scrollBtn.style.opacity = 1;
  } else {
    scrollBtn.style.opacity = 0;
  }
}

// Form input animation
const fields = document.querySelectorAll('.field');

function focusFunc() {
  let sibling = this.nextElementSibling;
  sibling.classList.add('focus');
  console.log(this.nextElementSibling);
}

function blurFunc() {
  let sibling = this.nextElementSibling;
  if (this.value == '') {
    sibling.classList.remove('focus');
  }
}

fields.forEach((field) => {
  field.addEventListener('focus', focusFunc);
  field.addEventListener('blur', blurFunc);
});

// Form validation
function validateForm() {
  var name = document.getElementById('name').value;
  if (name == '') {
    document.querySelector('#status').innerHTML = 'Name cannot be empty';
    return false;
  }
  var email = document.getElementById('email').value;
  if (email == '') {
    document.querySelector('#status').innerHTML = 'Email cannot be empty';
    return false;
  } else {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<i>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      document.querySelector('#status').innerHTML = 'Email format invalid';
      return false;
    }
  }
  var subject = document.getElementById('subject').value;
  if (subject == '') {
    document.querySelector('#status').innerHTML = 'Subject cannot be empty';
    return false;
  }
  var message = document.getElementById('message').value;
  if (message == '') {
    document.querySelector('#status').innerHTML = 'Message cannot be empty';
    return false;
  }

  document.getElementById('status').innerHTML = 'Sending...';
  formData = {
    name: $('input[name=name]').val(),
    email: $('input[name=email]').val(),
    subject: $('input[name=subject]').val(),
    message: $('textarea[name=message]').val(),
  };

  $.ajax({
    url: 'mail.php',
    type: 'POST',
    data: formData,
    success: function (data, textStatus, jqXHR) {
      $('#status').text(data.message);
      if (data.code)
        $('#contact-form')
          .closest('form')
          .find('input[type=text], textarea')
          .val('');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $('#status').text(jqXHR);
    },
  });
}
