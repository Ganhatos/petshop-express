const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const petshop = {
    atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(bancoDados, null, 2);
        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
    },
    listarPets: () => {
        let textoListaPets = "--------- Listando Pet -------- \n";

        bancoDados.pets.forEach((pet) => {
            textoListaPets += (`\nNome: ${pet.nome} \nIdade: ${pet.idade} \nTipo: ${pet.tipo} \nRaça: ${pet.raca} \n${(pet.vacinado ? 'Pet vacinado' : 'Pet não vacinado')}`);
            pet.servicos.forEach((servico) => {
                textoListaPets += (`\n${servico.data} - ${servico.nome}`);
            })
        })

        return textoListaPets;
    },
    vacinarPet: pet => {
        if (!pet.vacinado) {
            pet.vacinado = true;
            atualizarBanco();
            console.log(`${pet.nome} foi vacinado com sucesso!`);
        } else {
            console.log(`Ops, ${pet.nome} já está vacinado!`);
        }
    },
    campanhaVacina: () => {
        console.log("Campanha de vacina 2021");
        console.log("vacinando...");
    
        let petVacinadosCampanha = 0;
    
        bancoDados.pets = bancoDados.pets.map((pet) => {
            if (!pet.vacinado) {
                vacinarPet(pet);
                petVacinadosCampanha++;
            }
    
            return pet;
        });
    
        // atualizarBanco();
        console.log(`${petVacinadosCampanha} pets foram vaciados nessa campanha!`);
    },
    adicionarPet: (novoPet) => {
        bancoDados.pets.push(novoPet);
    
        petshop.atualizarBanco();
    },
    darBanhoPet: pet => {
        pet.servicos.push({
            'nome':'banho',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está de banho tomado!`);
    },
    tosarPet: pet => {
        pet.servicos.push({
            'nome':'tosa',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está com cabelinho na régua :)`);
    },
    apararUnhasPet: pet => {
        pet.servicos.push({
            'nome':'corte de unhas',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está de unhas aparadas!`);
    },
    atenderCliente: (pet, servico) => {
        console.log(`Olá, ${pet.nome}`);
        servico(pet);
        console.log('Até mais!');
    },
    buscarPet: (nomePet) => {

        let petEncontrado = bancoDados.pets.find((pet) => {
            return pet.nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
    },
    filtrarTipoPet: (tipoPet) => {
        // && E - AND
        // || OU - OR
        // == verifica valores iguais
        // === verifica valores e tipos iguais
        let petsEncontrados = bancoDados.pets.filter((pet) => {
            return pet.tipo == tipoPet;
        });
    
        return petsEncontrados;
    },
    clientePremium: (pet) => {
        // let nome = pet.nome;
        let {nome} = pet;
    
        let nServicos = pet.servicos.length;
    
        if (nServicos > 5) {
            console.log(`Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`);
        } else {
            console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
        }
    },
    contatoTutor: (pet) => {
        let {nome, tutor, contato} = pet;
        
        return `Tutor: ${tutor}
        Contato: ${contato}
        Pet: ${nome}`;
    },
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });
        
        console.log(`Pets do tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`)
        })
    }  
}

module.exports = petshop;