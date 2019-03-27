function addingFormData(event, formType) {
    event.preventDefault();

    let formData = undefined,
        url = undefined,
        cForm = undefined;


    if (formType == "productdetail") {
        cForm = document.addProductDetailForm;

        formData = {
            productDtlCode: $('#productDtlCode').val(),
            productDtlImage: cForm.productDtlImage.value,
            productDtlGallaryImages: (cForm.productDtlGallaryImages.value).split('/n'),
            productDtlDiscriptionMsg: (cForm.productDtlDiscriptionMsg.value).split('/n')
        }
        url = '/api/productdetail';
    }


    


    if (formType == "productdesc"){
        cForm = document.addProductDescFormData;

        formData = {
            productDesCode: $('#productDesCode').val(),
            numberDoor: cForm.numberDoor.value,
            numberOfShelves: cForm.numberOfShelves.value,
            needForThis: cForm.needForThis.value,
            itemCondition: cForm.itemCondition.value,
            dimensions: cForm.dimensions.value,
            numberOfSecretLocker: cForm.numberOfSecretLocker.value,
            productDtlWarrrenty: cForm.productDtlWarrrenty.value,
            productDtlDelivery: cForm.productDtlDelivery.value,
            prodcutMsg: cForm.prodcutMsg.value
        }
        url = '/api/productdetaildesc';
    }

    if (formType == "customer") {
        cForm = document.addCustomerFormData;
        let customerName = cForm.customerName.value,
            customerMobile = cForm.customerMobile.value,
            customerEmail = cForm.customerEmail.value,
            customerAddress = cForm.customerAddress.value;

        formData = {
            "customerName": customerName,
            "customerMobile": customerMobile,
            "customerEmail": customerEmail,
            "customerAddress": customerAddress
        };
        url = '/api/customer';
    }

    if (formType == "product") {
        cForm = document.addProductForm;
        formData = {
            productCode: cForm.productCode.value,
            productName: cForm.productName.value,
            productAvaiblityLoation: $('#productAvaiblityLoation').val(),
            productPrice: cForm.productPrice.value,
            productStockNum: cForm.productStockNum.value,
            productVisiblity: cForm.productVisiblity.value
        };
        url = '/api/product';
    }

    if (formType == "contactus") {
        cForm = document.editContactUsFormData;
        formData = {
            "contactUserName": cForm.contactUserName.value,
            "contactUserEmail": cForm.contactUserEmail.value,
            "contactUserMessage": cForm.contactUserMessage.value
        };
        url = '/api/contactus';
    }

    if (formType == "invoice") {
        cForm = document.addProductForm;

        formData = JSON.parse(cForm.invoice)
        
        url = '/api/invoice';
    }




    if (formData != undefined && url != undefined) {
        $.ajax({
            url: url,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("tokenkey")}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formData),
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            success: function (responseData, textStatus, jqXHR) {
                alert('Record save successfully');
                cForm.reset();
                console.log("res==> " + responseData, "resultData==>" + textStatus, "jqXHR==>" + jqXHR);
            },
            error: function (err) {
                console.log("err==>", err.responseText)
            },
            done: function () {
                console.log("done");
            }
        })
    }
}


