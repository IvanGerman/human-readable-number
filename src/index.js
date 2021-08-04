module.exports = function toReadable (number) {
    if ( number === 0) {
      return 'zero';
    };
    let thousand = ['', 'thousand'];
    let zero_till_nine = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let ten_till_nineteen = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    let twenty_till_ninety = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    number = number.toString();
    number = number.replace(/[\, ]/g, '');
    let bitness = number.indexOf('.');
    if (bitness == -1)
        bitness = number.length;
    let stringToArray = number.split('');
    let summedUpString = '';
    let toggle = false;
    for (let i = 0; i < bitness; i++) {
        if ((bitness - i) % 3 == 2) {
            if (stringToArray[i] == '1') {
                summedUpString += ten_till_nineteen[Number(stringToArray[i + 1])] + ' ';
                i++;
                toggle = true;
            } else if (stringToArray[i] != 0) {
                summedUpString += twenty_till_ninety[stringToArray[i] - 2] + ' ';
                toggle = true;
            }
        } else if (stringToArray[i] != 0) {
            summedUpString += zero_till_nine[stringToArray[i]] + ' ';
            if ((bitness - i) % 3 == 0)
                summedUpString += 'hundred ';
            toggle = true;
        }
        if ((bitness - i) % 3 == 1) {
            if (toggle)
                summedUpString += thousand[(bitness - i - 1) / 3] + ' ';
            toggle = false;
        }
    };

    return summedUpString.replace(/\s+/g, ' ').slice(0, -1);
    
};
