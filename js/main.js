

var pagina_atual = 1;
var botao_next = $('a.wizard-next')[0];
var botao_back = $('a.wizard-back')[0];

var nome = document.getElementById('nome');
var email = document.getElementById('email');
var empresa = document.getElementById('empresa');
var minutos_orcamento = document.getElementById('minutos_orcamento'); 
var  valor_perguntas_semana = document.getElementById('valor_perguntas_semana');
var resut_tempo_verificacao = document.getElementById('resut_tempo_verificacao');
var gasto_ano = document.getElementById('gasto_ano');


nome.addEventListener("blur", function( lo ) {
    localStorage.setItem('nome', lo.target.value)  
})

email.addEventListener("blur", function( lo ) {
    localStorage.setItem('email', lo.target.value)  
})

empresa.addEventListener("blur", function( lo ) {
    localStorage.setItem('empresa', lo.target.value)  
})


botao_next.addEventListener('click', function (e) {
    
   
   
    if (validaSeFormEstaPrenchido()){
        localStorage.setItem('pagina_atual', ++pagina_atual);
        
        if(pagina_atual == 6){
            var tempo_medio_valor = localStorage.getItem('tempo_medio');
            var quantidade_orcamento_valor = localStorage.getItem('quantidade_orcamento');

            var tempo_medio_orcamento_por_mes = tempo_medio_valor * quantidade_orcamento_valor;
            
            minutos_orcamento.innerText = tempo_medio_orcamento_por_mes;



            // valor do Y 
            var res_perguntas_valor = localStorage.getItem('res_perguntas');
            var perguntas_semana_valor = localStorage.getItem('perguntas_semana');

            var perguntas_por_semana  = res_perguntas_valor * perguntas_semana_valor;

            valor_perguntas_semana.innerText = perguntas_por_semana;

            // valor do Z

            var verificacao_por_minuto_valor = localStorage.getItem('verificacao_por_minuto');
            var duracao_para_organizar_valor = localStorage.getItem('duracao_para_organizar');

            var tempo_de_verificacao = verificacao_por_minuto_valor * duracao_para_organizar_valor;

            resut_tempo_verificacao.innerText  = tempo_de_verificacao;

            //valor do U

            var quantidade_minutos_valor = localStorage.getItem('quantidade_minutos');
            var organizar_minuto_contrato = localStorage.getItem('organizar_minuto_contrato');

            var quantidade


        }
    }
})

botao_back.addEventListener('click', function (e) {
    localStorage.setItem('pagina_atual', --pagina_atual);
})





var tempo_medio =  document.getElementById('tempo_medio');
var quantidade_orcamento =  document.getElementById('quantidade_orcamento');

var res_perguntas = document.getElementById('res_perguntas');
var perguntas_semana = document.getElementById('perguntas_semana');

var verificacao_por_minuto = document.getElementById('verificacao_por_minuto');
var duracao_para_organizar = document.getElementById('duracao_para_organizar');

var quantidade_minutos = document.getElementById('quantidade_minutos');
var organizar_minuto_contrato = document.getElementById('organizar_minuto_contrato');



tempo_medio.addEventListener("blur", function( event ) {
    localStorage.setItem('tempo_medio', event.target.value)  
})

quantidade_orcamento.addEventListener("blur", function( event ) {
    localStorage.setItem('quantidade_orcamento', event.target.value)  
})

perguntas_semana.addEventListener("blur", function( event ) {
    localStorage.setItem('perguntas_semana', event.target.value)  
})

res_perguntas.addEventListener("blur", function( event ) {
    localStorage.setItem('res_perguntas', event.target.value)  
})


verificacao_por_minuto.addEventListener("blur", function( event ) {
    localStorage.setItem('verificacao_por_minuto', event.target.value)  
})

duracao_para_organizar.addEventListener("blur", function( event ) {
    localStorage.setItem('duracao_para_organizar', event.target.value)  
})

quantidade_minutos.addEventListener("blur", function( event ) {
    localStorage.setItem('quantidade_minutos', event.target.value)  
})

organizar_minuto_contrato.addEventListener("blur", function( event ) {
    localStorage.setItem('organizar_minuto_contrato', event.target.value)  
})


function validaSeFormEstaPrenchido() {
    return nome.value.length 
        && email.value.length 
        && empresa.value.length;
}




