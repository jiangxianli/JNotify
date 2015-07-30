# JNotify
基于Jquery的消息提示插件


## 参数


  ```js

   var defaults = {

        // 容器 notifyContainer
        'className':'JNotify-danger', //容器 notifyContainer附加类名
        'theme':'error',  // 主题 “success”、“error”、“warning”、“info”
        'backgroundColor':'#D9EDF7', //容器背景颜色
        'borderColor':'#BCE8F1', //容器边框颜色
        'borderRadius':'3px',   //容器边框圆角
        'position':'center', //容器对齐方式  left center right
        'maxWidth':'250px', //容器最大宽度
        'top':8,  //容器top
        'zIndex': 888,
        'height':null,  //容器固定高度


        //信息外层 notifyWarpper
        'padding':'15px', //信息内容外部Wrapper内边距

        //信息内容 notifyMessage
        'message':'尊敬的用户您的手机已欠费，请即时续缴话费', //显示的信息内容
        'fontSize':'14px',  //信息内容字体大小
        'fontColor': '#31708F', //信息内容字体颜色

        //关闭按钮 closeButton
        'autoClose':false,  //是否自动关闭
        'showCloseButton':true,  //是否显示关闭按钮
        'showDuration':5000,  //显示时长  设置自动关闭时才有效
        'closeDuration':1000  //关闭延时  设置自动关闭时才有效

    };

  ...
  ```


## 使用

环境要求：Jquery     >= 1.6

1. bower install jquery-jnotify 或 下载源码[jquery.jnotify.js](https://github.com/997204035/JNotify/blob/master/jquery.jnotify.js)


2.在页面上引入 jquery 和 jquery-jnotify两个js文件

3.调用如下

  ```js
   $(function(){

       // 一行代码即可
       var jNotify = $.JNotify();

       或者参数自定义

       var jNotify = $.JNotify({
            'message':'文字内容', //显示的信息内容
            'fontSize':'14px',  //信息内容字体大小
            'fontColor': '#31708F', //信息内容字体颜色
            'autoClose':true,  //是否自动关闭
            'showCloseButton':true,  //是否显示关闭按钮
       });

       //另外

       //隐藏关闭按钮
       jNotify.showCloseButton(false);

       //设置对齐方式 left，center，right
       jNotify.setPosition('left');

       //关闭容器
       jNotify.close(jNotify.notifyContainer);

       //设置主题 success，error，warning，info
       jNotify.setTheme('success');

       //改变主题颜色 (borderColor,backgroundColor,fontColor)
       jNotify.setThemeColor('#BCE8F1','#D9EDF7','#31708F');

       //设置圆角关闭按钮
       jNotify.setCloseButtonRadius();

       //设置关闭按钮offset top
       jNotify.setCloseButtonTop(10);

       //设置宽度
       jNotify.setWidth('100%');

       //设置高度
       jNotify.setHeight(130);




   });
  ...
  ```

## License

MIT


