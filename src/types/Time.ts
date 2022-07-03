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

    myTimeString = (`0${myTime.getHours()}`).slice(-2) + ":"
                + (`0${myTime.getMinutes()}`).slice(-2);

    return myTimeString;
}