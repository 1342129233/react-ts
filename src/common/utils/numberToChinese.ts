export function numberToChinese(num: number) {
    const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const chineseUnits = ['', '十', '百', '千'];
   
    if (num === 0) {
      return chineseNums[0];
    }
   
    let chineseStr = '';
    let unitIndex = 0;
   
    while (num > 0) {
      const digit = num % 10;
      if (digit !== 0) {
        // 处理非零数字
        chineseStr = chineseNums[digit] + chineseUnits[unitIndex] + chineseStr;
      } else if (chineseStr.charAt(0) !== chineseNums[0]) {
        // 处理连续的零，只保留一个零
        chineseStr = chineseNums[0] + chineseStr;
      }
   
      num = Math.floor(num / 10);
      unitIndex++;
    }
   
    return chineseStr;
}