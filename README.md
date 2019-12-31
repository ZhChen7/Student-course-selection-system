## 高校学生选课系统

> 大三期末高校选课系统  期末实训 --  **高校学生选课系统** 
>
> 创建时间： 2019/13/27
>
> 完成时间：2019/13/29
>
> 作者 ：周琛

> 答辩时间：2019/12/30

------

> 高校选课系统  --  鼎立分配的期末实训项目 （湖师的人都懂！）（老师用的 javaweb） 
>
> 我则选择   <u>**node.js**</u>  **<u>Vue CLI 3</u>**  
>
> 本项目 采用 **前后端分离** ，本人 同时撰写 客户端（vue.js）和服务端（node.js）代码（数据库 采用：mysql）

------



### 技术栈

**客户端** ：HTML5、CSS3、Sass、ES6(7|8)、Webpack4、Vue CLI 3、Vue.JS2.6.10、Vuex3.0.1、Vue Router3.1.3、Axios0.19.0   

**代理工具**： proxy 

**UI框架选型** ：View UI 

**服务端** ：Node.js（express ）

**数据库** ：MySQL

**IDEA**：webstorm





### 说明

这个作品 分为 客户端 和服务端2 个目录文件 --- > 需要 **分别 运行** 。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191227121637770.png)





### 亮点：

优势：**<u>前后端分离</u>** 

前端目录：（vuecli3 构建 、技术：vue）





管理员界面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231105755517.gif)





## 如何运行：

#### 环境配置：

1. node.js（服务器环境） 、mysql（数据库）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231101029528.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231103336100.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

2. 从 [这个地址](https://github.com/ZhChen7/Student-course-selection-system) 下载项目到本地 （也就是当前页面的项目）
3. 将 名称（iviewuinode）的文件目录从中分离出，成为2个文件目录

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231101243254.png)



4. 分别进入2个项目：打开命令框：输入  `npm i` ,安装相关依赖。

5.  进入  文件（Student-course-selection-system），打开命令框：输入   `npm run serve`

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231102354873.gif)

   **如果** ：node-sass 报错 --> 必须重建node-sass  :执行 ：`npm rebuild node-sass` 重建node-sass。

6.  进入  文件（iviewuinode），打开命令框：输入   `node app.js`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231102656331.png)

7. 打开文件（Student-course-selection-system）里面的 `vue.config.js` 文件，修改配置文件，检查 proxy  代理：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019123110305461.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

查看自己的IP 地址： 打开命令行：输入命令：`ipconfig`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231103257444.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

8. 配置数据库 连接：打开文件（iviewuinode）里面的 在models里面的`mysql.js` 文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231103910497.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

9. 打开浏览器 ：输入 ：`localhost:8080` 打开网页。



# 高校学生选课系统

> 周琛（指导教师，叶兵桥）
>
> （湖北师范大学计算机与信息工程学院 中国 黄石 435002）



### 1 前言

随着国家教育改革的不断深入，绝大多数高校的教学管理制度都已经从学年制转变为学分制模式，学生选课机制则是学分制的核心组成部分，而选课群体较大、过程复杂较难管理的问题突出，而且高校学生的选课工作又是一项复杂而又繁琐的工作，这更加凸显了学生选课管理系统的重要性。当前，学生选课系统是目前各大专科及本科院校不可缺少的组成部分，对于学校的教务工作来说尤为重要。建立了独立的学生选课系统学生可以自主的结合自己的选课兴趣和学校提供的教学资源进行选课。高校选课系统利用计算机和各种网络终端设备完成课程管理，便于增强学生选课的自主性，提高学生的学习积极性，提高学校的教学管理质量和教学效益，所以，分析与设计高校选课系统具有相应的价值与意义。



# 2 需求分析

全校性选修课开设的目的在于扩大学生的知识面、加强学生素质教育、培养复合型高级人才，具有不可替代的重要性。随着教育改革的不断深入和素质教育的加强，学分制的实施，选修课在一个学 生的培养计划中占的比重将越来越大。

网上选课系统的出现使同学们能够更加自主、便捷、准确的进行选课。但是，由于一般高校中的学生都比较多，因此带来了诸多如信息管理等问题，鉴于需要将学生信息、选课信息等信息数字化以便于管理维护，我们便想到了利用数据库能够比较良好地解决此类问题，由此下面我将设计出一个高校选课系统以供参考。

系统应该能管理学校的教师信息、学生信息、专业信息、学校开设的所有课程信息、学生选修课程的信息等选课系统主要满足三类用户的要求，这三类用户分别是教务处的系统管理员、教师和学生。他们所具有的操作权限以及操作内容是不同的。

具体的需求分析如下：



## 2.1系统管理员

1. 维护学生的个人基本信息，实现对学生个人信息的增、删、改、查，学生信息包括学号、姓名、性别、年龄、入学时间、系别、专业、密码。

2. 维护教师的个人基本信息，实现对教师个人信息的增、删、改、查，教师信息包括教师工号、姓名、性别、密码。

3. 维护课程的个人基本信息，实现对课程个人信息的增、删、改、查，课程信息包括课程号、课程名。

## 2.2学生用户

1. 查询和修改个人信息。

2. 进行选课操作

3. 学生可以查看自己所选课程信息。

## 2.3教师用户

1. 查询和修改个人信息。

2. 教师可查看自己的教学安排。



![在这里插入图片描述](https://img-blog.csdnimg.cn/2019123109551579.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)



# 4 数据库设计

### 4.2 数据库E-R图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095620207.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231100253621.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231100309741.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231100322139.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)





# 展示界面



### LOGIN：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095820477.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

### 管理员界面：（还有老师、学生界面、都有不同的界面 --自己运行项目吧！功能齐全。）





![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095834953.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095845529.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095852829.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095901447.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095908568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095922827.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095929330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191231095936698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk0OTc4OA==,size_16,color_FFFFFF,t_70)