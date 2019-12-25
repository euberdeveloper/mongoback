const { MongoClient } = require('mongodb');

async function clean() {
    // Open collection
    const connection = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
    // Get databases except for admin
    const databases = (await connection.db().admin().listDatabases())
        .databases.map(database => database.name).filter(database => database !== 'admin');
    // Delete each database
    for (const database of databases) {
        await connection.db(database).dropDatabase();
    }
    // Close connection
    await connection.close();
}

clean()
    .then(() => console.log('MongoDB cleaned succesfully!!!'))
    .catch(error => console.error('Error in cleaning MongoDB ', error));