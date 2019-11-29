/**
 * 오늘의 날짜
 */
export function Today() {
    var d = new Date();
    return getDateStr(d);
 }
 
/**
 * Date객체를 yyyy-mm-dd 형식으로 변환해줌
 * 
 * @param myDate 
 */
export function getDateStr(myDate:Date){
    var year = myDate.getFullYear();
    var month = ("0"+(myDate.getMonth()+1)).slice(-2);
    var day = ("0"+myDate.getDate()).slice(-2);
    return ( year + '-' + month + '-' + day );
}

/**
 * 몇일전 날짜를 구할때 사용
 * 
 * @param days 
 */
export function prevDay(days:number) {
    var d = new Date();
    var dayOfMonth = d.getDate();
    d.setDate(dayOfMonth - days);
    return getDateStr(d);
}