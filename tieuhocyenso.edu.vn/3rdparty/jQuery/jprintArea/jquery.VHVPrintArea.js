
(function($) {
    var printAreaCount = 0;

    $.fn.printArea = function() {
        var ele = $(this);

        var idPrefix = "printArea_";

        removePrintArea( idPrefix + printAreaCount );

        printAreaCount++;

        var iframeId = idPrefix + printAreaCount;
        var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';

        iframe = document.createElement('IFRAME');

        $(iframe).attr({ style : iframeStyle,
                         id    : iframeId
                       });

        document.body.appendChild(iframe);

        var doc = (iframe.contentWindow || iframe.contentDocument);
        if (doc.document) doc = doc.document;

        $(document).find("link[rel]")
            .filter(function(){
                    return $(this).attr("rel").toLowerCase() == "stylesheet";
                })
            .each(function(){
                    doc.write('<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" >');
                });
    	if($(ele).length >1){
    		doc.write('<html><head><title></title></head><body onload="self.focus();;self.print();return false;">'); // Thiếu cái này IE ko chạy nổi
    		$(ele).each(function(index) {
    			doc.write('<div class="' + $(this).attr("class") + ' VHVprinting">' + $(this).html() + '</div>');
    		});
    		doc.write('</body></html>'); // Thiếu cái này IE ko chạy nổi
    	}else{
    		doc.write('<html><head><title></title></head><body onload="self.focus();self.print();return false;"><div class="' + $(ele).attr("class") + ' VHVprinting">' + $(ele).html() + '</div></body></html>');
    	}
        doc.close();

       // var myIFrame  = document.getElementById(iframeId);
        //var content = myIFrame.contentWindow.document.body.innerHTML;  
        //alert(content);

    }

    var removePrintArea = function(id)
	{
		$( "iframe#" + id ).remove();
	};
	$.fn.downloadPDF = function(opts)
	{
		opts = $.extend({
			filename: ''
		}, opts);
		var fakeFormHtmlFragment = "<form style='display: none;' method='POST' action='http://colombo.vn/html2pdf.php'><input type='hidden' name='content' value=''><input type='hidden' name='filename' value='"+opts.filename+"'></form>";
		var $fakeFormDom = $(fakeFormHtmlFragment);
		$("body").append($fakeFormDom);
		
		$fakeFormDom.find('input[name=content]').val($(this).html().replace(/src\s*=\s*"\//g, 'src="./').replace(/src\s*=\s*'\//g, 'src=\'./').replace(/<table width="100\%"/g, '<table width="95%"'));
		$fakeFormDom.submit(); 
	}
})(jQuery);

