//data received from form
var jsonObject = {
	"firstName":"Mark",
	"lastName":"Levengood",
	"email":"mlevengood@ggc.edu",
	"courseSelected":"Intro to Computing",
	"daysSelected":"MWF",
	"timeSelected": "11:00 am - 12:15 pm",
	"profComment": "Hello World"
}; 
obj = JSON.parse(jsonObject);

//parsed JSON used to target only course Name, Time, and Days

var formInput = { "courseName":obj.courseSelected, "courseTime":obj.timeSelected, "courseDays":obj.daysSelected };

var fs = require('fs');
//check if jsonOutput folder is empty

var approved = false;
//Create the conflict bin
var conflicts = {};

fs.readdir(jsonOutput, function(err, files)) {
	if (err) {
	} else {
		if (!files.length) {
			//empty, approve and send to moderator
			approved = true;
		} else {
			//not empty, compare json input to output
			//loop to iterate through number of json files
			for (var i = 0; i <= files.length; i++) {
				var OutputJson = null;
				$.ajax({
					'async': false,
					'global': false,
					'url': "/output.json" + i,
					'dataType': "json",
					'success': function (data) {
						outputJson = data;
					}
				});
				//parse outputJSON used to target only course Name, Times, Days
				var outputObj = JSON.parse(outputJson);
				var outputData = {
					"courseName": outputObj.courseSelected,
					"courseTime": outputObj.timeSelected,
					"courseDays": outputObj.daysSelected
				}
				
				//compare input data to output json files
				if (JSON.stringify(compareJSON(formInput, outputData)) === '{}') {
					//conflicts exists, deny and send to moderator
					approved = false;
					
				}
				
				formInput.addEventListener("submit", function(e) {
					e.preventDefaults();
					document.getElementById("output") = outputData.courseName + " " + outputData.courseTime + " " + outputData.courseDays;
					//document.getElementById("output").innerText = outputData;
				});	
			}
		}
	}
});

var compareJSON = function(obj1, obj2) {
	var ret = {};
	for (var i in obj2) {
		if (!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
			ret[i] = obj2[i];
		}
	}
	return ret;
};

//var submission = document.getElementById("submit");

//submission.onClick = function() {
	//var name = document.getElementById("name");
	//var course = document.getElementById("courseSelector");
	//var time = document.getElementById("timeSelector");
	//var days = document.getElementById("daySelector");
	
	//document.getElementById("outputName").innerText = name;
	//document.getElementById("outputCourse").innerText = course;
	//document.getElementById("outputTime").innerText = time;
	//document.getElementById("outputDays").innerText = days;

//};

document.getElementById("output") = JSON.stringify(compareJSON(formInput, outputData));

(function() {
	function toJSONString(form) {
		var courseObj = {};
		
		var elements = form.querySelectorAll( "input, select, textarea" );
		
		for ( var i = 0; i < elements.length; i++ ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;
			
			
			if (name) {
				courseObj[name] = value;
				
			}
		}
		
		return JSON.stringify(courseObj);
	}
	
	document.addEventListener("Load Complete", function() {
		var form = document.getElementById("form");
		var output = document.getElementById("output");
		form.addEventListener("submit", function(e) {
			e.preventDefaults();
			var json = toJsonString(this);
		    output.innerHTML = json;
		});
	});
})();