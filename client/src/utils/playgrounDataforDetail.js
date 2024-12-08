const formatTimeToJapanese = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    
    const isAM = hours < 12;
    const hourIn12 = hours % 12 === 0 ? 12 : hours % 12;
    const timePeriod = isAM ? "午前" : "午後"; // 午前 là AM, 午後 là PM
    return `${timePeriod}${hourIn12}時`;
  };
const timeConvert  = (startTime, endTime) => {
    const startJapanese = formatTimeToJapanese(startTime);
    const endJapanese = formatTimeToJapanese(endTime);
    return `${startJapanese}から${endJapanese}まで`;
}
  
const formattedPlaygroundData  =(input) => {
    console.log(input);
    return {
    id: input._id,
    name: input.name,
    openTime: timeConvert(input.openTime, input.closeTime),
    address: input.address,
    price: input.admissionFee,
    description: input.description,
    rating: input.ratingAvg,
    image: input.imageUrl,
    }

}
export default formattedPlaygroundData;
