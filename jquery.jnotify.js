/**
 *Jquery JNotify
 * Author:jiangxianli
 * Email:997204035@qq.com
 * Date:20150729
 * GitHub:https://github.com/997204035
 */

(function($){

    $.extend({

        JNotify:function(options){

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

            var _this = this;

            _this.notifyContainer = null;
            _this.notifyWarpper = null;
            _this.notifyMessage = null;
            _this.closeButton = null;

            //var notifyContainer,notifyWarpper,notifyMessage,closeButton;

            _this.setting = $.extend(defaults, options);

            _this.notifyContainerNum = $('.notifyContainer').size();

            /**
             * 默认值和设定值的交换
             * @param default_value
             * @param setting_value
             * @returns {*}
             */
            _this.setDefaultValue = function(default_value,setting_value){

                if(setting_value === undefined){

                    return default_value;
                }
                return setting_value ;
            };

            /**
             * 初始化
             * @returns {*}
             */
            _this.init = function(){


                _this.notifyContainer = $('<div class="notifyContainer "  ></div>')
                    .css({
                        'position':'fixed',
                        'top':_this.setting.top+( _this.notifyContainerNum > 0 ? $('.notifyContainer:last-child').offset().top + $('.notifyContainer:last-child').height() : 0)+'px',
                        'left':'50%',
                        'border':'1px solid '+_this.setting.borderColor,
                        'fontSize':_this.setting.fontSize,
                        'color':_this.setting.fontColor,
                        'background-color':_this.setting.backgroundColor,
                        'border-radius':_this.setting.borderRadius,
                        'width':'100%',
                        'max-width':_this.setting.maxWidth,
                        'text-align':'center',
                        'z-index':_this.setting.zIndex,
                        'display':'none',
                        'overflow':'hidden'
                    })
                    .addClass(_this.setting.className);

                _this.closeButton =
                    $('<span class="notify-close ">x</span>').css({
                        'position':'absolute',
                        'right':'0px',
                        'top':'0px',
                        'height':'16px',
                        'background':'none',
                        'border':'none',
                        'cursor':'pointer',
                        'font-size': '14px',
                        'color':' #666',
                        'display':'block',
                        'text-shadow': '0px 1px 0px #FFF',
                        'border-radius':'50%',
                        'width':'16px',
                        'line-height':'16px',
                        'padding':'0',
                        'font-weight':'normal'

                    });

                _this.notifyMessage = $('<div class="notify-message"></div>').html(_this.setting.message);


                _this.notifyWarpper = $('<div class="notify-wrapper"></div>')
                    .css({
                        'position':'relative',
                        'padding':_this.setting.padding

                    });


                _this.notifyWarpper.append(_this.closeButton)
                    .append(_this.notifyMessage)
                    .prependTo(_this.notifyContainer);



                $('body').append(_this.notifyContainer);

                _this.notifyContainer.fadeIn();

                return _this;
            };

            /**
             * 设置是否显示关闭按钮
             * @param showCloseButton
             * @returns {*}
             */
            _this.showCloseButton = function(showCloseButton){

                _this.setting.showCloseButton = _this.setDefaultValue(_this.setting.showCloseButton,showCloseButton);

                _this.setting.showCloseButton ? _this.closeButton.show() : _this.closeButton.hide();

                return _this;
            };

            /**
             * 设置notifyContainer显示对齐方式
             * 可选值 left,center,right
             * @param position
             * @returns {*}
             */
            _this.setPosition = function(position){

                _this.setting.position =_this.setDefaultValue(_this.setting.position,position);

                switch (_this.setting.position){
                    case 'left':
                        _this.notifyContainer.css({'margin-left':'0px','left':'0px'});
                        break;
                    case 'center':
                        _this.notifyContainer.css({'margin-left':(_this.notifyContainer.width()/2*-1)+'px','left':'50%'});
                        break;
                    case 'right':
                        _this.notifyContainer.css({'margin-left':'0px','right':'0','left':''});
                        break;
                }

                return _this;

            };

            /**
             * 关闭容器
             */
            _this.close = function(notifyContainer){

                notifyContainer.fadeOut(_this.setting.closeDuration);
                setTimeout(function(){
                    notifyContainer.remove();

                    _this.resetTop();
                },_this.setting.closeDuration)
            };

            /**
             * 设置是否自动关闭容器
             * @param autoClose
             * @returns {*}
             */
            _this.autoClose = function(autoClose){

                _this.setting.autoClose = _this.setDefaultValue(_this.setting.autoClose,autoClose);

                var curNotifyContainer = _this.notifyContainer;

                if(_this.setting.autoClose){
                    setTimeout(function () {

                        _this.close(curNotifyContainer);

                    },_this.setting.showDuration)

                }
                return _this;
            };

            /**
             * 绑定按钮点击关闭事件
             */
            _this.bindCloseEvent = function(){

                var curNotifyContainer = _this.notifyContainer;

                _this.closeButton.click(function(){

                    _this.close(curNotifyContainer);
                })

                return _this;
            };

            /**
             *关闭容器后其他容器置顶放置
             */
            _this.resetTop = function(){

                $.each($('.notifyContainer'),function(n,item){

                    var prevContainerTop  = (n == 0 ? 0 : $('.notifyContainer').eq(n-1).offset().top + $('.notifyContainer').eq(n-1).height());

                    $(item).css({'top':_this.setting.top+prevContainerTop});
                })

                return _this;
            };

            /**
             * 设置主题
             * @returns {*}
             */
            _this.setTheme = function (theme) {

                _this.setting.theme = _this.setDefaultValue(_this.setting.theme,theme);

                switch (_this.setting.theme){
                    case 'success':
                        _this.setThemeColor('#D6E9C6','#DFF0D8','#3C763D');
                        break;
                    case 'error':
                        _this.setThemeColor('#EBCCD1','#F2DEDE','#A94442');
                        break;
                    case 'warning':
                        _this.setThemeColor('#FAEBCC','#FCF8E3','#8A6D3B');
                        break;
                    case 'info':
                        _this.setThemeColor('#BCE8F1','#D9EDF7','#31708F');
                        break;
                }
                return _this;
            };

            /**
             * 改变主题色
             * @param borderColor
             * @param backgroundColor
             * @param fontColor
             */
            _this.setThemeColor = function(borderColor,backgroundColor,fontColor){

                _this.notifyContainer.css({'border':'1px solid '+borderColor,'background-color':backgroundColor,'color':fontColor});

                return _this;
            };

            /**
             * 设置圆角关闭按钮
             */
            _this.setCloseButtonRadius = function(){

                _this.closeButton.css({
                    'background':'#ffffff',
                    'border':'1px solid #ccc',
                    'right':'-8px',
                    'top':'-8px'
                });
                return _this;
            };

            /**
             * 设置宽度
             * @param width
             */
            _this.setWidth = function(width){

                _this.notifyContainer.css({'width':width,'max-width':''})

                return _this;
            };

            /**
             * 设置高度
             * @param height
             */
            _this.setHeight = function(height){

                _this.setting.height = _this.setDefaultValue(_this.setting.height,height);

                _this.notifyContainer.css({'height':_this.setting.height,'line-height':_this.setting.height+'px'})
                _this.notifyWarpper.css({'padding':''})

                return _this;
            };

            /**
             * 设置关闭按钮offset top
             * @param top
             * @returns {*}
             */
            _this.setCloseButtonTop = function(top){

                _this.closeButton.css({'top':top})

                return _this;

            };



            _this.init().setPosition().showCloseButton().autoClose().bindCloseEvent().setTheme();

            if(_this.setting.height != null){
                _this.setHeight();
            }

            return _this;


        }
    })

})(jQuery)