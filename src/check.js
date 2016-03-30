'use strict';

function getMessage(a,b) {
  if (typeof a == 'boolean') {
    if (a > 0) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  } else if (typeof a == 'number') {
    var givenDistance = 100;
    var totalDistance = a * givenDistance;
    return 'Я прыгнул на ' + totalDistance + ' сантиметров';

  } else if ((Array.isArray(a)) && (Array.isArray(b))) {
    var arrayLength = 0;

    for (var i = 0; i < a.length; i++) {
      arrayLength += a[i] * b[i];
    }

    return 'Я прошёл ' + arrayLength + ' метров';

  } else if (Array.isArray(a)) {
    var arraySum = 0;

    for (var i = 0; i < a.length; i++) {
      arraySum += a[i];
    }

    return 'Я прошёл ' + arraySum + ' шагов';
  }
}