function editFormData(event, formType) {
    event.preventDefault();
    var url = new URL(window.location.href);
    let [urlKey, urlValue] = url.search.substr(1, ).split('='),
        apiUrl = undefined,
        formData = undefined,
        urlRedirection = undefined;

    if (formType == 'productdetail') {

        const cForm = document.editProductDetailFormData;

        formData = {
            productDtlCode: cForm.productDtlCode.value,
            productDtlImage: cForm.productDtlImage.value,
            productDtlDiscriptionMsg: (cForm.productDtlDiscriptionMsg.value).split('\n'),
            productDtlGallaryImages: (cForm.productDtlGallaryImages.value).split('\n')
        };
        apiUrl = '/api/productdetail?productDtlId=' + urlValue;
        urlRedirection = '/productdetail'
    }

    if (formType == 'productdesc') {

        const cForm = document.editProductDescFormData;

        formData = {
            productDesCode: cForm.productDesCode.value,
            numberDoor: cForm.numberDoor.value,
            numberOfShelves: cForm.numberOfShelves.value,
            needForThis: cForm.needForThis.value,
            itemCondition: cForm.itemCondition.value,
            dimensions: cForm.dimensions.value,
            numberOfSecretLocker: cForm.numberOfSecretLocker.value,
            productDtlWarrrenty: cForm.productDtlWarrrenty.value,
            productDtlDelivery: cForm.productDtlDelivery.value,
            color: cForm.color.value,
            mirror: cForm.mirror.value,
            brand: cForm.brand.value,
            modeofPayment: cForm.modeofPayment.value,
            prodcutMsg: cForm.prodcutMsg.value
        };
        apiUrl = '/api/productdetaildesc?productDesId=' + urlValue;
        urlRedirection = '/productdetaildesc'
    }

    if (formType == 'customer') {

        const cForm = document.editCustomerFormData;
        let customerName = cForm.customerName.value,
            customerMobile = cForm.customerMobile.value,
            customerEmail = cForm.customerEmail.value,
            customerAddress = cForm.customerAddress.value;

        formData = {
            "customerName": customerName,
            "customerMobile": customerMobile,
            "customerEmail": customerEmail,
            "customerAddress": customerAddress
        };
        apiUrl = '/api/customer?customerId=' + urlValue;
        urlRedirection = '/customers'
    }

    if (formType == 'product') {
        const cForm = document.editProductFormData;
        let productCode = cForm.productCode.value,
            productName = cForm.productName.value,
            productPrice = cForm.productPrice.value;
        productStockNum = cForm.productStockNum.value;
        productVisiblity = cForm.productVisiblity.value;
        formData = {
            "productCode": productCode,
            "productName": productName,
            "productAvaiblityLoation": $('#productAvaiblityLoation').val(),
            "productPrice": productPrice,
            "productStockNum": productStockNum,
            "productVisiblity": productVisiblity
        };
        apiUrl = '/api/product?productId=' + urlValue;
        urlRedirection = '/product'
    }

    if (formType == 'contactus') {
        const cForm = document.editContactUsFormData;
        let contactUserName = cForm.contactUserName.value,
            contactUserEmail = cForm.contactUserEmail.value,
            contactUserMessage = cForm.contactUserMessage.value;
        formData = {
            "contactUserName": contactUserName,
            "contactUserEmail": contactUserEmail,
            "contactUserMessage": contactUserMessage,
        };
        apiUrl = '/api/contactus?contactFormId=' + urlValue;
        urlRedirection = "/";
    }


    $.ajax({
        type: 'PUT',
        url: apiUrl,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("tokenkey")}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (responseData, textStatus, jqXHR) {
            alert('Record updated successfully');
            window.location.href = urlRedirection
        },
        error: function (err) {
            console.log("err==>", err.responseText)
        },
        done: function () {
            console.log("done");
        }
    })
}

