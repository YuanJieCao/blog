### 在webstorm上面push clone 到github中
 # 安装webstorm  
    在setting中 设置 GitHub 有三种模式一种密码登录,一种是ssh,一种是http形式（本人使用的密码登录的）
    然后你要有本地的git。在git中配置路径，可以选择test。然后下面有版本或者弹出框便是操作成功。
    这些完就可以push,commit项目啦，过程中或许有报错，例如什么ssl。我使用的方式： git config --global http.sslVerify "false"，全局配置这个
    之后便可成功
    
    之后从GitHub，clone代码报错 `Clone failed git@github.com: Permission denied (publickey).
			Could not read from remote repository.
			Please make sure you have the correct access rights
			and the repository exists.`这个是
            ① 客户端与服务端未生成 ssh key
            ② 客户端与服务端的ssh key不匹配
            具体的ssh细节需要深入了解，这里只谈操作
            `ssh-keygen -t rsa -C "xxxx@xx.com"`生成ssh key
            弹出的第一个是路径（可以修改以免以后覆盖），第二和第三密码，嫌麻烦可以直接回车跳过，最后会在.ssh下生成两个文件。
            

 # GitHub上的操作
    setting中，找到ssh and gpg key ,设置新的new ssh key ,先命名，在将，rsa文件的内容复制到这个输入框中，添加。（一般来说会成功）
    坑一：因为改了名字，这样问题就出来了，你起的这个名字没有和ssh内设定的名字保持一致，所以使用命令 ssh-add ~/.ssh/你的名字
    将自己起的名字加入到ssh中 ， 
    ssh -T git@github.com这样就能到你想要的地方，
    ssh-add -l 查看加入的密钥列表
    ssh -v git@github.com 查看调试信息