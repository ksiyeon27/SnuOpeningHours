$(document).ready(function () {
  $("#signInMoment").hide();
  $("#signUpMoment").hide();
  $("#buttonIn").click(function () {
    $("#welcomeMoment").hide();
    $("#homeMoment").hide();
    $("#signInMoment").show();
  });
  $("#buttonUp").click(function () {
    $("#welcomeMoment").hide();
    $("#homeMoment").hide();
    $("#signUpMoment").show();
  });
  $("#buttonUp1").click(function () {
    //register first
    $("#signInMoment").hide();
    $("#signUpMoment").show();
  });

  $("#backToWelcom1").click(function () {
    //signin->home
    $("#welcomeMoment").show();
    $("#homeMoment").show();
    $("#signInMoment").hide();
  });

  $("#backToWelcom2").click(function () {
    //signup->home
    $("#welcomeMoment").show();
    $("#homeMoment").show();
    $("#signUpMoment").hide();
  });

  // M.AutoInit();

  $("#signIn").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/user/signin",
      dataType: "json",
      data: {
        email: $("#emailForSignIn").val(),
        password: $("#pwdForSignIn").val(),
      },
      success: function (res) {
        console.log(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);
        $("#welcomeMoment").hide();
        $("#homeMoment").show();
        $("#signInMoment").hide();
      },
      error: function (e) {
        console.log(e.responseText.message);
        var result = JSON.parse(e.responseText);
        if (result.message === "비밀번호 오류") {
          alert("비밀번호가 틀렸습니다. 다시 시도해주세요.");
        } else if (result.message === "존재하지 않는 자원") {
          alert("해당 이메일은 계정이 없습니다. 다시 시도해주세요.");
        } else {
          alert(e.responseText);
        }
      },
    });
  }); //signin

  $("#signedUp").on("click", function (e) {
    e.preventDefault();
    var formData = new FormData();
    //var xhr = new XMLHttpRequest();
    $.ajax({
      type: "post",
      url: "/user/signup",
      dataType: "json",
      data: {
        username: $("#username").val(),
        password: $("#pwd").val(),
        email: $("#email").val(),
      },
      success: function (data) {
        console.log(data.token);
        console.log(data);
        console.log("Created user at Username: ${data.username} Email: ${data.email}");
        $("#welcomeMoment").hide();
        $("#signInMoment").show();
        $("#signUpMoment").hide();
        localStorage.setItem("token", data.token);
      },
      error: function (e) {
        console.log(e.responseText);
        var result = JSON.parse(e.responseText);
        if (result.message === "이메일 중복") {
          alert("이미 계정이 존재하는 이메일입니다.");
        } else {
          alert(e.responseText);
        }
      },
    });
  }); //signup
});
