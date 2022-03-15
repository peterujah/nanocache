# nanocache
Javascript cache using localStorage 


 ```js
  var sql = nanoCache("Profile");
 ```
       
       
```js
  sql.add("foo", "Photo Of Foo").to("Users", function(i, c){
    console.log("Added", i);
    console.log("Data", c);
  });
 ```
       
       
```js
  sql.add("bar", {name: "Peter", id: "6288VBJH"}).to("Users", function(i, c){
    console.log("Added", i);
    console.log("Data", c);
  });
 ```
       
       
```js
  sql.add("john", {name: "John", id: "73837HJ"}).to("Users", function(i, c){
    console.log("Added", i);
    console.log("Data", c);
      sql.add("list", c).to("Peoples", function(i, c){
          console.log("Added", i);
          console.log("Peoples", c);
      });
  });
 ```
       
       
```js
  sql.find("foo").in("Users", function(i){
      console.log("Data", i);
  });
 ```
       
       
```js
  sql.find("list").in("Peoples", function(i){
      console.log("Data", i);
  });
 ```
       
       
```js
  sql.delete("foo").in("Users", function(status, caches){
      console.log("Status", status);
      console.log("Caches", caches);
  });
```
