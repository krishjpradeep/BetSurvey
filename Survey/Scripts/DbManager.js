if (navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.indexOf("Chrome") < 0) {
    var DataBaseManager = {
        Offlinedb: openDatabase(OfflineConfiguration.DB_NAME, '', 'my first database', 2 * 1024 * 1024),
        initializeDataBase: function () {
            var self = this;
            self.Offlinedb.transaction(function (tx) {
                console.log("initializeDataBase called");
                tx.executeSql('CREATE TABLE IF NOT EXISTS GameData (Id INTEGER PRIMARY KEY AUTOINCREMENT, TableId, Coordinator, NumberofPlayers,StartingTime)');
                console.log("initializeDataBase finished");
            });
        },
        AddNewBet: function (data, callback) {
            this.initializeDataBase();
            var self = this;
            self.Offlinedb.transaction(function (tx) {
                var query = "insert into GameData(Id,TableId,Coordinator,NumberofPlayers,StartingTime) values(?,?,?,?,?)";
                tx.executeSql(query, [data.Name, data.Email, data.Technology], function (tx, results) {
                    if (callback) callback("Bet Saved");
                });
            });
        },
        GetAllBet: function (callback) {
            try {
                var self = this;
                this.initializeDataBase();
                var query1 = "SELECT * from GameData";
                self.Offlinedb.transaction(function (tx) {
                    tx.executeSql(query1, [], function (tx, results) {
                        //alert(results);
                        if (results.rows.length > 0) {
                            var data=[];
                            for (var i = 0; i < results.rows.length; i++) {
                                data.push(results.rows.item(i));
                            }
                            if (callback) callback(data);
                        } 
                    });

                });

            }
            catch (e) {
                console.log(" error occured in selecting data");
            }

        }
    } //Db manager end

} else {
    var DataBaseManager = {
        AddNewBet: function (data, callback) {
            db.open({
                server: OfflineConfiguration.DB_NAME,
                version: OfflineConfiguration.Db_VERSION,
                schema: OfflineConfiguration.SCHEMA

            }).done(function (s) {
                self.Server = s;
                self.Server.GameData.add(data).done(function (results) {
                    if (callback) callback("Data added");
                });
            });
        },
        GetAllBet: function (callback) {
            db.open({
                server: OfflineConfiguration.DB_NAME,
                version: OfflineConfiguration.Db_VERSION,
                schema: OfflineConfiguration.SCHEMA

            }).done(function (s) {
                self.Server = s
                self.Server.GameData
                       .query()
                        .all()
                        .execute()
                        .done(function (finalResult) {
                            if (callback) callback(finalResult);
                        });
            });

        }
    } // DB manage end

}  //Else block end