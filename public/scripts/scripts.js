function addingFormData(event, formType){
    event.preventDefault();

    let formData = undefined, 
        url = undefined,
        cForm = undefined;

    if(formType == "customer"){
     cForm =  document.addCustomerFormData;
    let customerName = cForm.customerName.value,
        customerMobile =  cForm.customerMobile.value, 
        customerEmail = cForm.customerEmail.value,
        customerAddress = cForm.customerAddress.value; 

    if(customerName === undefined) {
        console.error("customer name is not defined");
        return false;
    }
    else if(customerMobile === undefined) {
        console.error("customer mobile is not defined");
        return false;
    }
    else if(customerAddress === undefined) {
        console.error("customer address is not defined");
        return false;
    }
    else {
        formData = {
                "customerName": customerName,
                "customerMobile": customerMobile,
                "customerEmail": customerEmail,
                "customerAddress":customerAddress
            };
        url = '/api/customer';
        console.log(formData);
        }

    }

    if(formType == "product"){
        cForm =  document.addProductForm;
        let productCode = cForm.productCode.value,
            productName =  cForm.productName.value, 
            productAvaiblityLoation = cForm.productAvaiblityLoation.value,
            productPrice = cForm.productPrice.value,
            productStockNum = cForm.productStockNum.value,
            productVisiblity = cForm.productVisiblity.value; 
    
            formData = {
                    "productCode": productCode,
                    "productName": productName,
                    "productAvaiblityLoation": productAvaiblityLoation,
                    "productPrice": productPrice,
                    "productStockNum": productStockNum,
                    "productVisiblity": productVisiblity
                };
            url = '/api/product';
            console.log(formData);
            }
            


            if(formData != undefined && url != undefined){
                $.ajax({
                    url: url,
                    data: JSON.stringify(formData),
                    type: 'POST',
                    dataType: "json",
                    contentType: "application/json",
                    success: function(responseData, textStatus, jqXHR) {
                        alert('Record save successfully');
                        cForm.reset(); 
                        console.log("res==> "+ responseData, "resultData==>" +textStatus, "jqXHR==>" + jqXHR);
                    },
                    error: function(err){
                        console.log("err==>",err.responseText)
                    },
                    done: function(){
                        console.log("done");
                    }
                })
            }

        }


function editFormData(event, formType){
    event.preventDefault();
    var url = new URL(window.location.href);
    let [urlKey, urlValue] = url.search.substr(1, ).split('='),
        apiUrl = undefined, 
        formData = undefined,
        urlRedirection= undefined;

    if(formType == 'customer'){

        const cForm =  document.editCustomerFormData;
        let customerName = cForm.customerName.value,
        customerMobile =  cForm.customerMobile.value, 
        customerEmail = cForm.customerEmail.value,
        customerAddress = cForm.customerAddress.value; 

            if(customerName === undefined) {
                console.error("customer name is not defined");
                return false;
            }
            else if(customerMobile === undefined) {
                console.error("customer mobile is not defined");
                return false;
            }
            else if(customerAddress === undefined) {
                console.error("customer address is not defined");
                return false;
            }
            else {
                formData = {
                        "customerName": customerName,
                        "customerMobile": customerMobile,
                        "customerEmail": customerEmail,
                        "customerAddress":customerAddress
                    };
                apiUrl = '/api/customer?customerId='+urlValue;
                urlRedirection = '/customers'
            }
        }

        if(formType == 'product'){
            const cForm =  document.editProductFormData;
            let productCode = cForm.productCode.value,
            productName =  cForm.productName.value, 
            productAvaiblityLoation = cForm.productAvaiblityLoation.value,
            productPrice = cForm.productPrice.value; 
            productStockNum = cForm.productStockNum.value; 
            productVisiblity = cForm.productVisiblity.value; 
            formData = {
                "productCode": productCode,
                "productName": productName,
                "productAvaiblityLoation": productAvaiblityLoation,
                "productPrice":productPrice,
                "productStockNum":productStockNum,
                "productVisiblity":productVisiblity
            };
            apiUrl = '/api/product?productId='+urlValue;
            urlRedirection = '/product'
        }

    $.ajax({
        type: 'PUT',
        url: apiUrl,
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function(responseData, textStatus, jqXHR) {
            alert('Record updated successfully');
            window.location.href = urlRedirection
        },
        error: function(err){
            console.log("err==>",err.responseText)
        },
        done: function(){
            console.log("done");
        }
    })
}


/* $(window).on('load', function(){
    if(urlKey == undefined && urlKey != 'customerId'){
        alert("wrong url query string passed, it should contains customer id");
    }
}) */

    


    function setFormData(formType){
        let url = new URL(window.location.href);
        let [urlKey, urlValue] = url.search.substr(1, ).split('=');
        console.log(urlKey, urlValue);
        
        if(formType == 'customer') {
            $.ajax({
                url: "/api/customer?customerId="+urlValue,
                success: function(data){
                    let cform = document.editCustomerFormData;
                    let {customerAddress, customerName, customerMobile, customerEmail} = data;
                        cform.customerName.value = customerName; 
                        cform.customerMobile.value = customerMobile; 
                        cform.customerEmail.value = customerEmail; 
                        cform.customerAddress.value = customerAddress; 
                    $('input, textarea').removeAttr('disabled');    
                },
                error: function(err){
                    console.log(err);
                }
            })
        }

        if(formType == 'product') {
            $.ajax({
                url: "/api/product?productId="+urlValue,
                success: function(data){
                    let cform = document.editProductFormData;
                    let {productVisiblity, productAvaiblityLoation, productCode, productPrice, productStockNum, productName} = data;
                        cform.productAvaiblityLoation.value = productAvaiblityLoation; 
                        cform.productCode.value = productCode; 
                        cform.productPrice.value = productPrice; 
                        cform.productVisiblity.value = productVisiblity; 
                        cform.productStockNum.value = productStockNum; 
                        cform.productName.value = productName; 
                    $('input, select').removeAttr('disabled');    
                },
                error: function(err){
                    console.log(err);
                }
            })
        }
        
    }