# angular-query-param
-----------

An AngularJS service that wraps $location.search with own, simple methods

[![Codeship Status for ins87/angular-query-param](https://www.codeship.io/projects/188c6a90-20f6-0133-385e-5ae45cb2c8e5/status?branch=master)](https://www.codeship.io/projects/95752)


Installation
------------
You can choose your preferred method of installation:
* Through bower: `bower install angular-query-param --save`
* Through npm: `npm install angular-query-param --save`
* Download from github: [unminified version](https://raw.github.com/ins87/angular-query-param/master/dist/angular-query-param.js) or [minified version](https://raw.github.com/ins87/angular-query-param/master/dist/angular-query-param.min.js)

Usage
-----
Include angular-query-param.js in your application.

```html
<script src="components/angular-query-param/dist/angular-query-param.js"></script>
```

Add the module `angularQueryParam` as a dependency to your module:

```js
angular.module('myApp', ['angularQueryParam']);

// Inject angularQueryParam into your controller (or service, etc..)
angular.module('myApp').controller('MyCtrl', function(angularQueryParam) {
});
```

Add a query parameter to the url
Always set value of a key
```js
angularQueryParam.set('key', 'value'); // => ?key=value
angularQueryParam.set('key', ['value1', 'value2']); // => ?key=value1,value2
```

Get a query parameter from the url
Always set value of a key
```js
angularQueryParam.get('key'); // ?key=value => 'value'
angularQueryParam.set('key2'); // ?key=value => undefined
```

Remove a query parameter from the url
```js
angularQueryParam.remove('key', 'value'); // ?key=value&key2=value2 => //?key2=value2, ?key=value,value2 => ?key=value
angularQueryParam.remove('key', ['value1', 'value2']); // ?key=value1,value2,value3 => ?key=value3
```

Push a query parameter to the url
Add a value to a key
```js
angularQueryParam.push('key', 'value'); // => ?key=value
angularQueryParam.push('key', 'value2'); // => ?key=value1,value2
```

Is a parameter set at the url (with a value)
```js
angularQueryParam.has('key'); // ?key=value => true
angularQueryParam.has('key2'); // ?key=value => false
angularQueryParam.has('key', 'value'); // ?key=value => true
angularQueryParam.has('key', 'value2'); // ?key=value => false
```


License
-------
Released under the terms of the [MIT License](LICENSE).
