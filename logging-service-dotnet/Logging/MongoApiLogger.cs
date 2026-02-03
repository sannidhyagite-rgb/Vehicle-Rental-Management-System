using MongoDB.Driver;
using VehicleManagement.Api.Models;

namespace VehicleManagement.Api.Logging
{
    public class MongoApiLogger
    {
        private readonly IMongoCollection<ApiLogEntry> _logCollection;

        public MongoApiLogger(IConfiguration configuration)
        {
            var connectionString = configuration["MongoDbSettings:ConnectionString"];
            var databaseName = configuration["MongoDbSettings:DatabaseName"];
            var collectionName = configuration["MongoDbSettings:LogCollectionName"];

            Console.WriteLine("==== MongoDB CONFIG ====");
            Console.WriteLine($"ConnectionString: {connectionString}");
            Console.WriteLine($"DatabaseName: {databaseName}");
            Console.WriteLine($"CollectionName: {collectionName}");
            Console.WriteLine("========================");

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);

            _logCollection = database.GetCollection<ApiLogEntry>(collectionName);
        }

        public async Task LogAsync(ApiLogEntry logEntry)
        {
            Console.WriteLine("👉 LogAsync called");
            await _logCollection.InsertOneAsync(logEntry);
            Console.WriteLine("✅ InsertOneAsync completed");
        }
    }
}
