sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("jogovelha.controller.Main", {
            onInit: function () {
                this.vez = 'X';
                //Matriz de possiblidades de vitórias
                this.vitorias_possiveis = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [1, 5, 9],
                    [3, 5, 7],
                    [1, 4, 7],
                    [2, 5, 8],
                    [3, 6, 9],
                ];
            },

            onClickCasa: function (oEvent) {
                //obter referencia do objeto que foi clicado
                let casa = oEvent.getSource();

                //obter imagem atual
                let imagem = casa.getSrc();

                //verifica se a imagem é branco
                if (imagem == "../img/Branco.png") {

                    //comando para adicionar imagem
                    casa.setSrc("../img/" + this.vez + ".png");

                    //logica para verificar ganhador do jogo
                    //desvio condicional
                    if (this.temVencedor() == true) {
                        //alert("O jogador " + this.vez + " ganhou");
                        MessageBox.success("O jogador " + this.vez + " ganhou");
                        return;
                    }

                    if (this.vez == 'X') {
                        this.vez = 'O';
                        //chamar função de jogada do computador
                        this.jogadaComputador();
                    } else {
                        this.vez = 'X';
                    }

                }

            },
            temVencedor: function () {
                if (this.casasIguais(1, 2, 3) || this.casasIguais(4, 5, 6) || this.casasIguais(7, 8, 9)
                    || this.casasIguais(1, 4, 7) || this.casasIguais(2, 5, 8) || this.casasIguais(3, 6, 9)
                    || this.casasIguais(1, 5, 9) || this.casasIguais(3, 5, 7)) {
                    return true;
                }
            },
            casasIguais: function (a, b, c) {
                //obtenho objetos da tela 
                let casaA = this.byId("casa" + a);
                let casaB = this.byId("casa" + b);
                let casaC = this.byId("casa" + c);
                //obtenho imagens da tela
                let imagemA = casaA.getSrc();
                let imagemB = casaB.getSrc();
                let imagemC = casaC.getSrc();
                //verificação se imagens são iguais
                if ((imagemA == imagemB) && (imagemB == imagemC) && (imagemA !== "../img/Branco.png")) {
                    return true;
                }
            },
            jogadaComputador: function () {
                let listaPontosX = [];
                let listaPontosO = [];
                //lista de jogadas possíveis
                let jogadaInicial = [];
                let jogadaVitoria = [];
                let jogadarisco = [];
                let tentativaVitoria = [];

                //calculo da pontuação de cada possibilidade de vitória
                this.vitorias_possiveis.forEach((combinacao) => {
                    //zera pontos iniciais
                    let pontosX = 0;
                    let pontosO = 0;

                    //debugger
                    //dentro das vitórias possíveis, fazer um loop para verificar cada casa daquela combinação
                    combinacao.forEach((posicao) => {
                        let casa = this.byId("casa" + posicao);
                        let imagem = casa.getSrc();
                        //dar pontuação de acordo com quem jogou
                        if (imagem == '../img/X.png') pontosX++;
                        if (imagem == '../img/O.png') PontosO++;
                    }
                    );
                    //atribui ponto para conbinação para possíveis vitórias
                    listaPontosX.push(pontosX);
                    listaPontosO.push(pontosO);
                }
                );
                //jogar com base na maior pontuação (ou maior prioridade para não perder)
                //para cada possibilidade de vitória do jogador O, ver quantos pontos X tem na mesma combinação
                //loop na lista de pontos do O
                listaPontosO.forEach((posicao, index) => {
                    //ver quantos pontos o jogador O tem
                    switch (posicao) {
                        case 0:
                            if (listaPontosX[index] == 2) {
                                jogadarisco.push(this.vitorias_possiveis[index]);
                            } else if (listaPontosX[index] == 1) {
                                jogadaInicial.push(this.vitorias_possiveis[index]);
                            }
                            break;

                        case 1:
                            if (listaPontosX[index] == 1) {

                            } else if (listaPontosX[index] == 0) {
                                tentativaVitoria.push(this.vitorias_possiveis[index]);
                            }
                            break;

                        case 2:
                            if (listaPontosX[index] == 0) {
                                jogadaVitoria.push(this.vitorias_possiveis[index]);
                            }

                    }
                }

                );
                //debugger
                //jogar na combinação da maior prioridade
                if (jogadaVitoria.length > 0) {
                    //jogar na combinação de vitória
                    this.jogadaIA(jogadaVitoria);

                } else if (jogadarisco.length > 0) {
                    //jogar onde posso perder
                    this.jogadaIA(jogadarisco);

                } else if (tentativaVitoria.length > 0) {
                    //jogar onde posso tentar ganhar
                    this.jogadaIA(tentativaVitoria);

                } else if (jogadaInicial > 0) {
                    //jogada neutra
                    this.jogadaIA(jogadaInicial);
                }
            },

            jogadaIA: function (dados) {
                //separar numeros de casas que posso jogar
                let numeros = [];

                //verificar se casa possível se esta vazia
                //loop nas conbinação para verificar se casa esta vazia
                dados.forEach((combinacao) => {
                    //verificar cada casa individualmente
                    //outro loop
                    combinacao.forEach((num) => {
                        //verificar se casa esta vazia
                        let casa = this.byId("casa" + num);
                        let imagem = casa.getSrc();

                        if (imagem == '../img/Branco.png');
                        numeros.push(num);
                    }

                    )
                }

                )
                //jogada aleatória nos valores possíveis
                this.jogadaAleatoriaIA(numeros);
            },

            jogadaAleatoriaIA: function (numeros) {
                //math random gera numeros aleatorios entre 0 e 1
                //math floor pega apenas a parte inteira do número
                let numeroAleatorio = Math.random() * numeros.length;
                let numeroInteiro = Math.floor(numeroAleatorio);

                let jogada = numeros[numeroInteiro];
                let casa = this.byId("casa" + jogada);
                casa.setSrc("../img/O.png");

                if (this.temVencedor() == true) {
                    //alert("O jogador " + this.vez + " ganhou");
                    MessageBox.success("O jogador " + this.vez + " ganhou");
                } else {
                    this.vez = 'X';
                }

            }
        });
    });
