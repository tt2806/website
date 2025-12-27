let unit1 = "Aura"
let unit2 = "Social Credits"
let conversionRate = 0.15

function switchUnits() {
    let temp = unit1
    unit1 = unit2
    unit2 = temp
    document.getElementById('unitFrom').innerText = unit1
    document.getElementById('unitTo').innerText = unit2
    displayRate()
    convert()
}

function convert() {
    let value = parseFloat(document.getElementById('inputValue').value)
    if (isNaN(value)) {
        document.getElementById('resultValue').value = ""
        return
    }

    let result

    if (unit1 === "Aura") {
        result = value * conversionRate
    } else {
        result = value / conversionRate
    }

    let formattedResult = (result % 1 === 0) ? result.toString() : result.toFixed(2)

    document.getElementById('resultValue').value = formattedResult
}

document.getElementById('inputValue').addEventListener('input', convert)
document.querySelector('.switch').addEventListener('click', convert)