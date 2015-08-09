# angular-query-params
-----------

An AngularJS service that wraps $location.search with own, simple methods

[![Codeship Status for ins87/angular-query-params](https://www.codeship.io/projects/188c6a90-20f6-0133-385e-5ae45cb2c8e5/status?branch=master)](https://www.codeship.io/projects/95752)


Installation
------------
You can choose your preferred method of installation:
* Through bower: `bower install angular-query-params --save`
* Through npm: `npm install angular-query-params --save`
* Download from github: [unminified version](https://raw.github.com/ins87/angular-query-params/master/dist/angular-query-params.js) or [minified version](https://raw.github.com/ins87/angular-query-params/master/dist/angular-query-params.min.js)

Usage
-----
Include angular-query-params.js in your application.

```html
<script src="components/angular-query-params/dist/angular-query-params.js"></script>
```

Add the module `angularQueryParams` as a dependency to your module:

```js
angular.module('myApp', ['angularQueryParams']);

// Inject angularQueryParams into your controller (or service, etc..)
angular.module('myApp').controller('MyCtrl', function(queryParams) {
});
```

Add a query parameter to the url
Always set value of a key
```js
queryParams.set('key', 'value'); // => ?key=value
queryParams.set('key', ['value1', 'value2']); // => ?key=value1&key=value2
```

Get a query parameter from the url
Always set value of a key
```js
queryParams.get('key'); // ?key=value => 'value'
queryParams.get('key2'); // ?key=value => undefined
```

Remove a query parameter from the url
```js
queryParams.remove('key', 'value'); // ?key=value&key2=value2 => ?key2=value2 , ?key=value&key=value2 => ?key=value
queryParams.remove('key', ['value1', 'value2']); // ?key=value1&key=value2&key=value3 => ?key=value3
```

Push a query parameter to the url
Add a value to a key
```js
queryParams.push('key', 'value'); // => ?key=value
queryParams.push('key', 'value2'); // ?key=value => ?key=value1&key=value2
```

Is a parameter set at the url (with a value)
```js
queryParams.has('key'); // ?key=value => true
queryParams.has('key2'); // ?key=value => false
queryParams.has('key', 'value'); // ?key=value => true
queryParams.has('key', 'value2'); // ?key=value => false
```


License
-------
Released under the terms of the [MIT License](LICENSE).
