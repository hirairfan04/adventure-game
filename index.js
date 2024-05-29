#! /usr/bin/env node
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionsHealAmt = 30;
let healthPotionsDropChance = 50; //percentage
let running = true;
console.log('-----------------------------------------');
console.log('Welcome to the dungeon!');
console.log('-----------------------------------------');
import inquirer from "inquirer";
import { enemies, enemy } from "./ranName.js";
let getEnemy = enemy(enemies);
console.log(`${getEnemy} has appeared!!!`);
GAME: while (running) {
    console.log('-----------------------------------------\n');
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth) + 1;
    while (enemyHealth > 0) {
        console.log(`Your HP = ${health}`);
        console.log(`${getEnemy}'s HP = ${enemyHealth}\n`);
        let answer = await inquirer.prompt([
            {
                message: 'What would you like to do?',
                name: 'question',
                type: 'list',
                choices: ['Attack', 'Drink health potion', 'Run']
            }
        ]);
        if (answer.question == 'Attack') {
            let damageDealt = Math.floor(Math.random() * attackDamage) + 1;
            let damageTaken = Math.floor(Math.random() * enemyAttackDamage) + 1;
            enemyHealth = enemyHealth - damageDealt;
            health = health - damageTaken;
            console.log(`You strike the ${getEnemy} for ${damageDealt} damage`);
            console.log(`You recieve ${damageTaken} in retaliation`);
            if (health < 1) {
                console.log('!!! You have taken too much damage, you are too weak to go on !!!');
                break;
            }
        }
        else if (answer.question == 'Drink health potion') {
            if (numHealthPotions > 0) {
                health = health + healthPotionsHealAmt;
                numHealthPotions--;
                console.log(`You drink a health potion, healing yourself for ${healthPotionsHealAmt}`);
                console.log(`You now have ${health} HP`);
                console.log(`You have ${numHealthPotions} left`);
            }
            else {
                console.log('!!! You have no health potions left. Defeat the enemy for a chance to get one !!!');
            }
        }
        else if (answer.question == 'Run') {
            console.log(`You run away from ${getEnemy}`);
            break GAME;
        }
    }
    if (health < 1) {
        console.log('You limp out of the dungeon');
        console.log('-----------------------------------------');
    }
    else if (enemyHealth < 1) {
        console.log(`${getEnemy} was defeated!!!`);
        console.log(`You have ${health} HP left`);
        let drop = Math.floor(Math.random() * 100);
        if (drop < healthPotionsDropChance) {
            numHealthPotions++;
            console.log(`The ${getEnemy} dropped a health potion`);
            console.log(`You now have ${numHealthPotions} health potion(s)`);
        }
    }
    console.log('-----------------------------------------');
    let answer2 = await inquirer.prompt([{
            message: 'What would you like to do?',
            name: 'question2',
            type: 'list',
            choices: ['Continue fighting', 'Exit dungeon']
        }]);
    if (answer2.question2 == 'Continue fighting') {
        console.log('You may continue your adventure!');
    }
    else if (answer2.question2 == 'Exit dungeon') {
        console.log('You exit the dungeon, successful from your adventure');
        console.log("###########################");
        console.log('****THANKS FOR PLAYING****');
        console.log("###########################");
        break;
    }
}
