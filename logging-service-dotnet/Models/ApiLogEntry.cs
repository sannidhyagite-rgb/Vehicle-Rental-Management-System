using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace VehicleManagement.Api.Models
{
    public class ApiLogEntry
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        [ValidateNever]
        public string Id { get; set; }

        public string ServiceName { get; set; }   // SpringBoot / DotNet
        public string Path { get; set; }          // /api/vehicles
        public string HttpMethod { get; set; }    // GET / POST
        public string Message { get; set; }       // Calling / Executed / Error
        public DateTime LoggedAt { get; set; }
        public long? DurationMs { get; set; } // 👈 performance
        public string CorrelationId { get; set; }
        public long? UserId { get; set; }
        public string Role { get; set; }

    }
}
