$(document).ready(function() {
    var contextTargetImage,
        drawContextTargetImage,
        contextPatternImage,
        precision;

    $('#recognize').prop('disabled', true);

    $('#file-target').on('change', function() {
        prepareTargetImage();

        if ($('#file-target').get(0).files.length !== 0 && $('#file-pattern').get(0).files.length !== 0)
            $('#recognize').prop('disabled', false);
    });
    $('#file-pattern').on('change', function() {
        preparePatternImage();
    });

    function prepareTargetImage() {
        setTimeout(function() {
            $('#break1 canvas').remove();
            $('#break3 canvas').remove();

            var targetImage = document.getElementById("target-image");
            contextTargetImage = loadImage(targetImage, '1');
            drawContextTargetImage = loadImage(targetImage, '3');
        }, 100);
    };

    function preparePatternImage() {
        setTimeout(function() {
            $('#break2 canvas').remove();

            var patternImage = document.getElementById("pattern-image");
            contextPatternImage = loadImage(patternImage, '2');

            if ($('#file-target').get(0).files.length !== 0 && $('#file-pattern').get(0).files.length !== 0)
                $('#recognize').prop('disabled', false);
        }, 100);
    };

    if ($('#target-image').attr('src') && $('#pattern-image').attr('src')) {
        $('#recognize').prop('disabled', false);
        preparePatternImage();
        prepareTargetImage();
    }

    $('#recognize').on('click', function() {
        $('#cleaner').prop('disabled', false);

        var targetImage = document.getElementById("target-image"),
            patternImage = document.getElementById("pattern-image");

        $('#break3 canvas').remove();
        $('#progressbar').show();

        drawContextTargetImage = loadImage(targetImage, '3');
        precision = $('#slider').slider("value");
        $('#recognize').prop('disabled', true);
        $('#target-image').hide();

        var count = Reco.countSimilar(drawContextTargetImage, contextTargetImage, targetImage, contextPatternImage, patternImage, $('#cycles'), $('#cycle'), $('#progressbar'), $('#recognize'), precision);
    });

    $('#slider').slider({
        min: 0.5,
        max: 1,
        step: 0.02,
        value: 0.94,
        slide: function(event, ui) {
            $('#slider-input').text('Наближення: ' + ui.value);
        },
        stop: function(event, ui) {
            console.error(ui.value);
            precision = ui.value;
        }
    });

});

function loadImage(image, index) {
    var canvas = document.createElement("canvas");
    document.getElementById('break' + index).appendChild(canvas);

    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    return context;
};

function onFileSelected(event, imageName) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById(imageName);
    imgtag.title = selectedFile.name;

    reader.onload = function(event) {
        imgtag.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
}