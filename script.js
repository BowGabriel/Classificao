let classificacao = []; // Array para armazenar os pilotos e seus tempos
const senhaPermitida = "customs"; // Substitua pela sua senha de acesso

function mostrarFormulario() {
    document.getElementById("formulario").style.display = "block"; // Exibe o formulário
}

function liberarFormulario() {
    const senha = document.getElementById('senha').value;

    // Verifica se a senha está correta
    if (senha === senhaPermitida) {
        document.getElementById("formulario").innerHTML = `
            <input type="text" id="nomePiloto" placeholder="Nome do Piloto" />
            <input type="text" id="tempoPiloto" placeholder="MM:ss:cc" />
            <button onclick="adicionarPiloto()">Adicionar Piloto</button>
            <button onclick="limparTabela()">Limpar Tabela</button>
        `;
    } else {
        alert('Senha incorreta!');
    }
}

// Funções para adicionar pilotos, converter tempo e atualizar a tabela
function adicionarPiloto() {
    const nome = document.getElementById('nomePiloto').value;
    const tempo = document.getElementById('tempoPiloto').value;

    // Validações
    if (!nome || !tempo) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Converte o tempo inserido para centésimos
    const tempoEmCentésimos = converterTempoParaCentésimos(tempo);
    if (tempoEmCentésimos === null) {
        alert('Formato de tempo inválido. Use MM:ss:cc');
        return;
    }

    // Adiciona o piloto e seu tempo ao array
    classificacao.push({ nome, tempo: tempoEmCentésimos });

    // Ordena a classificação
    classificacao.sort((a, b) => a.tempo - b.tempo);

    // Atualiza a tabela
    atualizarTabela();
}

function converterTempoParaCentésimos(tempo) {
    const partes = tempo.split(':');
    if (partes.length !== 3) return null; // Formato inválido

    const minutos = parseInt(partes[0]);
    const segundos = parseInt(partes[1]);
    const centésimos = parseInt(partes[2]);

    // Converte para centésimos
    return (minutos * 60 + segundos) * 100 + centésimos; 
}

function atualizarTabela() {
    const tabela = document.getElementById('tabelaClassificacao');
    
    // Limpa a tabela, mantendo o cabeçalho
    tabela.innerHTML = `
        <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Tempo</th>
        </tr>
    `;

    // Adiciona os dados atualizados à tabela
    classificacao.forEach((piloto, index) => {
        const tempoFormatado = formatarTempo(piloto.tempo);
        const classe = index < 15 ? 'piloto-verde' : 'piloto-branco'; // Classe para a cor do nome
        const linhaClasse = index === 14 ? 'piloto-vermelho' : ''; // Classe para a borda vermelha na 15ª linha

        tabela.innerHTML += `
            <tr class="${linhaClasse}">
                <td class="${classe}">${index + 1}</td>
                <td class="${classe}">${piloto.nome}</td>
                <td class="${classe}">${tempoFormatado}</td>
            </tr>
        `;
    });
}

function formatarTempo(tempo) {
    const centésimos = Math.floor(tempo % 100); // Centésimos com 2 dígitos
    const totalSegundos = Math.floor(tempo / 100);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;

    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}:${String(centésimos).padStart(2, '0')}`;
}

function limparTabela() {
    classificacao = []; // Limpa a classificação
    atualizarTabela(); // Atualiza a tabela para refletir a limpeza
}
