// Ajouter en haut du fichier, avec les autres variables globales
let scores = []; // Tableau pour stocker les scores par épisode
let rewards = []; // Tableau pour stocker les récompenses par épisode
let chart = null; // Référence au graphique Chart.js

// Nouvelle fonction pour initialiser et mettre à jour le graphique
function updatePerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // Si le graphique n'existe pas, le créer
    if (!chart) {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Numéros d'épisodes
                datasets: [
                    {
                        label: 'Score par épisode',
                        data: [],
                        borderColor: '#4CAF50', // Vert pour le score
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        fill: true,
                        tension: 0.4 // Courbe lissée
                    },
                    {
                        label: 'Récompense par épisode',
                        data: [],
                        borderColor: '#2196F3', // Bleu pour la récompense
                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                        fill: true,
                        tension: 0.4 // Courbe lissée
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Épisode'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Valeur'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    }

    // Mettre à jour les labels (numéros d'épisodes) et les données
    chart.data.labels = Array.from({ length: scores.length }, (_, i) => i + 1);
    chart.data.datasets[0].data = scores;
    chart.data.datasets[1].data = rewards;
    chart.update(); // Rafraîchir le graphique
}
