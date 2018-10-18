
// var preencherDados = function() {
//     $('#nome').change(function(){
//         if(this.value === 'teste') {
//             $('#email').val('teste@mail.com');
//             $('#email').val('teste@mail.com');
//             $('#email').val('teste@mail.com');
//             $('#email').val('teste@mail.com');
//             $('#email').val('teste@mail.com');
//             $('#email').val('teste@mail.com');
//             $('#email').val('teste@mail.com');
//         }
//     })
// }

localStorage.clear();
// preencherDados();

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

var empresa_faturada = document.getElementById('faturamento_empresarial');


var verificacao_por_minuto = document.getElementById('verificacao_por_minuto');
var duracao_para_organizar = document.getElementById('duracao_para_organizar');
var valor_medio_prolabore = document.getElementById('valor_prolabore');
var horas_trabalhada_por_mes = document.getElementById('horas_trabalhadas')

var quantidade_minutos = document.getElementById('quantidade_minutos');


var organizar_minuto_contrato = document.getElementById('organizar_minuto_contrato');
var perda_de_tempo_por_material = document.getElementById('perda_de_tempo_por_material');

var tempo_ganho = document.getElementById('tempo_ganho');

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
    empresa_faturada.addEventListener("blur", function(event){
        var value = $('#faturamento_empresarial').cleanVal();
        localStorage.setItem('faturamento_empresarial', value)
    })


    /* TERCEIRA PÁGINA */
    verificacao_por_minuto.addEventListener("blur", function( event ) {
        localStorage.setItem('verificacao_por_minuto', event.target.value)
    })

    duracao_para_organizar.addEventListener("blur", function( event ) {
        localStorage.setItem('duracao_para_organizar', event.target.value)
    })


    verificacao_por_minuto.addEventListener("blur", function( event ) {
        localStorage.setItem('verificacao_por_minuto', event.target.value)
    })

    duracao_para_organizar.addEventListener("blur", function( event ) {
        localStorage.setItem('duracao_para_organizar', event.target.value)
    })
    valor_medio_prolabore.addEventListener("blur", function(event){
        var value2 = $('#valor_prolabore').cleanVal();
        localStorage.setItem('valor_prolabore',value2)
    })
    horas_trabalhada_por_mes.addEventListener("blur", function(event){
        localStorage.setItem('horas_trabalhadas', event.target.value )
    })

    /* QUARTA PÁGINA */
    quantidade_minutos.addEventListener("blur", function( event ) {
        localStorage.setItem('quantidade_minutos', event.target.value)
    })

    /* QUINTA PÁGINA */
    organizar_minuto_contrato.addEventListener("blur", function( event ) {
        localStorage.setItem('organizar_minuto_contrato', event.target.value)
    });

    perda_de_tempo_por_material.addEventListener("blur", function( event ) {
        localStorage.setItem('perda_de_tempo_por_material', event.target.value)
    });

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

    var empresa_faturada_valor = localStorage.getItem('faturamento_empresarial');

    /* TERCEIRA PÁGINA */
    var verificacao_por_minuto_valor = localStorage.getItem('verificacao_por_minuto');
    var duracao_para_organizar_valor = localStorage.getItem('duracao_para_organizar');
    var valor_medio_prolabore_valor = localStorage.getItem('valor_prolabore');
    var horas_trabalhada_por_mes_valor = localStorage.getItem('horas_trabalhadas');
    /* QUARTA PÁGINA */
    var tempo_de_preparo_de_contrato = localStorage.getItem('quantidade_minutos');

    /* QUINTA PÁGINA */
    var tempo_em_devolucao = localStorage.getItem('organizar_minuto_contrato');
    var perda_de_tempo_por_material_valor = localStorage.getItem('perda_de_tempo_por_material');

    var condicao = [
        (nome_valor.length > 0 && email_valor.length > 0 && empresa_valor.length > 0),
        (tempo_medio_valor > 0 && quantidade_orcamento_valor > 0 &&  empresa_faturada_valor > 0 && perguntas_por_semana_valor > 0 &&  respostas_por_perguntas_valor > 0),
        (verificacao_por_minuto_valor > 0 && duracao_para_organizar_valor > 0 && valor_medio_prolabore_valor > 0 && horas_trabalhada_por_mes_valor > 0),
        (tempo_de_preparo_de_contrato > 0),
        (tempo_em_devolucao > 0 && perda_de_tempo_por_material_valor > 0)
    ];

    if (condicao[pagina_atual]) {
        localStorage.setItem('pagina_atual', ++pagina_atual);
    }

    if(pagina_atual == 5){


        // /* CALCULO  PAGINA 2 */

        var tempo_medio_orcamento_por_mes = parseInt(tempo_medio_valor) * parseInt(quantidade_orcamento_valor);
        var respostas_por_semana_valor = parseInt(perguntas_por_semana_valor) * parseInt(respostas_por_perguntas_valor);
        var empresa_faturada = parseInt(empresa_faturada_valor);

        // CALCULO PAGINA 3

        var vericacao_de_organizacao_por_min = parseInt(verificacao_por_minuto_valor) + parseInt(duracao_para_organizar_valor);
        var trabalho = parseInt(horas_trabalhada_por_mes_valor);
        

        // CALCULO PAGINA 4

        var media_de_minutos_pra_se_concentrar = parseInt(tempo_de_preparo_de_contrato);


       // CALCULO PAGINA 5
        
       var tempo_de_organizacao_em_media_e_minutos = parseInt(tempo_em_devolucao) + parseInt(perda_de_tempo_por_material_valor);

        // CALCULO FINAL

        var tempo_ganho_valor = tempo_medio_orcamento_por_mes + respostas_por_semana_valor + vericacao_de_organizacao_por_min + media_de_minutos_pra_se_concentrar + tempo_de_organizacao_em_media_e_minutos ;
        var divisao_horas_valor = (tempo_ganho_valor / 60);
        var tempo_gasto_valor = (divisao_horas_valor / horas_trabalhada_por_mes_valor) * 100; //essa variavel 180 vai mudar

        var media_em_hora = valor_medio_prolabore_valor / trabalho;

        var custo_mensal_desperdicisado =  media_em_hora * divisao_horas_valor / 100; // B17
    
        var quantidade_despedicado_investido = (490 / custo_mensal_desperdicisado) * 100;
        var economia_feita_valor = custo_mensal_desperdicisado - 490; // B20

        var aumento_faturado_valor =  empresa_faturada + (empresa_faturada * tempo_gasto_valor) / 1000; //B19

        var formatacao_aumento_faturado_valor = new Intl.NumberFormat('pt-BR').format(aumento_faturado_valor)

        var custo_de_desperdicio_a_investir = custo_mensal_desperdicisado * quantidade_despedicado_investido;
        var parte_do_valor_investido = custo_de_desperdicio_a_investir / 100;

        tempo_perdido.innerText = tempo_gasto_valor.toFixed(2);
        horas.innerText = divisao_horas_valor.toFixed();
        custo_desperdicado.innerText =  Math.round(custo_mensal_desperdicisado);
        quantidade_desperdicada.innerText = quantidade_despedicado_investido.toFixed(2);
        economia_feita.innerText = Math.round(economia_feita_valor);
        valor_investido.innerText = parte_do_valor_investido.toFixed();
        faturado.innerText = formatacao_aumento_faturado_valor;

        const contagem = {
            1820289217: localStorage.getItem('nome'),
            2047821647: localStorage.getItem('email'),
            1000049728: localStorage.getItem('empresa'),        
            2009000330: localStorage.getItem('tempo_medio'),
            1020183055: localStorage.getItem('quantidade_orcamento'),
            1445286880: localStorage.getItem('faturamento_empresarial'),
            1764189169: localStorage.getItem('perguntas_semana'),
            2008025762: localStorage.getItem('res_perguntas'), 
            1909001603: localStorage.getItem('verificacao_por_minuto'),
            1526918565: localStorage.getItem('duracao_para_organizar'),
            399523795:  localStorage.getItem('valor_prolabore'),
            1774799188:  localStorage.getItem('horas_trabalhadas'),
            1909001603:  localStorage.getItem('quantidade_minutos'),
            1052932838: localStorage.getItem('organizar_minuto_contrato'),
            1211500455: localStorage.getItem('perda_de_tempo_por_material')        
        }

       window.GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdNG_JKUBFG1doIWTLMCXOUuckM3jXGgutL_2qQbWV_9sm3Qw/viewform?usp=sf_link";
           
            var output;
            //Ajax post data to server
            $.ajax({
                url: GOOGLE_FORM_URL,
                type: "POST",
                crossDomain: true,
                data: contagem,
                dataType: 'json',
                accepts: "text/html; charset=utf-8",
                success: function (response) {
                    console.log(response);
                    // if (response.type == 'error') {
                    //     output = '<div class="error">' + response.text + '</div>';
                    // } else {
                    //     window.location.href = REDIRECT_TO;
                    // }
                },
                error: function (xhr, status) {
                    console.log(xhr,status);
                    // var msg = "Desculpe! Ocorreu um erro inesperado."
                    // output = '<div class="error">' + msg + '</div>';
                    // $(theform).find('#result').hide().html(output).slideDown();
                }
            });

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

