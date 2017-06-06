# beatlibrary
Javascript library that allows elements selected by class or id to pulsate at intervals according to a set of numeric values in an external JSON file, with default or custom settings.

## install
Clone the repo

```
git clone https://github.com/tomseinstra/beatlibrary.git
```
or download and link to the script in your head tag
```html
<head>
  <script src='http://example.com/js/beat.js/'/>
</head>
```
## default settings
before using the script it is important to understand the parameters required by the library. A number of these have a default value, however some parameters require a custom parameter.
```javascript
/**
     * Default settings for the module
     * @type {{selector: string, amplitude: number, delay: number, speed: number, interval: number, duration: number, sourceFile: string, col: string}}
     */
var defaultSettings = {
		sourceFile : '', //the path to the json sourcefile to use, the json file must contain numeric data only. NO DEFAULT!
		col: '',  //specify a column name to use from the json file
		selector: '.pulse', //query selector to pulsate, default = '.pulse'
		amplitude: 0.25, //amplitude of the pulsation, default = 0.25
		delay: 0, //delay in milliseconds before the pulsing, default = 0
		speed: 150, //animation speed in milliseconds, default = 150
		interval: 500, //interval between pulses, default = 500 milliseconds
		duration: '' //duration, if left blank it will pulse indefinitely, default='indefinitely'
	}
```

## initialise
initialise the script by creating a new object in javascript and calling the init function
```html
<script type="text/javascript">
var object = new beat();
		object.init('<chose a query selector>', {sourceFile: '<path to json file>.json'});
</script>
```
