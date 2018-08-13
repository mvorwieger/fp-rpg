import {cliData} from '../data/cli'

export const helpHandler = (): void => {
    for (let key in cliData) {
        let b: any = cliData
        console.log(`\n ${b[key].description}`)
    }
}