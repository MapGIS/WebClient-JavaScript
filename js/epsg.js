function  tabProj(tableID,proj) {        
    tableDiv= document.getElementById(tableID);      
    var table = document.createElement('table');
    table.className="table table-bordered table-striped";
    var thead=document.createElement('thead');
    var tr=document.createElement('tr');
    tr.className="text-center";
    var th1 = document.createElement("th");
    th1.innerHTML="id";
    th1.setAttribute("scope", "col");
    th1.className = "bg-info";
    var th2 = document.createElement("th");
    th2.innerHTML="type";
    th2.setAttribute("scope", "col");
    th2.className = "bg-info";
    var th3 = document.createElement("th");
    th3.innerHTML="strProject";
    th3.setAttribute("scope", "col");
    th3.className = "bg-info";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    table.appendChild(thead);
   var tobdy=document.createElement('tbody');   
  // console.log(epsg);      
   var length= proj.length;
   for(var i=0;i<length;i++){
    var tr=document.createElement('tr');
    var td1=document.createElement('td');
    
    td1.innerHTML="EPSG:" + proj[i].id;
    var td2=document.createElement('td');    
      
    td2.innerHTML=proj[i].name;
    var td3=document.createElement('td');
   
    td3.innerHTML=proj[i].strProject;
         tr.appendChild(td1);
         tr.appendChild(td2);  
         tr.appendChild(td3); 
         tobdy.appendChild(tr);  
         table.appendChild(tobdy); 
   }     
   tableDiv.appendChild(table); 
}