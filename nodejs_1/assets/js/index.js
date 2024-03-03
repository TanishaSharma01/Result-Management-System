$("#add_result").submit(function(event){
    alert("Result Inserted Successfully!");
})

$("#update_result").submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray();
    var data ={};

    $.map(unindexed_array, function(n,i){
        data[n['name']]=n['value']
    })
    console.log(data);

    var request={
        "url":`http://localhost:3001/api/results/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Result Updated Successfully!");
    })
})

if(window.location.pathname == "/teacher"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id= $(this).attr("data-id")

        var request={
            "url":`http://localhost:3001/api/results/${id}`,
            "method":"DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Result Deleted Successfully!");
                location.reload();
            })   
        }
    })
}