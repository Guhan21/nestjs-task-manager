import { Task } from './tasks.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './tasks.status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const  { search, status } = filterDto;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere(`task.status = :status`, {status});
        }
        if (search) {
            query.andWhere(`(task.title LIKE :search OR task.description LIKE :search)`, { search : `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }

    public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { title, description} = createTaskDTO;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

}
