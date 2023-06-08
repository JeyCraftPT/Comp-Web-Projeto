$( document ).ready(function() {
    const userData = Cookies.get('userData');
    const user = JSON.parse(userData);
    $('#Username').html(user.username);
});

