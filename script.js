document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu de acessibilidade
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    
    // Configurações iniciais
    const config = {
        tamanhoFonte: localStorage.getItem('tamanhoFonte') || 16,
        altoContraste: localStorage.getItem('altoContraste') === 'true',
        fonteDislexia: localStorage.getItem('fonteDislexia') === 'true'
    };
    
    // Aplicar configurações salvas
    function aplicarConfiguracoes() {
        // Tamanho da fonte
        document.body.style.fontSize = config.tamanhoFonte + 'px';
        
        // Alto contraste
        if (config.altoContraste) {
            document.body.classList.add('alto-contraste');
        }
        
        // Fonte para dislexia
        if (config.fonteDislexia) {
            document.body.classList.add('fonte-dislexia');
        }
    }
    
    // Alternar menu de acessibilidade
    function toggleMenuAcessibilidade() {
        const isExpanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
        botaoAcessibilidade.setAttribute('aria-expanded', !isExpanded);
        opcoesAcessibilidade.classList.toggle('visible');
    }
    
    // Fechar menu ao clicar fora
    function fecharMenuClicandoFora(event) {
        if (!event.target.closest('.menu-acessibilidade')) {
            botaoAcessibilidade.setAttribute('aria-expanded', 'false');
            opcoesAcessibilidade.classList.remove('visible');
        }
    }
    
    // Alterar tamanho da fonte
    function alterarTamanhoFonte(direcao) {
        const tamanhoAtual = parseFloat(getComputedStyle(document.body).fontSize);
        const novoValor = Math.min(Math.max(tamanhoAtual + (direcao * 1), 12), 24);
        document.body.style.fontSize = novoValor + 'px';
        config.tamanhoFonte = novoValor;
        localStorage.setItem('tamanhoFonte', novoValor);
    }
    
    // Alternar alto contraste
    function toggleAltoContraste() {
        document.body.classList.toggle('alto-contraste');
        config.altoContraste = !config.altoContraste;
        localStorage.setItem('altoContraste', config.altoContraste);
    }
    
    // Alternar fonte para dislexia
    function toggleFonteDislexia() {
        document.body.classList.toggle('fonte-dislexia');
        config.fonteDislexia = !config.fonteDislexia;
        localStorage.setItem('fonteDislexia', config.fonteDislexia);
    }
    
    // Navegação por teclado no menu
    function handleKeyboardNavigation(e) {
        if (e.key === 'Escape') {
            botaoAcessibilidade.focus();
            botaoAcessibilidade.setAttribute('aria-expanded', 'false');
            opcoesAcessibilidade.classList.remove('visible');
        }
    }
    
    // Event Listeners
    botaoAcessibilidade.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenuAcessibilidade();
    });
    
    document.addEventListener('click', fecharMenuClicandoFora);
    
    document.getElementById('aumentar-fonte').addEventListener('click', function() {
        alterarTamanhoFonte(1);
    });
    
    document.getElementById('diminuir-fonte').addEventListener('click', function() {
        alterarTamanhoFonte(-1);
    });
    
    document.getElementById('alto-contraste').addEventListener('click', toggleAltoContraste);
    
    document.getElementById('modo-dislexia').addEventListener('click', toggleFonteDislexia);
    
    opcoesAcessibilidade.addEventListener('keydown', handleKeyboardNavigation);
    
    // Inicialização
    aplicarConfiguracoes();
    
    // Verificar se a fonte para dislexia precisa ser carregada
    if (config.fonteDislexia && !document.querySelector('link[href*="open-dyslexic"]')) {
        const link = document.createElement('link');
        link.href = 'https://fonts.cdnfonts.com/css/open-dyslexic';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
});