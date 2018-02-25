

var starWarCharacters = [{
    name: "han",
    healthPoints: 120,
    attackPoints: 8,
    counterAttackPoints: 10,
    img: "./assets/images/han.jpg"
},
{
    name: "rey",
    healthPoints: 180,
    attackPoints: 5,
    counterAttackPoints: 15,
    img: "./assets/images/rey.jpg"
},
{
    name: "mace",
    healthPoints: 150,
    attackPoints: 9,
    counterAttackPoints: 15,
    img: "./assets/images/mace.jpg"
},
{
    name: "leia",
    healthPoints: 200,
    attackPoints: 5,
    counterAttackPoints: 6,
    img: "./assets/images/leia.jpg"
}];



var game = {
    player: {},
    defender: {},
    enemies: {},
    status: "",
    playerAttackingPower: 0,


    attack: function () {
        this.power()
        this.defender[0].healthPoints = this.defender[0].healthPoints - this.playerAttackingPower;
        this.player[0].healthPoints = this.player[0].healthPoints - this.defender[0].counterAttackPoints;
        if (this.player[0].healthPoints <= 0 && this.defender[0].healthPoints > 0) {
            this.status = "lost";
        }
        else if (this.defender[0].healthPoints <= 0) {
            this.status = "won";

        }
        else {
            this.status = "continue";

        }

    },

    power: function () {
        this.playerAttackingPower = this.player[0].attackPoints + this.playerAttackingPower;
    },

    reStart: function () {
        this.player = {};
        this.defender = {};
        this.status = "";
        this.playerAttackingPower = 0;
    }
}


$(document).ready(function () {
    startGame()

    function startGame() {
        $(".btn-danger").hide();
        $("#allCharacters").empty();
        $("#player").empty();
        $("#enemies").empty();
        $("#yourCharacter").empty();
        $("#defender").empty();
        $("#result").empty();
        game.reStart();
        addCharacters(starWarCharacters, "#allCharacters");
    }

    function addCharacters(list, holder) {
        $(holder).empty();
        $.each(list, function (idx, obj) {

            var div_col = $("<div>");
            div_col.addClass("col-md-3");

            var h3Tag = $("<h3>");

            h3Tag.addClass("text-center");
            h3Tag.attr("id", obj.name);
            h3Tag.html(obj.healthPoints);

            var divCard = $("<div>");
            divCard.addClass("card");

            var divCardHeader = $("<div>");
            divCardHeader.addClass("card-header text-center");
            divCardHeader.html(toTitleCase(obj.name));

            var divCardBody = $("<div>");
            divCardBody.addClass("card-body");

            var imgSrc = obj.img;
            var imgTag = $("<img>");
            imgTag.addClass("card-img-top");
            imgTag.attr("src", imgSrc);
            imgTag.attr("alt", obj.name);
            


            var btnTag = $("<button>");
            btnTag.addClass("btn");
            btnTag.attr("value", obj.name);



            $(btnTag).append(imgTag);

            $(divCardBody).append(btnTag);
            $(divCardBody).append(h3Tag);

            $(divCard).append(divCardHeader);
            $(divCard).append(divCardBody);
            $(div_col).append(divCard);
            $(holder).append(div_col);


        });
    }

    $("body").on("click", "#allCharacters .btn", function () {

        var character = $(this).val();



        var tempPlayer = $.grep(starWarCharacters, function (obj, i) {

            return (obj.name === character);
        });

        game.player = JSON.parse(JSON.stringify(tempPlayer));



        var tempEnemies = $.grep(starWarCharacters, function (obj, i) {

            return (obj.name !== character);
        });

        game.enemies = JSON.parse(JSON.stringify(tempEnemies));

        // save attackpoints to be used in power
        //game.playerAttackingPower = game.player[0].attackPoints;


        addCharacters(game.player, "#yourCharacter");

        addCharacters(game.enemies, "#enemies");

        $("#allCharacters").empty();
    });

    $("body").on("click", "#enemies .btn", function () {

        var character = $(this).val();


        var tempDefender = $.grep(starWarCharacters, function (obj, i) {

            return (obj.name === character);
        });


        game.defender = JSON.parse(JSON.stringify(tempDefender));
        var tempEnemies = $.grep(game.enemies, function (obj, i) {

            return (obj.name !== character && obj.name !== game.player[0].name);
        });

        game.enemies = JSON.parse(JSON.stringify(tempEnemies));

        addCharacters(game.defender, "#defender");

        addCharacters(game.enemies, "#enemies");
        $(".btn-danger").show();

    });

    // attack
    $(".btn-danger").on("click", function () {


        game.attack();
        updateGame();
        displayResult();




    });

    // restart
    $("#restart").on("click", function () {

        startGame();
    });

    function updateGame() {
        if (game.status === "won") {
            $("#defender").empty();
            var index = game.enemies.map(function (e) { return e.name; }).indexOf(game.defender[0].name);
            if (index >= 0) {
                game.enemies.splice(index, 1);
            }
        }
    }

    function displayResult() {
        $("#" + game.player[0].name).html(game.player[0].healthPoints);

        $("#" + game.defender[0].name).html(game.defender[0].healthPoints);

        $("#result").html("");
        if (game.enemies.length === 0 && game.status === "won") {
            $("#result").html("You won!!! game over!!");
            $(".btn-danger").hide();
            return
        }

        switch (game.status) {

            case "continue":
                //game.power();
                $("#result").html("you attacked " + game.defender[0].name + " for " + game.playerAttackingPower + " damage. "
                    + game.defender[0].name + " attacked you for " + game.defender[0].counterAttackPoints);

                    $(".btn-danger").show();
                break;

            case "won":
                $("#result").html("you have defeated " + game.defender[0].name + " you can choose to fight another enemy")
                $(".btn-danger").hide();
                break; r
            case "lost":
                $("#result").html("You have been defeated and game is over");
                $(".btn-danger").hide();
                break;
        }
    }

    //utilities
    function toTitleCase(str) {
        return str.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }

});