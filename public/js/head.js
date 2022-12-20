var isLogin = false;
$(document).ready(function () {
  const status = localStorage.getItem("token");
  if (status === null) {
    isLogin = false;
  } else {
    isLogin = true;
  }
  $("#signInMoment").hide();
  $("#signUpMoment").hide();
  if (isLogin) {
    $("#welcomeMoment").hide();
  } else {
    $("#userMoment").hide();
  }
  $("#buttonOut").on("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("token");
    const status = localStorage.getItem("token");
    console.log(status);
    isLogin = false;
    location.reload();
  });

  $("#buttonIn").click(function () {
    $("#welcomeMoment").hide();
    $("#container").hide();
    $("#signInMoment").show();
  });
  $("#buttonUp").click(function () {
    $("#welcomeMoment").hide();
    $("#container").hide();
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
    $("#container").show();
    $("#signInMoment").hide();
  });

  $("#backToWelcom2").click(function () {
    //signup->home
    $("#welcomeMoment").show();
    $("#container").show();
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
        $("#container").show();
        $("#userMoment").show();
        $("#signInMoment").hide();
        location.reload();
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
