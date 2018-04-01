namespace TaskManager
{
    public class AutoMapperConfig
    {
        public static void RegisterMaps()
        {
            AutoMapper.Mapper.Initialize(config =>
            {
                config.CreateMap<Models.TaskModel, Models.TaskViewModels.AddViewModel>();
                config.CreateMap<Models.TaskModel, Models.TaskViewModels.EditViewModel>();
            });
        }
    }
}