function summ(array) {
    var i, s;
    s = 0;
    for (i = 0; i < array.length; i++)
        s += array[i];
    return s;
};

function avg(array) {
    return summ(array) / array.length;
};

function alt(array) {
    var b = [],
        i, average;

    average = avg(array);
    for (i = 0; i < array.length; i++)
        b.push(array[i] - average);
    return b;
};

function multArray(aArray, bArray) {
    var cArray = [],
        i;

    for (i = 0; i < aArray.length; i++)
        cArray.push(aArray[i] * bArray[i]);
    return cArray;
};

function correlation(xArray, yArray) {
    var altx, alty, i, k;
    altx = alt(xArray);
    alty = alt(yArray);

    if ((summ(multArray(altx, altx)) === 0 && summ(multArray(alty, alty)) === 0) || summ(multArray(altx, alty)) === 0)
        return 1;
    return summ(multArray(altx, alty)) / Math.sqrt(summ(multArray(altx, altx)) * summ(multArray(alty, alty)));
};

function oneToOne(xArray, yArray) {
    for (var i = 0; i < xArray.length; i++)
        if (xArray[i] !== yArray[i])
            return false;
    return true;
};
