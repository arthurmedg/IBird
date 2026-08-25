const TOKEN_API = 'c29d4d78-8262-4afa-9809-0cc3912b13c3';
const URL_BASE = 'https://api.ebird.org/v2/data/obs';

const formBusca = document.getElementById('formBusca');
const inputRegiao = document.getElementById('inputRegiao');
const botoesSugestoes = document.querySelectorAll('.btn-sugestoes');
const mensagemAviso = document.getElementById('mensagemAviso');
const sessaoResultados = document.getElementById('sessaoResultados');
const gradeAves = document.getElementById('gradeAves');
const tituloResultados = document.getElementById('tituloResultados');

formBusca.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita que a página recarregue
    const regiao = inputRegiao.value.trim().toUpperCase();
    buscarAves(regiao);
});

botoesSugestoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const regiao = botao.getAttribute('data-code');
        inputRegiao.value = regiao;
        buscarAves(regiao);
    });
});

async function buscarAves(regiao) {
    if (!regiao) return;

    
    mostrarMensagem('Carregando dados da região ' + regiao + '...', 'loading');
    sessaoResultados.classList.add('escondido');

    try {
        
        const resposta = await fetch(`${URL_BASE}/${regiao}/recent`, {
            method: 'GET',
            headers: {
                'x-ebirdapitoken': TOKEN_API
            }
        });

        
        if (!resposta.ok) {
            throw new Error('Região não encontrada ou erro na API.');
        }

        const dados = await resposta.json();

        
        if (dados.length === 0) {
            throw new Error('Nenhuma ave encontrada recentemente nessa região.');
        }

        
        renderizarAves(dados, regiao);

    } catch (erro) {
        
        mostrarMensagem(erro.message, 'erro');
    }
}

// Função para exibir os cards no HTML
function renderizarAves(listaAves, regiao) {
    mensagemAviso.classList.add('escondido');
    gradeAves.innerHTML = '';

    tituloResultados.textContent = `${listaAves.length} observações em ${regiao}`;

    listaAves.forEach(ave => {
        const card = document.createElement('div');
        card.className = 'card-ave';

        let dataFormatada = ave.obsDt;
        if (dataFormatada.includes(' ')) {
            const partes = dataFormatada.split(' ');
            const dataInvertida = partes[0].split('-').reverse().join('/');
            dataFormatada = `${dataInvertida} às ${partes[1]}`;
        }

        card.innerHTML = `
            <h3>${ave.comName || 'Nome não informado'}</h3>
            <span class="nome-cientifico">${ave.sciName || 'Sem nome científico'}</span>
            <p>📍 <strong>Local:</strong> ${ave.locName}</p>
            <p>📅 <strong>Data:</strong> ${dataFormatada}</p>
            <p>👁️ <strong>Quantidade:</strong> ${ave.howMany || '1'}</p>
        `;

        gradeAves.appendChild(card);
    });

    sessaoResultados.classList.remove('escondido'); // Mostra a div de resultados
}

// Função auxiliar para mostrar erros ou loading
function mostrarMensagem(texto, tipo) {
    mensagemAviso.textContent = texto;
    mensagemAviso.classList.remove('escondido');
    
    if (tipo === 'erro') {
        mensagemAviso.className = 'aviso-erro';
    } else {
        mensagemAviso.className = 'aviso-loading';
    }
}
