'use strict';

function getMessage(a,b) {
  if (typeof a == 'boolean') {
    if (a > 0) {
      alert('Я попал в ' + b);
    } else {
      alert('Я никуда не попал');
    }
  } else if (typeof a == 'number') {
    var givenDistance = 100;
    var totalDistance = a * givenDistance;
    alert('Я прыгнул на ' + totalDistance + ' сантиметров');

  } else if (typeof (a,b) == 'object') {
     var arrayLength = 0;

    for (var i = 0, j=0; (i < a.length)&&(j < b.length); i++, j++){
      arrayLength += a[i] * b[j];
    }

     alert('Я прошёл ' + arrayLength + ' метров');

  } else if (typeof a == 'object') {
    var arraySum = 0;

    for (var i = 0; i < a.length; i++) {
      arraySum += a[i];
    }

    alert('Я прошёл ' + arraySum + ' шагов');

  }
}
