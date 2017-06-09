var Reco = (function() {

    function imageToGrayArray(data) {
        var fragmant = [],
            i = 0;
        while (i < data.length) {
            //var gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];//rgb to grayscale (optional)
            fragmant.push(Math.trunc(data[i]));
            i += 4;
        }
        return fragmant;
    };

    function isSimilar(arrayPicture, arrayPattern, precision) {
        var kof = correlation(arrayPicture, arrayPattern);
        return kof >= precision && kof <= 1;
    }

    function neuron(count, a, b, m, n, k, l, drawContextTargetImage, pictureContext, Picture, patternContext, Pattern, cycle, cycleCount, cyclesCount, progress, recognize, precision) {
        setTimeout(function() {
            var grayPicture = imageToGrayArray(pictureContext.getImageData(k, l, a, b).data),
                grayPattern = imageToGrayArray(patternContext.getImageData(0, 0, a, b).data);

            if (isSimilar(grayPicture, grayPattern, precision)) {
                count++;
                drawContextTargetImage.beginPath();
                drawContextTargetImage.lineWidth = "1";
                drawContextTargetImage.strokeStyle = "red";
                drawContextTargetImage.rect(k, l, a, b);
                drawContextTargetImage.stroke();
            }
            if (k === m - a && l === n - b) {
                console.info(new Date());
                recognize.prop('disabled', false);
                progress.hide();
            }
            cycle.text(cycleCount);
            var percents = Math.floor(100 * cycleCount / cyclesCount);
            progress.progressbar({
                value: percents
            });
        }, 1);
    };

    return {
        countSimilar: function(drawContextTargetImage, pictureContext, Picture, patternContext, Pattern, cycles, cycle, progress, recognize, precision) {
            var k, l, a, b, m, n, count,
                condition, cycleCount;

            a = Pattern.width;
            b = Pattern.height;
            m = Picture.width;
            n = Picture.height;
            cycles.text('/' + (m - a) * (n - b));

            console.info(new Date());
            console.error(precision);
            cycleCount = 0;
            count = 0;
            for (l = 0; l <= n - b; l++)
                for (k = 0; k <= m - a; k++) {
                    ++cycleCount;
                    neuron(count, a, b, m, n, k, l, drawContextTargetImage, pictureContext, Picture, patternContext, Pattern, cycle, cycleCount, (m - a) * (n - b), progress, recognize, precision);
                }

            return count;
        }
    };
}());
