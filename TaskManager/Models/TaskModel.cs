// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TaskModel.cs" company="TaskManager">
//   TaskManager
// </copyright>
// <summary>
//   Defines the TaskModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace TaskManager.Models
{
    /// <summary>
    /// The task model.
    /// </summary>
    public class TaskModel
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the created at.
        /// </summary>
        public long CreatedAt { get; set; }

        /// <summary>
        /// Gets or sets the completed at.
        /// </summary>
        public long CompletedAt { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the estimated time.
        /// </summary>
        public int EstimatedTime { get; set; }

        /// <summary>
        /// Gets or sets the lead time.
        /// </summary>
        public int LeadTime { get; set; }

        /// <summary>
        /// Gets or sets the parent id.
        /// </summary>
        public int ParentId { get; set; }

        /// <summary>
        /// Gets or sets the responsible.
        /// </summary>
        public string Responsible { get; set; }

        /// <summary>
        /// Gets or sets the status.
        /// </summary>
        public int Status { get; set; }

        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        public string Title { get; set; }
    }
}