function setFormData(formType) {
    let url = new URL(window.location.href);
    let [urlKey, urlValue] = url.search.substr(1, ).split('=');
    console.log(urlKey, urlValue);

    if (formType == 'productdetail') {
        $.ajax({
            url: "/api/productdetail?productDtlId=" + urlValue,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("tokenkey")}`,
                'Content-Type': 'application/json'
            },
            success: function (data) {
                console.log(data);
                let cForm = document.editProductDetailFormData;
                let {
                    productDtlCode,
                    productDtlImage,
                    productDtlDiscriptionMsg,
                    productDtlGallaryImages
                } = data;
                cForm.productDtlCode.value = productDtlCode;
                cForm.productDtlImage.value = productDtlImage;
                cForm.productDtlDiscriptionMsg.value = productDtlDiscriptionMsg.join('\n');
                cForm.productDtlGallaryImages.value = productDtlGallaryImages.join('\n');

                $('input, textarea').removeAttr('disabled');
                $('input#productDtlCode').attr('disabled', 'disabled');

            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    if (formType == 'productDesc') {
        $.ajax({
            url: "/api/productdetaildesc?productDesId=" + urlValue,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("tokenkey")}`,
                'Content-Type': 'application/json'
            },
            success: function (data) {
                let cForm = document.editProductDescFormData;
                let {
                    productDesCode,
                    numberDoor,
                    numberOfShelves,
                    needForThis,
                    itemCondition,
                    dimensions,
                    numberOfSecretLocker,
                    productDtlWarrrenty,
                    productDtlDelivery,
                    color,
                    mirror,
                    brand,
                    modeofPayment,
                    prodcutMsg
                } = data;

                cForm.productDesCode.value = productDesCode;
                cForm.numberDoor.value = numberDoor;
                cForm.numberOfShelves.value = numberOfShelves;
                cForm.needForThis.value = needForThis;
                cForm.itemCondition.value = itemCondition;
                cForm.dimensions.value = dimensions;
                cForm.numberOfSecretLocker.value = numberOfSecretLocker;
                cForm.productDtlWarrrenty.value = productDtlWarrrenty;
                cForm.productDtlDelivery.value = productDtlDelivery;
                cForm.color.value = color;
                cForm.mirror.value = mirror;
                cForm.brand.value = brand;
                cForm.modeofPayment.value = modeofPayment;
                cForm.prodcutMsg.value = prodcutMsg;

                $('input, textarea').removeAttr('disabled');
            },
            error: function (err) {
                console.log(err);
            }
        })
    }


    if (formType == 'customer') {
        
        $.ajax({
            url: "/api/customer?customerId=" + urlValue,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("tokenkey")}`,
                'Content-Type': 'application/json'
            },
            success: function (data) {
                let cform = document.editCustomerFormData;
                let {
                    customerAddress,
                    customerName,
                    customerMobile,
                    customerEmail
                } = data;
                cform.customerName.value = customerName;
                cform.customerMobile.value = customerMobile;
                cform.customerEmail.value = customerEmail;
                cform.customerAddress.value = customerAddress;
                $('input, textarea').removeAttr('disabled');
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

      if(formType == 'product') {
         $.ajax({
             url: "/api/product?productId="+urlValue,
             headers: {
                 'Authorization': `Bearer ${sessionStorage.getItem("tokenkey")}`,
                 'Content-Type':'application/json'
             },
             success: function(data){
                 console.log(data);
                 let cform = document.editProductFormData;
                 let {productVisiblity, productAvaiblityLoation, productCode, productPrice, productStockNum, productName} = data;
                 $("[name=productAvaiblityLoation]").val(productAvaiblityLoation);
                     cform.productCode.value = productCode; 
                     cform.productPrice.value = productPrice; 
                     cform.productVisiblity.value = productVisiblity; 
                     cform.productStockNum.value = productStockNum; 
                     cform.productName.value = productName; 
                 $('input, select').removeAttr('disabled'); 
                 $('#productCode').attr('disabled','disabled');
                   
             },
             error: function(err){
                 console.log(err);
             }
         })
     }

    if (formType == 'contactus') {
        $.ajax({
            url: "/api/contactus?contactFormId=" + urlValue,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("tokenkey")}`,
                'Content-Type': 'application/json'
            },
            success: function (data) {
                let cform = document.editContactUsFormData;
                let {
                    contactUserName,
                    contactUserEmail,
                    contactUserMessage
                } = data;
                cform.contactUserEmail.value = contactUserEmail;
                cform.contactUserMessage.value = contactUserMessage;
                cform.contactUserName.value = contactUserName;
                $('input, textarea').removeAttr('disabled');
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
}


function setOptionList(elementId) {
    $.ajax({
        url: "/api/products",
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("tokenkey")}`,
            'Content-Type': 'application/json'
        },
        success: function (data) {
            var htmlData = ['<option value="-1">Select Option</option>']
            for (var product of data) {
                let {
                    productCode
                } = product;
                htmlData.push(`<option value=${productCode}> ${productCode} </option>`);
            }
            setTimeout(function () {
                var html = htmlData.join(',');
                $(elementId).html(html).removeAttr('disabled');

            }, 1000)
        },
        error: function (err) {
            console.log(err);
        },
        done: function () {
            console.log("Operation successfully done")
        }
    })
}


function checklogin() {
    let checklogin = sessionStorage.getItem("tokenkey");
    if (checklogin == undefined) {
        window.location.href = "/";
    }
}
window.addEventListener("load", function () {
    checklogin()
});