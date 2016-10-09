/**
 * jQuery DataLoader
 * Plugin jQuery para carregar dados na interface através de JSON.
 *
 * @author Eder Soares <edersoares@me.com>
 * @link https://github.com/edersoares/jquery-dataloader
 */
(function($){

    $.fn.dataloader = function(object, options){

        var defaults = {
            reset: true,
            functions: {}
        };
        var data = $.extend({}, object);
        var settings = $.extend({}, defaults, options);

        return this.each(function(){

            if (settings.reset)
                $(this).trigger('reset');

            for (var name in data) {

                var elem = $('[name="' + name + '"]', $(this));

                if (elem.length) {

                    for (var i = 0; i < elem.length; i++) {

                        if ($(elem[i]).is('input[type=hidden]') ||
                            $(elem[i]).is('input[type=password]') ||
                            $(elem[i]).is('input[type=text]') ||
                            $(elem[i]).is('textarea')
                        ) {
                            $(elem[i]).val(data[name]);
                        }
                        else if ($(elem[i]).is('input[type=checkbox]')) {
                            $(elem[i]).prop('checked', Boolean(data[name]));
                        }
                        else if ($(elem[i]).is('input[type=radio]') && $(elem[i]).val() == data[name]) {
                            $(elem[i]).prop('checked', true);
                        }
                        else if ($(elem[i]).is('select')) {
                            $(elem[i]).find('option[value="' + data[name] + '"]').prop('selected', true);
                        }
                    }
                }
                else if (settings.functions.hasOwnProperty(name)) {
                    settings.functions[name](data[name]);
                }
            }

        });
    };

    $.fn.selectloader = function(object){

        var data = $.extend({}, object);

        return this.each(function(){

            $(this).html('');

            for (var val in data)
                $(this).append($('<option>', { value: val }).text(data[val]));

        });
    };

}(jQuery));
