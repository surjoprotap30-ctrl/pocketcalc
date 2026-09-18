let current = "0";
let previous = null;
let op = null;
let waiting = false;

const result = document.getElementById("result");
const expression = document.getElementById("expression");

function render() {
    result.textContent = current;
}

function number(n) {
    if (waiting || current === "0") {
        current = n;
        waiting = false;
    } else {
        current += n;
    }
    render();
}

function decimal() {
    if (waiting) {
        current = "0.";
        waiting = false;
        render();
        return;
    }

    if (!current.includes(".")) {
        current += ".";
        render();
    }
}

function operator(next) {
    const value = Number(current);

    if (previous !== null && !waiting) {
        calculate();
    }

    previous = Number(current);
    op = next;
    waiting = true;

    const symbol = {"+":"+","-":"−","*":"×","/":"÷"}[next];
    expression.textContent = `${format(previous)} ${symbol}`;
}

function calculate() {
    if (previous === null || op === null) return;

    const a = previous;
    const b = Number(current);
    let answer;

    if (op === "+") answer = a + b;
    if (op === "-") answer = a - b;
    if (op === "*") answer = a * b;
    if (op === "/") {
        if (b === 0) {
            current = "Error";
            previous = null;
            op = null;
            waiting = true;
            expression.textContent = "";
            render();
            return;
        }
        answer = a / b;
    }

    expression.textContent = `${format(a)} ${{"+" :"+","-":"−","*":"×","/":"÷"}[op]} ${format(b)}`;
    current = format(answer);
    previous = null;
    op = null;
    waiting = true;
    render();
}

function percent() {
    current = format(Number(current) / 100);
    render();
}

function backspace() {
    if (waiting || current === "Error") {
        clearCalc();
        return;
    }

    current = current.length > 1 ? current.slice(0, -1) : "0";
    render();
}

function clearCalc() {
    current = "0";
    previous = null;
    op = null;
    waiting = false;
    expression.textContent = "";
    render();
}

function format(value) {
    if (!Number.isFinite(value)) return "Error";

    if (Number.isInteger(value)) {
        return String(value);
    }

    return String(Number(value.toFixed(10)));
}

render();
