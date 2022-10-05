$(document).ready(function(){
    // selectable button
    $( "#notchoose" )
    .selectable({
        selected: function(event,ui){
            $("#choose").click(function(){
                $("#choosen").append(ui.selected);
                $(ui.selected).removeClass('selectedfilter').removeClass('ui-selected'); // chuyển xong thì unselect để tránh phát sinh lỗi
            })
    .draggable()
    }});

    $( "#choosen" ).selectable({
        selected: function(event,ui){
            $("#return").click(function(){
                $("#notchoose").append(ui.selected);
                $(ui.selected).removeClass('selectedfilter').removeClass('ui-selected'); 
            })
    }});

    $("#chooseall").click(function(){$("#choosen").append($("#notchoose li"));})

    $("#returnall").click(function(){$("#notchoose").append($("#choosen li"));})

    $("#nav-menu").selectable();

    $("#footer-menu").selectable();

    // sidebar accordion
    $("#accordion")
    .accordion({
        header: ">div >h3",
        collapsible: true
    })
    .sortable({
        axis: "y",
        handle: "h3",
        stop: function(event,ui){
            ui.item.children("h3").triggerHandler("focusout");
            $(this).accordion("refresh");
        }
    }); // https://jqueryui.com/accordion/#sortable

    // SignIn and Reset btn
    $("#btnRs").click(function(){
        $("#form")[0].reset();
    })

    $("#btnSignin").click(function(){
        // validate user input
        var isValidateInput = true;

        var maso = $("#txtMaSo").val();
        var hovaten = $("#txtHovaten").val();
        var gioitinh = $("input[name=radGioitinh]:checked", "#form").val();
        var ngaysinh = $("#txtNgaysinh").val();
        var diachi = $("#txtDiachi").val();
        var dienthoai = $("#txtDienthoai").val();
        var email = $("#txtEmail").val();
        
        let maso_reg = /^[12][789012]\d{6}$/;
        let email_reg = /^[a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,3}$/;
        let dienthoai_reg = /^[0][0-9]{9}$/;
        let hoten_reg = /^\w{2,}$/;
        let diachi_reg = /^\w{2,}$/;
        
        console.log(gioitinh);

        if(maso_reg.test(maso) == false){
            alert("Mã số sinh viên 8 chữ số, 2 ký số đầu từ 17-22");
            isValidateInput = false;
        }
        
        if(email_reg.test(email) == false){
            alert("Email sai định dạng");
            isValidateInput = false;
        }

        if(dienthoai_reg.test(dienthoai) == false){
            alert("Điện thoại sai định dạng");
            isValidateInput = false;
        }

        if(hoten_reg.test(hovaten) == false){
            alert("Họ và tên phải hơn 2 ký tự");
            isValidateInput = false;
        }

        if(diachi_reg.test(diachi) == false){
            alert("Địa chỉ phải dài hơn 2 ký tự");
            isValidateInput = false;
        }

        if(gioitinh == null) {
            alert("Vui lòng nhập giới tính");
            isValidateInput = false;
        }

        if(ngaysinh == ""){
            alert("Vui lòng nhập ngày sinh");
            isValidateInput = false;
        }
       
        // alert chosen subject 
        if(isValidateInput){
            var msg = "Các môn đã đăng ký:\n\n"
            $("#choosen li").each(function(){
                msg = msg + $(this).text() + "\n";
            })
            alert(msg);
            // append table
            let markup = `<tr><td>${maso}</td><td>${hovaten}</td><td>${gioitinh}</td><td>${ngaysinh}</td></tr>`;
            $("#table tbody").append(markup);
        }
    })
});