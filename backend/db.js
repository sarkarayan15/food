const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://ayansarkar325:ayan007@cluster0.xugx8nl.mongodb.net/zwigatofood?retryWrites=true&w=majority'

const mongoDb = async () => {
    // try {
    //     await mongoose.connect(mongoURI);
    //     console.log("connected");

    //     const collection = mongoose.connection.db.collection('food_items');
    //     const query = {}; //find all documents in the collection

    //     const cursor = collection.find(query);
    //     const documents = await cursor.toArray();

    //     if (documents.length === 0) {
    //         console.log('No documents found!');
    //     } else {
    //         console.log('Found the following documents:');
    //         documents.forEach(document => console.log(documents));
    //     }
    //     await mongoose.disconnect();
    // } catch (err) { 
    //     console.log('Error connecting:',err); 
    // }

    try{
        await mongoose.connect(mongoURI);
        console.log("connected");
    } catch (err) {
        console.log("Error",err);
    }

    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();

    if (foodCategory.length > 0) {
        //store the documents in the 'food_items' global variable
        global.food_items = fetched_data;
        global.food_category = foodCategory;
        // console.log(global.food_items);
    } else {
        console.log("No documents found in the 'foodCategory' collection");
    }

    // if (fetched_data.length > 0) {
    //     //store the documents in the 'food_items' global variable
    //     global.food_items = fetched_data;
    //     // console.log(global.food_items);
    // } else {
    //     console.log("No documents found in the 'food_items' collection");
    // }
}
module.exports = mongoDb;