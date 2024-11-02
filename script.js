let classificacao = []; // Array para armazenar os pilotos e seus tempos
const usuarioPermitido = "Customs"; // Substitua pela sua senha

// Função para mostrar o formulário de adição de pilotos
function mostrarFormulario() {
    document.getElementById("formulario").style.display = "block";
}

// Função para liberar o formulário
function liberarFormulario() {
    const senha = document.getElementById('senha').value;
    if (senha === usuarioPermitido) {
        document.getElementById("formulario").style.display = "block"; // Exibe o formulário
        carregarPilotos(); // Carrega pilotos do Firestore
    } else {
        alert("Senha incorreta.");
    }
}

// Função para adicionar pilotos
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

    // Adiciona o piloto ao Firestore
    adicionarPilotoAoFirestore(nome, tempoEmCentésimos);
}

// Função para carregar pilotos do Firestore
function carregarPilotos() {
    db.collection("pilotos").get().then((querySnapshot) => {
        classificacao = []; // Limpa a classificação antes de carregar
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            classificacao.push({ nome: data.nome, tempo: data.tempo });
        });
        atualizarTabela(); // Atualiza a tabela com os dados carregados
    });
}

// Outras funções (converterTempoParaCentésimos, atualizarTabela, formatarTempo) permanecem as mesmas
