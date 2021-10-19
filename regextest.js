const text = "from:(valami@) subject:(hello) hellobello"
let re = /((\w+:\(.+?\))|(\w+))/g
// let re = new RegExp('((\w+:\(.+?\))|(\w+))')
console.log(text.match(re))
