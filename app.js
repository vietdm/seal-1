const CM = {
    get(el, parent = document) {
        return parent.querySelector(el);
    },
    getAll(el, parent = document) {
        return parent.querySelectorAll(el);
    },
    //https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
    formatMoney(amount) {
        return Intl.NumberFormat('vn-VN').format(amount);
    },
    isInt(number) {
        return number % 1 === 0;
    },
    fixedNumber(number, length = 2) {
        if (this.isInt(number)) return number;
        return number.toFixed(length);
    }
}
const Bai1 = {
    submit() {
        const alertError = CM.get('.alert-error-day-works');
        const alertSalary = CM.get('.alert-salary');
        alertError.style.display = 'none';
        alertSalary.style.display = 'none';

        const dayWorks = CM.get('#day_works').value.trim();
        if (dayWorks === '') {
            alertError.innerText = 'Số ngày làm việc phải là 1 số!';
            alertError.style.display = 'block';
            return;
        }

        const salaryPerDay = parseInt(CM.get('#salary_per_day').value.trim());

        const salary = parseInt(dayWorks) * salaryPerDay;
        alertSalary.innerText = `Lương của bạn là: ${CM.formatMoney(salary)}`;
        alertSalary.style.display = 'block';
    },
    reset() {
        const alertError = CM.get('.alert-error-day-works');
        const alertSalary = CM.get('.alert-salary');
        const input = CM.get('#day_works');
        const salaryPerDayInput = CM.get('#salary_per_day');
        alertError.style.display = 'none';
        alertSalary.style.display = 'none';
        input.value = '';
        input.focus();

        salaryPerDayInput.value = salaryPerDayInput.getAttribute('default-value');
    }
}

const Bai2 = {
    submit() {
        const areaInput = CM.get('.area-input-number-multi');
        const alertResult = CM.get('.alert-average-value');
        let countNumberValid = 0;

        const getNumberValue = (id) => {
            const number = CM.get('#' + id, areaInput).value.trim();
            const numberInt = parseFloat(number);
            if (!isNaN(numberInt)) countNumberValid++;
            return numberInt || 0;
        }

        const number1 = getNumberValue('number_1');
        const number2 = getNumberValue('number_2');
        const number3 = getNumberValue('number_3');
        const number4 = getNumberValue('number_4');
        const number5 = getNumberValue('number_5');

        const totalSumNumber = number1 + number2 + number3 + number4 + number5;

        let averageValue = (totalSumNumber / countNumberValid) || 0;;
        alertResult.innerText = `Giá trị trung bình của ${countNumberValid} số là: ${CM.fixedNumber(averageValue)}`;
        alertResult.style.display = 'block';
    },
    reset() {
        const areaInput = CM.get('.area-input-number-multi');
        CM.getAll('input', areaInput).forEach((input) => {
            input.value = '';
        });
        CM.get('.alert-average-value').style.display = 'none';
        CM.get('input', areaInput).focus();
    }
}

const Bai3 = {
    usdRate: 23500,
    submit() {
        const alertResult = CM.get('.alert-money-exchange');
        let moneyExchange = CM.get('#money_exchange').value.trim();
        moneyExchange = parseFloat(moneyExchange) || 0;
        const viMoney = this.usdRate * moneyExchange;
        alertResult.style.display = 'block';
        alertResult.innerText = `${moneyExchange} USD = ${CM.formatMoney(viMoney)} VND`;
    },
    reset() {
        CM.get('.alert-money-exchange').style.display = 'none';
        CM.get('#money_exchange').value = '';
        CM.get('#money_exchange').focus();
    }
}

const Bai4 = {
    submit() {
        const alertResult = CM.get('.alert-rectangle-data');
        let length = CM.get('#rectangle_length').value.trim();
        let width = CM.get('#rectangle_width').value.trim();

        length = parseFloat(length) || 0;
        width = parseFloat(width) || 0;

        const perimeter = 2 * (length + width);
        const acreage = length * width;

        alertResult.style.display = 'block';
        alertResult.innerText = `Chu vi: ${CM.fixedNumber(perimeter)} - Diện tích: ${CM.fixedNumber(acreage)}`
    },
    reset() {
        CM.get('#rectangle_width').value = '';
        CM.get('#rectangle_length').value = '';
        CM.get('#rectangle_length').focus();
        CM.get('.alert-rectangle-data').style.display = 'none';
    }
}

const Bai5 = {
    submit() {
        this.hideAlert();
        const input = CM.get('#number_calc_5');
        let number = input.value.trim();
        if (number.length !== 2 || parseInt(number) < 0) {
            const dangerAlert = CM.get('.alert-danger-number-5');
            dangerAlert.innerText = 'Số phải là số nguyên dương có 2 chữ số!';
            dangerAlert.style.display = 'block';
            input.focus();
            return;
        }

        number = parseInt(number);
        const firstNumber = Math.floor(number / 10);
        const secondNumber = number % 10;
        const sum = firstNumber + secondNumber;

        const resultAlert = CM.get('.alert-number-5');
        resultAlert.innerText = 'Tổng 2 ký số là: ' + sum;
        resultAlert.style.display = 'block';
    },
    hideAlert() {
        CM.get('.alert-danger-number-5').style.display = 'none';
        CM.get('.alert-number-5').style.display = 'none';
    },
    reset() {
        const input = CM.get('#number_calc_5');
        input.value = '';
        input.focus();
    }
}
