# 安装

----

## 使用 npm 安装

推荐使用`npm`的方式进行安装，享受node生态圈和webpack工具链带来的便利。

```bash
npm install we-plugins --save
```

通过`npm`安装的模块包，我们可以轻松的使用import或者require的方式引用。

```javascript
import { hasClass } from 'we-plugins'
import { Dom, URL, Tool } from 'we-plugins/libraries/util'

import { hasClass } from 'we-plugins/libraries/util/dom'
```


## 使用script标签引入

```
<!-- 生产版本：已压缩混淆 -->
<script src="https://raw.githubusercontent.com/569835014/plugins/master/lib/we-plugins.min.js"></script>

<!-- 开发版本：未压缩 -->
<script src="https://raw.githubusercontent.com/569835014/plugins/master/lib/we-plugins.js"></script>
```

