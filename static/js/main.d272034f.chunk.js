(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(5),c=a.n(r),o=(a(12),a(2));function i(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"form-row d-inline-block"},l.a.createElement("div",{className:"col d-flex"},l.a.createElement("input",{type:"text",className:"form-control",placeholder:"O que est\xe1 acontecendo?",style:{marginRight:"5px",width:"400px"}}),l.a.createElement("button",{className:"btn btn-primary",style:{marginBottom:"20px",borderRadius:"5px"}},"Postar"))),l.a.createElement("div",{className:"list-group"}))}var s=a(4);var m=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var l=a[n].trim();if(l.substring(0,e.length+1)===e+"="){t=decodeURIComponent(l.substring(e.length+1));break}}return t}("csrftoken"),u="http://127.0.0.1:8000";function d(e){var t=Object(n.useState)(null),a=Object(o.a)(t,2),r=a[0],c=a[1],i=Object(n.useState)(e.open),m=Object(o.a)(i,2),d=m[0],f=m[1];Object(n.useEffect)((function(){e.profileUsername&&(fetch("".concat(u,"/profile-api/user/").concat(e.profileUsername)).then((function(e){return e.json()})).then((function(e){return c(e)})),f(e.open))}),[e]);return l.a.createElement(l.a.Fragment,null,r?l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{show:d,onHide:e.onHide},l.a.createElement(s.a.Header,{closeButton:!0},l.a.createElement(s.a.Title,null,r.first_name," ",r.last_name)),l.a.createElement(s.a.Body,null,l.a.createElement("div",{className:"d-flex justify-content-between align-items-center profile-data-container"},l.a.createElement("div",{className:"d-flex flex-column align-items-start"},l.a.createElement("p",{style:{padding:"15px"}},l.a.createElement("img",{src:"".concat(u).concat(r.photo),style:{borderRadius:"50%",display:"inline-block",transform:"scale(1.5)",marginBottom:"25px"}})),l.a.createElement("p",{style:{marginBottom:0}},l.a.createElement("strong",null,r.first_name," ",r.last_name)),l.a.createElement("p",{className:"text-secondary",style:{marginTop:0}},"@",r.user.username),l.a.createElement("p",null,r.bio),l.a.createElement("p",{className:"text-secondary"},l.a.createElement("i",{className:"far fa-calendar-alt"})," Entrou em ",r.created.split("-").reverse().join("/")),l.a.createElement("p",null,l.a.createElement("strong",null,r.friends.length)," ",1===r.friends.length?"amigo":"amigos")))),l.a.createElement(s.a.Footer,null,l.a.createElement("button",{className:"btn btn-grey",onClick:function(){return f(!1)}},"Fechar")))):l.a.createElement(l.a.Fragment,null))}function f(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(""),i=Object(o.a)(c,2),s=i[0],m=i[1],f=Object(n.useState)(!1),p=Object(o.a)(f,2),E=p[0],b=p[1],g=Object(n.useState)(null),h=Object(o.a)(g,2),y=h[0],v=h[1];Object(n.useEffect)((function(){var e;e=""===s?"".concat(u,"/profile-api/profile-list"):"".concat(u,"/profile-api/users/").concat(s),fetch(e).then((function(e){return e.json()})).then((function(e){r(e)})).catch((function(e){return console.log(e)}))}),[s]);var N=function(e){var t=e.target;"Solicitar"===t.innerHTML?(t.innerHTML="Solicitado",t.className="btn btn-primary"):(t.innerHTML="Solicitar",t.className="btn btn-secondary")};return l.a.createElement(l.a.Fragment,null,l.a.createElement(d,{open:E,profileUsername:y,onHide:function(){return b(!1)}}),l.a.createElement("div",{className:"form-row d-inline-block"},l.a.createElement("div",{className:"col"},l.a.createElement("input",{type:"text",className:"form-control",placeholder:"Pesquisar",style:{width:"400px"},onChange:function(e){return m(e.target.value)}}))),l.a.createElement("div",{className:"list-group"},a?a.map((function(e){return l.a.createElement("li",{className:"list-group-item profile-row",key:e.id,onClick:function(){return t=e.user.username,v(t),void b(!0);var t}},l.a.createElement("div",{className:"d-flex justify-content-between"},l.a.createElement("div",{className:"profile-col"},l.a.createElement("img",{src:"".concat(u).concat(e.photo)}),l.a.createElement("div",{className:"main-profile-data"},l.a.createElement("strong",null,e.first_name," ",e.last_name),l.a.createElement("p",{className:"text-secondary"},"@",e.user.username))),l.a.createElement("div",{className:"profile-col"},e.bio),l.a.createElement("div",{className:"profile-col"},l.a.createElement("button",{className:"btn btn-secondary","data-userid":e.user.id,onClick:N},"Solicitar"))))})):l.a.createElement(l.a.Fragment,null)))}function p(){var e=Object(n.useState)("Perfis"),t=Object(o.a)(e,2),a=t[0],r=t[1],c={Perfis:l.a.createElement(f,null),Posts:l.a.createElement(i,null)};return l.a.createElement(l.a.Fragment,null,l.a.createElement("button",{type:"button",className:"btn btn-primary",style:{marginRight:"50px",borderRadius:"20px"},onClick:function(){return r("Perfis"===a?"Posts":"Perfis")}},"Perfis"===a?"Ver posts":"Ver perfis"),c[a])}function E(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],r=t[1];Object(n.useEffect)((function(){fetch("".concat(u,"/profile-api/myinvites")).then((function(e){return e.json()})).then((function(e){return r(e)}))}),[]);var c=function(e){var t=e.target,a={senderid:t.dataset.senderid,reply:t.dataset.reply};fetch("".concat(u,"/profile-api/reply-friend-request"),{method:"POST",headers:{"Content-type":"application/json","X-CSRFToken":m},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){return console.log(e)})),document.getElementById("friend-request-list").removeChild(document.getElementById(t.dataset.senderid))};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"list-group",id:"friend-request-list"},a.length?a.map((function(e){return l.a.createElement("li",{className:"list-group-item profile-row",id:e.sender.id,key:e.sender.id},l.a.createElement("div",{className:"d-flex justify-content-between"},l.a.createElement("div",{className:"profile-col"},l.a.createElement("img",{src:"".concat(u).concat(e.sender.photo)}),l.a.createElement("div",{className:"main-profile-data"},l.a.createElement("strong",null,e.sender.first_name," ",e.sender.last_name),l.a.createElement("p",{className:"text-secondary"},"@",e.sender.user.username))),l.a.createElement("div",{className:"profile-col"},e.sender.bio),l.a.createElement("div",{className:"profile-col",style:{justifyContent:"space-between"}},l.a.createElement("button",{className:"btn btn-primary btn-reply-fr","data-senderid":e.sender.id,"data-reply":"accept",onClick:c},"Confirmar"),l.a.createElement("button",{className:"btn btn-grey btn-reply-fr","data-senderid":e.sender.id,"data-reply":"decline",onClick:c},"Excluir"))))})):l.a.createElement("h3",{style:{marginTop:"100px"}},"Voc\xea ainda n\xe3o tem nenhuma notifica\xe7\xe3o")))}function b(){return l.a.createElement("div",null,"Mensagens")}function g(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),i=Object(o.a)(c,2),d=i[0],f=i[1],p={borderRadius:"50%",display:"inline-block",transform:"scale(1.5)",marginBottom:"25px"};return Object(n.useEffect)((function(){fetch("".concat(u,"/profile-api/myprofile")).then((function(e){return e.json()})).then((function(e){return r(e)}))}),[]),l.a.createElement(l.a.Fragment,null,a?l.a.createElement("div",null,l.a.createElement(s.a,{show:d,onHide:function(){return f(!1)},size:"lg"},l.a.createElement(s.a.Header,{closeButton:!0},l.a.createElement(s.a.Title,null,"Editar perfil")),l.a.createElement(s.a.Body,null,l.a.createElement("form",{action:"".concat(u,"/update-profile"),id:"update-profile-form",method:"POST"},l.a.createElement("input",{type:"hidden",name:"csrfmiddlewaretoken",value:m}),l.a.createElement("div",{className:"d-flex flex-column justify-content-center align-items-center",style:{padding:"25px"}},l.a.createElement("img",{src:"".concat(u).concat(a.photo),style:p}),l.a.createElement("input",{type:"file",accept:"image/png, image/jpg",name:"profile-photo"})),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"first-name",className:"profile-label"},"Nome:"),l.a.createElement("input",{class:"form-control",type:"text",name:"first-name",id:"first-name",placeholder:a.first_name})),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"last-name",className:"profile-label"},"Sobrenome:"),l.a.createElement("input",{class:"form-control",type:"text",name:"last-name",id:"last-name",placeholder:a.last_name})),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"username",className:"profile-label"},"Nome de usu\xe1rio:"),l.a.createElement("input",{class:"form-control",type:"text",name:"username",id:"username",placeholder:a.user.username}),l.a.createElement("span",{id:"username-taken"},"Nome de usu\xe1rio j\xe1 existe")),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"email",className:"profile-label"},"Email:"),l.a.createElement("input",{class:"form-control",type:"email",name:"email",id:"email",placeholder:a.email})),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"gender",className:"profile-label"},"G\xeanero:"),l.a.createElement("select",{class:"form-control",name:"gender",id:"gender",placeholder:a.gender},l.a.createElement("option",{value:"male"},"Masculino"),l.a.createElement("option",{value:"female"},"Feminino"),l.a.createElement("option",{value:"other"},"Outro"))),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"birth-date",className:"profile-label"},"Data de nascimento:"),l.a.createElement("input",{class:"form-control",type:"date",name:"birth-date",id:"birth-date",defaultValue:a.birth_date})),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"bio",className:"profile-label"},"Bio:"),l.a.createElement("input",{class:"form-control",type:"email",name:"bio",id:"bio",placeholder:a.bio})),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"birth-date",className:"profile-label"},"Senha:"),l.a.createElement("input",{class:"form-control",type:"password",name:"password",id:"password",placeholder:"Senha"})))),l.a.createElement(s.a.Footer,null,l.a.createElement("button",{className:"btn btn-grey",onClick:function(){return f(!1)}},"Fechar"),l.a.createElement("button",{className:"btn btn-primary",onClick:function(){return document.querySelector("form#update-profile-form").submit()}},"Salvar"))),l.a.createElement("div",{className:"d-flex justify-content-between align-items-center profile-data-container"},l.a.createElement("div",{className:"d-flex flex-column align-items-start"},l.a.createElement("p",{style:{padding:"15px"}},l.a.createElement("img",{src:"".concat(u).concat(a.photo),style:p})),l.a.createElement("p",{style:{marginBottom:0}},l.a.createElement("strong",null,a.first_name," ",a.last_name)),l.a.createElement("p",{className:"text-secondary",style:{marginTop:0}},"@",a.user.username),l.a.createElement("p",null,a.bio),l.a.createElement("p",{className:"text-secondary"},l.a.createElement("i",{className:"far fa-calendar-alt"})," Entrou em ",a.created.split("-").reverse().join("/")),l.a.createElement("p",null,l.a.createElement("strong",null,a.friends.length)," ",1===a.friends.length?"amigo":"amigos")),l.a.createElement("div",null,l.a.createElement("button",{className:"btn btn-secondary",type:"button",onClick:function(){return f(!0)}},"Editar perfil")))):l.a.createElement(l.a.Fragment,null))}function h(){return l.a.createElement("div",null,"Configura\xe7\xf5es")}function y(e){var t=Object(n.useState)(e.page?e.page:"Home"),a=Object(o.a)(t,2),r=a[0],c=a[1],i={Home:l.a.createElement(p,null),"Notifica\xe7\xf5es":l.a.createElement(E,null),Mensagens:l.a.createElement(b,null),Perfil:l.a.createElement(g,null),"Configura\xe7\xf5es":l.a.createElement(h,null)};return Object(n.useEffect)((function(){document.querySelector(".header > strong").innerText=r,document.title="".concat(r," / Napker"),window.history.pushState({header:r},"",r.toLowerCase())}),[r]),window.onpopstate=function(e){c(e.state.header)},document.querySelectorAll(".menu").forEach((function(e){return e.onclick=function(){c(e.id.charAt(0).toUpperCase()+e.id.slice(1))}})),document.querySelector(".logout").onclick=function(){window.confirm("Sair do Napker?\nVoc\xea poder\xe1 entrar novamente quando quiser.")&&window.location.replace("http://localhost:8000/logout")},l.a.createElement(l.a.Fragment,null,i[r])}try{var v=window.location.href.split("/")[3].charAt(0).toUpperCase()+window.location.href.split("/")[3].slice(1);switch(v){case"Notifica%C3%A7%C3%B5es":v="Notifica\xe7\xf5es";break;case"Configura%C3%A7%C3%B5es":v="Configura\xe7\xf5es"}"Home"!==v&&"Notifica\xe7\xf5es"!==v&&"Mensagens"!==v&&"Perfil"!==v&&"Configura\xe7\xf5es"!==v&&(v="Home"),c.a.render(l.a.createElement(y,{page:v}),document.querySelector("#root"))}catch(N){c.a.render(l.a.createElement(y,null),document.querySelector("#root"))}},7:function(e,t,a){e.exports=a(16)}},[[7,1,2]]]);
//# sourceMappingURL=main.d272034f.chunk.js.map