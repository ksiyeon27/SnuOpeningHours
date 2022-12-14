var user;
$(document).ready(function () {
  $("#reportPostMoment").hide();
  // setting encrypted and secure user token
  $.ajaxSetup({
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  $("#buttonReport").click(function () {
    $("#wantToReportMoment").hide();
    $("#reportPostMoment").show();
  });

  $("#back").click(function () {
    $("#wantToReportMoment").show();
    $("#reportPostMoment").hide();
  });
  $.ajax({
    type: "get",
    url: "/user",
    success: function (res) {
      console.log(res.data);
      user = res.data;
    },
    error: function (e) {
      console.log(e.responseText);
      callback("Unknown");
    },
  });

  $("#reported").on("click", function (e) {
    e.preventDefault();
    if (user == undefined) {
      alert("로그인이 필요합니다.");
    }
    $.ajax({
      type: "post",
      url: "/report",
      dataType: "json",
      data: {
        place: document.getElementById("placeId").innerText,
        content: $("#content").val(),
      },
      success: function (data) {
        console.log(data.token);
        console.log(data);
        alert(user.username + "님, 제보가 전송되었습니다. 감사합니다:)");
        $("#wantToReportMoment").show();
        $("#reportPostMoment").hide();
      },
      error: function (e) {
        console.log(e.responseText);
        alert(e.responseText);
      },
    });
  }); //signup
});
