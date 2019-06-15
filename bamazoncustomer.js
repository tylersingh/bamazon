/* Using const as the variables will not change and requiring them as node packages, they must be instakked because they are not core packages */

const mysql = require("mysql");
const inquirer = require("inquirer");
//const Table = require('cli-table');

//creating a connection to the database through mySQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Nana0715",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

var display = function() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        console.log("-----------------------------");
        console.log("      Welcome To Bamazon    ");
        console.log("-----------------------------");
        console.log("");
        console.log("Find what you're looking for! \n");
        console.log("");
        // var table = new Table({
        //   head: ["Product Id", "Product Description", "Cost", "Stock Quantity"],
        //   colWidths: [12, 50, 8,],
        //   colAligns: ["center", "left", "right"],
        //   style: {
        //     head: ["aqua"],
        //     compact: true
        //   }
        // });
    
        // for (var i = 0; i < response.length; i++) {
        //   table.push([response[i].id, response[i].product_name, response[i].price, response[i].stock_quantity]);
        // }
        // console.log(table.toString());
        // console.log("");
        console.table(response)
        questions();
      });

};

display();

//a function to push the values from the table so the user can view whats available
function pushTable() {
    connection.query("SELECT * FROM products", function (err, response){
        if (err) throw err;
        for (i = 0; i < response.length; i++) { 
            console.log(response[i].id + " " + response[i].product_name + " " + response[i].depart_id + " " + response[i].stock_quantity + " " + response[i].price);
          };
    })
};

//calling the pushTable function
//pushTable();


//another function asking the user what they would like to buy and how many of the product
function questions() {
    connection.query("SELECT * FROM products", function (err, response){
        //using inquirer to prompt the questions to the user
        inquirer.prompt([
            {
              name: "product_name",
              type: "input",
              message: "What would you like to buy?"
            }, {
              name: "stock_quantity",
              type: "input",
              message: "How many would you like?"
            },
          ]).then(function(answers) {
              //taking the user's response and decrementing the stock
           var clientRes = parseInt(answers.product_name) - 1;
           console.log(answers);
           console.log(clientRes);
           var stock_quantity = response[clientRes].stock_quantity;
           console.log(stock_quantity);
           var numberUserWants = parseInt(answers.stock_quantity);
           console.log(numberUserWants)
            //if else statement to update the quantity and total price
           if (numberUserWants <= parseInt(stock_quantity)) {
                console.log("\n");
                console.log("Good news! We have your item in stock");
                // updateQuantity-= answer.stock_quantity

                // var totalPrice = answer.stock_quantity * response[selection].price;
                // console.log("The total price for " + response[selection].product_name + " is $" +totalPrice)

                // var query2 = connection.query(
                //     "UPDATE products SET ? WHERE ?",
                //     [
                //         { stock_quantity: updateQuantity },

                //         {product_name:response[selection].product_name}
                //     ],
                //     function(err, res) {
                //         console.log(" YOUR ORDER HAS BEEN PLACED! \n");
                //     }
                // )
                //else statement advising the user the item requested is out of stock
            } else {
                console.log("WE ARE OUT OF STOCK " + response[selection].product_name + " Insufficient quantity! ")
            }
            console.log("error")
            display();
            connection.end();
        });
    });
}
function updateStock(productName, quantity){
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [{
      stock_quantity: quantity
    },{
      id: productName
    }], function (err, response){

      console.log(response);
      console.log(err);
    }
  )

}
//questions();