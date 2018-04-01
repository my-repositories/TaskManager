using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models.TaskViewModels
{
    public class AddViewModel
    {
        public string Description { get; set; }

        public int EstimatedTime { get; set; }

        public int ParentId { get; set; }

        [Required(ErrorMessage = "Responsible is required")]
        [MinLength(3, ErrorMessage = "Responsible must be a minimum of 3 characters")]
        public string Responsible { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MinLength(3, ErrorMessage = "Title must be a minimum of 3 characters")]
        public string Title { get; set; }
    }
}