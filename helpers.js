import all_pairings from './pairings.json' assert { type: "json" }

export const find_pairing = (name,round) => {
    return all_pairings.pairings[`round_${round}`].filter((pairing) => {
        return pairing.player_1.name === name || pairing.player_2.name === name
    })
}