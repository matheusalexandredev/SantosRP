async function updateRobloxStats() {
    // Seu Universe ID real que você me passou
    const universeId = "6035872082"; 
    // Usando o proxy para evitar erro de CORS no navegador
    const url = `https://games.roproxy.com/v1/games?universeIds=${universeId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.data && data.data.length > 0) {
            const gameData = data.data[0];
            
            // Atualiza o contador de jogadores online
            const playerCountElement = document.getElementById('player-count');
            if (playerCountElement) {
                playerCountElement.innerText = gameData.playing.toLocaleString();
            }

            // DICA EXTRA: Você pode atualizar as visitas também se quiser!
            const visitsElement = document.getElementById('visit-count');
            if (visitsElement) {
                visitsElement.innerText = formatNumber(gameData.visits);
            }
            
            console.log("Status do Roblox atualizado com sucesso!");
        }
    } catch (error) {
        console.error("Erro ao conectar com a API do Roblox:", error);
        document.getElementById('player-count').innerText = "OFFLINE";
    }
}

// Função auxiliar para deixar números grandes bonitos (ex: 1.5M em vez de 1500000)
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
}

// Executa assim que a página abre
updateRobloxStats();

// Atualiza a cada 60 segundos (para não sobrecarregar o site)
setInterval(updateRobloxStats, 60000);