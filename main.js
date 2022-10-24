function rep(n, count) {
    let arr = [],
        checkRec = (i) => {
            if (i > 1) {
                checkRec(i - 1);
            }

            arr.push(n);
        };
    checkRec(count);
    return arr;
}

function add(m, n) {
    let len = m.length, buff = '', count = 0, i;
    for (i = 0; i < len; i++) {
        if (m[i] == n[i])
            buff += m[i];
        else if (m[i] != n[i]) {
            count += 1;
            buff += '-';
        }
    }

    if (count > 1)
        return "";


    return buff;
}

function decimalToBinary(variableCount, minterms) {
    let binaryMinterms = [];
    for (let i = 0; i < minterms.length; i++) {
        let binary = minterms[i].toString(2);
        let binaryLength = binary.length;
        let temp = [];
        for (let j = 0; j < variableCount - binaryLength; j++) {
            temp.push(0);
        }
        for (let j = 0; j < binaryLength; j++) {
            temp.push(parseInt(binary[j]));
        }
        binaryMinterms.push(temp);
    }
    return binaryMinterms;
}

function findImplicants(data) {
    let arr = [].concat(data),
        size = arr.length,
        im = [],
        implicants = [],
        im2 = [],
        mr = rep(0, size),
        mr2,
        m = 0;

    for (let i = 0; i < size; i++)
        for (let j = i + 1; j < size; j++) {
            c = add(arr[i], arr[j]);
            if (c !== "") {
                im.push(c);
                mr[i] = 1;
                mr[j] = 1;
            }
        }


    mr2 = rep(0, im.length);
    for (let j = 0; j < im.length; j++)
        for (n = j + 1; n < im.length; n++) if (j != n && mr2[n] == 0 && im[j] == im[n]) mr2[n] = 1;


    for (let l = 0; l < size; l++) {
        if (mr[l] == 0) {
            implicants.push(arr[l]);
            m++;
        }
    }

    for (let k = 0; k < im.length; k++) if (mr2[k] == 0) im2.push(im[k]);


    if (m != size && size != 1)
        implicants = implicants.concat(findImplicants(im2));


    implicants.sort();
    return implicants;
}



function main() {
    const variableCount = process.argv[2];
    const minterms = process.argv[3].split(',').map(Number);
    const binaryMinterms = decimalToBinary(variableCount, minterms);
    const primeImplicants = findImplicants(binaryMinterms);
    console.log(primeImplicants);
}

main();