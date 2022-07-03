export function getDate()
{
    var myDate = new Date();
    var myDateString: string;

    myDateString = (`0${myDate.getDate()}`).slice(-2) + "."
                + (`0${myDate.getMonth() + 1}`).slice(-2) + "."
                + myDate.getFullYear();

    return myDateString;
}

export function getTime()
{
    var myTime = new Date();
    var myTimeString: string;

    myTimeString = myTime.getHours() + ":" + myTime.getMinutes();
    return myTimeString;
}