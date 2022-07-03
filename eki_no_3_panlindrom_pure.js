


function ekiPalindromCheck(value) {

    if (typeof value != "string") {
        let err_message = "makesure value is string"
        console.log(err_message)
        return err_message

    }

    let value_origin_arr = []
    value_origin_arr.push(String(value))
    let value_origin = value_origin_arr[0] //new memory
    let value_palindrom = ""

    let palindromValue = String(value)
    let Ispalindrom = true;
    // let x2 = 0;


    for (let x1 = 0; x1 < palindromValue.length; x1++) {
        let cek = palindromValue.charAt(x1) + " = " + x1 + " : " + (palindromValue.length - x1 - 1) + " = " + palindromValue.charAt(palindromValue.length - x1 - 1)
        console.log(cek)
        let new_chart = palindromValue.charAt(palindromValue.length - x1 - 1) ? palindromValue.charAt(palindromValue.length - x1 - 1) : ""
        value_palindrom = value_palindrom + new_chart

        if (palindromValue.charAt(x1) !== palindromValue.charAt(palindromValue.length - x1 - 1)) {
            Ispalindrom = false
        }


    }

    if (Ispalindrom == true) {
        let message = "palindrom"
        console.log(value_origin + " | " + value_palindrom + " = " + message)
        console.log("===============================================")
        console.log("Input : " + value)
        console.log("Output : " + message)
        console.log("===============================================")
    } else {
        let message = "not palindrom"
        console.log(value_origin + " | " + value_palindrom + " = " + message)
        console.log("===============================================")
        console.log("Input : " + value)
        console.log("Output : " + message)
        console.log("===============================================")
    }

}


//=========================INPUT=========================
// ekiPalindromCheck('kodok'); // TRUE
// ekiPalindromCheck('kodoak'); // FALSE
// ekiPalindromCheck("123"); // FALSE

// ekiPalindromCheck('racecar'); 
// ekiPalindromCheck('bringback'); 
// ekiPalindromCheck('neveroddoreven'); 
ekiPalindromCheck('carisonrace'); 

//=========================INPUT=========================