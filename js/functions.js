 // Concatena a classe 'js' à tag html
 document.documentElement.className += ' js';

 "use strict";
     var listaDeps = new Array();
     var listaNomeDeps = new Array();
     var numeroDeDeputados;
     // http-server . -p 1337

     /* buscarListaDeps
         Carrega 'listaDeps' com os dados obtidos do recurso paginado,
         em chamadas sucessivas
     */

     function buscarListaDeps2 (urlInicio) {
         var corpoResposta;
         var req = new XMLHttpRequest();
         var dados;

         req.open ("GET", urlInicio);
         req.onreadystatechange = function (evt) {
            if (req.readyState === req.DONE &&
                 req.status >= 200 && req.status < 300) {
                 // A requisição foi respondida com sucesso.
                 corpoResposta = JSON.parse(req.responseText);

                 listaDeps = listaDeps.concat(corpoResposta.dados);

                 // Se houver um link de rel="next" na resposta, chamar a função de busca
                 // outra vez usando esse link
                 // VERSÃO COM LOOP FOR
                 for (var i = 0; i < corpoResposta.links.length; i++) {

                     if (corpoResposta.links[i].rel === "next") {
                         buscarListaDeps(corpoResposta.links[i].href);
                         return;
                     }
                 }

                 geraListaDeputados();
                 menuCarregarOpcoes();
                 carregaPaginacao();

             } // FIM DO "IF"
         } // FIM DE onreadystatechange
         req.setRequestHeader ("Accept", "application/json");
         req.send();
     }

     //buscarListaDeps("https://dadosabertos.camara.leg.br/api/v2/deputados?itens=100");


     function buscarListaDeps (urlInicio,callback) {
         var corpoResposta;
         var req = new XMLHttpRequest();
         var dados;
         var i=0;

         req.open ("GET", urlInicio);
         req.onreadystatechange = function (evt) {
            if (req.readyState === req.DONE &&
                 req.status >= 200 && req.status < 300) {
                 // A requisição foi respondida com sucesso.
                 corpoResposta = JSON.parse(req.responseText);

                 listaDeps = listaDeps.concat(corpoResposta.dados);

                 console.log(listaDeps);
                 
                 while (listaDeps[i]) {
                     listaNomeDeps.push(listaDeps[i].nome);
                     i++;
                 }
                 numeroDeDeputados=i;

                 geraListaDeputados();
                 autocomplete(document.getElementById("pesquisarDepAutoComplete"), listaNomeDeps);
                 carregaPaginacao(1);
             } // FIM DO "IF"
         } // FIM DE onreadystatechange
         req.setRequestHeader ("Accept", "application/json");
         req.send();
     }

     function carregaDeputado(deputado) {
         /*var menuwdg = document.getElementById("menudeps");

         escolhido = menuwdg.value;
         for (var i = 0; i < listaDeps.length; i++) {
             if (listaDeps[i].nome === escolhido) {
                  mostrarDeputado (listaDeps[i]);
             }
         }*/
         return(                   
             `
             <div class="col-sm-6">
                 <div class="card mb-3">
                     <div class="card-header">
                         ${deputado.nome}
                     </div>
                     <div class="card-body">
                         <div class="row">
                             <div class="col-sm-4">
                                 <img class="card-img-top img-fluid rounded" src="${deputado.urlFoto}" alt="Card image cap" >
                             </div>
                             <div class="col-sm-8">
                                 <blockquote mt-4>
                                     <b>Nome Eleitoral</b><p>${deputado.nome}</p> 
                                     <b>Partido:</b> <cite>${deputado.siglaPartido}</cite>&nbsp;&nbsp;&nbsp;<b>UF:</b> <cite>${deputado.siglaUf}</cite>
                                 </blockquote>
                                 <p><i class="far fa-envelope"> <b>Email:</b></i><br> ${deputado.email}</p>
                             </div>
                         </div>
                         <div class="mt-2" align="center">
                              <button type="button" class="btn btn-primary" data-toggle="modal" 
                                      data-target="#exampleModal" data-whatever=${deputado.id}>Mais informações</button>

                         </div>

                     </div>
                     
                 </div>

             </div>
             `)
     }

     function mostrarDeputado (dep) {
         var wdgFoto = document.getElementById("fotodep");
         var wdgNome = document.getElementById("nomedep");
         var wdgPartEst = document.getElementById("part-est");

         // A URL da foto é colocada como valor do atributo "src"
         //    do elemento <img> identificado com o id "fotodep"
         wdgFoto.setAttribute("src", dep.urlFoto);

         // O nome é inserido como conteúdo do elemento com id "nome"
         wdgNome.innerHTML = dep.nome;
         wdgPartEst.innerHTML = dep.siglaPartido + "-" + dep.siglaUf;
     }

     function geraListaDeputados(deputados){
         var userDetail = listaDeps;
         var deputadoCardsDiv = document.getElementById('deputadoCard');
         deputadoCardsDiv.innerHTML = userDetail.slice(0, 50).map(user => 
                 carregaDeputado(user)
         ).join('')                                    
            
     }

     function carregaPaginacao(pagina){
       console.log

         var numeroDeDeputadosPorPagina = 50;
         var numeroDePaginas = Math.ceil(numeroDeDeputados/numeroDeDeputadosPorPagina);

         var pageNumbers = Array.from(Array(numeroDePaginas), (e,i)=>i+1)//Array.apply(null, {length: numeroDePaginas}).map(Number.call, Number)
         
         document.getElementById('paginacaoDeputados').innerHTML = pageNumbers.map(page =>
         {
           if(page==pagina){
             return (`
               <li class="page-item active"><a class="page-link" id=${page} onclick="mudancaPaginacao(this.id)">${page}</a></li>
             `)
           }else{
             return (`
               <li class="page-item"><a class="page-link" id=${page} onclick="mudancaPaginacao(this.id)">${page}</a></li>
             `)
           }
         }

         ).join('')                                    
         
     }

     function mudancaPaginacao(numeroPagina){
         var corpoResposta;
         var req = new XMLHttpRequest();
         var dados;
         var url = "https://dadosabertos.camara.leg.br/api/v2/deputados?itens=50&pagina="+numeroPagina


         req.open ("GET", url);
         req.onreadystatechange = function (evt) {
            if (req.readyState === req.DONE &&
                 req.status >= 200 && req.status < 300) {
                 // A requisição foi respondida com sucesso.
                 corpoResposta = JSON.parse(req.responseText);
                 // Limpa região dos cards
                 var elem=window.parent.document.getElementById('deputadoCard');
                 elem.innerHTML="";
                
                //$('#deputadoCard').html("");
                 listaDeps = []
                 listaDeps = listaDeps.concat(corpoResposta.dados);

                 console.log(listaDeps);
                 
                 geraListaDeputados();
                 carregaPaginacao(numeroPagina);


             } // FIM DO "IF"
         } // FIM DE onreadystatechange
         req.setRequestHeader ("Accept", "application/json");
         req.send();
     }

     function autocomplete(inp, arr) {
       
       /*the autocomplete function takes two arguments,
       the text field element and an array of possible autocompleted values:*/
       var currentFocus;
       /*execute a function when someone writes in the text field:*/
       inp.addEventListener("input", function(e) {
           var a, b, i, val = this.value;
           /*close any already open lists of autocompleted values*/
           closeAllLists();
           if (!val) { return false;}
           currentFocus = -1;
           /*create a DIV element that will contain the items (values):*/
           a = document.createElement("DIV");
           a.setAttribute("id", this.id + "autocomplete-list");
           a.setAttribute("class", "autocomplete-items");
           /*append the DIV element as a child of the autocomplete container:*/
           this.parentNode.appendChild(a);
           /*for each item in the array...*/
           for (i = 0; i < arr.length; i++) {
             /*check if the item starts with the same letters as the text field value:*/
             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
               /*create a DIV element for each matching element:*/
               b = document.createElement("DIV");
               /*make the matching letters bold:*/
               b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
               b.innerHTML += arr[i].substr(val.length);
               /*insert a input field that will hold the current array item's value:*/
               b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
               /*execute a function when someone clicks on the item value (DIV element):*/
                   b.addEventListener("click", function(e) {
                   /*insert the value for the autocomplete text field:*/
                   inp.value = this.getElementsByTagName("input")[0].value;
                   /*close the list of autocompleted values,
                   (or any other open lists of autocompleted values:*/
                   closeAllLists();
               });
               a.appendChild(b);
             }
           }
       });
       /*execute a function presses a key on the keyboard:*/
       inp.addEventListener("keydown", function(e) {
           var x = document.getElementById(this.id + "autocomplete-list");
           if (x) x = x.getElementsByTagName("div");
           if (e.keyCode == 40) {
             /*If the arrow DOWN key is pressed,
             increase the currentFocus variable:*/
             currentFocus++;
             /*and and make the current item more visible:*/
             addActive(x);
           } else if (e.keyCode == 38) { //up
             /*If the arrow UP key is pressed,
             decrease the currentFocus variable:*/
             currentFocus--;
             /*and and make the current item more visible:*/
             addActive(x);
           } else if (e.keyCode == 13) {
             /*If the ENTER key is pressed, prevent the form from being submitted,*/
             e.preventDefault();
             if (currentFocus > -1) {
               /*and simulate a click on the "active" item:*/
               if (x) x[currentFocus].click();
             }
           }
       });
       function addActive(x) {
         /*a function to classify an item as "active":*/
         if (!x) return false;
         /*start by removing the "active" class on all items:*/
         removeActive(x);
         if (currentFocus >= x.length) currentFocus = 0;
         if (currentFocus < 0) currentFocus = (x.length - 1);
         /*add class "autocomplete-active":*/
         x[currentFocus].classList.add("autocomplete-active");
       }
       function removeActive(x) {
         /*a function to remove the "active" class from all autocomplete items:*/
         for (var i = 0; i < x.length; i++) {
           x[i].classList.remove("autocomplete-active");
         }
       }
       function closeAllLists(elmnt) {
         /*close all autocomplete lists in the document,
         except the one passed as an argument:*/
         var x = document.getElementsByClassName("autocomplete-items");
         for (var i = 0; i < x.length; i++) {
           if (elmnt != x[i] && elmnt != inp) {
           x[i].parentNode.removeChild(x[i]);
         }
       }
     }
     /*execute a function when someone clicks in the document:*/
     document.addEventListener("click", function (e) {
         closeAllLists(e.target);
     });
   }

     //TODO IMPLEMENTAR CALLBACK
     buscarListaDeps("https://dadosabertos.camara.leg.br/api/v2/deputados");
     //carregaPaginacao(nuDeputados);
     //autocomplete(document.getElementById("pesquisarDepAutoComplete"), listaNomeDeps);
     //console.log(listaNomeDeps)

