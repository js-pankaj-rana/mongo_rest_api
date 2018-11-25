function addCustomerSubmitForm(event){
    event.preventDefault();
    const cForm =  document.addCustomerFormData;
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
        let formData = {
                "customerName": customerName,
                "customerMobile": customerMobile,
                "customerEmail": customerEmail,
                "customerAddress":customerAddress
             };

       $.ajax({
            url: '/api/customer',
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
       
        console.log(formData);
    }

}


function editCustomerSubmitForm(event){
    event.preventDefault();
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
        let formData = {
                "customerName": customerName,
                "customerMobile": customerMobile,
                "customerEmail": customerEmail,
                "customerAddress":customerAddress
             };
        var url = new URL(window.location.href);
        let [urlKey, urlValue] = url.search.substr(1, ).split('=');

       $.ajax({
            type: 'PUT',
            url: '/api/customer?customerId='+urlValue,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function(responseData, textStatus, jqXHR) {
                alert('Record updated successfully');
                window.location.href = "/"

                // cForm.reset(); 
                //console.log("res==> "+ responseData, "resultData==>" +textStatus, "jqXHR==>" + jqXHR);
            },
            error: function(err){
                console.log("err==>",err.responseText)
            },
            done: function(){
                console.log("done");
            }
            
        })
       
        console.log(formData);
    }

}