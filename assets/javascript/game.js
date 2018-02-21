

var starWarCharacters = [{
    name: "han",
    healthPoints: 120,
    attackPoints: 8,
    counterAttackPoints: 10,
    img: "./assets/images/1.png"
},
{
    name: "rey",
    healthPoints: 180,
    attackPoints: 5,
    counterAttackPoints: 15,
    img: "./assets/images/2.png"
},
{
    name: "mace",
    healthPoints: 150,
    attackPoints: 9,
    counterAttackPoints: 15,
    img: "./assets/images/3.png"
},
{
    name: "leia",
    healthPoints: 200,
    attackPoints: 5,
    counterAttackPoints: 6,
    img: "./assets/images/4.png"
}]

var game = {
    player: undefined,
    defender: undefined,
    enemies: undefined,
    won: false,
    lost: false,


    attack: function () {
        this.defender[0].healthPoints -= this.player[0].attackPoints;
        this.player[0].healthPoints -= this.defender[0].counterAttackPoints;
        if (this.player[0].healthPoints <= 0 && this.defender[0].healthPoints > 0) {
            this.lost = true;
        }
        else if (this.defender[0].healthPoints <= 0) {
            this.won = true;
           
        }
        else
        {
            this.power();
        }

    },

    power: function () {
        this.player[0].attackPoints += this.player[0].attackPoints;
    }






}




$(document).ready(function () {
    $(".btn-danger").hide();
    addCharacters(starWarCharacters, "#allCharacters");

    function addCharacters(list, holder) {
        $(holder).empty();
        $.each(list, function (idx, obj) {

            var div_col = $("<div>");
            div_col.addClass("col-lg-3");

            var h3Tag = $("<h3>");
            
            h3Tag.addClass("text-center");
            h3Tag.html(obj.healthPoints);

            var divCard = $("<div>");
            divCard.addClass("card");

            var divCardHeader = $("<div>");
            divCardHeader.addClass("card-header text-center");
            divCardHeader.html(obj.name);

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

        game.player = $.grep(starWarCharacters, function (obj, i) {

            return (obj.name === character);
        });




        game.enemies = $.grep(starWarCharacters, function (obj, i) {

            return (obj.name !== character);
        });

        addCharacters(game.player, "#yourCharacter");

        addCharacters(game.enemies, "#enemies");

        $("#allCharacters").empty();
    });

    $("body").on("click", "#enemies .btn", function () {

        var character = $(this).val();

        game.defender = $.grep(starWarCharacters, function (obj, i) {

            return (obj.name === character);
        });



        game.enemies = $.grep(starWarCharacters, function (obj, i) {

            return (obj.name !== character && obj.name !== game.player[0].name);
        });

        addCharacters(game.defender, "#defender");

        addCharacters(game.enemies, "#enemies");
        $(".btn-danger").show();

    });

    // attack
    $(".btn-danger").on("click", function () {


        game.attack();
        displayResult();


    });

    function updateGame()
    {
        if(game.won)
        {
            $("#defender").empty();
        }
    }

    function displayResult(){

        $("#result").html("you attacked " + game.defender[0].name + " for " + game.player[0].attackPoints + " damage. "
    + game.defender[0].name + " attacked you for " + game.defender[0].counterAttackPoints);
    }

});