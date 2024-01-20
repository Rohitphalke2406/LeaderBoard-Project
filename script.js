let players = [];

function addPlayer() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const country = document.getElementById('country').value;
    const score = parseInt(document.getElementById('score').value);

    const player = { firstName, lastName, country, score };
    players.push(player);

    updateLeaderboard();
    resetForm();
}

function updateLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';

    players.sort((a, b) => b.score - a.score);

    players.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.firstName} ${player.lastName}</td>
            <td>${player.country}</td>
            <td>${player.score}</td>
            <td><button onclick="changeScore(${index}, 5)">+5</button></td>
            <td><button onclick="changeScore(${index}, -5)">-5</button></td>
            <td><button onclick="deletePlayer(${index})">Delete</button></td>
        `;
        leaderboardBody.appendChild(row);
    });
}

function changeScore(index, value) {
    players[index].score += value;
    updateLeaderboard();
}

function deletePlayer(index) {
    players.splice(index, 1);
    updateLeaderboard();
}

function resetForm() {
    document.getElementById('addPlayerForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const scoreHeader = document.querySelector('th:nth-child(3)');
    scoreHeader.addEventListener('click', () => {
        players.reverse();
        updateLeaderboard();
    });
});
