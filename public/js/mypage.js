$(document).ready(function () {
  // setting encrypted and secure user token
  $.ajaxSetup({
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  // GETS the users profile information.  Checks the token to make sure it is a valid user.
  function getUserInfo(callback) {
    $.ajax({
      type: "get",
      url: "/user",
      success: function (res) {
        console.log(res.data);
        callback(res.data);
      },
      error: function (e) {
        console.log(e.responseText);
        alert("로그인이 필요합니다.");
      },
    });
  }

  // Sets the profile information using the current users information.
  function setProfileInfo(user) {
    let userNameDisplay = $("#userNameDisplay");
    userNameDisplay.text(user.username);

    let emailDisplay = $("#emailDisplay");
    emailDisplay.text(user.email);
  }
  getUserInfo(setProfileInfo);
});
