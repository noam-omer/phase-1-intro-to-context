// Your code here
function createEmployeeRecord(array){
    const record = {}
    record['firstName'] = array[0]
    record['familyName'] = array[1]
    record['title'] = array[2]
    record['payPerHour'] = array[3]
    record['timeInEvents'] = []
    record['timeOutEvents'] = []
    return record
}

function createEmployeeRecords(arrayOfArrays){
    const arrayOfRecords = []
    for (let i = 0; i < arrayOfArrays.length; i++){
        arrayOfRecords[i] = createEmployeeRecord(arrayOfArrays[i])
    }
    return arrayOfRecords
}

function createTimeInEvent(employeeRecord, dateTimeString){
    //dateTimeString format: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800"
   
    const timeIn = {}
    timeIn['type'] = 'TimeIn'
    timeIn['date'] = dateTimeString.slice(0,10);
    //timeInEvent['month'] = dateTimeString.slice(5,7);
    //timeInEvent['day'] = dateTimeString.slice(8,10);
    timeIn['hour'] = parseInt(dateTimeString.slice(10))
    employeeRecord['timeInEvents'].push(timeIn)
    
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString){
    const timeOut = {}
    timeOut['type'] = 'TimeOut'
    timeOut['date'] = dateTimeString.slice(0,10);
    timeOut['hour'] = parseInt(dateTimeString.slice(10))
    employeeRecord['timeOutEvents'].push(timeOut)
    //console.log('employee record' + JSON.stringify(employeeRecord))
    return employeeRecord
}
function hoursWorkedOnDate(employeeRecord, date){
    const timeInObj = employeeRecord['timeInEvents'].find(entry => entry.date === date)
    //console.log(timeInObj)
    const timeInHour = timeInObj.hour;
    //console.log(timeInHour)

    const timeOutObj = employeeRecord['timeOutEvents'].find(entry => entry.date === date)
    const timeOutHour = timeOutObj.hour
    return (timeOutHour - timeInHour)/100
}

function wagesEarnedOnDate(employeeRecord, date){
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date)
}

function allWagesFor(employeeRecord){
    //capture dates recorded in timeInEvents
    const timeInDates = getFields(employeeRecord.timeInEvents, 'date')
    
    //capture dates recorded in timeOutEvents
    const timeOutDates = getFields(employeeRecord.timeOutEvents, 'date')
    
    const sharedDates = timeInDates.filter(date => timeOutDates.includes(date))
    console.log(sharedDates)

    let allWages = 0;

    for (let i = 0; i < sharedDates.length; i++){
        allWages += wagesEarnedOnDate(employeeRecord, sharedDates[i])
    }
    return allWages
    
}

function calculatePayroll(arrayOfEmployees){
    let payroll = 0
    for(let i = 0; i < arrayOfEmployees.length; i++){
        payroll += allWagesFor(arrayOfEmployees[i])
    }
    return payroll
}

//helper function -- given an array of objects and a field. extracts all values for that field
function getFields(input, field) {
    var output = [];
    for (var i=0; i < input.length ; i++)
        output.push(input[i][field]);
    return output;
}