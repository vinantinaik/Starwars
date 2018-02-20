

var starWarCharacters=[{name:"han",
                        healthPoints:120,
                        attackPoints:8,
                        counterAttackPoints:10,
                        img:"./assets/images/1.png"},
                        {name:"rey",
                        healthPoints:180,
                        attackPoints:5,
                        counterAttackPoints:15,
                        img:"./assets/images/2.png"},
                        {name:"mace",
                        healthPoints:150,
                        attackPoints:9,
                        counterAttackPoints:15,
                        img:"./assets/images/3.png"},
                        {name:"leia",
                        healthPoints:200,
                        attackPoints:5,
                        counterAttackPoints:6,
                        img:"./assets/images/4.png"}]



var player=[];
var defender=[];
var enemies=[];

$(document).ready(function () {

    addCharacters(starWarCharacters,"#allCharacters");
    
    function addCharacters(list,holder)
    {
        $(holder).empty();
        $.each(list,function(idx,obj){
         var imgSrc = obj.img;
         var imgTag = $("<img>");
         imgTag.attr("src",imgSrc);
         imgTag.attr("alt",obj.name);

         var btnTag = $("<button>");
         btnTag.addClass("btn");
         btnTag.attr("value",obj.name);
         var div_col = $("<div>");
        
         div_col.addClass("col-lg-3");
         btnTag.append(imgTag);
         div_col.append(btnTag);

         $(holder).append(div_col);


        });
    }

    $("body").on("click","#allCharacters .btn",function(){

        var character =$(this).val();
        
        player= $.grep(starWarCharacters,function(obj,i){

            return(obj.name === character);
        });

        enemies=$.grep(starWarCharacters,function(obj,i){

            return (obj.name !== character);
        });

        addCharacters(player,"#yourCharacter");

        addCharacters(enemies,"#enemies");

        $("#allCharacters").empty();
    })

    $("body").on("click","#enemies .btn",function(){

        var character =$(this).val();
        
        defender= $.grep(starWarCharacters,function(obj,i){

            return(obj.name === character);
        });

        enemies=$.grep(starWarCharacters,function(obj,i){

            return (obj.name !== character && obj.name !==player[0].name);
        });

        addCharacters(defender,"#defender");

        addCharacters(enemies,"#enemies");

       // $("#allCharacters").empty();
    })
    
});