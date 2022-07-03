function func_eki_preview_img(input) {
    // https://codepen.io/mobifreaks/pen/LIbca 
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#var-preview-img')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function func_eki_preview_img_edit(input) {
    // https://codepen.io/mobifreaks/pen/LIbca 
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#var-preview-img-edit')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}