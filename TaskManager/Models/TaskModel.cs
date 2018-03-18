using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class TaskModel
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [ScaffoldColumn(false)]
        public long CreatedAt { get; set; }

        [ScaffoldColumn(false)]
        public long CompletedAt { get; set; }

        public string Description { get; set; }

        public int EstimatedTime { get; set; }

        [ScaffoldColumn(false)]
        public int LeadTime { get; set; }

        public int ParentId { get; set; }

        [Required(ErrorMessage = "Responsible is required")]
        [MinLength(3, ErrorMessage = "Responsible must be a minimum of 3 characters")]
        public string Responsible { get; set; }

        [ScaffoldColumn(false)]
        public int Status { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MinLength(3, ErrorMessage = "Title must be a minimum of 3 characters")]
        public string Title { get; set; }
    }
}