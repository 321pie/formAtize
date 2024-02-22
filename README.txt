Download:
npm install http-server


Command:
npx http-server -p 8000

Developer Notes:
https://stackoverflow.com/questions/16815942/how-to-make-a-local-offline-database
https://github.com/klawson88/Baked-Goods#about

bakedGoods.set({
    data: [{key: "key1", value: "val1"}, {key: "key2", value: "val2"}],
    storageTypes: ["indexedDB", "webSQL"],

    //Will be polyfilled with defaults for equivalent database structures
    optionsObj: {conductDisjointly: false},

    complete: function(byStorageTypeStoredKeysObj, byStorageTypeErrorObj){}
});