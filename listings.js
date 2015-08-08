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

	output(fetch());
	
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
				var requestedTime = Math.round(d.getTime()/100+50)*100;
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
		/*var xhr = new XMLHttpRequest();
		xhr.open('GET', encodeURI('listings.php'));
		xhr.onload = function() {
		    if (xhr.status === 200) {
		        return JSON.parse(xhr.responseText);
		    }
		    else {
		        return 'Request failed.  Returned status of ' + xhr.status;
		    }
		};
		xhr.send();*/

		return JSON.parse('[{"Channel":{"FullName":"KDKA HDTV","Name":"KDKA-DT","Number":"2.1","SourceId":11623},"ProgramSchedules":[{"AiringAttrib":42,"CatId":5,"EndTime":1438567200,"ProgramId":26024716,"StartTime":1438563600,"Title":"Madam Secretary"},{"AiringAttrib":42,"CatId":5,"EndTime":1438570800,"ProgramId":26887097,"StartTime":1438567200,"Title":"CSI: Cyber"},{"AiringAttrib":4,"CatId":4,"EndTime":1438572900,"ProgramId":4252627,"StartTime":1438570800,"Title":"KDKA-TV News at Eleven"}]},{"Channel":{"FullName":"KDKA Decades","Name":"DECAD","Number":"2.2","SourceId":58969},"ProgramSchedules":[{"AiringAttrib":0,"CatId":5,"EndTime":1438567200,"ProgramId":616142,"StartTime":1438563600,"Title":"Lucy-Desi Comedy Hour"},{"AiringAttrib":0,"CatId":5,"EndTime":1438570800,"ProgramId":615625,"StartTime":1438567200,"Title":"Lucy-Desi Comedy Hour"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":615626,"StartTime":1438570800,"Title":"Lucy-Desi Comedy Hour"}]},{"Channel":{"FullName":"WTAE HDTV","Name":"WTAE-DT","Number":"4.1","SourceId":11939},"ProgramSchedules":[{"AiringAttrib":44,"CatId":5,"EndTime":1438567260,"ProgramId":26930001,"StartTime":1438560000,"Title":"Bachelor in Paradise"},{"AiringAttrib":44,"CatId":5,"EndTime":1438570800,"ProgramId":27547051,"StartTime":1438567260,"Title":"Save My Life: Boston Trauma"},{"AiringAttrib":4,"CatId":4,"EndTime":1438572600,"ProgramId":4253192,"StartTime":1438570800,"Title":"Pittsburgh\'s Action News 4"},{"AiringAttrib":4,"CatId":4,"EndTime":1438574400,"ProgramId":4253192,"StartTime":1438572600,"Title":"Pittsburgh\'s Action News 4"}]},{"Channel":{"FullName":"ThisTV Pittsburgh","Name":"THIS","Number":"4.2","SourceId":19357},"ProgramSchedules":[{"AiringAttrib":0,"CatId":5,"EndTime":1438567200,"ProgramId":23784,"StartTime":1438563600,"Title":"In the Heat of the Night"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":4877933,"StartTime":1438567200,"Title":"Stargate SG-1"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":5181834,"StartTime":1438570800,"Title":"Stargate SG-1"}]},{"Channel":{"FullName":"WTAE HDTV","Name":"WTAE-DT","Number":"4.3","SourceId":74600},"ProgramSchedules":[{"AiringAttrib":44,"CatId":5,"EndTime":1438567260,"ProgramId":26930001,"StartTime":1438560000,"Title":"Bachelor in Paradise"},{"AiringAttrib":44,"CatId":5,"EndTime":1438570800,"ProgramId":27547051,"StartTime":1438567260,"Title":"Save My Life: Boston Trauma"},{"AiringAttrib":4,"CatId":4,"EndTime":1438572600,"ProgramId":4253192,"StartTime":1438570800,"Title":"Pittsburgh\'s Action News 4"},{"AiringAttrib":4,"CatId":4,"EndTime":1438574400,"ProgramId":4253192,"StartTime":1438572600,"Title":"Pittsburgh\'s Action News 4"}]},{"Channel":{"FullName":"ThisTV Pittsburgh","Name":"THIS","Number":"4.4","SourceId":74601},"ProgramSchedules":[{"AiringAttrib":0,"CatId":5,"EndTime":1438567200,"ProgramId":23784,"StartTime":1438563600,"Title":"In the Heat of the Night"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":4877933,"StartTime":1438567200,"Title":"Stargate SG-1"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":5181834,"StartTime":1438570800,"Title":"Stargate SG-1"}]},{"Channel":{"FullName":"WPXI HDTV","Name":"WPXI HD","Number":"11.1","SourceId":11916},"ProgramSchedules":[{"AiringAttrib":42,"CatId":5,"EndTime":1438570800,"ProgramId":27498119,"StartTime":1438563600,"Title":"American Ninja Warrior"},{"AiringAttrib":12,"CatId":4,"EndTime":1438572900,"ProgramId":4833823,"StartTime":1438570800,"Title":"Channel 11 News at 11PM"}]},{"Channel":{"FullName":"WPXI Me-TV","Name":"WPXIM","Number":"11.2","SourceId":20212},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":585304,"StartTime":1438565400,"Title":"M*A*S*H"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":35147,"StartTime":1438567200,"Title":"The Man From U.N.C.L.E."},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":591709,"StartTime":1438570800,"Title":"Mission: Impossible"}]},{"Channel":{"FullName":"WPXI Laff TV","Name":"LAFF","Number":"11.3","SourceId":59031},"ProgramSchedules":[{"AiringAttrib":40,"CatId":5,"EndTime":1438567200,"ProgramId":972173,"StartTime":1438565400,"Title":"Grace Under Fire"},{"AiringAttrib":32800,"CatId":1,"EndTime":1438574400,"ProgramId":19950,"StartTime":1438567200,"Title":"Peggy Sue Got Married"}]},{"Channel":{"FullName":"W12CA","Name":"W12CA","Number":"12","SourceId":11489},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":20724264,"StartTime":1438565400,"Title":"Israel: The Prophetic Connection"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":22935782,"StartTime":1438567200,"Title":"Real Life"},{"AiringAttrib":0,"CatId":5,"EndTime":1438572600,"ProgramId":2775750,"StartTime":1438570800,"Title":"International Fellowship of Christians and Jews"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":3988617,"StartTime":1438572600,"Title":"The Way of the Master"}]},{"Channel":{"FullName":"WQED HDTV","Name":"WQEDH","Number":"13.1","SourceId":12425},"ProgramSchedules":[{"AiringAttrib":44,"CatId":5,"EndTime":1438570800,"ProgramId":27442618,"StartTime":1438563600,"Title":"Poldark on Masterpiece"},{"AiringAttrib":40,"CatId":9,"EndTime":1438578000,"ProgramId":23442865,"StartTime":1438570800,"Title":"Suze Orman\'s Financial Solutions for You"}]},{"Channel":{"FullName":"WQEDDT2","Name":"WQED2","Number":"13.2","SourceId":19352},"ProgramSchedules":[{"AiringAttrib":8,"CatId":9,"EndTime":1438567200,"ProgramId":26397665,"StartTime":1438565400,"Title":"Joanne Weir Gets Fresh"},{"AiringAttrib":8,"CatId":9,"EndTime":1438569000,"ProgramId":26673338,"StartTime":1438567200,"Title":"Ask This Old House"},{"AiringAttrib":8,"CatId":9,"EndTime":1438570800,"ProgramId":21001168,"StartTime":1438569000,"Title":"Rick Steves\' Europe"},{"AiringAttrib":8,"CatId":10,"EndTime":1438572600,"ProgramId":21929779,"StartTime":1438570800,"Title":"Music Voyager"},{"AiringAttrib":8,"CatId":9,"EndTime":1438574400,"ProgramId":25875622,"StartTime":1438572600,"Title":"Martha Stewart\'s Cooking School"}]},{"Channel":{"FullName":"WQED World Channel","Name":"WQEDN","Number":"13.3","SourceId":19517},"ProgramSchedules":[{"AiringAttrib":8,"CatId":1,"EndTime":1438567200,"ProgramId":24214649,"StartTime":1438563600,"Title":"A Perfect Balance"},{"AiringAttrib":8,"CatId":1,"EndTime":1438570800,"ProgramId":25407425,"StartTime":1438567200,"Title":"Capturing Grace"},{"AiringAttrib":8,"CatId":1,"EndTime":1438574400,"ProgramId":25282212,"StartTime":1438570800,"Title":"Living With Parkinson\'s"}]},{"Channel":{"FullName":"WQED Showcase","Name":"WQED4","Number":"13.4","SourceId":34286},"ProgramSchedules":[{"AiringAttrib":8,"CatId":9,"EndTime":1438570800,"ProgramId":23648113,"StartTime":1438565400,"Title":"The Blood Sugar Solution 10-Day Detox Diet"},{"AiringAttrib":8,"CatId":9,"EndTime":1438574400,"ProgramId":20516305,"StartTime":1438570800,"Title":"Gifts From the Sea"}]},{"Channel":{"FullName":"WINP HDTV","Name":"IONHD","Number":"16.1","SourceId":27108},"ProgramSchedules":[{"AiringAttrib":32776,"CatId":1,"EndTime":1438572600,"ProgramId":7156995,"StartTime":1438561800,"Title":"Live Free or Die Hard"},{"AiringAttrib":16640,"CatId":1,"EndTime":1438581600,"ProgramId":1214333,"StartTime":1438572600,"Title":"The Karate Kid Part II"}]},{"Channel":{"FullName":"qubo","Name":"qubo","Number":"16.2","SourceId":29837},"ProgramSchedules":[{"AiringAttrib":264,"CatId":3,"EndTime":1438567200,"ProgramId":2096024,"StartTime":1438565400,"Title":"Rescue Heroes"},{"AiringAttrib":256,"CatId":3,"EndTime":1438569000,"ProgramId":3895503,"StartTime":1438567200,"Title":"Timeblazers"},{"AiringAttrib":256,"CatId":3,"EndTime":1438570800,"ProgramId":3895503,"StartTime":1438569000,"Title":"Timeblazers"},{"AiringAttrib":8,"CatId":9,"EndTime":1438572600,"ProgramId":19670876,"StartTime":1438570800,"Title":"Culture Click"},{"AiringAttrib":8,"CatId":9,"EndTime":1438574400,"ProgramId":19670876,"StartTime":1438572600,"Title":"Culture Click"}]},{"Channel":{"FullName":"ION Life","Name":"IONL","Number":"16.3","SourceId":29838},"ProgramSchedules":[{"AiringAttrib":8,"CatId":9,"EndTime":1438567200,"ProgramId":3145623,"StartTime":1438565400,"Title":"Home to Go"},{"AiringAttrib":8,"CatId":9,"EndTime":1438569000,"ProgramId":3145623,"StartTime":1438567200,"Title":"Home to Go"},{"AiringAttrib":8,"CatId":9,"EndTime":1438570800,"ProgramId":3145623,"StartTime":1438569000,"Title":"Home to Go"},{"AiringAttrib":8,"CatId":9,"EndTime":1438572600,"ProgramId":12759,"StartTime":1438570800,"Title":"For Your Home"},{"AiringAttrib":8,"CatId":9,"EndTime":1438574400,"ProgramId":12759,"StartTime":1438572600,"Title":"For Your Home"}]},{"Channel":{"FullName":"ION ShopTV","Name":"SHOP","Number":"16.4","SourceId":38099},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":943115,"StartTime":1438565400,"Title":"Paid Programming"},{"AiringAttrib":8,"CatId":5,"EndTime":1438569000,"ProgramId":943115,"StartTime":1438567200,"Title":"Paid Programming"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":943115,"StartTime":1438569000,"Title":"Paid Programming"},{"AiringAttrib":8,"CatId":5,"EndTime":1438572600,"ProgramId":943115,"StartTime":1438570800,"Title":"Paid Programming"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":943115,"StartTime":1438572600,"Title":"Paid Programming"}]},{"Channel":{"FullName":"ION HSN","Name":"HSN","Number":"16.5","SourceId":46624},"ProgramSchedules":[{"AiringAttrib":0,"CatId":9,"EndTime":1438567200,"ProgramId":27515581,"StartTime":1438563600,"Title":"Chef Ming Tsai\'s Sizzling Summer Cooking Event"},{"AiringAttrib":0,"CatId":9,"EndTime":1438570800,"ProgramId":27515581,"StartTime":1438567200,"Title":"Chef Ming Tsai\'s Sizzling Summer Cooking Event"},{"AiringAttrib":0,"CatId":9,"EndTime":1438574400,"ProgramId":27040144,"StartTime":1438570800,"Title":"Bose Sound Innovations"}]},{"Channel":{"FullName":"WPCW HDTV","Name":"WPCWHD","Number":"19.1","SourceId":20514},"ProgramSchedules":[{"AiringAttrib":32808,"CatId":1,"EndTime":1438567200,"ProgramId":6851802,"StartTime":1438558200,"Title":"Live Free or Die Hard"},{"AiringAttrib":4,"CatId":4,"EndTime":1438569300,"ProgramId":4285359,"StartTime":1438567200,"Title":"The 10 O\'Clock News"},{"AiringAttrib":0,"CatId":2,"EndTime":1438570800,"ProgramId":3204872,"StartTime":1438569300,"Title":"The Nightly Sports Call"},{"AiringAttrib":40,"CatId":5,"EndTime":1438574400,"ProgramId":22820767,"StartTime":1438570800,"Title":"The Good Wife"}]},{"Channel":{"FullName":"WPNT HDTV","Name":"WPNTD","Number":"22.1","SourceId":11768},"ProgramSchedules":[{"AiringAttrib":10,"CatId":5,"EndTime":1438567200,"ProgramId":26332579,"StartTime":1438565400,"Title":"Celebrity Name Game"},{"AiringAttrib":40,"CatId":5,"EndTime":1438569000,"ProgramId":12713004,"StartTime":1438567200,"Title":"Cougar Town"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":26464684,"StartTime":1438569000,"Title":"Whacked Out Sports"},{"AiringAttrib":8,"CatId":2,"EndTime":1438574400,"ProgramId":3610003,"StartTime":1438570800,"Title":"Ring of Honor"}]},{"Channel":{"FullName":"WNPB HDTV","Name":"WNPBHD","Number":"24.1","SourceId":17544},"ProgramSchedules":[{"AiringAttrib":44,"CatId":5,"EndTime":1438570800,"ProgramId":27442618,"StartTime":1438563600,"Title":"Poldark on Masterpiece"},{"AiringAttrib":40,"CatId":10,"EndTime":1438574400,"ProgramId":23404307,"StartTime":1438570800,"Title":"Austin City Limits"}]},{"Channel":{"FullName":"WNPB Create","Name":"WNPB2","Number":"24.2","SourceId":17543},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":25874422,"StartTime":1438563600,"Title":"Sacred Journeys With Bruce Feiler"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":25874433,"StartTime":1438567200,"Title":"Sacred Journeys With Bruce Feiler"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":9354348,"StartTime":1438570800,"Title":"Journey of Faith: On the Trail of Christianity in Turkey"}]},{"Channel":{"FullName":"MPT HDTV","Name":"MPTHD","Number":"36.1","SourceId":14113},"ProgramSchedules":[{"AiringAttrib":44,"CatId":5,"EndTime":1438570800,"ProgramId":27442618,"StartTime":1438563600,"Title":"Poldark on Masterpiece"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":4524849,"StartTime":1438570800,"Title":"New Tricks"}]},{"Channel":{"FullName":"MPT2","Name":"MPT2","Number":"36.2","SourceId":14109},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":2537425,"StartTime":1438565400,"Title":"The Vicar of Dibley"},{"AiringAttrib":8,"CatId":9,"EndTime":1438569000,"ProgramId":21838733,"StartTime":1438567200,"Title":"Expeditions With Patrick McMillan"},{"AiringAttrib":8,"CatId":9,"EndTime":1438570800,"ProgramId":14227132,"StartTime":1438569000,"Title":"Priceless Antiques Roadshow"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574340,"ProgramId":27307884,"StartTime":1438570800,"Title":"POV"}]},{"Channel":{"FullName":"WGPT Vme","Name":"Vme","Number":"36.3","SourceId":14110},"ProgramSchedules":[{"AiringAttrib":0,"CatId":5,"EndTime":1438567200,"ProgramId":27542789,"StartTime":1438563600,"Title":"Los nuevos detectives"},{"AiringAttrib":8,"CatId":1,"EndTime":1438570800,"ProgramId":23009377,"StartTime":1438567200,"Title":"Mi casa está llena de espejos"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":19683430,"StartTime":1438570800,"Title":"Cuéntame cómo pasó"}]},{"Channel":{"FullName":"WPCB HDTV","Name":"WPCBDT","Number":"40.1","SourceId":14370},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":20724264,"StartTime":1438565400,"Title":"Israel: The Prophetic Connection"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":22935782,"StartTime":1438567200,"Title":"Real Life"},{"AiringAttrib":0,"CatId":5,"EndTime":1438572600,"ProgramId":2775750,"StartTime":1438570800,"Title":"International Fellowship of Christians and Jews"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":3988617,"StartTime":1438572600,"Title":"The Way of the Master"}]},{"Channel":{"FullName":"Pittsburgh Faith and Family Channel","Name":"PGHFF","Number":"40.2","SourceId":27212},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":22757210,"StartTime":1438563600,"Title":"Orchard Hill Church"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":24853123,"StartTime":1438567200,"Title":"The Bible Chapel"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":6018652,"StartTime":1438570800,"Title":"Community Church"}]},{"Channel":{"FullName":"Cornerstone","Name":"WPCB","Number":"40.3","SourceId":74686},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":20724264,"StartTime":1438565400,"Title":"Israel: The Prophetic Connection"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":22935782,"StartTime":1438567200,"Title":"Real Life"},{"AiringAttrib":0,"CatId":5,"EndTime":1438572600,"ProgramId":2775750,"StartTime":1438570800,"Title":"International Fellowship of Christians and Jews"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":3988617,"StartTime":1438572600,"Title":"The Way of the Master"}]},{"Channel":{"FullName":"WPGH HDTV","Name":"WPGH-DT","Number":"53.1","SourceId":11907},"ProgramSchedules":[{"AiringAttrib":42,"CatId":5,"EndTime":1438567200,"ProgramId":26774222,"StartTime":1438565400,"Title":"The Last Man on Earth"},{"AiringAttrib":0,"CatId":4,"EndTime":1438570800,"ProgramId":5278307,"StartTime":1438567200,"Title":"Channel 11 News on FOX 53 at 10"},{"AiringAttrib":40,"CatId":5,"EndTime":1438572600,"ProgramId":23782928,"StartTime":1438570800,"Title":"The Big Bang Theory"},{"AiringAttrib":8,"CatId":4,"EndTime":1438574400,"ProgramId":119479,"StartTime":1438572600,"Title":"Jack Van Impe Presents"}]},{"Channel":{"FullName":"WPGH Get TV","Name":"WPGHS","Number":"53.2","SourceId":20675},"ProgramSchedules":[{"AiringAttrib":16392,"CatId":1,"EndTime":1438573200,"ProgramId":59042,"StartTime":1438564500,"Title":"Gidget Goes Hawaiian"}]},{"Channel":{"FullName":"WPGH GritTV","Name":"GRIT","Number":"53.3","SourceId":58335},"ProgramSchedules":[{"AiringAttrib":32776,"CatId":1,"EndTime":1438567200,"ProgramId":3963092,"StartTime":1438560000,"Title":"Once upon a Time in Mexico"},{"AiringAttrib":16392,"CatId":1,"EndTime":1438574400,"ProgramId":5065054,"StartTime":1438567200,"Title":"The Legend of Zorro"}]},{"Channel":{"FullName":"WBGN","Name":"WBGN","Number":"59","SourceId":3116},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":24498997,"StartTime":1438560000,"Title":"Retro Sunday Movie"},{"AiringAttrib":256,"CatId":5,"EndTime":1438570800,"ProgramId":11688,"StartTime":1438567200,"Title":"Bonanza"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":719779,"StartTime":1438570800,"Title":"Movin\' On"}]},{"Channel":{"FullName":"WEPA Cozi TV","Name":"COZI","Number":"59.1","SourceId":65550},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":248414,"StartTime":1438563600,"Title":"Baywatch"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":818467,"StartTime":1438567200,"Title":"Baywatch"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":1043387,"StartTime":1438570800,"Title":"Baywatch"}]},{"Channel":{"FullName":"WEPA Movies!","Name":"MOVIE","Number":"59.2","SourceId":65566},"ProgramSchedules":[{"AiringAttrib":16384,"CatId":1,"EndTime":1438570200,"ProgramId":1203164,"StartTime":1438560000,"Title":"The Delta Force"},{"AiringAttrib":0,"CatId":1,"EndTime":1438578900,"ProgramId":22073535,"StartTime":1438570200,"Title":"Delta Force II: the Colombian Connection"}]},{"Channel":{"FullName":"WEPA Retro Television","Name":"RTV","Number":"59.3","SourceId":65582},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":24498997,"StartTime":1438560000,"Title":"Retro Sunday Movie"},{"AiringAttrib":256,"CatId":5,"EndTime":1438570800,"ProgramId":11688,"StartTime":1438567200,"Title":"Bonanza"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":719779,"StartTime":1438570800,"Title":"Movin\' On"}]},{"Channel":{"FullName":"WOSC HSN","Name":"HSN","Number":"61.1","SourceId":74689},"ProgramSchedules":[{"AiringAttrib":0,"CatId":9,"EndTime":1438567200,"ProgramId":27515581,"StartTime":1438563600,"Title":"Chef Ming Tsai\'s Sizzling Summer Cooking Event"},{"AiringAttrib":0,"CatId":9,"EndTime":1438570800,"ProgramId":27515581,"StartTime":1438567200,"Title":"Chef Ming Tsai\'s Sizzling Summer Cooking Event"},{"AiringAttrib":0,"CatId":9,"EndTime":1438574400,"ProgramId":27040144,"StartTime":1438570800,"Title":"Bose Sound Innovations"}]},{"Channel":{"FullName":"W63AU","Name":"W63AU","Number":"63","SourceId":12162},"ProgramSchedules":[{"AiringAttrib":0,"CatId":9,"EndTime":1438567200,"ProgramId":27617194,"StartTime":1438563600,"Title":"Cozelle Home"},{"AiringAttrib":8,"CatId":9,"EndTime":1438570800,"ProgramId":13071981,"StartTime":1438567200,"Title":"Madi Claire Handbags"},{"AiringAttrib":8,"CatId":9,"EndTime":1438574400,"ProgramId":13071981,"StartTime":1438570800,"Title":"Madi Claire Handbags"}]},{"Channel":{"FullName":"WPDN Daystar","Name":"DSTAR","Number":"65.1","SourceId":74691},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":3458762,"StartTime":1438565400,"Title":"Michael Youssef"},{"AiringAttrib":8,"CatId":5,"EndTime":1438569000,"ProgramId":19712975,"StartTime":1438567200,"Title":"Pastor Rod Parsley"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":23688592,"StartTime":1438569000,"Title":"The Green Room"},{"AiringAttrib":0,"CatId":4,"EndTime":1438572600,"ProgramId":5948747,"StartTime":1438570800,"Title":"The Hal Lindsey Report"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":12488132,"StartTime":1438572600,"Title":"End of the Age With Rev. Irvin Baxter"}]},{"Channel":{"FullName":"WEPA Cozi TV","Name":"WNNB-CD","Number":"66.1","SourceId":65554},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":248414,"StartTime":1438563600,"Title":"Baywatch"},{"AiringAttrib":8,"CatId":5,"EndTime":1438570800,"ProgramId":818467,"StartTime":1438567200,"Title":"Baywatch"},{"AiringAttrib":8,"CatId":5,"EndTime":1438574400,"ProgramId":1043387,"StartTime":1438570800,"Title":"Baywatch"}]},{"Channel":{"FullName":"WEPA Movies!","Name":"WNNB-CD2","Number":"66.2","SourceId":65569},"ProgramSchedules":[{"AiringAttrib":16384,"CatId":1,"EndTime":1438570200,"ProgramId":1203164,"StartTime":1438560000,"Title":"The Delta Force"},{"AiringAttrib":0,"CatId":1,"EndTime":1438578900,"ProgramId":22073535,"StartTime":1438570200,"Title":"Delta Force II: the Colombian Connection"}]},{"Channel":{"FullName":"WEPA Retro Television","Name":"WNNB-CD3","Number":"66.3","SourceId":65585},"ProgramSchedules":[{"AiringAttrib":8,"CatId":5,"EndTime":1438567200,"ProgramId":24498997,"StartTime":1438560000,"Title":"Retro Sunday Movie"},{"AiringAttrib":256,"CatId":5,"EndTime":1438570800,"ProgramId":11688,"StartTime":1438567200,"Title":"Bonanza"},{"AiringAttrib":0,"CatId":5,"EndTime":1438574400,"ProgramId":719779,"StartTime":1438570800,"Title":"Movin\' On"}]}]');
	}

})();




