const fs = require("fs");
const  path  = require('path')
let htmlFile= fs.readFileSync(__dirname+"/source-dev.html");
let parent_path = path.resolve(__dirname,'..');


let htmlStr = htmlFile.toString();
htmlStr = htmlStr.replace(/[\r\n\t]/g, "");

htmlStr = htmlStr.replace(/\"/g, '\\"');
let endstr = `<!-- echarts切入结束点 -->`;
let flag = htmlStr.slice(
  htmlStr.indexOf(`<!-- echarts切入开始点 -->`),
  htmlStr.indexOf(endstr) + endstr.length
);
htmlStr = htmlStr.replace(flag, '<script>"+echartStr+"</script>');

let endDataStr = `//数据切入结束点`;
let flag2 = htmlStr.slice(
  htmlStr.indexOf(`//数据切入开始点`),
  htmlStr.indexOf(endDataStr) + endDataStr.length
);
htmlStr = htmlStr.replace(flag2, 'let allData="+data+";');

let jsCode = `
import echartStr from './deal-data/echarts.min.js?raw'
export default function downLoadHtml(data) {
    return "${htmlStr}";
}
`;
fs.writeFile(parent_path+"/dowonLoad.js", jsCode, (err) => {
  if (err) {
    return console.log(err);
  }else{
    console.log("文件生成完毕！")
  }
});
