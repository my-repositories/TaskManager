using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class TaskModel
    {
        public int Id { get; set; }

        public long CreatedAt { get; set; }

        public long CompletedAt { get; set; }

        public string Description { get; set; }

        public int EstimatedTime { get; set; }

        public int LeadTime { get; set; }

        public int ParentId { get; set; }

        [Required(ErrorMessage = "Responsible is required")]
        [MinLength(3, ErrorMessage = "Responsible must be a minimum of 3 characters")]
        public string Responsible { get; set; }

        public int Status { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MinLength(3, ErrorMessage = "Title must be a minimum of 3 characters")]
        public string Title { get; set; }
    }
}