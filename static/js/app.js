function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
function todo(){
    const code = document.getElementById('write');
    //code.innerHTML = "<div>hello</div>"
    code.innerHTML=''
    var url = 'http://127.0.0.1:7000/get-data/'
    fetch(url, {mode:'cors',credentials: 'include'})
    .then(resp => resp.json())
    .then(function(data){
        var lis = data
        var temp = '';
        for (var i in lis){
            if (lis[i].status==true){
                var dis1 = 'd-none'
                var dis2 = ''
            }
            else {
                var dis1 = ''
                var dis2 = 'd-none'
            }
            temp += `
                <div id="data-row-${i}" class="row px-3 align-items-center todo-item rounded">
                <div class="col px-1 m-1 d-flex align-items-center">
                    <input type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" value="${ lis[i].name }" title="${ lis[i].name }" id="datatitle" >
                    <p style="font-size:12px; width:100%;" >${ lis[i].desc }</p>
                </div>
                <div class="col-auto m-1 p-0 px-3 d-none">
                </div>
                <div class="col-auto m-1 p-0 todo-actions">
                    <div class="row d-flex align-items-center justify-content-end">
                        <h5 class="m-0 p-0 px-2">
                            <i class="fa fa-pencil text-info btn m-0 p-2" data-placement="bottom" title="Edit todo" onclick="edit(${ lis[i].id })">  Edit todo</i>
                        </h5>
                        <h5 class="m-0 p-0 px-2">
                            <i class="fa fa-trash text-danger btn m-0 p-2" href="" data-placement="bottom" title="Delete todo" onclick="del(${ lis[i].id })">  Delete todo</i>
                        </h5>
                    </div>
                    <div class="row todo-created-info">
                        <div class="col-auto d-flex align-items-center pr-2">
                            <i class="fa fa-info-circle my-2 px-2 text-black-50 btn" data-placement="bottom" title="" data-original-title="Created date"></i>
                            <label class="date-label my-2 text-black-50">${ lis[i].date }</label>
                        </div>
                    </div>
                </div>
                <div class="col-auto m-1 p-0 d-flex align-items-center">
                    <h2 class="m-0 p-0">
                        <i class="fa fa-square text-primary btn m-0 p-0 ${dis1}" data-toggle="tooltip" data-placement="bottom" onclick="editstatus(${ lis[i].id },'Done')" title="Mark as complete"></i>
                        <i class="fa fa-check-square text-primary btn m-0 p-0 ${dis2}" data-toggle="tooltip" data-placement="bottom" onclick="editstatus(${ lis[i].id },'Todo')" title="Mark as todo"></i>
                    </h2>
                </div>
            </div>
        `
    };
        code.innerHTML = temp;    
    });
};
todo();
function create(){
    var form = document.getElementById("formdata")
    form.addEventListener('submit',function(e){
        e.preventDefault()
    title = document.getElementById("title").value
        console.log(title)
        var url = 'http://127.0.0.1:7000/create-data/'
        fetch(url,{
            mode:'cors',
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({"name": title,})
        }).then((response)=>{
            todo()
            document.getElementById("formdata").reset()
        })
    })
}
function edit(id){
    var dataurl = `http://127.0.0.1:7000/data-details/${id}/`
    fetch(dataurl,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }).then(resp => resp.json())
    .then(function(data){
        var Name = prompt("TODO Name")
        var Desc = prompt("TODO Desc")
        console.log(Name,Desc)
        var url = `http://127.0.0.1:7000/update-data/${id}/`
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({"name":Name,"desc":Desc}),
        }).then((response)=>{
            todo()
            document.getElementById("formdata").reset()
        }) 
    })
};
function editstatus(id,opt){
    console.log(id)
    var Dtitle = document.getElementById("datatitle").value
    console.log(Dtitle)
    console.log(opt)
    var dataurl = `http://127.0.0.1:7000/data-details/${id}/`
    fetch(dataurl,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    }).then(resp => resp.json())
    .then(function(data){
        Lisdata = data
    
    console.log(Lisdata.name,Lisdata.status)
    if (Lisdata.status==true){
        var url = `http://127.0.0.1:7000/update-data/${Lisdata.id}/`
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({"name":Lisdata.name,"status": false}),
        }).then((response)=>{
            todo()
            document.getElementById("formdata").reset()
        })  
    }
    else{
        var url = `http://127.0.0.1:7000/update-data/${Lisdata.id}/`
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({"name":Lisdata.name,"status": true})
        }).then((response)=>{
            todo()
            document.getElementById("formdata").reset()
        })  
}
})
}
function del(id){
    let newid = id
    var url = `http://127.0.0.1:7000/delete-data/${newid}/`
    fetch(url,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken':csrftoken,
        }
    }).then((response)=>{
        todo()
        document.getElementById("formdata").reset()
    })
}
