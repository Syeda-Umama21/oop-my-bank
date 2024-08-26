#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import chalk from "chalk";
// Display a Colourfull Welcome message
console.log(chalk.bold.rgb(184, 184, 184)(` \n  \t\t <<<==========================>>>`));
console.log(chalk.bold.rgb(184, 184, 184)(`<<<=======>>> ${chalk.bold.hex(`#0bd9d2`)(`Welcome to OOP-MyBank-System!`)}  <<<=========>>>`));
console.log(chalk.bold.rgb(184, 184, 184)(`\t\t <<<==============================>>>\n`));
// Bank Account class
class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.cyan(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`));
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // Credit money
    deposit(amount) {
        let fee = 0;
        if (amount > 100) {
            fee = 1; // $1 fee charged if more than $100 is deposited
        }
        const finalAmount = amount - fee; // Amount to be added to balance after fee
        this.balance += finalAmount;
        console.log(chalk.rgb(134, 243, 230)(`Deposit of $${amount} received. Remaining balance: $${this.balance}`));
    }
    // Check balance
    checkBalance() {
        console.log(chalk.rgb(63, 249, 220)(`Current balance: $${this.balance}`));
    }
}
// Customer class
class Customer {
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1004, 500),
    new BankAccount(1007, 1000),
    new BankAccount(1009, 2000)
];
// Create customers
const customers = [
    new Customer("Bisma", "Shah", "Female", 17, 3162223334, accounts[0]),
    new Customer("Umama", "Shah", "Female", 18, 3332223334, accounts[1]),
    new Customer("Attia", "Shah", "Female", 19, 3412223334, accounts[2])
];
// Function to interact with bank account
function service() {
    return __awaiter(this, void 0, void 0, function* () {
        do {
            const accountNumberInput = yield inquirer.prompt({
                name: "accountNumber",
                type: "number",
                message: chalk.yellow("Enter your account number:")
            });
            const accountNumber = Number(accountNumberInput.accountNumber); // Input ko number me convert karna
            const customer = customers.find(customer => customer.account.accountNumber === accountNumber);
            if (customer) {
                console.log(chalk.rgb(255, 178, 102).bold(`Welcome, ${customer.firstName} ${customer.lastName}!\n`));
                const ans = yield inquirer.prompt([{
                        name: "select",
                        type: "list",
                        message: chalk.green.bold("Select an operation"),
                        choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                    }]);
                switch (ans.select) {
                    case "Deposit":
                        const depositAmount = yield inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: chalk.rgb(238, 244, 169).bold("Enter the amount to deposit:")
                        });
                        customer.account.deposit(depositAmount.amount);
                        break;
                    case "Withdraw":
                        const withdrawAmount = yield inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: chalk.rgb(63, 249, 220).bold("Enter the amount to withdraw:")
                        });
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                    case "Check Balance":
                        customer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log(chalk.red.bold("Exiting bank program..."));
                        console.log(chalk.rgb(63, 249, 220).bold("\nThank you for using our bank services. Have a great day!"));
                        return;
                }
            }
            else {
                console.log(chalk.bold.rgb(151, 238, 143).bold("Invalid account number. Please try again."));
            }
        } while (true);
    });
}
service();
