
var Beat = function() {
	/**
     * Default settings for the module
     * @type {{selector: string, amplitude: number, delay: number, speed: number, interval: number, duration: number, sourceFile: string, col: string}}
     */
	var defaultSettings = {
		sourceFile : '',
		col: '',
		selector: '.pulse',
		amplitude: 0.25,
		delay: 0,
		speed: 150,
		interval: 500,
		duration: ''
	}
	//define variables used in functions
	var dataArray = [];

	/**
		
	**/
	var loadData = function(sourceFile, col) {
		/*load data from sourceFile and push to arrays*/
		$.getJSON(sourceFile, function( data ) {
			//if user has chosen average of a number of columns; 
		 	if (col.match(/^avg\(/i)) {
		  		col = col.replace('avg(', '');
		  		col = col.replace(')', '');
		  		col = col.replace(' ', '');
		  		colArray = col.split(',');
		  		$.each(data, function(key,val) {
		  			var avgValue=0;
			  		for (var i = 0; i < colArray.length; i++) {
			  			avgValue += parseInt(val[colArray[i]]);
			  		}
			  		avgValue = avgValue / colArray.length;
			  		dataArray.push(avgValue);
		  		});
		  	}
		  	//else select chosen column
		  	else {
		  		$.each(data, function( key, val ) {
				  	dataArray.push(val[col]);
				});
		  	}
		});
	};

	var pulse = function(element, i, delay, amplitude, speed) {
		var initHeight = parseInt(element.offsetHeight);
		var initWidth = parseInt(element.offsetWidth);
		var calcHeightPlus = initHeight+(amplitude*parseInt(dataArray[i]));
		var calcWidthPlus = initWidth+(amplitude*parseInt(dataArray[i]));
		var calcHeightMinus = calcHeightPlus-(amplitude*parseInt(dataArray[i]));
		var calcWidthMinus = calcWidthPlus-(amplitude*parseInt(dataArray[i]));
		// console.log(initWidth, calcWidth, initHeight, calcHeight);
		//increase width
		$(element).delay(delay).animate({
				height: calcWidthPlus, 
				width: calcWidthPlus
			},
			speed,
			"swing",
			//decrease width
			function(){
				$(element).delay(delay).animate({
					height: initWidth,
					width: initWidth
				},
				speed,
				"swing"
				);
			}
		);
	}


	//merge custom settings (if set) with default settings
	 var mergeObjects  = function(object1, object2) {
	    for (var attrname in object1) {
	        if(object2.hasOwnProperty(attrname)) {
	            object1[attrname] = object2[attrname];
	        }
	    }
	};
	//initialise function with settings
	var init = function(selector, settings) {
		mergeObjects(defaultSettings, settings || {});
		selector = selector || defaultSettings.selector;
		elements = document.querySelectorAll(selector);
		loadData(defaultSettings.sourceFile, defaultSettings.col);
		var i = 0;
		intv = setInterval(function(){
			$(elements).each(function(index, element){
				// console.log(index);
				i++
				if (i > dataArray.length) {
					i=0;
				}
				pulse(element, i, defaultSettings.delay, defaultSettings.amplitude, defaultSettings.speed);
			});	
		},
		defaultSettings.interval);
		if (defaultSettings.duration !== '') {
			setTimeout(function(){
				clearInterval(intv)
			}, defaultSettings.duration);
		}
	}
	//Return the functions that should be accessible from the outside. The rest is only accessible from within the object
    return {
        init: init
    };
};