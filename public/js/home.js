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
        console.log(e.responseText);
        alert(e.responseText);
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
        alert(e.responseText);
      },
    });
  }); //signup

  // function goHome(callback) {
  //   $.ajax({
  //     type: "get",
  //     url: "/",
  //     headers: {
  //       Authorization: localStorage.getItem("token"),
  //     },
  //     success: function (data) {
  //       callback(data);
  //     },
  //     error: function (e) {
  //       console.error(e.responseText);
  //     },
  //   });
  // }
  //   function onTrip(callback) {
  //     $.ajax({
  //       type: "get",
  //       url: "/api/trips/onTrip",
  //       headers: {
  //         "x-auth-token": localStorage.getItem("token"),
  //       },
  //       success: function (data) {
  //         callback(data);
  //       },
  //       error: function (e) {
  //         console.error(e.responseText);
  //       },
  //     });
  //   }

  //   function routeIfOnTrip(onTripData) {
  //     if (onTripData.onTrip) {
  //       console.log("current Trip");
  //       localStorage.setItem("currentTripID", onTripData.tripID);
  //       location.href = "/current";
  //     } else {
  //       console.log("alltrips");
  //       location.href = "/alltrips";
  //     }
  //   }
});
