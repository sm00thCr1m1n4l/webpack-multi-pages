const glob=require('glob');
const path=require('path');
const internalIp = require('internal-ip');
const host='http://'+internalIp.v4.sync()
const utils=require('./utils')
//扫描每个页面入口js文件
const entryArray=glob.sync(path.resolve(__dirname,'../src/pages/**/scripts'))


const entry={};//wenpack entryMap

entryArray.forEach((item)=>{
    entry[utils.getDistPath(item)]=item
});

module.exports={
    entry,
    output:path.resolve(__dirname,'../dist'),
    port:7799,
    host,
    viewPath:'/boe/pages',
    publicPath:'/boe',
    src:path.resolve(__dirname,'../src'),
};