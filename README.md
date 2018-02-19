# auid
Acceptably Unique Identifier

Create unique IDs for storage or identification purposes:

```
import auid from 'auid';
// or: const auid = require('auid');
const key = auid();
```

Version 2: optimised length due to base62 instead of hex encoding.

License: MIT
