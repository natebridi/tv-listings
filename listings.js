(function () {

	var channels = [
	   {
	      "channel":"KDKA HDTV",
	      "id":11623,
	      "num":"2.1",
	      "name": "CBS"
	   },{
	      "channel":"WTAE HDTV",
	      "id":11939,
	      "num":"4.1",
	      "name": "ABC"
	   },{
	      "channel":"WPXI HDTV",
	      "id":11916,
	      "num":"11.1",
	      "name": "NBC"
	   },{
	      "channel":"WPGH HDTV",
	      "id":11907,
	      "num":"53.1",
	      "name": "Fox"
	   },{
	      "channel":"WQED HDTV",
	      "id":12425,
	      "num":"13.1",
	      "name": "PBS"
	   },{
	      "channel":"WPCW HDTV",
	      "id":20514,
	      "num":"19.1",
	      "name": "CW"
	   },{
	      "channel":"WQEDDT2",
	      "id":19352,
	      "num":"13.2",
	      "name": "Create"
	   },{
	      "channel":"WINP HDTV",
	      "id":27108,
	      "num":"16.1",
	      "name": "Ion"
	   },{
	      "channel":"ION Life",
	      "id":29838,
	      "num":"16.3",
	      "name": "Ion Life"
	   },{
	      "channel":"WPNT HDTV",
	      "id":11768,
	      "num":"22.1",
	      "name": "MyTV"
	   },{
	      "channel":"KDKA Decades",
	      "id":58969,
	      "num":"2.2",
	      "name": "Decades"
	   },{
	      "channel":"ThisTV Pittsburgh",
	      "id":19357,
	      "num":"4.2",
	      "name": "ThisTV"
	   },{
	      "channel":"WPXI Me-TV",
	      "id":20212,
	      "num":"11.2",
	      "name": "MeTV"
	   },{
	      "channel":"WPXI Laff TV",
	      "id":59031,
	      "num":"11.3",
	      "name": "Laff"
	   },{
	      "channel":"WQED World Channel",
	      "id":19517,
	      "num":"13.3",
	      "name": "World"
	   },{
	      "channel":"WQED Showcase",
	      "id":34286,
	      "num":"13.4",
	      "name": "Showcase"
	   },{
	      "channel":"WPGH Get TV",
	      "id":20675,
	      "num":"53.2",
	      "name": "GetTV"
	   },{
	      "channel":"WPGH GritTV",
	      "id":58335,
	      "num":"53.3",
	      "name": "Grit"
	   },{
	      "channel":"WEPA Cozi TV",
	      "id":65550,
	      "num":"59.1",
	      "name": "Cozi"
	   },{
	      "channel":"WEPA Movies!",
	      "id":65566,
	      "num":"59.2",
	      "name": "Movies!"
	   },{
	      "channel":"WEPA Retro Television",
	      "id":65582,
	      "num":"59.3",
	      "name": "Retro"
	   }
	];

	fetch();
	
	function output(d) {
		var html = [];

		channels.forEach(function (channel) {
			var listing = 0;

			while (d[listing].Channel.SourceId != channel.id && listing < d.length) { listing++; };

			html.push('<div class="row">');
			html.push('<div class="channel"><span class="name">' + channel.name + '</span><span class="number">' + d[listing].Channel.Number + '</span></div>');
			html.push('<div class="program-wrap">');
			
			var p = d[listing].ProgramSchedules;
			for (j = 0; j < p.length; j++) {

				var time = new Date();
				var requestedTime = Math.round(time.getTime()/1000/100)*100;
				var st = (p[j].StartTime < requestedTime) ? requestedTime : p[j].StartTime;
				var et = (p[j].EndTime > requestedTime + 7200) ? requestedTime + 7200 : p[j].EndTime;
				var w = (et - st)/72;

				var timeClass = '';
				if (p[j].StartTime < requestedTime) timeClass = 'started-earlier';
				if (p[j].EndTime > requestedTime + 7200) timeClass = 'finishes-later';
				
				if (w > 5) {
					html.push('<div class="program ' + timeClass + '" style="width:' + w + '%;">');
					html.push('<span>' + p[j].Title + '</span>');
					html.push('<span class="time">' + formatTime(p[j].StartTime) + '&ndash;' + formatTime(p[j].EndTime) + '</span></div>');
				}
				
			}

			html.push('</div></div>');  // .program-wrap   // .row
		});

		document.getElementById('listings').innerHTML = html.join('');
	}


	function formatTime(t) {
		var date = new Date(t*1000);
		var hours = (date.getHours() > 12 || date.getHours() == 0) ? Math.abs(date.getHours() - 12) : date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();

		return hours + ':' + minutes.substr(-2);
	}


	function fetch() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', encodeURI('listings.php'));
		xhr.onload = function() {
		    if (xhr.status === 200) {
		        output(JSON.parse(xhr.responseText));
		    }
		    else {
		        console.log('Request failed.  Returned status of ' + xhr.status);
		    }
		};
		xhr.send();
	}

})();




