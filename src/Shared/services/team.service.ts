import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  teamData: any[] = [];
  constructor() {}

  setTeamData(data: any) {
    console.log(data);

    this.teamData = data;
  }

  getTeamData(numberOfGame: number) {
    if (numberOfGame) {
      return this.teamData.slice(0, numberOfGame);
    } else {
      return this.teamData;
    }
  }

  applyFilterByPlayerStats = (
    statsOf: string,
    numberOfGame: number,
    lineVal: number
  ) => {
    let players = this.getTeamData(numberOfGame);
    const graphData = this.prepareGraphData(players, statsOf, lineVal);
    return { players, graphData };
  };

  prepareGraphData = (players: any[], statsOf: string, lineVal: number) => {
    const labels = players.map(
      (player) => player?.opponent || player?.opponent_tricode || 'N/A'
    );
    const statsKeys = this.getStatsKeyByStatsId(statsOf);
    const baseValue = lineVal;
    const playerData = players.map((player) => {
      const stats = statsKeys.reduce((acc: any, key) => {
        acc[key] = player[key];
        return acc;
      }, {});
      const totalValue = statsKeys.reduce((sum, key) => sum + player[key], 0);
      const color = 'rgba(124, 58, 237,1)';
      return { Stats: stats, color, total: totalValue };
    });

    const lineDataSets = {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'purple',
      borderWidth: 2,
      fill: false,
      tension: 1,
      data: playerData.map((item: any) => baseValue),
    };

    return {
      labels,
      datasets: [...this.createDataSet(playerData)],
    };
  };
  createDataSet = (data: any) => {
    const statKeys = Object.keys(data[0].Stats);
    const baseOpacity = 1;

    return statKeys.map((statKey, index) => {
      const currentOpacity = baseOpacity - index * 0.3;

      return {
        type: 'bar',
        label: statKey,
        backgroundColor: data.map((item: any) =>
          item.color.replace(
            /rgba\((\d+), (\d+), (\d+), 1\)/,
            `rgba($1, $2, $3, ${currentOpacity.toFixed(2)})`
          )
        ),
        borderColor: data.map((item: any) =>
          item.color.replace(
            /rgba\((\d+), (\d+), (\d+), 1\)/,
            `rgba($1, $2, $3, ${currentOpacity.toFixed(2)})`
          )
        ),
        borderRadius: 10,
        data: data.map((item: any) => {
          const value = item.Stats[statKey];
          return typeof value === 'string' ? parseFloat(value) : value;
        }),
      };
    });
  };

  getStatsKeyByStatsId(statsId: string) {
    switch (statsId) {
      case 'MIN':
        return ['minutes'];
      case 'PTS':
        return ['points'];
      case 'TO':
        return ['turnovers'];
      case 'STLS':
        return ['steals'];
      case 'BLKS':
        return ['blocks'];
      case 'ASTS':
        return ['assists'];
      case 'REBS':
        return ['rebounds'];
      case 'D-REB':
        return ['defensive_rebounds'];
      case 'O-REB':
        return ['offensive_rebounds'];
      case '3PM':
        return ['three_pointers_made'];
      case '3PA':
        return ['three_pointers_attempted'];
      case '2PA':
        return ['two_pointers_made'];
      case 'PA':
        return ['points', 'assists'];
      case 'PR':
        return ['points', 'rebounds'];
      case 'RA':
        return ['rebounds', 'assists'];
      case 'PRA':
        return ['points', 'rebounds', 'assists'];
      case 'BS':
        return ['blocks', 'steals'];
      default:
        return [];
    }
  }

  getStatsList() {
    return [
      // {
      //   id: 'MIN',
      //   name: 'Minutes Played',
      // },
      {
        id: 'PTS',
        name: 'Points',
      },
      {
        id: 'REBS',
        name: 'Rebounds',
      },
      {
        id: 'ASTS',
        name: 'Assists',
      },
      {
        id: 'PA',
        name: 'Points & Assists',
      },
      {
        id: 'PR',
        name: 'Points & Rebounds',
      },
      {
        id: 'BLKS',
        name: 'blocks',
      },
      {
        id: 'STLS',
        name: 'Steals',
      },
      {
        id: 'TO',
        name: 'Turnovers',
      },
      {
        id: '3PM',
        name: 'Three Pointers Made',
      },
      {
        id: '3PA',
        name: '3-PT Attempts',
      },
      {
        id: 'BS',
        name: 'Blocks & Steals',
      },
      {
        id: 'RA',
        name: 'Rebounds & Assists',
      },
      {
        id: 'PRA',
        name: 'Points, Rebounds & Assists',
      },
    ];
  }
}
