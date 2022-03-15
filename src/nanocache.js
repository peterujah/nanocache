'use strict';
var nanoCache;
nanoCache = function (db) {
    var nano = {};

    nano.addItem = function (table, key, val, limit, callback){
        var caches = [], addVal = [];
        var exist = false;
        var cache = localStorage.getItem(db + ":" + table);
        limit = limit || 0;
        if (cache !== null) {
            caches = JSON.parse(cache);
            if(caches != null){
                if(limit != 0 && caches.length >= limit){
                    caches.delete(caches[0]);
                }
                for(var i=0; i < caches.length; i++){
                   if(typeof( caches[i] ) != "undefined" && caches[i] == val){
                    exist = true;
                        break;
                    }else if(typeof( caches[i][0] ) != "undefined" && (caches[i][0] == val || typeof( val[0] ) != "undefined" && caches[i][0] == val[0])){
                        exist = true;
                        break;
                    }
                }
            }else{
                caches = [];
            }
        }

        if(!exist){
            addVal = (key != null) ? [key, val] : val;
            caches.push(addVal);
            localStorage.setItem(db + ":" + table, JSON.stringify(caches));
        }
        if (typeof callback == 'function'){
            callback(addVal, caches);
        }else{
            return caches;
        }
    };

    nano.add = function(key, value){
        return {
            to: function(table, callback){
                return nano.addItem(table, key, value, 0, callback);
            },
            toLimit: function(table, limit, callback){
                return nano.addItem(table, key, value, limit, callback);
            }
        }
    };


    nano.getItem = function (key, table, callback){
        var caches = [];
        var data = null;
        var db_data = localStorage.getItem(db + ":" + table);

        if (db_data !== null) {
            caches = JSON.parse(db_data);
            if(caches != null){
                for(var i=0; i < caches.length; i++){
                   if(typeof( caches[i] ) != "undefined" && caches[i] == key){
                        data = caches[i];
                        break;
                    }else if(typeof( caches[i][0] ) != "undefined" && (caches[i][0] == key || typeof( key[0] ) != "undefined" && caches[i][0] == key[0])){
                        data = caches[i][1];
                        break;
                    }
                }
            }
        }

        if (typeof callback == 'function'){
            callback(data);
        }else{
            return data;
        }
    };

    nano.find = function(key){
        return {
            in: function(table, callback){
                return nano.getItem(key, table, callback);
            }
        }
    };

    nano.get = function(table, callback){
        var db_data = localStorage.getItem(db + ":" + table);
        var data = [];
        if(db_data != null){
            data = JSON.parse(db_data);
        }
        if (typeof callback == 'function'){
            callback(data);
        }else{
            return data;
        }
    };

    nano.deleteItem = function(key, table, callback){
        var caches = [];
        var db_data = localStorage.getItem(db + ":" + table);
        var deleted = false;
        if (db_data !== null) {
            caches = JSON.parse(db_data);
           if(caches != null){
               for(var i=0; i < caches.length; i++){
                    if((typeof( caches[i][0] ) != "undefined" && caches[i][0] == key) || (typeof( caches[i] ) != "undefined" && caches[i] == key)){
                        deleted = true;
                        caches.remove(i);
                        break;
                    }
               }
               localStorage.setItem(db + ":" + table, JSON.stringify(caches));
           }
        }

        if(typeof callback == 'function'){
            callback(deleted, caches);
        }else{
            return deleted;
        }
    };

    nano.delete = function(key){
        return {
            in: function(table, callback){
                return nano.deleteItem(key, table, callback);
            }
        }
    };


    nano.clear = function(table, callback){
        localStorage.removeItem(db + ":" + table);
        if (typeof callback == 'function'){
            callback(true, []);
        }else{
            return true;
        }
    };

    /*
    Delete array by key
    */
    Array.prototype.delete = function() {
        var what;
        var a = arguments;
        var L = a.length;
        var ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this.push.apply(this);
    };

    Array.prototype.remove = function(from, to) {
        var rest = this.slice(parseInt(to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    Array.prototype.clear = function() {
        while (this.length) {
            this.pop();
        }
    };

    return nano;
};

module.exports = nanoCache;
