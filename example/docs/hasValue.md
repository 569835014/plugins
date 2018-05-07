# hasValue

---

## 作用

判断变量是否有值。
- 空字符串、null、undefined视作无值
- 全部都是空格或者诸如tab的话作为无值看待
- 0视为有值

返回值为`true`或`false`。


## 使用示例

```javascript
console.log(hasValue(123)) // true
console.log(hasValue(0)) // true
console.log(hasValue('')) // false
console.log(hasValue({})) // true
console.log(hasValue('       ')) // false
```
