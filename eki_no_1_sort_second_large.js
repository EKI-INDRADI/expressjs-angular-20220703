let data = [
    12,
    5,
    7,
    17,
    8,
    0,
    -1,
    16,
    7
]

function ekiFindSecondLarge(data) {
    console.log("Input : ")
    console.log(data)

    //-------------- DESC SORT
    for (let i_a = 0; i_a < data.length; i_a++) {
        for (let i_b = 0; i_b < data.length; i_b++) {
            if (data[i_a] > data[i_b]) {
                let temp = data[i_a]
                data[i_a] = data[i_b]
                data[i_b] = temp
            }
        }
    }

    console.log("Output (second largest): ")
    // console.log(data)
    console.log(data[1])

}

ekiFindSecondLarge(data)



