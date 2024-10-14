create database springboot;
use springboot;

-- 用户表 
drop table if exists `user`;
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL, -- 用户名
    useremail VARCHAR(100) NOT NULL, -- 用户邮箱
    userpassword VARCHAR(100) NOT NULL -- 用户密码
);
select * from user;

-- 用户信息表
drop table if exists `userinfo`;
create table userinfo(
    id INT AUTO_INCREMENT PRIMARY KEY,
	useravater text, -- 用户头像
    userdesc varchar(200), -- 用户签名或者描述
    useraddress varchar(20), -- 用户地址
    username VARCHAR(50) NOT NULL -- 用户名
);
select * from userinfo;

-- 首页
drop table if exists `homeinfo`;
create table homeinfo(
	id int auto_increment primary key,
    img text not null, -- 图片
    title varchar(100) not null, -- 文章标题
    info text not null, -- 文章信息
    type varchar(20) not null, -- 类型
    username varchar(100) not null, -- 用户名
    avater text not null, -- 头像图片
    likenum bigint not null, -- 喜欢的人数
    other int not null, -- 文章索引
    commentid int not null -- 评论索引
);
select * from homeinfo;

-- 首页文章详情
drop table if exists `article`;
create table article(
	id int auto_increment primary key,
    other int not null, -- 文章索引
    commentid int not null
);
select * from article;

-- 评论
drop table if exists `comment`;
create table comment(
	id int auto_increment primary key,
    commentid int not null, -- 评论索引
    username varchar(100) not null, -- 用户名
    avater text not null, -- 头像
    info text not null, -- 评论的信息
    score int not null -- 评分
);
select * from comment;

-- 通知
drop table if exists `notify`;
create table notify(
	id int auto_increment primary key,
    time datetime not null, -- 通知时间
    title varchar(100) not null, -- 通知标题
    info varchar(200) not null, -- 通知信息
    avater text not null, -- 通知的头像
    username varchar(100) not null, -- 通知的发送用户名
    fromusername varchar(100), -- 从哪里来的用户名
    tousername varchar(100), -- 到哪里去的用户名
    type varchar(20) not null -- 通知类型
);
select * from notify;

-- 购物
drop table if exists `shopping`;
create table shopping(
	id int auto_increment primary key,
    commodityname varchar(50) not null, -- 商品名
    commodityimg text not null, -- 商品图片
    commoditypicel float not null, -- 商品价格
    commoditysort varchar(20) not null, -- 商品分类
    commodityinfo varchar(100) not null, -- 商品详情
    shopname varchar(100) not null, -- 店铺名
    shopsort varchar(20) -- 店铺分类
);
select * from shopping;