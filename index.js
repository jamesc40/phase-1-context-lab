/* Your Code Here */

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(el => createEmployeeRecord(el))
}

function createTimeInEvent(date){
    let dateArr = date.split(' ');
    let timeIn = {
        type: 'TimeIn',
        date: dateArr[0],
        hour: parseInt(dateArr[1])
    }
    this.timeInEvents.push(timeIn);
    return this;
}

const createTimeOutEvent = function (date) {
    let dateArr = date.split(' ');
    let timeOut = {
        type: 'TimeOut',
        date: dateArr[0],
        hour: parseInt(dateArr[1])
    }
    this.timeOutEvents.push(timeOut);
    return this;
}

const hoursWorkedOnDate = function (date) {
    let timeIn = this.timeInEvents.find(el => el.date === date).hour
    let timeOut = this.timeOutEvents.find(el => el.date === date).hour
    return (timeOut - timeIn) / 100;
}

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.apply(this, [date]) * this.payPerHour;
}

const findEmployeeByFirstName = function (arr, name) {
    return arr.find(el => el.firstName === name)
}

const calculatePayroll = function (arr) {
   let payroll = arr.map(el => allWagesFor.call(el));
   console.log(payroll)
   return payroll.reduce((sum, record) => sum + record);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

