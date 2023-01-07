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

export function toDate(tStr: string, dStr?: string) {
	var date = new Date();
 	date.setHours(parseInt(tStr.substring(0,tStr.indexOf(":")), 10));
 	date.setMinutes(parseInt(tStr.substring(tStr.indexOf(":")+1), 10));
 	date.setSeconds(0);
 	
    return date;
}