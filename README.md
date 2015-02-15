This is an Test Connector for Yjs. It works on nodejs and in the browser.

This connector simulates a randomly long propagation delay. It is nice for testing Yjs.

## Use it!
Retrieve this with bower or npm.

##### NPM
```
npm install y-test --save
```
and put it on the `Y` object.

```
Y.Test = require("y-test");
```

##### Bower
```
bower install y-test --save
```

### Create the connection object
```
var conn = new Y.Test(unique_id);
```

## License
Yjs is licensed under the [MIT License](./LICENSE.txt).

<kevin.jahns@rwth-aachen.de>