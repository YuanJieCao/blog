## node 简介

 # buffer
 - 图片，视频 统称为二进制文件。数组不能储存二进制数据。
 - 在buffer中储存的都是二进制数据，但是在显示时以16进制。
 - 每一个元素的范围00 --ff  
 - buffer 的大小一旦确定，就无法修改
 # 文件系统
 - 使用node，来操作文件,fs()
 - 使用文件系统，需要先引入fs模块，核心模块
 - 操作文件 - 第一步打开文件，fs.openSync("路径"，" 要操作的动作")
           - 向文件中写入文件，fs.writeSync("文件名")
           - 关闭文件 fs.closeSync(fd)
   -异步操作，回调
   -简单文件写入：fs.writeFileSync()
   -简单文件写入：fs.writeFileSync()
   -流文件写入：