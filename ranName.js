// export let enemies = ['skeleton', 'zombie', 'warrior', 'assassin']
// export function enemy (array : string[]): void {
//     let ranEnemy = Math.floor(Math.random()*array.length)
//     console.log(`${array[ranEnemy]} has appeared!!!`)
// }
export let enemies = ['skeleton', 'zombie', 'warrior', 'assassin'];
export function enemy(array) {
    let ranEnemy = Math.floor(Math.random() * array.length);
    return array[ranEnemy];
}
