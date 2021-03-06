# git 和 svn 的区别
+ 1）GIT是分布式的，SVN是集中式的：


+ 2）GIT把内容按元数据方式存储，而SVN是按文件方式储存：


+ 3）GIT分支和SVN的分支不同：
    + 如果你想知道是否合并了一个分支，你需要手工运行像这样的命令svn propget svn:mergeinfo，来确认代码是否被合并。
    + 处理GIT的分支却是相当的简单和有趣。你可以从同一个工作目录下快速的在几个分支间切换。你很容易发现未被合并的分支，你能简单而快捷的合并这些文件。


+ 4）GIT没有一个全局的版本号，而SVN有：目前为止这是跟SVN相比GIT缺少的最大的一个特征。

+ 5）GIT的内容完整性要优于SVN：GIT的内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。

+ 6）Git下载下来后，在本地不必联网就可以看到所有的log，很方便学习，SVN却需要联网；

+ 7）SVN在Commit前，是先Update一下，在Commit，Git不用。

# 其他区别：

+ 1.速度：

    + 克隆一份全新的目录，以同样拥有五个（才五个）分支来说，SVN是同时复製5个版本的文件，也就是说重复五次同样的动作。而Git只是获取文件的每个版本的 元素，然后只载入主要的分支（master）。在我的经验，克隆一个拥有将近一万个提交（commit），五个分支，每个分支有大约1500个文件的 SVN，耗了将近一个小时！而Git只用了区区的1分鐘！

+ 2.版本库（repository）：

    + SVN只能有一个指定中央版本库。当这个中央版本库有问题时，所有工作成员都一起瘫痪直到版本库维修完毕或者新的版本库设立完成。

    + Git可以有无限个版本库。或者，更正确的说法，每一个Git都是一个版本库，区别是它们是否拥有活跃目录（Git Working Tree）。如果主要版本库（例如：置於GitHub的版本库）发生了什麼事，工作成员仍然可以在自己的本地版本库（local repository）提交，等待主要版本库恢复即可。工作成员也可以提交到其他的版本库！

+ 3.分支（Branch）

    + 在SVN，分支是一个完整的目录。且这个目录拥有完整的实际文件。如果工作成员想要开啟新的分支，每个人都会拥有和你一样的分支。
    + Git，每个工作成员可以任意在自己的本地版本库开啟无限个分支。
    + Git的分支名是可以使用不同名字的。例如：我的本地分支名為testing，而在主要版本库的名字其实是master。
    + Git可以在任意一个提交点（commit point）开啟分支！

+ 4.提交（Commit）

    + 在SVN，当你提交你的完成品时，它将直接记录到中央版本库。当你发现你的完成品存在严重问题时，你已经无法阻止事情的发生了。如果网路中断，你根本没办法提交！
    + 而Git的提交完全属於本地版本库的活动。而你只需“推”（git push）到主要版本库即可。Git的“推”其实是在执行“同步”（Sync）。

+ 5.重新设立起点（Rebase）

+ 6.系统档案
    + SVN会在每一个目录置放一个.svn。
    + 而Git会在目录起点拥有一个.git目录，以及.gitignore。

