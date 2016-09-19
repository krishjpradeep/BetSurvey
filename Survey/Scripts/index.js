//initial page load
var $noOfPlayers = 0;
var $betStartTime;
var $betTimeArr = [];
var $betOrder = 1;
$(document).ready(function () {
    hidePanels();
    GetAllBet("");
});

$(document.body).on("click", "#btnStart", function () {
    $betStartTime = new Date(Date.now());
    $("#pnlNoofPlayers").show();
    $("#btnPlayerBet").text('Record ' + $betOrder + ' Bet');
});

$(document.body).on("click", "#btnPlayer1", function () {
    $noOfPlayers = 1;
    $("#pnlRecordBet").show();
});


$(document.body).on("click", "#btnPlayer2", function () {
    $noOfPlayers = 2;
    $("#pnlRecordBet").show();
});


$(document.body).on("click", "#btnPlayer3", function () {
    $noOfPlayers = 3;
    $("#pnlRecordBet").show();
});

$(document.body).on("click", "#btnPlayer4", function () {
    $noOfPlayers = 4;
    $("#pnlRecordBet").show();
});

$(document.body).on("click", "#btnPlayerBet", function () {
    var betDT = new Date(Date.now());
    var obj = {};
    obj.Order = $betOrder;
    obj.BetMadeTime = betDT;
    $betTimeArr.push(obj);
    $betOrder = $betOrder + 1;
    $("#btnPlayerBet").text('Record ' + $betOrder + ' Bet');
    $("#pnlSaveBet").show();
});

//to add ne user
$(document.body).on("click", "#pnlSaveBet", function () {
    var gameDataObj = {};
    gameDataObj.Coordinator = $('#txtCoordinator').val();
    gameDataObj.Id = 0;
    gameDataObj.NumberofPlayers = $noOfPlayers;
    gameDataObj.TableId = $('#txtTableId').val();
   
  
    //gameDataObj.StartingTime = $betStartTime;
    
    var vmObj = {};
    vmObj.GameDTMod = JSON.stringify(gameDataObj);
    vmObj.TimeList = JSON.stringify($betTimeArr);

    if (validate()) {
        //if connectivity is there push data to server 

        //$.ajax({
        //    type: "POST",
        //    url: '/Home/Index',
        //    data: { "dtModel": vmObj },
        //    dataType: 'json',
        //    success: function (result) {
        //        alert('success');
        //    },
        //    error: function (result) {
        //        console.log("error:" + JSON.stringify(result));
        //    }
        //});

        //else push data to local db
            
        var data = gameDataObj;
        console.log(data);
        clear();
        DataBaseManager.AddNewBet(data, GetAllBet);
        //DataBaseManager.GetAllBet(GetAllBet)
        hidePanels()
    }
    else {
        alert("Please enter all the values");
    }
});

//clear button call
$(document.body).on("click", "#btnClear", function () {
    clear();
});

//function to get all the users
function GetAllBet(data) {
    DataBaseManager.GetAllBet(listAllBet);
}

//function to list all the users to table
function listAllBet(data) {
    debugger;
    $('#BetTbl tbody tr').remove();
    for (var i = 0; i < data.length; i++) {
        var tr = "<tr>";
        tr = tr + "<td>" + data[i].TableId + "</td>";
        tr = tr + "<td>" + data[i].Coordinator + "</td>";
        tr = tr + "<td>" + data[i].NumberofPlayers + "</td>";
        tr = tr + "<td>" + data[i].StartingTime + "</td>";
        tr = tr + "</tr>";
        $('#BetTbl tbody').append(tr);
    }
}


//validate all the text boxes
function validate() {
    if ($('#txtTableId').val().trim().length == 0 || $('#txtCoordinator').val().trim().length == 0 || $noOfPlayers == 0 || $betStartTime == null || $betStartTime == undefined) {
        return false;
    } else {
        return true;
    }
}

//claer all the fields
function clear() {
    $('#txtTableId').val("");
    $('#txtCoordinator').val("");
    $noOfPlayers = 0;
    $betStartTime = null;
}

function hidePanels() {
    $noOfPlayers = 0;
    $betStartTime = null;
    $('#btnUpdateUser').hide();
    $("#pnlNoofPlayers").hide();
    $("#pnlRecordBet").hide();
    $("#pnlSaveBet").hide();
}
