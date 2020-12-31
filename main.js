$("#btn_submit").click(function(){
    generateChar();
});

$('#txt_name').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        generateChar();
    }
});
     
function generateChar(){
    $(".v_name").text("");
    let input = $('#txt_name').val();
    if(input === "" || input === null || !(isNaN(input))){
        $(".v_name").css("color", "red");
        $(".v_name").text("Please enter your name");
        
        return false;
    }else{
        $("#txt_name").val("");
        var charNumber = null;
        let inputArr = Array.from(input.toLowerCase());
        for(var x = 0; x < inputArr.length; x++){
            charNumber += inputArr[x].charCodeAt(0) - 97;
        }

        if(charNumber > 671){
            charNumber = 671;
        }

        $("#img_container, #name_status, #location, #first_seen").text("");

        $.get(`https://rickandmortyapi.com/api/character/${charNumber}`, function(result){
            getResult(result);
        });
    }
}

function getResult(result){
    $('#img_container').append("<img src=" + result.image + ">");
    $('#name_status').append(`<h3 class="char_name char_header">${result.name}</h3>`);
    $('#name_status').append(`<span class="char_status char_header"><span class="dot"></span><span id="status">${result.status}</span> - ${result.species}</span><br/>`);

    if(result.status === 'unknown'){
        $('.dot').css('background-color', '#999');
    }else if(result.status === 'Alive'){
        $('.dot').css('background-color', 'lightgreen');
    }
    else if(result.status === 'Dead'){
        $('.dot').css('background-color', 'red');
    }


    $("#location").append(`<span class="text-grey section-header">Last Known Location:<br /></span> <span class="section-body">${result.location.name}</span>`);

    $.get(result.episode[0], function(episodeResult){
        $("#first_seen").append(`<span class="text-grey section-header">First Seen In:</span><br /> <span class="section-body">${episodeResult.episode} - ${episodeResult.name}</span>`);
    });

}

