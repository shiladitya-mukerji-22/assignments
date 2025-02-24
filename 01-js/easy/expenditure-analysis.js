/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let result = [];

  for (let i = 0; i < transactions.length; i++) {
    let found = false;

    // Check if the category already exists in the result array
    for (let j = 0; j < result.length; j++) {
      if (result[j].category === transactions[i].category) {
        result[j].totalSpent += transactions[i].price; // Accumulate the total spent for the category
        found = true;
        break;
      }
    }

    // If category doesn't exist, add it to the result array
    if (!found) {
      result.push({
        category: transactions[i].category,
        totalSpent: transactions[i].price // Set the total spent to the price for a new category
      });
    }
  }

  return result;
}

module.exports = calculateTotalSpentByCategory;

// calculateTotalSpentByCategory(
//   { itemName: 'Item 1', category: 'Grocery', price: 25, timestamp: Date.now() },
//   { itemName: 'Item 2', category: 'Grocery', price: 10, timestamp: Date.now() }

// );
