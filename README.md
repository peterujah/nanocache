# nanocache
Javascript cache using localStorage 


Initialize nanocache Instance with a database name

 ```js
  var nql = nanoCache("Profile");
 ```
       
 
 Add record to `Users` table

```js
  nql.add("foo", "Photo Of Foo").to("Users", function(i, c){
    console.log("Added", i);
    console.log("Data", c);
  });
 ```
       
 You can also save json object to `Users` table

```js
  nql.add("bar", {name: "Peter", id: "6288VBJH"}).to("Users", function(i, c){
    console.log("Added", i);
    console.log("Data", c);
  });
 ```
       
 Add another user data to `Users` table and add all users to `Peoples` table

```js
  nql.add("john", {name: "John", id: "73837HJ"}).to("Users", function(i, c){
    console.log("Added", i);
    console.log("Data", c);
      nql.add("list", c).to("Peoples", function(i, c){
          console.log("Added", i);
          console.log("Peoples", c);
      });
  });
 ```
       
Find key `foo` in `Users` table

```js
  nql.find("foo").in("Users", function(i){
      console.log("Data", i);
  });
 ```
       
 Find key `list` in `Peoples` table

```js
  nql.find("list").in("Peoples", function(i){
      console.log("Data", i);
  });
 ```
       
 Delete key `key` from `Users` table    

```js
  nql.delete("foo").in("Users", function(status, caches){
      console.log("Status", status);
      console.log("Caches", caches);
  });
```

 Clear all records in table `Users`    
 
```js
  nql.clear("Users", function(status, caches){
      console.log("Status", status);
      console.log("Caches", caches);
  });
```
