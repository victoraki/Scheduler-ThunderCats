(function() {
  function toJSONString(form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < elements.length; ++i) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;
      if (name) {
        obj[name] = value;
      }
    }
    return JSON.stringify(obj);
  }

  document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("form");
    var output = document.getElementById("output");
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var json = toJSONString(this);
      output.innerHTML = json;

      var inputData = document.getElementById('output').innerHTML;
      var parsedInput = JSON.parse(inputData);

      var formInput = {
        "courseName": parsedInput.courseSelected,
        "courseDays": parsedInput.daysSelected,
        "courseTime": parsedInput.timeSelected
      };

      //var outputData = $.getJSON("/data.json", function(data) {});
      var outputData = {
        "firstName": "Anthony",
        "lastName": "Morariu",
        "email": "amorariu@ggc.edu",
        "courseSelected": "Comp Graphics and Multimedia",
        "daysSelected": "T",
        "timeSelected": "1:00",
        "profComment": "Hello World"
      }
      var temp = JSON.stringify(outputData);
      var parsedOutput = JSON.parse(temp);

      var outputJSON = {
        "courseName": parsedOutput.courseSelected,
        "courseDays": parsedOutput.daysSelected,
        "courseTime": parsedOutput.timeSelected
      };

      var check = document.getElementById("check");
      if (JSON.stringify(compareJSON(formInput, outputJSON)) == "{}") {
        document.getElementById("check").style.backgroundColor = "lightcoral";
        check.innerHTML = "Conflicts detected with " + parsedInput.courseSelected + " on " + parsedInput.daysSelected + " at " + parsedInput.timeSelected +
          ".<br><br> Information will be sent to the moderator for further analysis.";

      } else {
        document.getElementById("check").style.backgroundColor = "lightgreen";
        check.innerHTML = "No conflicts deteceted with " + parsedInput.courseSelected + " on " + parsedInput.daysSelected + " at " + parsedInput.timeSelected +
          ".<br><br> Information will be sent to the moderator to confirm course schedule.";
      }
    });
  });
})();

var compareJSON = function(obj1, obj2) {
  var ret = {};
  for (var i in obj2) {
    if (!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
      ret[i] = obj2[i];
    }
  }
  return ret;
};
