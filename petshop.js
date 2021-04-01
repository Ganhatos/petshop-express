const moment = require("moment");
const fs = require("fs");
const caminhoBancoDeDados = "./bancoDados.json";
let bancoDados = JSON.parse(fs.readFileSync(caminhoBancoDeDados, "utf-8"));

bancoDados = JSON.parse(bancoDados);

const petshop = {
    buscarPet: (nomePet) => {
        let found = pets.find((el) => el.nome == nomePet);
        return found
            ? found
            : console.log(`Nenhum pet encontrado com nome ${nomePet}`);
    },

    pesquisarPet: (nomePet) => {
        if (buscarPet(nomePet) != null) console.log(buscarPet(nomePet));
        else buscarPet(nomePet);
    },

    filtrarTipoPet: (tipoPet) => {
        let especiesFiltradas = pets.filter((pet) => pet.tipo == tipoPet);
        return especiesFiltradas;
    },

    indiceDoPet: (nomePet) => {
        for (let i = 0; i < pets.length; i++) {
            if (pets[i].nome == nomePet) {
                return i;
            }
        }
    },

    escreverJSON: () => {
        let dadosJS = JSON.stringify(bancoDeDados, null, 4);

        fs.writeFileSync(caminhoBancoDeDados, dadosJS, "utf-8");
    },

    listarPets: () => {
        console.log("--------- Listando Pets --------");
        pets.forEach((pet) => {
            let { nome, idade, tipo, raca, servicos, vacinado } = pet;

            console.log(
                `Nome: ${nome} \nIdade: ${idade} \nTipo: ${tipo} \nRaça: ${raca}`
            );

            console.log("Serviços:");
            for (let servico of servicos) {
                let { nome, data } = servico;
                console.log(`${data} - ${nome}`);
            }

            vacinado
                ? console.log(`${nome} está vacinado!`)
                : console.log(`${nome} NÃO está vacinado!`);
            console.log("--------------------------------");
        });
    },

    vacinarPet: (nomePet) => {
        if (buscarPet(nomePet) != null) {
            if (buscarPet(nomePet).vacinado == true) {
                console.log(`Ops, ${nomePet} já está vacinado!`);
            } else {
                buscarPet(nomePet).vacinado = true;
                escreverJSON();
                console.log(`${nomePet} foi vacinado com sucesso!`);
            }
        } else buscarPet(nomePet);
    },

    campanhaVacina: () => {
        console.log("Campanha de vacina");

        let soma = 0;
        let totalVacinados = 0;
        pets.map(function () {
            if (!pets[soma].vacinado) {
                vacinarPet(pets[soma].nome);
                totalVacinados++;
            }
            soma++;
        });

        totalVacinados == 0
            ? console.log("Nenhum pet foi vacinado.")
            : totalVacinados == 1
            ? console.log(`${totalVacinados} pet foi vacinado!`)
            : console.log(`${totalVacinados} pets foram vacinados!`);
    },

    adicionarPet: (
        nome,
        tipo,
        idade,
        raca,
        peso,
        tutor,
        contato,
        vacinado,
        servicos
    ) => {
        if (buscarPet(nome) == null) {
            let dados = {
                nome: nome,
                tipo: tipo,
                idade: idade,
                raca: raca,
                peso: peso,
                tutor: tutor,
                contato: contato,
                vacinado: Boolean(vacinado),
                servicos: servicos,
            };

            pets.push(dados);

            escreverJSON();

            console.log(`${dados.nome} foi adicionado(a) com sucesso!`);
        } else console.log(`${nome} já está cadastrado, tente outro nome!`);
    },

    clientePremium: (nomePet) => {
        if (buscarPet(nomePet) == null) {
            const contadorServicos = pets[indiceDoPet(nomePet)].servicos.length;

            switch (contadorServicos) {
                case 0:
                    console.log("Nenhum serviço encontrado!");
                    break;
                case 1:
                    console.log(
                        `${nomePet} realizou ${contadorServicos} serviço!`
                    );
                    console.log(
                        "Realize mais um serviço para obter 10% de desconto!"
                    );
                    break;
                case 2:
                    console.log(
                        `${nomePet} realizou ${contadorServicos} serviços!`
                    );
                    console.log("Parabéns você obteve 10% de desconto!");
                    break;
                case 3:
                    console.log(
                        `${nomePet} realizou ${contadorServicos} serviços!`
                    );
                    console.log("Parabéns, você obteve 20% de desconto!");
                    break;
                default:
                    console.log(
                        `${nomePet} realizou ${contadorServicos} serviços!`
                    );
                    console.log("Parabéns, você obteve 30% de desconto!");
            }
        } else buscarPet(nomePet);
    },

    atenderCliente: (servico, nomePet) => {
        if (buscarPet(nomePet) != null) {
            pets[indiceDoPet(nomePet)].servicos.push(
                JSON.parse(
                    JSON.stringify({
                        nome: servico,
                        data: moment().format("DD-MM-YYYY"),
                    })
                )
            );

            escreverJSON();

            clientePremium(nomePet);

            switch (servico) {
                case "banho":
                    console.log(`${nomePet} está de banho tomado!`);
                    break;
                case "tosa":
                    console.log(`${nomePet} está com cabelinho na régua!`);
                    break;
                case "corte de unhas":
                    console.log(`${nomePet} está de unhas aparadas!`);
                    break;
            }
        } else buscarPet(nomePet);
    },

    contatoTutor: (nomePet) => {
        let { nome, tutor, contato } = nomePet;

        return `Tutor: ${tutor} \nContato: ${contato} \nPet: ${nome}`;
    },

    filtrarTutor: (nomeTutor) => {
        let petsTutor = pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });

        console.log(`-- Pets do tutor ${nomeTutor} --`);
        petsTutor.forEach((pet) => {
            console.log(`${contatoTutor(pet)}`);
            console.log("-------------");
        });
    },
};

module.exports = petshop;
