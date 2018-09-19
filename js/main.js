
localStorage.clear();

var pagina_atual = 0;

var botao_next = $('a.wizard-next')[0]; /* botão próximo*/
var botao_back = $('a.wizard-back')[0]; /* botão anterior*/


var nome = document.getElementById('nome');
var email = document.getElementById('email');
var empresa = document.getElementById('empresa');


var tempo_medio =  document.getElementById('tempo_medio');
var quantidade_orcamento =  document.getElementById('quantidade_orcamento');
var res_perguntas = document.getElementById('res_perguntas');
var perguntas_semana = document.getElementById('perguntas_semana');


var minutos_orcamento = document.getElementById('minutos_orcamento');
var valor_perguntas_semana = document.getElementById('valor_perguntas_semana');


var verificacao_por_minuto = document.getElementById('verificacao_por_minuto');
var duracao_para_organizar = document.getElementById('duracao_para_organizar');


var quantidade_minutos = document.getElementById('quantidade_minutos');


var organizar_minuto_contrato = document.getElementById('organizar_minuto_contrato');
var perda_de_tempo_por_material = document.getElementById('perda_de_tempo_por_material');



/* PRIMEIRA PÁGINA (login)*/
nome.addEventListener("blur", function( lo ) {
    localStorage.setItem('nome', lo.target.value)
})

email.addEventListener("blur", function( lo ) {
    localStorage.setItem('email', lo.target.value)
})

empresa.addEventListener("blur", function( lo ) {
    localStorage.setItem('empresa', lo.target.value)
})


/* SEGUNDA PÁGINA */
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


/* TERCEIRA PÁGINA */
verificacao_por_minuto.addEventListener("blur", function( event ) {
    localStorage.setItem('verificacao_por_minuto', event.target.value)
})

duracao_para_organizar.addEventListener("blur", function( event ) {
    localStorage.setItem('duracao_para_organizar', event.target.value)
})


/* QUARTA PÁGINA */
quantidade_minutos.addEventListener("blur", function( event ) {
    localStorage.setItem('quantidade_minutos', event.target.value)
})

/* QUINTA PÁGINA */
organizar_minuto_contrato.addEventListener("blur", function( event ) {
    localStorage.setItem('organizar_minuto_contrato', event.target.value)
})

perda_de_tempo_por_material.addEventListener("blur", function( event ) {
    localStorage.setItem('perda_de_tempo_por_material', event.target.value)
})


botao_next.addEventListener('click', function (e) {

    /* PRIMEIRA PÁGINA (login)*/
    var nome_valor = localStorage.getItem('nome');
    var email_valor = localStorage.getItem('email');
    var empresa_valor = localStorage.getItem('empresa');

    /* SEGUNDA PÁGINA */
    var tempo_medio_valor = localStorage.getItem('tempo_medio');
    var quantidade_orcamento_valor = localStorage.getItem('quantidade_orcamento');

    var perguntas_por_semana_valor = localStorage.getItem('perguntas_semana');
    var respostas_por_perguntas_valor = localStorage.getItem('res_perguntas');

    /* TERCEIRA PÁGINA */
    var verificacao_por_minuto_valor = localStorage.getItem('verificacao_por_minuto');
    var duracao_para_organizar_valor = localStorage.getItem('duracao_para_organizar');

    /* QUARTA PÁGINA */
    var tempo_de_preparo_de_contrato = localStorage.getItem('quantidade_minutos');

    /* QUINTA PÁGINA */
    var tempo_em_devolucao = localStorage.getItem('organizar_minuto_contrato');
    var perda_de_tempo_por_material_valor = localStorage.getItem('perda_de_tempo_por_material');

    var condicao = [
        (nome_valor.length > 0 && email_valor.length > 0 && empresa_valor.length > 0),
        (tempo_medio_valor > 0 && quantidade_orcamento_valor > 0 && perguntas_por_semana_valor > 0 &&  respostas_por_perguntas_valor > 0),
        (verificacao_por_minuto_valor > 0 && duracao_para_organizar_valor > 0)
    ];

    if (condicao[pagina_atual]) {
        localStorage.setItem('pagina_atual', ++pagina_atual);
    }

    if(pagina_atual == 5){
        mostrarResultdosNaTela();
    }

})


botao_back.addEventListener('click', function (e) {
    localStorage.setItem('pagina_atual', --pagina_atual);
})

function validaSeFormEstaPrenchido() {
    return nome.value.length
        && email.value.length
        && empresa.value.length;
}

function carregaOValorDosInputs() {


    /* CALCULO  PAGINA 1 */
    var tempo_medio_orcamento_por_mes = tempo_medio_valor * quantidade_orcamento_valor;

    /* CALCULO PÁGINA  2 */
    var respostas_por_semana_valor = perguntas_por_semana_valor * respostas_por_perguntas_valor;

    /* CALCULO PÁGINA  3 */
    var vericacao_de_organizacao_por_min =  verificacao_por_minuto_valor * duracao_para_organizar_valor;

    /* CALCULOS PÁGINA FIM */
    var tempo_ganho = tempo_medio_orcamento_por_mes + respostas_por_semana_valor + vericacao_de_organizacao_por_min + tempo_em_devolucao;
    var divisao_horas = tempo_ganho / 60;
    var tempo_perdido = divisao_horas / 180;

}







