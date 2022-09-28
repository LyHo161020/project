function previewImageCre(){
    $(".image-box").click(function() {
        let previewImg = $(this).children("#viewImageCre");

        $(this)
            .siblings()
            .children("input")
            .trigger("click");

        $(this)
            .siblings()
            .children("input")
            .change(function() {
                let reader = new FileReader();

                reader.onload = function(e) {
                    let urll = e.target.result;
                    $(previewImg).attr("src", urll);
                    previewImg.parent().css("background", "transparent");
                    previewImg.show();
                    previewImg.siblings("i").hide();
                };
                reader.readAsDataURL(this.files[0]);
            });
    });
}


function previewImageUp(){
    $(".image-box-up").click(function() {
        let previewImg = $(this).children("#viewImageUp");

        // $("#imageUp").trigger("click");

        $(this)
            .siblings()
            .children("input")
            .trigger("click");

        $(this)
            .siblings()
            .children("input")
            .change(function() {
                let reader = new FileReader();

                reader.onload = function(e) {
                    let urll = e.target.result;
                    $(previewImg).attr("src", urll);
                    previewImg.parent().css("background", "transparent");
                    previewImg.show();
                    previewImg.siblings("i").hide();
                };
                reader.readAsDataURL(this.files[0]);
            });
    });
}

