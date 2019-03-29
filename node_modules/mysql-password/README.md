node-mysql-password
====================

Returns the same value that would be returned from MySQL's password() function.

examples
========

````javascript
var mysqlPassword = require('mysql-password');

var passhash = mysqlPassword("secret");
console.log(passhash);
````

output:

````
*14E65567ABDB5135D0CFD9A70B3032C179A49EE7
````

warnings
========

This is **NOT** for hashing passwords! The MySQL password() function is not considered secure by any means!

This is meant to be used when you need the MySQL password() output to interface with another application that someone else has written insecurely.

license
========

node-mysql-password is covered under The Unlicense. See LICENSE for more information.