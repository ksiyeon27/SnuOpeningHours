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

  $("#reported").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/report",
      dataType: "json",
      data: {
        place: $("#place").val(),
        content: $("#content").val(),
      },
      success: function (data) {
        console.log(data.token);
        console.log(data);
        alert("제보가 전송되었습니다. 감사합니다:)");
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
